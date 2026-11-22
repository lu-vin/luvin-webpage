// Textos de precios y de las páginas legales, en inglés y en español (mismas claves en los dos idiomas).
// Deben coincidir con el business case de subscription-architecture/0001 en luvin-architecture y con lo
// que la app haga el día que se abra la venta. Los textos legales son un borrador: revisarlos con un abogado.
// En los párrafos se permite HTML simple (enlaces, <strong>): es texto nuestro, no de usuarios.
import type { Lang } from './strings'

export interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}
export interface LegalDoc {
  metaTitle: string
  metaDescription: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

const SELLER_EN = 'Bryam David Vega Moreno, an individual registered in Ecuador'
const SELLER_ES = 'Bryam David Vega Moreno, persona natural registrada en Ecuador'
const EMAIL = '<a href="mailto:soporte@lu-vin.com">soporte@lu-vin.com</a>'
const PADDLE_EN =
  'Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.'
const PADDLE_ES =
  'El proceso de compra lo realiza nuestro revendedor en línea Paddle.com. Paddle.com es el Merchant of Record (vendedor registrado) de todos nuestros pedidos. Paddle atiende todas las consultas de los clientes sobre pagos y gestiona las devoluciones.'

const en = {
  footer: { pricing: 'Pricing', terms: 'Terms', license: 'License', refunds: 'Refunds', privacy: 'Privacy', seller: `Luvin is a product of ${SELLER_EN}.` },
  pricing: {
    metaTitle: 'Pricing · Luvin',
    metaDescription: 'Luvin is free to start, with generous limits. Pro costs US$8 per user per month and removes every limit. Free for students and teachers.',
    kicker: 'Pricing',
    title: 'The standard is free. Pro is for serious work.',
    lead: 'Everything you need to test chains of API calls with open standards is free. Pro removes the limits and brings Luvin to your team and your CI.',
    free: {
      name: 'Free',
      price: 'US$0',
      per: 'forever',
      blurb: 'For learning Luvin and testing your first chains.',
      cta: 'Download Luvin',
      items: [
        'Requests: HTTP, GraphQL, gRPC and WebSocket',
        'Every authorization, environments and encrypted secrets',
        'Collections, history, mock servers, imports from Postman and Bruno',
        'OpenAPI and AsyncAPI contracts, lint and response checks',
        'Open and edit any Arazzo file',
        '<strong>7 workflows</strong> per workspace',
        '<strong>3 generated cases</strong> per workflow',
        'Workflow runs with data files up to <strong>10 rows</strong>',
        'Load tests up to <strong>50 virtual users</strong> and <strong>10 minutes</strong>',
      ],
    },
    pro: {
      name: 'Pro',
      price: 'US$8',
      per: 'per user / month',
      alt: 'Billed monthly, or US$96 a year.',
      blurb: 'For developers who use Luvin for their work.',
      cta: 'Start a 14-day trial',
      trial: '14 days free, no card needed.',
      items: [
        'Everything in Free, with no limits',
        '<strong>Unlimited</strong> workflows',
        '<strong>All</strong> the generated cases from your contracts',
        'Workflow runs with data files of any size',
        'Load tests up to <strong>500 virtual users</strong> and <strong>60 minutes</strong>',
        'Email support',
      ],
      soonTitle: 'Coming to Pro',
      soon: ['A git interface with diffs that understand Arazzo', 'A CLI to run your workflows in CI', 'Compare contract versions and see coverage', 'Compare runs over time'],
    },
    edu: {
      title: 'Free for students and teachers',
      body: 'Students and teachers get Pro free for one year, renewable while they study or teach. A teacher can also get a classroom license for up to 45 students.',
      cta: 'Ask for an education license',
    },
    teams: {
      title: 'For a team',
      body: 'Buy as many Pro licenses as you need in one purchase, with one invoice. Each person gets their own license key.',
    },
    compareTitle: 'Free and Pro, side by side',
    compareHead: ['', 'Free', 'Pro'],
    compareRows: [
      ['Requests, authorization, environments, secrets, mocks, history', 'Yes', 'Yes'],
      ['Contracts: OpenAPI and AsyncAPI, lint, response checks, impact of a change', 'Yes', 'Yes'],
      ['Open and edit any Arazzo file', 'Yes', 'Yes'],
      ['Create and run workflows', '7 per workspace', 'Unlimited'],
      ['Generated cases', '3 per workflow', 'All'],
      ['Workflow runs with data files', '10 rows', 'Unlimited'],
      ['Load tests', '50 users, 10 min', '500 users, 60 min'],
      ['Reports in HTML and JSON', 'Yes', 'Yes'],
      ['Git interface', 'See changes', 'Full (coming)'],
      ['CLI for CI', '—', 'Coming'],
    ],
    faqTitle: 'Questions',
    faq: [
      { q: 'Do I need an account?', a: 'No. Pro is a license key that we send you by email. You paste it in Luvin and that is all.' },
      { q: 'Does Pro work offline?', a: 'Yes. Luvin checks your license on your computer, without calling any server. It only goes online once, when you enter the key, to register the computer.' },
      { q: 'On how many computers can I use it?', a: 'A Pro license is for one person, on up to 3 of their computers.' },
      { q: 'What happens if I stop paying?', a: 'Luvin goes back to Free. Nothing is locked or deleted: every file still opens. What goes beyond the Free limits can be viewed, but not run. We warn you 14 days before your license ends, and you get 7 more days after.' },
      { q: 'Who charges me?', a: 'Paddle, our reseller. Paddle takes the payment, adds the taxes of your country when they apply and sends you the invoice.' },
      { q: 'Can I get a refund?', a: 'Yes, within 14 days of your first payment or of an annual renewal. See the <a href="/refunds/">refund policy</a>.' },
    ],
    note: 'Prices in US dollars, the same in every country. Depending on your country, taxes may be added at checkout.',
  },
  terms: {
    metaTitle: 'Terms and conditions · Luvin',
    metaDescription: 'The terms for buying and using Luvin.',
    title: 'Terms and conditions',
    updated: 'Last updated: 22 November 2026',
    intro: `These terms apply when you use the Luvin website or buy a Luvin license. Luvin is a product of ${SELLER_EN} ("we"). By buying or using Luvin you accept these terms and the <a href="/license/">software license</a>.`,
    sections: [
      { title: 'Who sells Luvin', paragraphs: [PADDLE_EN] },
      {
        title: 'Plans',
        bullets: [
          '<strong>Free</strong>: free of charge, with the limits shown on the <a href="/pricing/">pricing page</a>.',
          '<strong>Pro</strong>: a subscription for one person, billed monthly (US$8) or annually (US$96), per license.',
          '<strong>Education</strong>: Pro free for one year for students and teachers, for non-commercial use (see below).',
        ],
      },
      {
        title: 'Prices and taxes',
        paragraphs: [
          'Prices are in US dollars and are the same in every country. Depending on your country, Paddle may add sales tax or VAT at checkout. You see the final price before you pay.',
          'We may change prices for future periods. If the price of your subscription changes, we tell you by email at least 30 days before your next renewal.',
        ],
      },
      {
        title: 'Trial, renewal and cancellation',
        paragraphs: [
          'The 14-day Pro trial is free and needs no card. When it ends, Luvin goes back to Free unless you buy Pro.',
          'A subscription renews automatically at the end of each period until you cancel it. You can cancel at any time from the link in your Paddle receipt or by writing to us. After you cancel, Pro keeps working until the end of the period you paid for.',
        ],
      },
      {
        title: 'Your license key',
        paragraphs: [
          'Each Pro license is for one person, on up to 3 of their computers. Do not share your key: a key used by many people may be disabled. Buying several licenses for a team is allowed in one purchase; each person gets their own key.',
          'When a license ends, Luvin goes back to Free. Your files are never locked or deleted.',
        ],
      },
      {
        title: 'Education licenses',
        paragraphs: [
          'Students and teachers can ask for a free Pro license for one year, for learning and teaching only, not for paid work. We check eligibility with your institution email or a proof such as a student card. A classroom license covers up to 45 students during a course. We may cancel an education license that is used for commercial work.',
        ],
      },
      { title: 'Refunds', paragraphs: ['See the <a href="/refunds/">refund policy</a>.'] },
      {
        title: 'Acceptable use',
        bullets: [
          'Only send requests and load tests to systems you own or are allowed to test. Load tests can affect a service: you are responsible for where you send them.',
          'Do not use Luvin to break the law or to attack, overload or get into systems without permission.',
          'Do not try to get around the license checks or the plan limits.',
        ],
      },
      {
        title: 'Your data',
        paragraphs: [
          'Your workspaces, contracts, workflows, secrets and results stay on your computer. We do not receive them. See the <a href="/privacy/">privacy policy</a>.',
        ],
      },
      {
        title: 'No warranty and limits of liability',
        paragraphs: [
          'Luvin is provided "as is". We work to make it reliable, but we do not guarantee that it is free of errors or that it fits a particular purpose. You are responsible for checking the results of your tests.',
          'To the extent the law allows, we are not liable for indirect damages, lost profits or lost data, and our total liability is limited to what you paid for Luvin in the 12 months before the claim.',
        ],
      },
      { title: 'Changes to these terms', paragraphs: ['We may update these terms. If a change is important, we tell Pro customers by email before it applies. The date at the top shows the last change.'] },
      { title: 'Law', paragraphs: ['These terms are governed by the laws of Ecuador, without affecting the consumer rights you have in your own country.'] },
      { title: 'Contact', paragraphs: [`Write to ${EMAIL}.`] },
    ],
  } satisfies LegalDoc,
  license: {
    metaTitle: 'Software license · Luvin',
    metaDescription: 'The end-user license agreement of the Luvin desktop app.',
    title: 'Software license (EULA)',
    updated: 'Last updated: 22 November 2026',
    intro: `This license is an agreement between you and ${SELLER_EN} for the Luvin desktop app. Luvin is not open source: we keep all rights to it, and we give you the right to use it as described here.`,
    sections: [
      {
        title: 'What you may do',
        bullets: [
          '<strong>Free</strong>: install and use Luvin on your computers, for personal or commercial work, within the Free limits.',
          '<strong>Pro</strong>: use every Pro feature, one person per license, on up to 3 of that person\'s computers, while the license is valid.',
          '<strong>Education</strong>: use Pro for learning and teaching only, not for paid work, while the license is valid.',
        ],
      },
      {
        title: 'What you may not do',
        bullets: [
          'Copy, sell, rent or share Luvin or your license key, except to install it on your own computers.',
          'Get around the license checks or the plan limits, or help others do so.',
          'Reverse engineer, decompile or modify Luvin, except where the law allows it.',
          'Use Luvin against systems you are not allowed to test.',
        ],
      },
      { title: 'Your work', paragraphs: ['Everything you create with Luvin (contracts, Arazzo files, workflows, reports) is yours. Luvin saves it in your folders, in open formats.'] },
      { title: 'Third-party components', paragraphs: ['Luvin includes open source components. Each keeps its own license, which this agreement does not change. Their notices ship with the app.'] },
      { title: 'Updates', paragraphs: ['We may release updates that fix, change or add features. This license covers them too, unless an update comes with new terms.'] },
      { title: 'End of the license', paragraphs: ['A Pro or education license ends when its period ends or when you break this agreement. Luvin then goes back to Free. You can stop using Luvin at any time by uninstalling it.'] },
      { title: 'No warranty and limits of liability', paragraphs: ['The <a href="/terms/">terms and conditions</a> apply: Luvin is provided "as is", and our liability is limited as described there.'] },
      { title: 'Law', paragraphs: ['This agreement is governed by the laws of Ecuador, without affecting the consumer rights you have in your own country.'] },
      { title: 'Contact', paragraphs: [`Write to ${EMAIL}.`] },
    ],
  } satisfies LegalDoc,
  refunds: {
    metaTitle: 'Refund policy · Luvin',
    metaDescription: 'How to get a refund for Luvin Pro.',
    title: 'Refund policy',
    updated: 'Last updated: 22 November 2026',
    intro: 'Try Pro free for 14 days first, without a card. If you buy it and it is not for you, we give your money back.',
    sections: [
      {
        title: 'When you get a refund',
        bullets: [
          '<strong>First payment</strong> (monthly or annual): a full refund within 14 days, without questions.',
          '<strong>Annual renewal</strong>: a full refund within 14 days of the renewal charge.',
          '<strong>Monthly renewals</strong>: not refunded. Cancel at any time and Pro keeps working until the end of the month you paid for.',
          'Where the law of your country gives you more rights, those rights apply.',
        ],
      },
      { title: 'How to ask', paragraphs: [`Use the link in the receipt that Paddle sent you, or write to ${EMAIL} with the email you bought with. ${PADDLE_EN}`] },
      { title: 'After a refund', paragraphs: ['The license is cancelled and Luvin goes back to Free. Your files stay as they are.'] },
      { title: 'Education licenses', paragraphs: ['Education licenses are free, so there is nothing to refund.'] },
    ],
  } satisfies LegalDoc,
  privacy: {
    metaTitle: 'Privacy policy · Luvin',
    metaDescription: 'What data Luvin and its website collect, and what they do not.',
    title: 'Privacy policy',
    updated: 'Last updated: 22 November 2026',
    intro: `Luvin is local-first: the app has no account and collects no usage data. This policy explains the little data we do handle, for the website, purchases and support. The person responsible for your data is ${SELLER_EN}.`,
    sections: [
      {
        title: 'The Luvin app',
        bullets: [
          'Your workspaces, contracts, workflows, history and results stay on your computer. Secrets are encrypted with your operating system\'s keychain.',
          'Your requests go straight from your computer to the APIs you call. They do not pass through us.',
          'The app collects <strong>no usage data</strong> (no analytics, no telemetry, no crash reports sent to us).',
          'The app goes online on its own only to <strong>activate a license</strong> (it sends the license key and a random id of your computer) and to <strong>check for updates</strong> (it sends the version of Luvin and your operating system).',
        ],
      },
      {
        title: 'Purchases',
        paragraphs: [
          'Paddle, our reseller, handles the payment and keeps your payment details under its own <a href="https://www.paddle.com/legal/privacy" rel="noopener">privacy policy</a>. We never see your card. Paddle shares with us your name, email, country, what you bought and its status, so that we can send and manage your license.',
        ],
      },
      {
        title: 'The website',
        bullets: [
          'If you join the waitlist, we keep your name, email, role, and the company and use case if you give them, to write to you about Luvin. The emails are sent through Google (Gmail).',
          'The website runs on Cloudflare, which processes technical data such as your IP address to serve and protect it.',
          'The website uses no advertising or tracking cookies.',
        ],
      },
      {
        title: 'Education licenses and support',
        paragraphs: [
          'For an education license we ask for your name, institution email, institution, role and country. If you send a proof such as a student card, we delete it once it is checked. When you write to support, we keep the conversation to help you.',
        ],
      },
      {
        title: 'What we never do',
        bullets: ['Sell or rent your data.', 'Use your data for advertising.', 'Read your workspaces or your requests.'],
      },
      {
        title: 'How long we keep it',
        paragraphs: ['Purchase and license data, as long as the law requires for invoices and taxes. Waitlist data, until you ask us to delete it or Luvin stops writing to waitlist members. Support emails, as long as they are useful to help you.'],
      },
      {
        title: 'Your rights',
        paragraphs: [
          `You can ask us to see, correct, delete or send you your data, or to stop using it, under Ecuador's personal data protection law and the law of your country. Write to ${EMAIL}. We answer within 15 days.`,
        ],
      },
      { title: 'Changes', paragraphs: ['If we change this policy, we update the date at the top. If the change is important, we tell Pro customers by email.'] },
    ],
  } satisfies LegalDoc,
}

const es: typeof en = {
  footer: { pricing: 'Precios', terms: 'Términos', license: 'Licencia', refunds: 'Reembolsos', privacy: 'Privacidad', seller: `Luvin es un producto de ${SELLER_ES}.` },
  pricing: {
    metaTitle: 'Precios · Luvin',
    metaDescription: 'Luvin es gratis para empezar, con límites generosos. Pro cuesta US$8 por usuario al mes y quita todos los límites. Gratis para estudiantes y docentes.',
    kicker: 'Precios',
    title: 'El estándar es gratis. Pro es para trabajar en serio.',
    lead: 'Todo lo que necesitas para probar cadenas de APIs con estándares abiertos es gratis. Pro quita los límites y lleva Luvin a tu equipo y a tu CI.',
    free: {
      name: 'Free',
      price: 'US$0',
      per: 'para siempre',
      blurb: 'Para aprender Luvin y probar tus primeras cadenas.',
      cta: 'Descargar Luvin',
      items: [
        'Requests: HTTP, GraphQL, gRPC y WebSocket',
        'Toda la autorización, ambientes y secretos cifrados',
        'Colecciones, historial, mock servers e importar desde Postman y Bruno',
        'Contratos OpenAPI y AsyncAPI, lint y revisión de respuestas',
        'Abrir y editar cualquier archivo Arazzo',
        '<strong>7 workflows</strong> por workspace',
        '<strong>3 casos generados</strong> por workflow',
        'Ejecutar workflows con archivos de datos de hasta <strong>10 filas</strong>',
        'Pruebas de carga de hasta <strong>50 usuarios virtuales</strong> y <strong>10 minutos</strong>',
      ],
    },
    pro: {
      name: 'Pro',
      price: 'US$8',
      per: 'por usuario / mes',
      alt: 'Cobro mensual, o US$96 al año.',
      blurb: 'Para quienes usan Luvin en su trabajo.',
      cta: 'Probar 14 días',
      trial: '14 días gratis, sin tarjeta.',
      items: [
        'Todo lo de Free, sin límites',
        'Workflows <strong>sin límite</strong>',
        '<strong>Todos</strong> los casos generados desde tus contratos',
        'Ejecutar workflows con archivos de datos de cualquier tamaño',
        'Pruebas de carga de hasta <strong>500 usuarios virtuales</strong> y <strong>60 minutos</strong>',
        'Soporte por correo',
      ],
      soonTitle: 'Próximamente en Pro',
      soon: ['Interfaz de git con diffs que entienden Arazzo', 'Un CLI para ejecutar tus workflows en CI', 'Comparar versiones de un contrato y ver la cobertura', 'Comparar ejecuciones en el tiempo'],
    },
    edu: {
      title: 'Gratis para estudiantes y docentes',
      body: 'Estudiantes y docentes reciben Pro gratis por un año, renovable mientras estudien o enseñen. Un docente también puede pedir una licencia de aula para hasta 45 estudiantes.',
      cta: 'Pedir una licencia educativa',
    },
    teams: {
      title: 'Para un equipo',
      body: 'Compra todas las licencias Pro que necesites en una sola compra, con una sola factura. Cada persona recibe su propia license key.',
    },
    compareTitle: 'Free y Pro, lado a lado',
    compareHead: ['', 'Free', 'Pro'],
    compareRows: [
      ['Requests, autorización, ambientes, secretos, mocks e historial', 'Sí', 'Sí'],
      ['Contratos: OpenAPI y AsyncAPI, lint, revisión de respuestas e impacto de un cambio', 'Sí', 'Sí'],
      ['Abrir y editar cualquier archivo Arazzo', 'Sí', 'Sí'],
      ['Crear y ejecutar workflows', '7 por workspace', 'Sin límite'],
      ['Casos generados', '3 por workflow', 'Todos'],
      ['Ejecutar workflows con archivos de datos', '10 filas', 'Sin límite'],
      ['Pruebas de carga', '50 usuarios, 10 min', '500 usuarios, 60 min'],
      ['Reportes en HTML y JSON', 'Sí', 'Sí'],
      ['Interfaz de git', 'Ver los cambios', 'Completa (próximamente)'],
      ['CLI para CI', '—', 'Próximamente'],
    ],
    faqTitle: 'Preguntas',
    faq: [
      { q: '¿Necesito una cuenta?', a: 'No. Pro es una license key que te enviamos por correo. La pegas en Luvin y listo.' },
      { q: '¿Pro funciona sin conexión?', a: 'Sí. Luvin revisa tu licencia en tu computador, sin llamar a ningún servidor. Solo se conecta una vez, al ingresar la key, para registrar el computador.' },
      { q: '¿En cuántos computadores la puedo usar?', a: 'Una licencia Pro es para una persona, en hasta 3 de sus computadores.' },
      { q: '¿Qué pasa si dejo de pagar?', a: 'Luvin vuelve a Free. No se bloquea ni se borra nada: todos tus archivos se siguen abriendo. Lo que supere los límites de Free se puede ver, pero no ejecutar. Te avisamos 14 días antes de que venza la licencia, y tienes 7 días más después.' },
      { q: '¿Quién me cobra?', a: 'Paddle, nuestro revendedor. Paddle recibe el pago, agrega los impuestos de tu país cuando corresponde y te envía la factura.' },
      { q: '¿Puedo pedir un reembolso?', a: 'Sí, dentro de los 14 días desde tu primer pago o desde una renovación anual. Mira la <a href="/es/refunds/">política de reembolsos</a>.' },
    ],
    note: 'Precios en dólares, iguales en todos los países. Según tu país, pueden sumarse impuestos al pagar.',
  },
  terms: {
    metaTitle: 'Términos y condiciones · Luvin',
    metaDescription: 'Las condiciones para comprar y usar Luvin.',
    title: 'Términos y condiciones',
    updated: 'Última actualización: 22 de noviembre de 2026',
    intro: `Estos términos aplican cuando usas el sitio de Luvin o compras una licencia de Luvin. Luvin es un producto de ${SELLER_ES} ("nosotros"). Al comprar o usar Luvin aceptas estos términos y la <a href="/es/license/">licencia del software</a>.`,
    sections: [
      { title: 'Quién vende Luvin', paragraphs: [PADDLE_ES] },
      {
        title: 'Planes',
        bullets: [
          '<strong>Free</strong>: gratis, con los límites que muestra la <a href="/es/pricing/">página de precios</a>.',
          '<strong>Pro</strong>: una suscripción para una persona, con cobro mensual (US$8) o anual (US$96), por licencia.',
          '<strong>Educación</strong>: Pro gratis por un año para estudiantes y docentes, para uso no comercial (ver más abajo).',
        ],
      },
      {
        title: 'Precios e impuestos',
        paragraphs: [
          'Los precios están en dólares de EE. UU. y son iguales en todos los países. Según tu país, Paddle puede sumar el IVA o el impuesto que corresponda al pagar. Ves el precio final antes de pagar.',
          'Podemos cambiar los precios para períodos futuros. Si cambia el precio de tu suscripción, te avisamos por correo al menos 30 días antes de la siguiente renovación.',
        ],
      },
      {
        title: 'Prueba, renovación y cancelación',
        paragraphs: [
          'La prueba de Pro de 14 días es gratis y no pide tarjeta. Al terminar, Luvin vuelve a Free, salvo que compres Pro.',
          'La suscripción se renueva sola al final de cada período hasta que la canceles. Puedes cancelarla cuando quieras desde el enlace del recibo de Paddle o escribiéndonos. Después de cancelar, Pro sigue funcionando hasta el final del período que pagaste.',
        ],
      },
      {
        title: 'Tu license key',
        paragraphs: [
          'Cada licencia Pro es para una persona, en hasta 3 de sus computadores. No compartas tu key: una key que usan muchas personas puede desactivarse. Se pueden comprar varias licencias para un equipo en una sola compra; cada persona recibe su propia key.',
          'Cuando una licencia vence, Luvin vuelve a Free. Tus archivos nunca se bloquean ni se borran.',
        ],
      },
      {
        title: 'Licencias educativas',
        paragraphs: [
          'Estudiantes y docentes pueden pedir una licencia Pro gratis por un año, solo para aprender y enseñar, no para trabajos pagados. Revisamos que corresponda con el correo de tu institución o con un comprobante, como el carnet de estudiante. Una licencia de aula cubre hasta 45 estudiantes durante un curso. Podemos cancelar una licencia educativa que se use para trabajo comercial.',
        ],
      },
      { title: 'Reembolsos', paragraphs: ['Mira la <a href="/es/refunds/">política de reembolsos</a>.'] },
      {
        title: 'Uso aceptable',
        bullets: [
          'Envía requests y pruebas de carga solo a sistemas que sean tuyos o que tengas permiso de probar. Una prueba de carga puede afectar un servicio: eres responsable de a dónde la envías.',
          'No uses Luvin para incumplir la ley ni para atacar, saturar o entrar en sistemas sin permiso.',
          'No intentes saltarte la revisión de la licencia ni los límites del plan.',
        ],
      },
      {
        title: 'Tus datos',
        paragraphs: [
          'Tus workspaces, contratos, workflows, secretos y resultados se quedan en tu computador. Nosotros no los recibimos. Mira la <a href="/es/privacy/">política de privacidad</a>.',
        ],
      },
      {
        title: 'Sin garantía y límites de responsabilidad',
        paragraphs: [
          'Luvin se entrega "tal cual". Trabajamos para que sea confiable, pero no garantizamos que no tenga errores ni que sirva para un fin en particular. Revisar los resultados de tus pruebas es tu responsabilidad.',
          'En la medida que la ley lo permita, no respondemos por daños indirectos, lucro cesante ni pérdida de datos, y nuestra responsabilidad total se limita a lo que pagaste por Luvin en los 12 meses anteriores al reclamo.',
        ],
      },
      { title: 'Cambios en estos términos', paragraphs: ['Podemos actualizar estos términos. Si un cambio es importante, avisamos por correo a los clientes de Pro antes de que aplique. La fecha de arriba muestra el último cambio.'] },
      { title: 'Ley aplicable', paragraphs: ['Estos términos se rigen por las leyes de Ecuador, sin afectar los derechos de consumidor que tengas en tu país.'] },
      { title: 'Contacto', paragraphs: [`Escríbenos a ${EMAIL}.`] },
    ],
  },
  license: {
    metaTitle: 'Licencia del software · Luvin',
    metaDescription: 'El contrato de licencia de usuario final de la app de escritorio de Luvin.',
    title: 'Licencia del software (EULA)',
    updated: 'Última actualización: 22 de noviembre de 2026',
    intro: `Esta licencia es un acuerdo entre tú y ${SELLER_ES} sobre la app de escritorio de Luvin. Luvin no es open source: conservamos todos los derechos sobre ella y te damos el derecho a usarla como se describe aquí.`,
    sections: [
      {
        title: 'Lo que puedes hacer',
        bullets: [
          '<strong>Free</strong>: instalar y usar Luvin en tus computadores, para trabajo personal o comercial, dentro de los límites de Free.',
          '<strong>Pro</strong>: usar todas las funciones de Pro, una persona por licencia, en hasta 3 de sus computadores, mientras la licencia esté vigente.',
          '<strong>Educación</strong>: usar Pro solo para aprender y enseñar, no para trabajos pagados, mientras la licencia esté vigente.',
        ],
      },
      {
        title: 'Lo que no puedes hacer',
        bullets: [
          'Copiar, vender, arrendar o compartir Luvin o tu license key, salvo para instalarla en tus propios computadores.',
          'Saltarte la revisión de la licencia o los límites del plan, ni ayudar a otros a hacerlo.',
          'Hacer ingeniería inversa, descompilar o modificar Luvin, salvo donde la ley lo permita.',
          'Usar Luvin contra sistemas que no tengas permiso de probar.',
        ],
      },
      { title: 'Tu trabajo', paragraphs: ['Todo lo que creas con Luvin (contratos, archivos Arazzo, workflows, reportes) es tuyo. Luvin lo guarda en tus carpetas, en formatos abiertos.'] },
      { title: 'Componentes de terceros', paragraphs: ['Luvin incluye componentes open source. Cada uno mantiene su propia licencia, que este acuerdo no cambia. Sus avisos se incluyen con la app.'] },
      { title: 'Actualizaciones', paragraphs: ['Podemos publicar actualizaciones que corrijan, cambien o agreguen funciones. Esta licencia también las cubre, salvo que una actualización traiga términos nuevos.'] },
      { title: 'Fin de la licencia', paragraphs: ['Una licencia Pro o educativa termina cuando vence su período o si incumples este acuerdo. Luvin vuelve entonces a Free. Puedes dejar de usar Luvin cuando quieras desinstalándolo.'] },
      { title: 'Sin garantía y límites de responsabilidad', paragraphs: ['Aplican los <a href="/es/terms/">términos y condiciones</a>: Luvin se entrega "tal cual" y nuestra responsabilidad se limita como se describe ahí.'] },
      { title: 'Ley aplicable', paragraphs: ['Este acuerdo se rige por las leyes de Ecuador, sin afectar los derechos de consumidor que tengas en tu país.'] },
      { title: 'Contacto', paragraphs: [`Escríbenos a ${EMAIL}.`] },
    ],
  },
  refunds: {
    metaTitle: 'Política de reembolsos · Luvin',
    metaDescription: 'Cómo pedir un reembolso de Luvin Pro.',
    title: 'Política de reembolsos',
    updated: 'Última actualización: 22 de noviembre de 2026',
    intro: 'Prueba Pro gratis por 14 días primero, sin tarjeta. Si lo compras y no es para ti, te devolvemos el dinero.',
    sections: [
      {
        title: 'Cuándo hay reembolso',
        bullets: [
          '<strong>Primer pago</strong> (mensual o anual): reembolso completo dentro de los 14 días, sin preguntas.',
          '<strong>Renovación anual</strong>: reembolso completo dentro de los 14 días desde el cobro de la renovación.',
          '<strong>Renovaciones mensuales</strong>: no se reembolsan. Cancela cuando quieras y Pro sigue funcionando hasta el final del mes que pagaste.',
          'Si la ley de tu país te da más derechos, se aplican esos derechos.',
        ],
      },
      { title: 'Cómo pedirlo', paragraphs: [`Usa el enlace del recibo que te envió Paddle, o escríbenos a ${EMAIL} desde el correo con el que compraste. ${PADDLE_ES}`] },
      { title: 'Después del reembolso', paragraphs: ['La licencia se cancela y Luvin vuelve a Free. Tus archivos quedan como están.'] },
      { title: 'Licencias educativas', paragraphs: ['Las licencias educativas son gratis, así que no hay nada que reembolsar.'] },
    ],
  },
  privacy: {
    metaTitle: 'Política de privacidad · Luvin',
    metaDescription: 'Qué datos recogen Luvin y su sitio, y cuáles no.',
    title: 'Política de privacidad',
    updated: 'Última actualización: 22 de noviembre de 2026',
    intro: `Luvin funciona en tu computador: la app no tiene cuentas y no recoge datos de uso. Esta política explica los pocos datos que sí manejamos, por el sitio, las compras y el soporte. El responsable de tus datos es ${SELLER_ES}.`,
    sections: [
      {
        title: 'La app de Luvin',
        bullets: [
          'Tus workspaces, contratos, workflows, historial y resultados se quedan en tu computador. Los secretos se cifran con el llavero de tu sistema operativo.',
          'Tus requests van directo desde tu computador a las APIs que llamas. No pasan por nosotros.',
          'La app <strong>no recoge datos de uso</strong> (ni analítica, ni telemetría, ni reportes de fallos enviados a nosotros).',
          'La app se conecta por su cuenta solo para <strong>activar una licencia</strong> (envía la license key y un id aleatorio de tu computador) y para <strong>buscar actualizaciones</strong> (envía la versión de Luvin y tu sistema operativo).',
        ],
      },
      {
        title: 'Compras',
        paragraphs: [
          'Paddle, nuestro revendedor, procesa el pago y guarda tus datos de pago según su propia <a href="https://www.paddle.com/legal/privacy" rel="noopener">política de privacidad</a>. Nunca vemos tu tarjeta. Paddle nos comparte tu nombre, correo, país, lo que compraste y su estado, para enviarte y administrar tu licencia.',
        ],
      },
      {
        title: 'El sitio web',
        bullets: [
          'Si te unes a la lista de espera, guardamos tu nombre, correo y rol, y la empresa y el caso de uso si los das, para escribirte sobre Luvin. Los correos se envían a través de Google (Gmail).',
          'El sitio funciona en Cloudflare, que procesa datos técnicos como tu dirección IP para servirlo y protegerlo.',
          'El sitio no usa cookies de publicidad ni de seguimiento.',
        ],
      },
      {
        title: 'Licencias educativas y soporte',
        paragraphs: [
          'Para una licencia educativa pedimos tu nombre, correo de la institución, institución, rol y país. Si envías un comprobante, como el carnet de estudiante, lo borramos después de revisarlo. Cuando escribes a soporte, guardamos la conversación para ayudarte.',
        ],
      },
      {
        title: 'Lo que nunca hacemos',
        bullets: ['Vender ni arrendar tus datos.', 'Usar tus datos para publicidad.', 'Leer tus workspaces ni tus requests.'],
      },
      {
        title: 'Cuánto tiempo los guardamos',
        paragraphs: ['Los datos de compras y licencias, el tiempo que exija la ley para facturas e impuestos. Los de la lista de espera, hasta que pidas borrarlos o Luvin deje de escribir a la lista. Los correos de soporte, mientras sirvan para ayudarte.'],
      },
      {
        title: 'Tus derechos',
        paragraphs: [
          `Puedes pedirnos ver, corregir, borrar o recibir tus datos, o que dejemos de usarlos, según la Ley Orgánica de Protección de Datos Personales de Ecuador y la ley de tu país. Escríbenos a ${EMAIL}. Respondemos dentro de 15 días.`,
        ],
      },
      { title: 'Cambios', paragraphs: ['Si cambiamos esta política, actualizamos la fecha de arriba. Si el cambio es importante, avisamos por correo a los clientes de Pro.'] },
    ],
  },
}

export const commerce: Record<Lang, typeof en> = { en, es }
