// El sitemap para los buscadores: cada página en inglés y en español, con sus alternativas de idioma.
// Solo las páginas públicas: precios y páginas legales no están (solo existen con npm run dev).
import type { APIRoute } from 'astro'

export const prerender = true

const pages = ['', 'product/', 'compare/', 'compare/postman-flows/', 'about/', 'faq/']

export const GET: APIRoute = ({ site }) => {
  const url = (lang: 'en' | 'es', page: string) => new URL((lang === 'en' ? '/' : '/es/') + page, site).href
  const entries = pages.flatMap((page) =>
    (['en', 'es'] as const).map(
      (lang) => `  <url>
    <loc>${url(lang, page)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', page)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${url('es', page)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/>
  </url>`,
    ),
  )
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
