# luvin-web

Sitio de Luvin: *Test the chain, not just the call.* Página única en inglés (`/`) y español (`/es/`), hecha con [Astro](https://astro.build) y sin JavaScript de frameworks (solo un script chico para el formulario). Las páginas son estáticas; la única ruta de servidor es `/api/waitlist`, que envía los correos. Se publica en Cloudflare Workers.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera el sitio estático en dist/
npm run preview   # sirve dist/ para revisarlo
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Textos en inglés y español | `src/i18n/strings.ts` (mismas claves en los dos idiomas) |
| Secciones de la página (portada, problema, cómo funciona, cadenas reales, cliente de APIs, comparación, funciones, para quién es, preguntas, lista de espera) | `src/components/Landing.astro` |
| Iconos de las tarjetas | `src/components/Icon.astro` |
| Cabecera, pie y etiquetas de SEO/redes | `src/layouts/Base.astro` |
| Colores y estilos | `src/styles/global.css` |
| Logo, teaser, capturas, iconos | `public/` |
| Formulario de la lista de espera (servidor) | `src/pages/api/waitlist.ts` |
| Precios y páginas legales (solo en desarrollo) | `src/pages/[page].astro`, `src/pages/es/[page].astro`, `src/components/Pricing.astro`, `src/components/LegalPage.astro`, `src/i18n/commerce.ts`, `src/lib/commerce.ts` |
| Correo de bienvenida y aviso al equipo | `src/lib/waitlist-email.ts` (usa los textos de `strings.ts`, clave `email`) |

Las imágenes vienen de los otros repos:

- El video de la portada (`public/media/promo.mp4`, con su póster `promo-poster.jpg`) es `marketing/promo2/luvin-promo.mp4` del repo de Luvin (2:02, en inglés, para los dos idiomas), comprimido para la web: `ffmpeg -i luvin-promo.mp4 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart promo.mp4`. Cloudflare no acepta archivos de más de 25 MB.
- La animación A→B→C (`chain-dark.svg`) es la de `docs/readme/` del repo de Luvin.
- Las capturas y los videos cortos de la app (`public/media/app/<idioma>/`) son los de la documentación (`luvin-docs/public/media/<idioma>/`), que se rehacen con `npm run media` allá. Las del correo (`public/media/email/`) son las mismas, en JPG de 1072 px de ancho.

## Precios y páginas legales (solo en desarrollo)

La página de precios y las páginas legales que Paddle revisa antes de aprobar el dominio (`/pricing/`, `/terms/`, `/license/`, `/refunds/`, `/privacy/` y sus versiones en `/es/`) **solo existen con `npm run dev`**: el build de producción no las genera y el pie no las enlaza. Se publican el día que se abra la venta, cambiando `commerceVisible` a `true` en `src/lib/commerce.ts`.

- **Seguro en el CI:** `npm run verify` corre `scripts/check-commerce-hidden.mjs` después del build y falla si el sitio compilado tiene alguna de esas páginas, sus enlaces o sus textos. Si falla, el sitio no se publica. Al abrir la venta se borra ese script junto con el cambio de `commerceVisible`.
- Textos: `src/i18n/commerce.ts` (inglés y español). Deben coincidir con el business case `subscription-architecture/0001` de luvin-architecture y con lo que haga la app ese día.
- Los textos legales son un borrador: revisarlos con un abogado antes de publicarlos.
- Antes de publicar: crear el correo `soporte@lu-vin.com` y quitar "próximamente" de lo que ya exista en la app.

Todo lo que el sitio dice de Luvin tiene que existir en la app. Los textos usan las mismas palabras que la app: workflow (nunca "journey"), inputs, casos.

## Antes de publicar

1. **Dominio:** cambiar `site` en `astro.config.mjs` por el dominio real (se usa en las URLs canónicas y en las imágenes para redes).
2. **Lista de espera:** los correos salen por SMTP desde una cuenta de Gmail (con [worker-mailer](https://github.com/zou-yu/worker-mailer), porque nodemailer no funciona en Cloudflare Workers).
   - `SMTP_USER`: la dirección de Gmail. `SMTP_PASS`: una [contraseña de aplicación](https://myaccount.google.com/apppasswords) de Google (requiere verificación en 2 pasos), no la contraseña normal.
   - `WAITLIST_NOTIFY_TO` (opcional): a dónde llega cada registro con todos los datos. Por defecto, la misma cuenta de Gmail.
   - En local: copiar `.dev.vars.example` como `.dev.vars`, completar y reiniciar `npm run dev`.
   - En producción: las mismas variables como *Secrets* en Cloudflare (Workers & Pages → luvin-web → Settings → Variables and Secrets).
   - Sin `SMTP_USER` y `SMTP_PASS`, el formulario avisa que la lista abre pronto.
   - Gmail admite unos 500 envíos por día. Para enviar desde el dominio propio, pasar a un proveedor SMTP como Resend o Brevo cambiando `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` y `WAITLIST_FROM` (ver `.dev.vars.example`), sin tocar código.

   Al enviar el formulario, la persona recibe en su idioma un correo con todo sobre Luvin: qué es, el problema, cómo funciona, funciones, para quién es y qué sigue.
3. **Hosting:** Cloudflare Workers (`@astrojs/cloudflare`, configuración en `wrangler.jsonc`). Para publicar en cada push: en Cloudflare, Workers & Pages → Create → Import a repository → este repo, con *Build command* `npm run build` y *Deploy command* `npx wrangler deploy`. Luego, en Settings → Domains & Routes, agregar el dominio. A mano: `npm run build && npx wrangler deploy`.
