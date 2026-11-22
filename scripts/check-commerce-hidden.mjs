// Seguro antes de publicar: el sitio compilado NO puede tener la página de precios ni las páginas legales
// (ni sus enlaces o textos) mientras no se abra la venta. Ver src/lib/commerce.ts.
// Corre en el CI después de `npm run build` (dentro de `npm run verify`); si falla, el sitio no se publica.
// El día que se abra la venta (commerceVisible = true) se borra este script y su paso en `verify`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const dist = 'dist'
if (!existsSync(dist)) {
  if (process.env.CI) {
    console.error('check-commerce-hidden: falta dist/. En el CI tiene que correr después de npm run build.')
    process.exit(1)
  }
  console.log('check-commerce-hidden: no hay dist/ (corre npm run build antes para revisarlo). Se omite.')
  process.exit(0)
}

const pages = ['pricing', 'terms', 'license', 'refunds', 'privacy']
// Textos que solo existen en esas páginas o en sus enlaces.
const markers = [
  ...pages.flatMap((p) => [`/${p}/`, `/es/${p}/`]),
  'soporte@lu-vin.com',
  'Merchant of Record',
  'Bryam David Vega Moreno',
  'commerceVisible',
]

const problems = []
for (const base of [path.join(dist, 'client'), path.join(dist, 'client', 'es')]) {
  for (const p of pages) if (existsSync(path.join(base, p))) problems.push(`existe la página ${path.join(base, p)}`)
}

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const full = path.join(dir, name)
  return statSync(full).isDirectory() ? walk(full) : [full]
})
const textFile = /\.(html|js|mjs|cjs|css|json|txt|xml|webmanifest|map)$|_headers$|_redirects$/
for (const file of walk(dist)) {
  if (!textFile.test(file)) continue
  const text = readFileSync(file, 'utf8')
  for (const marker of markers) if (text.includes(marker)) problems.push(`${file} contiene "${marker}"`)
}

if (problems.length) {
  console.error('check-commerce-hidden: el sitio compilado muestra precios o páginas legales, que todavía no se publican:')
  for (const p of problems) console.error(`  - ${p}`)
  console.error('Revisa que commerceVisible en src/lib/commerce.ts siga siendo import.meta.env.DEV.')
  process.exit(1)
}
console.log('check-commerce-hidden: OK, el sitio compilado no tiene precios ni páginas legales.')
