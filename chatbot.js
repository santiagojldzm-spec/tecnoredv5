/**
 * TECNORED v5 — chatbot.js
 * Motor de Inteligencia Artificial para el apartado dedicado #page-ia.
 * Funciona 100% local sin API Key y permite leer las respuestas en voz alta.
 */
'use strict';

/* ══════════════════════════════════════
   BASE DE CONOCIMIENTO DE TECNORED IA
══════════════════════════════════════ */
const KB = [
  {
    claves: ['internet', 'red', 'conexion', 'conexión', 'web', 'navegar', 'navegacion', 'navegación', 'online', 'en linea'],
    r: `<strong>Internet</strong> es una red mundial que conecta computadoras y celulares para compartir información en tiempo real.<br/><br/>
Con Internet puedes:<br/>
• Buscar información sobre cualquier tema en segundos<br/>
• Comunicarte por videollamada con familiares en otros países<br/>
• Realizar trámites sin salir de tu comunidad<br/>
• Acceder a educación y salud en línea<br/><br/>
Para conectarte necesitas <strong>WiFi</strong> o <strong>datos móviles</strong> de tu compañía telefónica.`
  },
  {
    claves: ['wifi', 'wi-fi', 'señal', 'senal', 'router', 'inalambrico', 'inalámbrico', 'conectar wifi', 'red wifi'],
    r: `<strong>El WiFi</strong> transmite Internet sin cables dentro de tu casa o centro comunitario.<br/><br/>
<strong>Pasos para conectarte:</strong><br/>
1. Abre <em>Ajustes</em> en tu celular<br/>
2. Toca <em>WiFi</em> y verifica que esté activado<br/>
3. Toca el nombre de tu red<br/>
4. Escribe la contraseña (suele estar escrita detrás del router)<br/>
5. Toca <em>Conectar</em> y verás el ícono de abanico arriba en tu pantalla.`
  },
  {
    claves: ['celular', 'telefono', 'teléfono', 'movil', 'móvil', 'smartphone', 'android', 'iphone', 'ios', 'samsung', 'xiaomi', 'motorola'],
    r: `Tu <strong>celular inteligente</strong> es una computadora de bolsillo.<br/><br/>
• <strong>Pantalla táctil:</strong> responde al toque suave de tu dedo<br/>
• <strong>Botón lateral:</strong> prende, apaga o bloquea la pantalla<br/>
• <strong>Botones de volumen:</strong> suben o bajan el sonido de llamadas y videos<br/><br/>
💡 <strong>Consejo práctico:</strong> si notas que tu celular falla o se trava, apágalo por 30 segundos y vuélvelo a encender.`
  },
  {
    claves: ['correo', 'email', 'gmail', 'mail', 'electronico', 'electrónico', 'cuenta correo', 'crear correo'],
    r: `El <strong>correo electrónico</strong> es tu buzón digital para recibir documentos, facturas y registrarte en aplicaciones.<br/><br/>
<strong>Cómo crear tu cuenta en Gmail gratis:</strong><br/>
1. Entra a <strong>gmail.com</strong> desde tu navegador<br/>
2. Toca en <em>Crear cuenta</em><br/>
3. Escribe tu nombre y elige tu dirección (ejemplo: <em>rosa.mamani@gmail.com</em>)<br/>
4. Crea una contraseña segura y anótala en un cuaderno en casa<br/>
5. Ingresa tu número de celular para proteger tu cuenta.`
  },
  {
    claves: ['whatsapp', 'wsp', 'mensajes', 'chat', 'chatear', 'mensaje gratis', 'llamada gratis'],
    r: `<strong>WhatsApp</strong> es la aplicación gratuita más usada para enviar mensajes, audios, fotos y hacer videollamadas.<br/><br/>
• Para mandar un <strong>audio de voz</strong>: mantén presionado el ícono de micrófono abajo a la derecha, habla y suéltalo para enviar.<br/>
• Para <strong>videollamada</strong>: abre el chat de tu familiar y toca el dibujo de la camarita arriba a la derecha.`
  },
  {
    claves: ['videollamada', 'video llamada', 'llamada video', 'ver por celular', 'zoom', 'meet', 'facetime'],
    r: `Una <strong>videollamada</strong> te permite ver y conversar cara a cara con tu familia sin importar la distancia.<br/><br/>
1. Abre WhatsApp y toca el nombre de la persona<br/>
2. Toca el ícono de cámara de video en la esquina superior derecha<br/>
3. Espera unos segundos a que conteste<br/><br/>
💡 Conéctate a una red WiFi y ubícate frente a una ventana o fuente de luz para que te vean con claridad.`
  },
  {
    claves: ['contraseña', 'contrasena', 'password', 'clave', 'pin', 'segura', 'seguridad contraseña'],
    r: `Una <strong>contraseña segura</strong> es el candado de tus cuentas digitales.<br/><br/>
Debe incluir al menos 8 caracteres combinando:<br/>
• Letras mayúsculas y minúsculas<br/>
• Números<br/>
• Un símbolo como <strong>!</strong> o <strong>#</strong><br/><br/>
<strong>Ejemplo seguro:</strong> <em>Cochabamba2026!</em><br/>
⚠️ Nunca uses <em>123456</em> ni compartas tu clave por teléfono o mensaje.`
  },
  {
    claves: ['estafa', 'fraude', 'engaño', 'engano', 'robo datos', 'phishing', 'premio falso', 'estafar', 'timo', 'evitar estafas'],
    r: `🛡️ <strong>Cómo detectar una estafa digital de inmediato:</strong><br/><br/>
• <strong>"¡Ganaste un premio o bono!"</strong> → Si no te inscribiste a ningún sorteo, es falso.<br/>
• <strong>"Tu cuenta bancaria será bloqueada, entra a este link"</strong> → Los bancos nunca envían enlaces por SMS o WhatsApp para pedirte claves.<br/>
• <strong>Llamadas pidiendo códigos de 6 dígitos</strong> → Cuelga de inmediato, quieren robar tu WhatsApp.<br/><br/>
Ante cualquier duda, consulta primero en la pestaña <strong>Emergencias</strong> de TecnoRed.`
  },
  {
    claves: ['google', 'buscador', 'buscar', 'busqueda', 'búsqueda', 'chrome', 'firefox', 'navegador'],
    r: `<strong>Google</strong> te permite consultar cualquier información en segundos.<br/><br/>
1. Abre la aplicación <strong>Chrome</strong> o <strong>Google</strong> en tu teléfono<br/>
2. Toca la barra de búsqueda y escribe con palabras claras lo que necesitas (por ejemplo: <em>"clima en Cochabamba hoy"</em>)<br/>
3. Toca Buscar y revisa los primeros resultados.`
  },
  {
    claves: ['office', 'word', 'excel', 'powerpoint', 'microsoft', 'documento word', 'planilla', 'presentacion', 'presentación'],
    r: `Los programas de oficina sirven para crear documentos y llevar cuentas:<br/><br/>
• <strong>Word / Google Docs:</strong> para redactar cartas, informes y textos<br/>
• <strong>Excel / Hojas de cálculo:</strong> para registrar ventas, gastos y presupuestos<br/>
• <strong>PowerPoint:</strong> para crear presentaciones visuales.`
  },
  {
    claves: ['app', 'aplicacion', 'aplicación', 'aplicaciones', 'descargar app', 'instalar app', 'play store', 'app store', 'tienda apps'],
    r: `Para <strong>descargar aplicaciones de forma segura</strong>:<br/><br/>
• Si tienes <strong>Android</strong>: abre <em>Play Store</em> (ícono de triángulo de colores), escribe el nombre de la app y toca <em>Instalar</em>.<br/>
• Si tienes <strong>iPhone</strong>: abre <em>App Store</em> (ícono azul con una A), busca la app y toca <em>Obtener</em>.<br/><br/>
Nunca instales aplicaciones enviadas por enlaces de desconocidos.`
  },
  {
    claves: ['qr', 'codigo qr', 'código qr', 'escanear qr', 'lector qr', 'camara qr'],
    r: `Un <strong>código QR</strong> es un recuadro con puntos negros que guarda un enlace o sirve para pagos digitales (como QR Simple en bancos bolivianos).<br/><br/>
Para leerlo: abre la cámara de tu celular, apúntala hacia el cuadro sin tomar foto y toca el aviso que aparece en pantalla.`
  },
  {
    claves: ['bateria', 'batería', 'carga', 'cargar celular', 'dura poco', 'se acaba', 'se descarga'],
    r: `🔋 <strong>Cómo hacer que tu batería dure el doble:</strong><br/><br/>
1. Baja el brillo de pantalla a la mitad<br/>
2. Activa el <em>Modo Ahorro de Energía</em> en Ajustes → Batería<br/>
3. Desactiva Bluetooth y GPS cuando no los uses<br/>
4. Cierra las aplicaciones que dejaste abiertas.`
  },
  {
    claves: ['me robaron', 'robo celular', 'perdi el celular', 'perdí el celular', 'celular robado'],
    r: `🚨 <strong>Si te robaron el celular, sigue estos pasos urgentes:</strong><br/><br/>
1. Si tenías aplicaciones de banco, llama a tu banco ahora mismo para bloquear tu usuario.<br/>
2. Llama a tu operadora (Entel, Tigo o Viva) para bloquear tu chip SIM.<br/>
3. Desde otro teléfono o computadora entra a <strong>google.com/android/find</strong> para bloquear o borrar el equipo.<br/><br/>
Ve a la pestaña <strong>Emergencias</strong> arriba para ver la guía completa con lectura por voz.`
  },
  {
    claves: ['tecnored', 'esta pagina', 'esta web', 'este sitio', 'que es tecnored', 'qué es tecnored', 'santiago jacobs'],
    r: `<strong>TecnoRed</strong> es una plataforma de inclusión digital e inteligencia artificial creada por <strong>Santiago Jacobs</strong> (Colegio San Agustín, Bolivia) con la asesoría de Mauricio Salinas para <strong>INFOMATRIX / SOLACYT 2026</strong>.<br/><br/>
Su propósito es llevar educación tecnológica gratuita, accesible y en español a comunidades rurales y adultos mayores de toda Iberoamérica.`
  }
];

const SALUDOS = {
  claves: ['hola', 'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'buenas', 'hey', 'saludos', 'como estas', 'cómo estás'],
  r: `¡Hola! Soy <strong>TecnoRed IA</strong>. Estoy listo para ayudarte paso a paso.<br/><br/>¿Sobre qué tema te gustaría aprender hoy? Puedes preguntarme sobre <em>celulares, WiFi, WhatsApp, correos o cómo evitar estafas</em>.`
};

const GRACIAS = {
  claves: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'excelente', 'muy bien', 'me ayudaste', 'me sirvio', 'me sirvió'],
  r: `¡Con mucho gusto! Recuerda que puedes volver a consultarme cualquier duda las veces que quieras. Aprender tecnología paso a paso es el camino seguro.`
};

const DESPEDIDAS = {
  claves: ['adios', 'adiós', 'hasta luego', 'chao', 'chau', 'nos vemos'],
  r: `¡Hasta pronto! Aquí estaré disponible en la sección <strong>TecnoRed IA</strong> cada vez que necesites ayuda.`
};

const FALLBACKS = [
  `Puedo explicarte paso a paso temas de tecnología básica como:<br/><br/>• <strong>Internet y WiFi</strong><br/>• <strong>Uso de celulares Android y iPhone</strong><br/>• <strong>WhatsApp y videollamadas</strong><br/>• <strong>Correo electrónico y contraseñas</strong><br/>• <strong>Prevención de estafas y emergencias</strong><br/><br/>Intenta escribirme por ejemplo: <em>"¿Cómo me conecto al WiFi?"</em> o toca uno de los temas del panel izquierdo.`
];

let lastBotPlainText = 'Hola, soy TecnoRed IA. Estoy aquí para explicarte cualquier tema de tecnología paso a paso y en palabras sencillas.';

function normalizar(t) {
  return t.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()]/g, '')
    .trim();
}

function buscarRespuesta(pregunta) {
  const q = normalizar(pregunta);

  if (SALUDOS.claves.some(c => q.includes(c))) return SALUDOS.r;
  if (GRACIAS.claves.some(c => q.includes(c))) return GRACIAS.r;
  if (DESPEDIDAS.claves.some(c => q.includes(c))) return DESPEDIDAS.r;

  let bestScore = 0;
  let bestResponse = null;

  for (const entry of KB) {
    let score = 0;
    for (const clave of entry.claves) {
      if (q.includes(normalizar(clave))) {
        score += clave.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestResponse = entry.r;
    }
  }

  if (bestResponse && bestScore > 2) return bestResponse;
  return FALLBACKS[0];
}

/* ══════════════════════════════════════
   INTERFAZ DE TECNORED IA (#page-ia)
══════════════════════════════════════ */
const chatClear   = document.getElementById('chat-clear');
const chatTtsLast = document.getElementById('chat-tts-last');
const chatMsgs    = document.getElementById('chat-messages');
const chatInput   = document.getElementById('chat-input');
const chatSend    = document.getElementById('chat-send');
const chatSuggest = document.getElementById('chat-suggestions');

chatClear?.addEventListener('click', () => {
  chatMsgs.innerHTML = '';
  appendMsg('bot', 'Conversación reiniciada. ¿Qué tema tecnológico te gustaría consultar ahora?');
});

chatTtsLast?.addEventListener('click', () => {
  if (window.speakText && lastBotPlainText) {
    window.speakText(lastBotPlainText);
  }
});

chatSuggest?.addEventListener('click', e => {
  const btn = e.target.closest('.chat-suggestion');
  if (btn) {
    enviar(btn.dataset.q);
  }
});

function enviar(texto) {
  const msg = (texto || chatInput.value).trim();
  if (!msg) return;
  chatInput.value = '';

  appendMsg('user', msg);

  const typingId = 'typing-' + Date.now();
  appendTyping(typingId);

  const delay = 360 + Math.random() * 420;
  setTimeout(() => {
    removeTyping(typingId);
    const respuesta = buscarRespuesta(msg);
    appendMsg('bot', respuesta);
    scrollBottom();
  }, delay);

  scrollBottom();
}

chatSend?.addEventListener('click', () => enviar());
chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') enviar();
});

function getTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

function appendMsg(tipo, html) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + tipo;
  div.innerHTML = `<div class="chat-bubble">${html}</div><span class="chat-ts">${getTime()}</span>`;
  chatMsgs.appendChild(div);
  if (tipo === 'bot') {
    lastBotPlainText = div.querySelector('.chat-bubble')?.innerText || '';
  }
  scrollBottom();
}

function appendTyping(id) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = id;
  div.innerHTML = `<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>`;
  chatMsgs.appendChild(div);
  scrollBottom();
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function scrollBottom() {
  if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
}