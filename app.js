/**
 * TECNORED v5 — app.js
 * SPA Navigation · Scroll Reveal (monopo saigon motion) · 3D Interactive Tilt ·
 * Módulos iOS/Android con progreso · Emergencias · Accesibilidad · TTS
 */
'use strict';

/* ══════════════════════════════════════
   ESTADO GLOBAL
══════════════════════════════════════ */
const state = {
  currentPage: 'inicio',
  moduleProgress: JSON.parse(localStorage.getItem('tn_progress') || '{}'),
  currentModule: null,
  currentStep: 0,
  theme: localStorage.getItem('tn_theme') || 'dark',
  fontSize: localStorage.getItem('tn_fontsize') || 'medium',
  highContrast: localStorage.getItem('tn_contrast') === 'true'
};

/* ══════════════════════════════════════
   DATOS — MÓDULOS GENERALES
══════════════════════════════════════ */
const MODULES = [
  {
    id: 'celular',
    icon: '📱',
    title: 'Cómo usar el celular',
    desc: 'Aprende los botones y funciones básicas según tu tipo de teléfono (Android o iPhone).',
    color: '#E8834A',
    esCelular: true,
    steps: []
  },
  {
    id: 'internet',
    icon: '🌐',
    title: 'Internet seguro',
    desc: 'Navega por la web de forma segura y encuentra información confiable.',
    color: '#0A84FF',
    steps: [
      { icon: '🌐', title: '¿Qué es Internet?', text: 'Internet es una red que conecta computadoras y celulares de todo el mundo. Es como una biblioteca disponible las 24 horas desde tu teléfono.', tip: 'Para usarlo necesitas WiFi o datos móviles de tu compañía de celular.' },
      { icon: '🔍', title: 'Buscar en Google', text: 'Google es el buscador más usado del mundo. Abre el navegador, escribe lo que quieres saber y toca Buscar. Lee los primeros resultados.', tip: 'Sé específico al buscar. Escribe "receta de arroz con leche fácil" en lugar de solo "receta".', sim: { label: 'Realizar una búsqueda', feedback: '✓ Búsqueda realizada correctamente. Se encontraron resultados.' } },
      { icon: '🔒', title: 'Navegar con seguridad', text: 'Verifica que la dirección del sitio empiece con https:// (tiene un candado). No hagas clic en ventanas que aparecen solas ni descargues archivos de sitios desconocidos.', tip: 'Si ves "Ganaste un premio" en una página, es una trampa. Cierra esa ventana inmediatamente.' },
      { icon: '📡', title: 'Conectarse al WiFi', text: 'Ve a Ajustes, busca WiFi y actívalo. Elige el nombre de tu red, escribe la contraseña y toca Conectar.', tip: 'La contraseña del WiFi suele estar en el router, la cajita con luces de tu casa.', sim: { label: 'Conectar al WiFi', feedback: '✓ Conexión establecida. Ahora tienes Internet.' } }
    ]
  },
  {
    id: 'correo',
    icon: '✉️',
    title: 'Correo electrónico',
    desc: 'Crea tu primera dirección de email y aprende a enviar mensajes.',
    color: '#E74C6B',
    steps: [
      { icon: '✉️', title: '¿Qué es el correo electrónico?', text: 'El correo electrónico es como una carta que llega al instante a cualquier parte del mundo. Es necesario para registrarte en apps y recibir documentos importantes.', tip: 'El correo más usado es Gmail, de Google. Es completamente gratuito.' },
      { icon: '📝', title: 'Crear una cuenta en Gmail', text: 'Abre el navegador y escribe gmail.com. Toca Crear cuenta, escribe tu nombre, elige un nombre de usuario como juan.garcia@gmail.com, crea una contraseña y escribe tu número de celular.', tip: 'Elige un nombre de usuario serio como nombre.apellido. Lo usarás siempre.' },
      { icon: '🔐', title: 'Crear una contraseña segura', text: 'Una buena contraseña combina letras mayúsculas y minúsculas, números y símbolos. Por ejemplo: MiCasa2024! es segura. En cambio, 123456 es muy insegura.', tip: 'Nunca compartas tu contraseña con nadie. Guárdala escrita en un lugar seguro de tu casa.', sim: { label: 'Verificar mi contraseña', feedback: '✓ Contraseña segura. Cumple todos los requisitos.' } },
      { icon: '📨', title: 'Enviar un mensaje', text: 'En Gmail toca el botón Redactar. En el campo Para escribe el correo del destinatario, en Asunto escribe el tema y luego escribe tu mensaje. Toca el botón de enviar.', sim: { label: 'Enviar mensaje de prueba', feedback: '✓ Mensaje enviado correctamente.' } }
    ]
  },
  {
    id: 'estafas',
    icon: '🛡️',
    title: 'Evitar estafas',
    desc: 'Aprende a reconocer y protegerte de fraudes digitales.',
    color: '#FF9F0A',
    steps: [
      { icon: '⚠️', title: '¿Qué son las estafas digitales?', text: 'Las estafas digitales son engaños por Internet o celular diseñados para robarte dinero o datos personales. Son frecuentes pero puedes protegerte sabiendo cómo reconocerlas.' },
      { icon: '🎣', title: 'El anzuelo digital (phishing)', text: 'El phishing ocurre cuando alguien te manda un mensaje falso haciéndose pasar por tu banco o el gobierno. Dicen que hay un problema urgente y piden tus datos. Es una trampa.', tip: 'Tu banco NUNCA te pedirá tu contraseña o PIN por mensaje de texto o llamada telefónica.' },
      { icon: '🏆', title: 'Premios falsos', text: 'Si ves mensajes como "Ganaste un iPhone" o "Eres el visitante número un millón", son mentiras para que hagas clic y des tus datos personales. Nunca hagas clic.', tip: 'Si no participaste en ningún concurso, es imposible que hayas ganado algo. Cierra esa ventana.', sim: { label: 'Identificar mensaje falso', feedback: '✓ Correcto. Ese mensaje es una estafa. No hiciste clic.' } },
      { icon: '📱', title: 'Proteger tu celular', text: 'Activa un PIN o patrón de pantalla. Descarga apps solo desde la tienda oficial (Play Store o App Store). No te conectes a WiFi desconocida. Actualiza el sistema cuando te lo pida.', tip: 'Si pierdes el celular, puedes bloquearlo desde otro dispositivo usando tu cuenta de Google o Apple.', sim: { label: 'Activar protección', feedback: '✓ Protección activada. Tu información está segura.' } }
    ]
  },
  {
    id: 'apps',
    icon: '📲',
    title: 'Usar aplicaciones',
    desc: 'Descarga y usa las aplicaciones más útiles para tu vida diaria.',
    color: '#BF5AF2',
    steps: [
      { icon: '📲', title: '¿Qué son las aplicaciones?', text: 'Las aplicaciones o apps son programas en tu celular para hacer cosas específicas: chatear, ver videos, escuchar música, consultar el clima y mucho más. La mayoría son gratuitas.' },
      { icon: '🏪', title: 'La tienda de aplicaciones', text: 'Android usa la Play Store (icono de triángulo de colores). iPhone usa la App Store (icono de letra A azul). Busca el nombre de la app que quieres y toca Instalar u Obtener.', tip: 'Descarga apps solo desde la tienda oficial. Las de otras fuentes pueden dañar tu celular.', sim: { label: 'Abrir la tienda de apps', feedback: '✓ Tienda abierta. Miles de aplicaciones disponibles.' } },
      { icon: '💬', title: 'WhatsApp, la más útil', text: 'WhatsApp te permite enviar mensajes gratuitos, hacer llamadas y videollamadas sin costo, enviar fotos y crear grupos familiares. Solo necesitas número de celular para usarla.', tip: 'Con WiFi, las llamadas y videollamadas por WhatsApp son completamente gratuitas.' },
      { icon: '⭐', title: 'Aplicaciones recomendadas', text: 'YouTube para ver videos gratuitos, Google Maps para orientarte, Duolingo para aprender idiomas, Spotify para música. Todas gratuitas para descargar.', tip: 'Empieza con dos o tres apps. Cuando las domines bien, descarga más.', sim: { label: 'Ver apps recomendadas', feedback: '✓ Lista de apps ideal para comenzar.' } }
    ]
  },
  {
    id: 'videollamadas',
    icon: '📹',
    title: 'Videollamadas',
    desc: 'Habla cara a cara con familia y amigos aunque estén lejos.',
    color: '#30D158',
    steps: [
      { icon: '📹', title: '¿Qué es una videollamada?', text: 'Una videollamada te permite ver y hablar con alguien en tiempo real desde tu celular, como si estuvieran juntos aunque estén en ciudades o países distintos.' },
      { icon: '📱', title: 'Videollamada por WhatsApp', text: 'Abre WhatsApp, toca el nombre de la persona con quien quieres hablar, luego toca el icono de cámara de video en la esquina superior derecha. Espera que la persona conteste.', tip: 'Busca un lugar con buena iluminación en tu cara para que te vean bien.', sim: { label: 'Iniciar videollamada', feedback: '✓ Videollamada iniciada. Conectando con el contacto.' } },
      { icon: '💡', title: 'Consejos para mejor calidad', text: 'Conéctate a WiFi siempre que puedas. Mantén la cámara a la altura de tu cara. Habla con voz clara y normal. Si la imagen se congela, espera unos segundos o muévete a otro lugar.', tip: 'La calidad mejora mucho con WiFi en comparación con datos móviles.' },
      { icon: '👥', title: 'Grupos familiares', text: 'Puedes hacer videollamadas grupales con toda la familia a la vez. En WhatsApp crea un grupo con todos los familiares y toca el icono de videollamada para conectar a todos.', sim: { label: 'Crear videollamada grupal', feedback: '✓ Grupo familiar conectado. Toda la familia en pantalla.' } }
    ]
  },
  {
    id: 'educacion',
    icon: '🎓',
    title: 'Educación digital',
    desc: 'Comprende el mundo digital y aprovecha sus oportunidades.',
    color: '#5AC8FA',
    steps: [
      { icon: '🎓', title: '¿Por qué aprender tecnología?', text: 'Saber tecnología abre puertas: encontrar mejores empleos, comunicarte con instituciones, estudiar desde casa, pagar facturas sin hacer filas y acceder a servicios de salud en línea.', tip: 'Estás dando el primer paso aprendiendo con TecnoRed. Eso ya es un logro importante.' },
      { icon: '💻', title: '¿Qué es una computadora?', text: 'Una computadora es una máquina que procesa información. Puede ser una laptop, una de escritorio, o tu celular. Tu celular es una computadora pequeña y muy poderosa que ya tienes en las manos.' },
      { icon: '🌍', title: 'El mundo digital', text: 'El mundo digital incluye Internet, redes sociales, comercio en línea, servicios de gobierno, educación virtual y salud digital. Cada año más servicios migran a plataformas digitales.', sim: { label: 'Explorar servicios digitales', feedback: '✓ El mundo digital ofrece cientos de oportunidades.' } },
      { icon: '🚀', title: 'Tu próximo paso', text: 'Practica lo aprendido cada día. No tengas miedo de equivocarte, así se aprende. Pide ayuda cuando lo necesites. Y comparte lo que sabes con otras personas de tu comunidad.', tip: 'Enseñar a otros lo que aprendiste es la mejor forma de afianzar el conocimiento.', sim: { label: 'Completar módulo', feedback: '✓ Módulo de Educación Digital completado. Excelente trabajo.' } }
    ]
  }
];

const STEPS_ANDROID = [
  { icon: '🤖', title: 'Tu celular Android', text: 'Android es el sistema operativo de celulares como Samsung, Huawei, Motorola, Xiaomi y muchos más. Puedes reconocerlo porque tiene la Play Store, la tienda oficial de aplicaciones.', tip: 'La mayoría de celulares en Bolivia y Latinoamérica funcionan con Android.' },
  { icon: '🔘', title: 'Botones del Android', text: 'El botón lateral derecho enciende y apaga el celular. Los botones de volumen están en el lado izquierdo. En la pantalla verás botones de: volver (flecha), inicio (círculo) y apps recientes (cuadrado).', sim: { label: 'Identificar los botones', feedback: '✓ Correcto. Ahora conoces todos los botones de tu Android.' } },
  { icon: '🏠', title: 'Pantalla de inicio', text: 'Al encender el celular ves la pantalla de inicio con los iconos de tus apps. Desliza hacia arriba para ver todas las aplicaciones instaladas. Desliza a los lados para ver más páginas.', tip: 'Mantén presionado un icono para moverlo o para ver la opción de desinstalar la app.' },
  { icon: '📲', title: 'Descargar apps con Play Store', text: 'Abre la Play Store (icono de triángulo de colores), escribe el nombre de la app que quieres, toca el resultado correcto y luego toca Instalar. La descarga es automática y gratuita.', sim: { label: 'Instalar una aplicación', feedback: '✓ Aplicación instalada correctamente desde Play Store.' } }
];

const STEPS_IOS = [
  { icon: '🍎', title: 'Tu iPhone', text: 'El iPhone usa iOS, el sistema operativo de Apple. Puedes reconocerlo por el logo de la manzana en la parte trasera y porque tiene la App Store (icono de letra A azul) como tienda oficial.', tip: 'Los iPhones son conocidos por su seguridad, fluidez y larga vida útil.' },
  { icon: '🔘', title: 'Botones del iPhone', text: 'El botón lateral derecho enciende, apaga y activa Face ID o Touch ID. Los botones de volumen están a la izquierda. En modelos recientes no hay botón de inicio físico: desliza desde abajo de la pantalla hacia arriba para ir al inicio.', sim: { label: 'Explorar los botones', feedback: '✓ Correcto. Ya conoces los botones principales del iPhone.' } },
  { icon: '🏠', title: 'Pantalla de inicio del iPhone', text: 'Al desbloquear con Face ID o Touch ID ves tus apps. Desliza hacia los lados para ver más páginas de apps. Desliza desde el centro de la pantalla hacia abajo para buscar cualquier aplicación instalada.', tip: 'Mantén presionado un icono para moverlo o para ver la opción de eliminar la app.' },
  { icon: '📲', title: 'Descargar apps con App Store', text: 'Abre la App Store (icono de letra A azul), toca el icono de lupa, escribe el nombre de la app que quieres, toca Obtener y confirma con Face ID o Touch ID. La descarga comienza automáticamente.', sim: { label: 'Descargar desde App Store', feedback: '✓ Aplicación descargada correctamente desde App Store.' } }
];

/* ══════════════════════════════════════
   DATOS — EMERGENCIAS
══════════════════════════════════════ */
const EMERGENCIAS = {
  'celular-robado': {
    icon: '📵', title: 'Me robaron el celular',
    intro: 'Actúa en los primeros minutos. Cada segundo cuenta para proteger tu información personal.',
    steps: [
      'Llama a un familiar desde otro celular para avisarles lo ocurrido.',
      'Desde otro dispositivo, entra a <strong>google.com/android/find</strong> (Android) o <strong>appleid.apple.com</strong> (iPhone).',
      'Inicia sesión con tu cuenta y selecciona tu celular en el mapa.',
      'Toca <strong>Bloquear dispositivo</strong> y asígnale una contraseña nueva para que nadie pueda usarlo.',
      'Cambia las contraseñas de tu correo electrónico y redes sociales desde otro dispositivo.',
      'Llama a tu compañía telefónica (Tigo, Entel o Viva) para bloquear la tarjeta SIM.',
      'Presenta la denuncia en la delegación policial más cercana.'
    ],
    warning: 'Si tenías apps bancarias en el celular, llama a tu banco de inmediato para bloquear el acceso desde ese dispositivo.'
  },
  'contrasena': {
    icon: '🔐', title: 'Olvidé mi contraseña',
    intro: 'No te preocupes. Casi todas las plataformas tienen un sistema de recuperación sencillo.',
    steps: [
      'En la pantalla de inicio de sesión, busca el texto <strong>¿Olvidaste tu contraseña?</strong> y tócalo.',
      'Escribe el correo electrónico o número de celular con el que creaste la cuenta.',
      'Espera el código de verificación que llegará por mensaje de texto o correo (1 a 2 minutos).',
      'Escribe ese código exactamente como aparece, sin espacios adicionales.',
      'Crea una nueva contraseña que combine letras, números y un símbolo (Ej: MiCasa2026!).',
      'Guarda la nueva contraseña escrita en un lugar seguro de tu casa.'
    ],
    warning: 'Si no recibes el código, verifica que el correo o número escrito sea el correcto y revisa la carpeta de Spam.'
  },
  'estafado': {
    icon: '🚨', title: 'Creo que me estafaron',
    intro: 'Lo más importante es actuar rápido en los primeros minutos para limitar el daño.',
    steps: [
      'Deja de responder de inmediato. No envíes más dinero ni información personal.',
      'Toma capturas de pantalla de todos los mensajes y comprobantes como evidencia.',
      'Bloquea al número o perfil del estafador en WhatsApp, Facebook o donde haya ocurrido.',
      'Si diste datos bancarios, llama a tu banco ahora mismo para bloquear movimientos.',
      'Denuncia ante la Policía Boliviana al teléfono <strong>110</strong> o en la ASFI si involucra cuentas bancarias.',
      'Avisa a tus familiares cercanos para que estén alerta por si el estafador los contacta.'
    ],
    warning: 'No te avergüences. Los estafadores son profesionales del engaño. Lo importante es actuar rápido.'
  },
  'virus': {
    icon: '🦠', title: 'Mi celular tiene virus',
    intro: 'Mantén la calma. La mayoría de las amenazas en celulares se eliminan sin costo.',
    steps: [
      'No descargues nada más y no hagas clic en ventanas que aparezcan solas.',
      'Ve a <strong>Ajustes → Aplicaciones</strong> y busca apps que no reconoces o instalaste recientemente.',
      'Desinstala las aplicaciones sospechosas tocando su nombre y luego Desinstalar.',
      'Abre la Play Store o App Store y descarga <strong>Avast Mobile Security</strong> (gratuito).',
      'Ejecuta el análisis completo del celular y sigue las instrucciones.',
      'Reinicia el celular después de eliminar las amenazas detectadas.'
    ],
    warning: 'Si el problema persiste, lleva el celular a un técnico de confianza.'
  },
  'internet': {
    icon: '📡', title: 'No funciona Internet',
    intro: 'Sigue estos pasos en orden. La solución suele estar en los primeros dos pasos.',
    steps: [
      'Verifica que el WiFi esté activado en la barra superior o que tengas datos móviles activos.',
      'Activa el <strong>Modo Avión</strong> durante 15 segundos y vuelve a desactivarlo.',
      'Apaga el celular completamente, espera 30 segundos y vuélvelo a encender.',
      'Si usas WiFi, desconecta el router de la corriente por 30 segundos y vuelve a enchufarlo.',
      'Verifica con otra persona si el WiFi funciona en otro celular.',
      'Si usas datos móviles, consulta con tu compañía si tienes saldo o megas vigentes.'
    ],
    warning: 'Si ninguno de estos pasos resuelve el problema, comunícate con tu proveedor de Internet.'
  },
  'cuenta-bloqueada': {
    icon: '🔒', title: 'Me bloquearon la cuenta',
    intro: 'Las cuentas se bloquean por seguridad. Siempre es posible recuperarlas siguiendo el proceso oficial.',
    steps: [
      'En la pantalla de inicio de sesión, toca en <strong>¿Necesitas ayuda?</strong> o <strong>Recuperar cuenta</strong>.',
      'Selecciona la opción de recibir código por número de celular o correo alternativo.',
      'Ingresa el código de verificación recibido.',
      'Sigue las instrucciones en pantalla para confirmar tu identidad.',
      'Cambia tu contraseña por una nueva y segura.',
      'Activa la <strong>Verificación en dos pasos</strong> para proteger tu cuenta.'
    ],
    warning: 'Revisa la sección de dispositivos conectados y cierra sesión en aquellos que no reconozcas.'
  },
  'fotos-perdidas': {
    icon: '🖼️', title: 'Perdí mis fotos',
    intro: 'Las fotos eliminadas suelen guardarse automáticamente en la papelera o en la nube.',
    steps: [
      'Abre la app Galería o Fotos y entra a la carpeta <strong>Papelera</strong> o <strong>Eliminadas recientemente</strong> (duran 30 días).',
      'Si usas Google Fotos (Android) o iCloud (iPhone), revisa tus copias en la nube.',
      'Selecciona las fotos que deseas recuperar y toca en <strong>Restaurar</strong>.',
      'Para el futuro, activa la copia de seguridad automática en Google Fotos.'
    ],
    warning: 'Si el celular cayó al agua o sufrió un golpe grave, no intentes encenderlo; llévalo directamente a un técnico.'
  },
  'llamada-estafa': {
    icon: '📞', title: 'Llamada de estafadores',
    intro: 'Conocer cómo operan las llamadas fraudulentas es tu mejor defensa.',
    steps: [
      'Cuelga inmediatamente si te dicen que ganaste un premio o que un familiar está en problemas.',
      'Nunca dictes códigos de SMS, PIN ni contraseñas por teléfono.',
      'Si dicen llamar de tu banco, cuelga y llama tú al número oficial impreso en tu tarjeta.',
      'Bloquea el número desde el historial de llamadas.',
      'Reporta el intento de estafa al <strong>110</strong>.'
    ],
    warning: 'Ningún banco ni institución pública te pedirá jamás tu contraseña o código de WhatsApp por teléfono.'
  },
  'celular-lento': {
    icon: '🐌', title: 'Mi celular está muy lento',
    intro: 'Con estos ajustes gratuitos recuperarás la fluidez de tu teléfono.',
    steps: [
      'Cierra todas las aplicaciones abiertas desde el botón de aplicaciones recientes.',
      'Ve a <strong>Ajustes → Almacenamiento</strong> y borra videos antiguos o archivos que no necesites.',
      'Reinicia tu teléfono al menos una vez por semana para limpiar la memoria temporal.',
      'Borra la memoria caché de las aplicaciones más pesadas desde <strong>Ajustes → Aplicaciones</strong>.'
    ],
    warning: 'No instales supuestas aplicaciones milagrosas para "acelerar el teléfono", suelen llenarlo de publicidad.'
  },
  'bateria': {
    icon: '🔋', title: 'La batería dura muy poco',
    intro: 'Ajusta estas funciones para extender notablemente la duración de tu batería.',
    steps: [
      'Baja el brillo de la pantalla a la mitad desde la barra superior.',
      'Activa el <strong>Modo Ahorro de Batería</strong> en los ajustes de tu teléfono.',
      'Apaga el WiFi, Bluetooth y Ubicación (GPS) cuando no los estés utilizando.',
      'Configura el apagado automático de pantalla en 30 segundos.'
    ],
    warning: 'Evita usar el teléfono mientras está conectado al cargador para cuidar la vida útil de la batería.'
  },
  'whatsapp-bloqueado': {
    icon: '💬', title: 'Problemas con WhatsApp',
    intro: 'Soluciones rápidas para recuperar tus mensajes o tu cuenta de WhatsApp.',
    steps: [
      'Si no salen ni entran mensajes, verifica primero tu conexión a WiFi o datos móviles.',
      'Si cambiaste de teléfono, instala WhatsApp y pon tu mismo número para restaurar tus chats.',
      'Si aparece "Tu número está suspendido", toca en <strong>Solicitar revisión</strong> dentro de la misma aplicación.',
      'Nunca compartas el código de 6 dígitos que llega por SMS con nadie.'
    ],
    warning: 'Usa siempre la aplicación oficial de WhatsApp descargada de Play Store o App Store.'
  },
  'compra-falsa': {
    icon: '🛒', title: 'Hice una compra falsa en línea',
    intro: 'Actúa de inmediato con tu entidad financiera para intentar revertir el pago.',
    steps: [
      'Guarda capturas de pantalla de la publicación, perfil del vendedor y comprobante de pago.',
      'Llama inmediatamente a tu banco para reportar el fraude y solicitar bloqueo o contracargo.',
      'Denuncia el perfil o página fraudulenta dentro de la red social donde la encontraste.',
      'Acude a presentar la denuncia policial con todas las pruebas impresas o digitales.'
    ],
    warning: 'Desconfía siempre de precios excesivamente bajos que exigen transferencia inmediata por adelantado.'
  }
};

/* ══════════════════════════════════════
   SCROLL REVEAL (Fluid Motion DESIGN 3)
══════════════════════════════════════ */
let revealObserver = null;

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  }
  els.forEach(el => revealObserver.observe(el));
}

/* ══════════════════════════════════════
   INTERACCIÓN 3D SUAVE EN ESCENARIOS
══════════════════════════════════════ */
function init3DTilt() {
  const stages = [
    document.getElementById('hero-3d-tilt'),
    document.getElementById('impact-3d-tilt')
  ];
  stages.forEach(stage => {
    if (!stage) return;
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      stage.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    });
    stage.addEventListener('mouseleave', () => {
      stage.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════
   NAVEGACIÓN SPA
══════════════════════════════════════ */
const pageTitles = {
  inicio: 'Inicio',
  proyecto: 'Proyecto',
  plataforma: 'Aprende',
  emergencias: 'Emergencias',
  equipo: 'Equipo',
  impacto: 'Impacto',
  ia: 'TecnoRed IA'
};

function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  const link = document.querySelector('.nav-link[data-page="' + pageId + '"]');
  if (link) link.classList.add('active');

  state.currentPage = pageId;
  document.title = 'TecnoRed — ' + (pageTitles[pageId] || 'Inicio');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');
  if (menu) menu.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');

  /* Ocultar el botón flotante cuando ya estamos en el apartado de IA */
  const fab = document.getElementById('chat-fab');
  if (fab) {
    fab.classList.toggle('hidden-on-ia', pageId === 'ia');
  }

  if (pageId === 'plataforma') renderModules();
  if (pageId === 'ia') {
    setTimeout(() => document.getElementById('chat-input')?.focus(), 300);
  }

  /* Activar revelación suave de los elementos en la nueva página */
  setTimeout(initScrollReveal, 50);
}

document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-page]');
  if (btn) {
    e.preventDefault();
    navigate(btn.dataset.page);
  }
});

document.getElementById('nav-toggle')?.addEventListener('click', function() {
  const menu = document.getElementById('nav-menu');
  const open = menu.classList.toggle('open');
  this.setAttribute('aria-expanded', open.toString());
});

/* ══════════════════════════════════════
   MÓDULOS — PROGRESO INCLUYENDO CELULAR
══════════════════════════════════════ */
function getCelularProgress() {
  return Math.max(
    state.moduleProgress['celular-android'] || 0,
    state.moduleProgress['celular-ios'] || 0
  );
}

function calcProgress() {
  const total = MODULES.length;
  let completed = 0;
  MODULES.forEach(m => {
    if (m.esCelular) {
      if (getCelularProgress() >= 4) completed++;
    } else if ((state.moduleProgress[m.id] || 0) >= m.steps.length) {
      completed++;
    }
  });
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function updateGlobalProgress() {
  const pct = calcProgress();
  const fill = document.getElementById('pg-fill');
  const txt = document.getElementById('pg-pct');
  if (fill) fill.style.width = pct + '%';
  if (txt) txt.textContent = pct + '%';
}

function renderModules() {
  const grid = document.getElementById('modules-grid');
  if (!grid) return;

  grid.innerHTML = MODULES.map(mod => {
    const steps = mod.esCelular ? 4 : mod.steps.length;
    const progress = mod.esCelular ? getCelularProgress() : (state.moduleProgress[mod.id] || 0);
    const pct = Math.round((Math.min(progress, steps) / steps) * 100);
    const done = progress >= steps;

    return `
      <article class="module-card reveal-on-scroll is-visible"
        role="listitem"
        style="--mc-color:${mod.color}"
        tabindex="0"
        data-module="${mod.id}"
        aria-label="Módulo: ${mod.title}${done ? ', completado' : ', ' + pct + '% completado'}">
        <div class="mc-icon-wrap" aria-hidden="true" style="background:${mod.color}20;color:${mod.color}">
          <span style="font-size:1.5rem">${mod.icon}</span>
        </div>
        <div class="mc-title">${mod.title}</div>
        <p class="mc-desc">${mod.desc}</p>
        <div class="mc-progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="mc-progress-fill" style="width:${pct}%;background:${mod.color}"></div>
        </div>
        <div class="mc-meta">
          <span class="mc-badge">${done ? '✓ Completado' : (mod.esCelular && pct === 0 ? 'iOS o Android' : pct + '%')}</span>
          <span>${steps} pasos</span>
        </div>
      </article>`;
  }).join('');

  grid.onclick = function(e) {
    const card = e.target.closest('[data-module]');
    if (card) handleModuleClick(card.dataset.module);
  };
  grid.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[data-module]');
      if (card) { e.preventDefault(); handleModuleClick(card.dataset.module); }
    }
  };

  updateGlobalProgress();
}

function handleModuleClick(id) {
  if (id === 'celular') {
    openOSModal();
  } else {
    const mod = MODULES.find(m => m.id === id);
    if (mod) openModule(mod);
  }
}

/* ══════════════════════════════════════
   MODAL OS SELECTOR Y MÓDULO
══════════════════════════════════════ */
function openOSModal() {
  const modal = document.getElementById('os-modal');
  if (modal) { modal.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; }
}
function closeOSModal() {
  const modal = document.getElementById('os-modal');
  if (modal) { modal.setAttribute('hidden', ''); document.body.style.overflow = ''; }
}

document.getElementById('os-modal-close')?.addEventListener('click', closeOSModal);
document.getElementById('os-modal-overlay')?.addEventListener('click', closeOSModal);

document.getElementById('os-pick-android')?.addEventListener('click', function() {
  closeOSModal();
  openModule({ id: 'celular-android', icon: '🤖', title: 'Cómo usar Android', color: '#30D158', steps: STEPS_ANDROID });
});

document.getElementById('os-pick-ios')?.addEventListener('click', function() {
  closeOSModal();
  openModule({ id: 'celular-ios', icon: '🍎', title: 'Cómo usar el iPhone', color: '#5AC8FA', steps: STEPS_IOS });
});

document.getElementById('os-help-toggle-btn')?.addEventListener('click', function() {
  const info = document.getElementById('os-help-info');
  if (info) { info.hidden ? info.removeAttribute('hidden') : info.setAttribute('hidden', ''); }
});

function openModule(mod) {
  state.currentModule = mod;
  state.currentStep = Math.min(state.moduleProgress[mod.id] || 0, mod.steps.length - 1);

  const modal = document.getElementById('module-modal');
  document.getElementById('modal-icon').textContent = mod.icon;
  document.getElementById('modal-title').textContent = mod.title;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  renderStep();
}

function renderStep() {
  const { currentModule: mod, currentStep: idx } = state;
  if (!mod || !mod.steps[idx]) return;

  const step = mod.steps[idx];
  const total = mod.steps.length;
  const pct = Math.round(((idx + 1) / total) * 100);

  document.getElementById('mp-fill').style.width = pct + '%';
  document.getElementById('mp-text').textContent = (idx + 1) + ' / ' + total;

  const prevBtn = document.getElementById('btn-prev-step');
  const nextBtn = document.getElementById('btn-next-step');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.textContent = idx === total - 1 ? '✓ Finalizar' : 'Siguiente →';

  document.getElementById('modal-content').innerHTML = `
    <div class="step-content">
      <div class="step-icon-block" aria-hidden="true">${step.icon}</div>
      <h3 class="step-heading">${step.title}</h3>
      <p class="step-body">${step.text}</p>
      ${step.tip ? `<div class="step-tip"><strong>Consejo:</strong> ${step.tip}</div>` : ''}
      ${step.sim ? `
        <div class="step-sim">
          <p class="step-sim-label">Práctica interactiva</p>
          <button class="step-sim-btn" onclick="runSim(this,'${step.sim.feedback.replace(/'/g, "\\'")}')">
            ${step.sim.label}
          </button>
          <div class="sim-result" aria-live="polite"></div>
        </div>` : ''}
    </div>`;
}

window.runSim = function(btn, feedback) {
  const result = btn.parentElement.querySelector('.sim-result');
  if (result) result.textContent = feedback;
  btn.textContent = '✓ Completado';
  btn.style.background = 'var(--positive)';
  btn.style.color = '#000';
  btn.disabled = true;
};

function closeModule() {
  const modal = document.getElementById('module-modal');
  if (modal) { modal.setAttribute('hidden', ''); document.body.style.overflow = ''; }
  state.currentModule = null;
}

function saveProgress(id, step) {
  state.moduleProgress[id] = step;
  localStorage.setItem('tn_progress', JSON.stringify(state.moduleProgress));
}

document.getElementById('btn-next-step')?.addEventListener('click', function() {
  const mod = state.currentModule;
  if (!mod) return;
  if (state.currentStep < mod.steps.length - 1) {
    state.currentStep++;
    renderStep();
  } else {
    saveProgress(mod.id, mod.steps.length);
    closeModule();
    showToast('✓ ' + mod.title + ' completado');
    renderModules();
  }
});

document.getElementById('btn-prev-step')?.addEventListener('click', function() {
  if (state.currentStep > 0) { state.currentStep--; renderStep(); }
});

document.getElementById('modal-close')?.addEventListener('click', function() {
  if (state.currentModule) saveProgress(state.currentModule.id, state.currentStep);
  closeModule();
  renderModules();
});

document.getElementById('modal-overlay')?.addEventListener('click', function() {
  if (state.currentModule) saveProgress(state.currentModule.id, state.currentStep);
  closeModule();
  renderModules();
});

document.getElementById('btn-tts-modal')?.addEventListener('click', function() {
  const content = document.getElementById('modal-content');
  if (content) speak(content.innerText.slice(0, 600));
});

document.addEventListener('keydown', function(e) {
  if (e.key !== 'Escape') return;
  const mm = document.getElementById('module-modal');
  const om = document.getElementById('os-modal');
  if (mm && !mm.hidden) { if (state.currentModule) saveProgress(state.currentModule.id, state.currentStep); closeModule(); renderModules(); }
  if (om && !om.hidden) closeOSModal();
});

/* ══════════════════════════════════════
   EMERGENCIAS
══════════════════════════════════════ */
function initEmergencias() {
  const grid = document.getElementById('em-grid');
  const panel = document.getElementById('em-panel');
  const content = document.getElementById('em-panel-content');
  const backBtn = document.getElementById('em-back-btn');
  const ttsBtn = document.getElementById('btn-tts-em');
  if (!grid) return;

  function show(key) {
    const em = EMERGENCIAS[key];
    if (!em) return;

    content.innerHTML = `
      <div class="em-answer-body">
        <div class="em-answer-icon">${em.icon}</div>
        <h2 class="em-answer-title">${em.title}</h2>
        <p class="em-answer-intro">${em.intro}</p>
        <ul class="em-steps">
          ${em.steps.map((s, i) => `
            <li>
              <span class="em-step-n">${i + 1}</span>
              <span>${s}</span>
            </li>`).join('')}
        </ul>
        ${em.warning ? `<div class="em-warning"><strong>⚠️ Importante:</strong> ${em.warning}</div>` : ''}
      </div>`;

    grid.style.display = 'none';
    panel.removeAttribute('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-em]');
    if (card) show(card.dataset.em);
  });
  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[data-em]');
      if (card) { e.preventDefault(); show(card.dataset.em); }
    }
  });

  backBtn?.addEventListener('click', () => { panel.setAttribute('hidden', ''); grid.style.display = ''; stopTTS(); });
  ttsBtn?.addEventListener('click', () => { if (content) speak(content.innerText.slice(0, 900)); });
}

/* ══════════════════════════════════════
   ACCESIBILIDAD Y LECTURA POR VOZ (TTS)
══════════════════════════════════════ */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  state.theme = t;
  localStorage.setItem('tn_theme', t);
  const icon = document.getElementById('theme-icon');
  const btn = document.getElementById('btn-theme');
  if (icon) {
    icon.innerHTML = t === 'dark'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  if (btn) btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
}

function applyContrast(on) {
  state.highContrast = on;
  document.documentElement.setAttribute('data-contrast', on ? 'high' : 'normal');
  localStorage.setItem('tn_contrast', on.toString());
  const btn = document.getElementById('btn-contrast');
  if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

const fontSizes = ['small', 'medium', 'large', 'xlarge'];
function applyFontSize(s) {
  state.fontSize = s;
  document.documentElement.setAttribute('data-font-size', s);
  localStorage.setItem('tn_fontsize', s);
}

document.getElementById('btn-theme')?.addEventListener('click', () => applyTheme(state.theme === 'dark' ? 'light' : 'dark'));
document.getElementById('btn-contrast')?.addEventListener('click', () => applyContrast(!state.highContrast));
document.getElementById('btn-font-dec')?.addEventListener('click', () => {
  const i = fontSizes.indexOf(state.fontSize);
  if (i > 0) applyFontSize(fontSizes[i - 1]);
});
document.getElementById('btn-font-inc')?.addEventListener('click', () => {
  const i = fontSizes.indexOf(state.fontSize);
  if (i < fontSizes.length - 1) applyFontSize(fontSizes[i + 1]);
});

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Tu navegador no soporta lectura en voz alta. Prueba con Google Chrome.');
    return;
  }
  stopTTS();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES';
  u.rate = 0.88;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang && v.lang.startsWith('es'));
  if (v) u.voice = v;
  u.onend = () => document.getElementById('btn-tts')?.setAttribute('aria-pressed', 'false');
  window.speechSynthesis.speak(u);
}

function stopTTS() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  document.getElementById('btn-tts')?.setAttribute('aria-pressed', 'false');
}

window.speakText = speak;

document.getElementById('btn-tts')?.addEventListener('click', function() {
  const active = this.getAttribute('aria-pressed') === 'true';
  if (active) {
    stopTTS();
  } else {
    const page = document.getElementById('page-' + state.currentPage);
    if (page) speak(page.innerText.slice(0, 750));
    this.setAttribute('aria-pressed', 'true');
  }
});

/* ══════════════════════════════════════
   TOAST Y CONTADORES
══════════════════════════════════════ */
function showToast(text) {
  const t = document.getElementById('progress-toast');
  const s = document.getElementById('toast-text');
  if (!t || !s) return;
  s.textContent = text;
  t.removeAttribute('hidden');
  setTimeout(() => t.setAttribute('hidden', ''), 3200);
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
  });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  applyTheme(state.theme);
  applyFontSize(state.fontSize);
  applyContrast(state.highContrast);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  animateCounters();
  initEmergencias();
  initScrollReveal();
  init3DTilt();

  /* El botón flotante lleva directamente al apartado TecnoRed IA */
  document.getElementById('chat-fab')?.addEventListener('click', () => {
    navigate('ia');
  });
});