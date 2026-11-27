// Geometría de las escenas de /product: los pasos de un workflow, sus puertos y las líneas de datos.
// Todo se mide en unidades de diseño (u). En la página, 1u = ancho del lienzo / W, así que la escena
// escala como una imagen pero sigue siendo HTML y SVG nítidos. Hay dos diseños: 'wide' (pasos en fila)
// y 'tall' (pasos uno debajo del otro, para el teléfono).

export type Step = {
  id: string
  method: 'GET' | 'POST'
  path: string
  params: { name: string; from?: string }[] // from: 'inputs.email' o '<paso>.<output>'
  outputs: string[]
}
export type Variant = 'wide' | 'tall'

// El workflow de las escenas: iniciar sesión, buscar al cliente y abrirle una cuenta.
export const STEPS: Step[] = [
  { id: 'signIn', method: 'POST', path: '/login', params: [{ name: 'email', from: 'inputs.email' }], outputs: ['token', 'customerId'] },
  {
    id: 'getCustomer',
    method: 'GET',
    path: '/customers/{customerId}',
    params: [
      { name: 'Authorization', from: 'signIn.token' },
      { name: 'customerId', from: 'signIn.customerId' },
    ],
    outputs: ['id', 'status'],
  },
  {
    id: 'openAccount',
    method: 'POST',
    path: '/accounts',
    params: [
      { name: 'Authorization', from: 'signIn.token' },
      { name: 'customerId', from: 'getCustomer.id' },
    ],
    outputs: ['accountId'],
  },
]

// Los valores que viajan por cada línea en la simulación.
export const VALUES: Record<string, string> = {
  'signIn.token': 'eyJhbGciOi…',
  'signIn.customerId': 'cus_7Q2K',
  'getCustomer.id': 'cus_7Q2K',
  'getCustomer.status': 'ACTIVE',
  'openAccount.accountId': 'acc_91XZ',
}

// Medidas del nodo, en u.
const HEAD = 70
const LABEL = 26
const ROW = 36
const PAD = 8
const STATUS = 36

export type Box = { id: string; x: number; y: number; w: number; h: number; step: Step; index: number }
// d: la línea; pd: el recorrido del valor que viaja, que sigue un poco dentro del paso de destino
// (los valores pasan por debajo de los pasos, así que entran y desaparecen).
export type Wire = { id: string; from: string; to: string; d: string; pd: string; skip: boolean }
export type Layout = { W: number; H: number; boxes: Box[]; wires: Wire[] }

const height = (s: Step, status: boolean) =>
  HEAD + (LABEL + ROW * s.params.length + PAD) + (LABEL + ROW * s.outputs.length + PAD) + (status ? STATUS : 0)

// Centro vertical de una fila: parámetro i o output j.
export const paramY = (b: Box, i: number) => b.y + HEAD + LABEL + ROW * i + ROW / 2
export const outputY = (b: Box, j: number) => b.y + HEAD + (LABEL + ROW * b.step.params.length + PAD) + LABEL + ROW * j + ROW / 2

export function layout(variant: Variant, status = false, steps = STEPS): Layout {
  const boxes: Box[] = []
  if (variant === 'wide') {
    const W = 1000
    const w = 270
    const xs = [25, 365, 705]
    steps.forEach((step, index) => boxes.push({ id: step.id, x: xs[index], y: 30, w, h: height(step, status), step, index }))
    const wires = wiresFor(boxes, variant)
    const bottom = Math.max(...boxes.map((b) => b.y + b.h))
    const skips = wires.filter((x) => x.skip).length
    return { W, H: bottom + (skips ? 30 + skips * 12 : 30), boxes, wires }
  }
  const W = 400
  const w = 310
  let y = 20
  steps.forEach((step, index) => {
    const h = height(step, status)
    boxes.push({ id: step.id, x: 20, y, w, h, step, index })
    y += h + 50
  })
  return { W, H: y - 30, boxes, wires: wiresFor(boxes, variant) }
}

function wiresFor(boxes: Box[], variant: Variant): Wire[] {
  const byId = Object.fromEntries(boxes.map((b) => [b.id, b]))
  const wires: Wire[] = []
  let lane = 0
  let skipLane = 0
  for (const b of boxes) {
    b.step.params.forEach((p, i) => {
      if (!p.from || p.from.startsWith('inputs.')) return
      const [srcId, out] = p.from.split('.')
      const src = byId[srcId]
      const a = { x: src.x + src.w, y: outputY(src, src.step.outputs.indexOf(out)) }
      const skip = b.index - src.index > 1
      let d: string
      if (variant === 'tall') {
        // Sale por la derecha y entra por la derecha del paso de abajo.
        const bx = b.x + b.w
        const by = paramY(b, i)
        const x = a.x + 14 + lane * 10
        d = `M${a.x} ${a.y} H${x - 6} Q${x} ${a.y} ${x} ${a.y + 6} V${by - 6} Q${x} ${by} ${x - 6} ${by} H${bx}`
      } else if (!skip) {
        const bx = b.x
        const by = paramY(b, i)
        const m = (a.x + bx) / 2
        d = `M${a.x} ${a.y} C${m} ${a.y} ${m} ${by} ${bx} ${by}`
      } else {
        // Salta un paso: pasa por debajo de los nodos, sin cruzarlos.
        const mid = boxes[src.index + 1]
        const y = Math.max(...boxes.map((n) => n.y + n.h)) + 22 + skipLane * 12
        const x1 = (src.x + src.w + mid.x) / 2 - 8 - skipLane * 6
        const x2 = (mid.x + mid.w + b.x) / 2 + 8 + skipLane * 6
        const by = paramY(b, i)
        const r = 8
        d = `M${a.x} ${a.y} H${x1 - r} Q${x1} ${a.y} ${x1} ${a.y + r} V${y - r} Q${x1} ${y} ${x1 + r} ${y} H${x2 - r} Q${x2} ${y} ${x2} ${y - r} V${by + r} Q${x2} ${by} ${x2 + r} ${by} H${b.x}`
        skipLane++
      }
      const pd = `${d} H${variant === 'tall' ? b.x + b.w - 60 : b.x + 60}`
      wires.push({ id: `${b.id}.${p.name}`, from: p.from, to: `${b.id}.${p.name}`, d, pd, skip })
      lane++
    })
  }
  return wires
}

export const metrics = { HEAD, LABEL, ROW, PAD, STATUS }
