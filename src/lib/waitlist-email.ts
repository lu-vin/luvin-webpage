// Correo de bienvenida de la lista de espera. Se arma con los mismos textos del sitio
// (src/i18n/strings.ts), así que si cambia la página, cambia el correo.
// HTML con tablas y estilos en línea porque es lo único que respetan todos los clientes de correo.
import { strings, type Lang } from '../i18n/strings'

export interface Signup {
  name: string
  email: string
  company: string
  role: string
  useCase: string
  lang: Lang
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const C = { bg: '#f3f6f4', card: '#ffffff', ink: '#14201a', muted: '#55665b', line: '#dfe7e1', brand: '#2f8f3f', dark: '#0a110d' }
const font = "font-family:Inter,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;"

const h2 = (text: string) =>
  `<h2 style="${font}margin:36px 0 12px;font-size:20px;line-height:1.3;color:${C.ink};">${esc(text)}</h2>`
const p = (text: string, extra = '') =>
  `<p style="${font}margin:0 0 14px;font-size:16px;line-height:1.6;color:${C.ink};${extra}">${esc(text)}</p>`
const item = (title: string, body: string, marker: string) => `
  <tr>
    <td valign="top" style="${font}width:32px;padding:0 0 14px;font-size:15px;font-weight:700;color:${C.brand};">${marker}</td>
    <td valign="top" style="${font}padding:0 0 14px;font-size:15px;line-height:1.55;color:${C.muted};">
      <strong style="color:${C.ink};">${esc(title)}.</strong> ${esc(body)}
    </td>
  </tr>`
const list = (rows: { title: string; body: string }[], numbered = false) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows
    .map((r, i) => item(r.title, r.body, numbered ? `${i + 1}.` : '&#8226;'))
    .join('')}</table>`

// `site`: dominio para los enlaces. `assets`: de dónde se cargan las imágenes (ver /api/waitlist).
export function welcomeEmail(s: Signup, site: string, assets: string = site) {
  const t = strings[s.lang]
  const e = t.email
  const home = new URL(s.lang === 'en' ? '/' : '/es/', site).href
  // Imágenes livianas de public/media/email.
  const img = (n: 'header' | 'builder' | 'results') => `${assets.replace(/\/$/, '')}/media/email/${n}-${s.lang}.jpg`
  const firstName = s.name.trim().split(/\s+/)[0] ?? ''

  const html = `<!doctype html>
<html lang="${s.lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(e.subject)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;">${esc(e.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.line};">
  <tr><td style="background:${C.dark};">
    <a href="${home}"><img src="${img('header')}" width="600" alt="Luvin · ${esc(t.footer.tagline)}" style="display:block;width:100%;height:auto;border:0;"></a>
  </td></tr>
  <tr><td style="padding:32px 32px 8px;">
    ${p(`${e.hi}${firstName ? ` ${firstName}` : ''},`, 'font-weight:600;')}
    ${p(e.intro)}

    ${h2(e.whatTitle)}
    ${p(t.hero.lead)}
    ${p(t.hero.note, `color:${C.muted};font-size:15px;`)}

    ${h2(e.problemTitle)}
    ${p(t.problem.body)}
    ${p(t.problem.answer, 'font-weight:600;')}

    ${h2(e.howTitle)}
    ${list(t.how.steps, true)}
    <a href="${home}product/#design"><img src="${img('builder')}" width="536" alt="${esc(t.showcase[0]!.alt)}" style="display:block;width:100%;height:auto;margin:6px 0 0;border:1px solid ${C.line};border-radius:10px;"></a>

    ${h2(e.featuresTitle)}
    ${list(t.features.items)}
    <a href="${home}product/#design"><img src="${img('results')}" width="536" alt="${esc(t.showcase[1]!.alt)}" style="display:block;width:100%;height:auto;margin:6px 0 0;border:1px solid ${C.line};border-radius:10px;"></a>

    ${h2(e.whoTitle)}
    ${list(t.who.items)}

    ${h2(e.nextTitle)}
    ${p(e.next)}

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;"><tr>
      <td style="background:${C.brand};border-radius:10px;">
        <a href="${home}" style="${font}display:inline-block;padding:13px 24px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;">${esc(e.cta)}</a>
      </td>
    </tr></table>

    ${p(e.signoff, 'margin-top:28px;font-weight:600;')}
  </td></tr>
  <tr><td style="padding:20px 32px 28px;border-top:1px solid ${C.line};">
    <p style="${font}margin:0 0 8px;font-size:13px;line-height:1.5;color:${C.muted};">${esc(e.why)}</p>
    <p style="${font}margin:0;font-size:12px;line-height:1.5;color:${C.muted};">${esc(t.footer.specs)}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  const text = [
    `${e.hi}${firstName ? ` ${firstName}` : ''},`,
    e.intro,
    `\n${e.whatTitle.toUpperCase()}\n${t.hero.lead}\n${t.hero.note}`,
    `\n${e.problemTitle.toUpperCase()}\n${t.problem.body}\n${t.problem.answer}`,
    `\n${e.howTitle.toUpperCase()}\n${t.how.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`).join('\n')}`,
    `\n${e.featuresTitle.toUpperCase()}\n${t.features.items.map((f) => `- ${f.title}. ${f.body}`).join('\n')}`,
    `\n${e.whoTitle.toUpperCase()}\n${t.who.items.map((w) => `- ${w.title}. ${w.body}`).join('\n')}`,
    `\n${e.nextTitle.toUpperCase()}\n${e.next}`,
    `\n${e.cta}: ${home}`,
    `\n${e.signoff}`,
    `\n--\n${e.why}`,
  ].join('\n')

  return { subject: e.subject, html, text }
}

// Aviso interno con todo lo que llenó la persona.
export function notifyEmail(s: Signup) {
  const rows: [string, string][] = [
    ['Nombre', s.name],
    ['Email', s.email],
    ['Empresa', s.company || '—'],
    ['Rol', s.role || '—'],
    ['Cadena que quiere probar', s.useCase || '—'],
    ['Idioma', s.lang],
  ]
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  const html = `<table cellpadding="6" style="${font}font-size:14px;border-collapse:collapse;">${rows
    .map(([k, v]) => `<tr><td style="color:${C.muted};vertical-align:top;">${k}</td><td style="white-space:pre-wrap;">${esc(v)}</td></tr>`)
    .join('')}</table>`
  return { subject: `Nuevo en la lista de espera: ${s.name} <${s.email}>`, html, text }
}
