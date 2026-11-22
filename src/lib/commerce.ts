// Precios y páginas legales (lo que Paddle revisa antes de aprobar el dominio): términos, licencia, reembolsos
// y privacidad. Por ahora solo existen con `npm run dev`: el build de producción no las genera y el pie no las
// enlaza. Se publican el día que se abra la venta, cambiando esta línea a `true`.
// luvin-architecture: subscription-architecture/0001 (business case aprobado el 22 nov 2026).
export const commerceVisible: boolean = import.meta.env.DEV

/** Páginas en el orden del pie: ruta (igual en inglés y en español) y la clave de su texto. */
export const commercePages = ['pricing', 'terms', 'license', 'refunds', 'privacy'] as const
export type CommercePage = (typeof commercePages)[number]

/** Para getStaticPaths: sin páginas en producción. */
export const commercePaths = () => (commerceVisible ? commercePages.map((page) => ({ params: { page } })) : [])
