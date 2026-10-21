# 🌐 TecnoRed — Plataforma de Inclusión Digital e Inteligencia Artificial

> **"La tecnología, para todos."**  
> Plataforma educativa interactiva y asistente de Inteligencia Artificial diseñados para reducir la brecha digital en comunidades rurales y poblaciones con baja alfabetización tecnológica en Iberoamérica.

---

## 📖 Sobre el Proyecto

En Iberoamérica, más de **250 millones de personas** enfrentan barreras de acceso al mundo digital, lo que profundiza la exclusión educativa, económica y la vulnerabilidad frente a fraudes en línea.

**TecnoRed** nace como una solución científico-tecnológica gratuita, accesible y sin necesidad de registro ni contraseñas. Combina el **Diseño Universal para el Aprendizaje (DUA)** con una arquitectura web ultraligera para enseñar desde cero a utilizar dispositivos móviles, navegar con seguridad y resolver emergencias tecnológicas cotidianas[cite: 5, 7, 8].

---

## ✨ Características Principales

* **📱 Módulos Interactivos con Selector de Sistema Operativo (Android / iOS):** 7 módulos paso a paso (*Cómo usar el celular, Internet seguro, Correo electrónico, Evitar estafas, Usar aplicaciones, Videollamadas y Educación digital*) con simuladores prácticos libres de riesgo.
* **✦ TecnoRed IA (Asistente Conversacional Integrado):** Espacio dedicado de Inteligencia Artificial que responde dudas sobre tecnología en lenguaje sencillo y cotidiano[cite: 5, 8]. Funciona 100% de manera local sin exponer claves de API (API keys), garantizando privacidad, rapidez y seguridad en repositorios públicos[cite: 8].
* **🚨 Centro de Emergencias Digitales:** Guías de acción inmediata para 12 situaciones críticas (*celular robado, extravío de contraseñas, estafas o phishing, virus, fallos de conexión, cuentas bloqueadas, pérdida de fotos, llamadas fraudulentas, lentitud, batería, problemas con WhatsApp y compras falsas*)[cite: 5, 7].
* **🔊 Barra de Accesibilidad Universal (WCAG 2.1):**
  * **Lectura en Voz Alta (TTS):** Integración nativa con `Web Speech API` para escuchar cualquier sección, paso de módulo, guía de emergencia o respuesta de la IA[cite: 5, 7].
  * **Control Tipográfico:** 4 escalas de tamaño de fuente (`A-` / `A+`)[cite: 5, 6, 7].
  * **Temas Visuales:** Modo Oscuro profundo, Modo Claro y Modo de Alto Contraste[cite: 5, 6, 7].
* **💾 Guardado Automático de Progreso:** Persistencia local mediante `LocalStorage` para que el usuario continúe su aprendizaje en cualquier momento sin necesidad de crear una cuenta[cite: 5, 7].

---

## 🛠️ Stack Tecnológico y Diseño

El proyecto está construido sin dependencias ni *frameworks* externos pesados para garantizar tiempos de carga instantáneos incluso en conexiones móviles rurales (3G) y teléfonos de gama de entrada:

* **Frontend:** HTML5 Semántico + atributos de accesibilidad `WAI-ARIA`.
* **Estilos y Animaciones:** CSS3 moderno con arquitectura *Bento Grid*, superficies translúcidas (`backdrop-filter`), escenarios interactivos 3D y esfera de cristal líquido renderizada en tiempo real con `HTML5 Canvas`[cite: 6].
* **Lógica y Arquitectura:** JavaScript Vanilla (`ES6+`) estructurado como *Single Page Application (SPA)*[cite: 5, 7].
* **Web APIs:** `SpeechSynthesis API` (síntesis de voz en español) y `Web Storage API` (`localStorage`)[cite: 5, 7].

---

## 📂 Estructura del Proyecto

```text
📦 tecnored
 ┣ 📜 index.html    # Estructura principal SPA, vistas, modales y consola TecnoRed IA
 ┣ 📜 styles.css    # Sistema de diseño, temas (oscuro/claro/contraste) y animaciones 3D
 ┣ 📜 app.js        # Motor SPA, lógica de módulos, Canvas líquido, emergencias y accesibilidad (TTS)
 ┣ 📜 chatbot.js    # Motor de procesamiento en lenguaje natural y base de conocimientos de TecnoRed IA
 ┗ 📜 README.md     # Documentación del proyecto
 
