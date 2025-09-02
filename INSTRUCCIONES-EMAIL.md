# Configuración de EmailJS para TESTECH

## ⚠️ IMPORTANTE: Configuración Requerida

El formulario de contacto está integrado con EmailJS pero necesitas completar la configuración en su plataforma.

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con el correo **testechmx@gmail.com**
3. Confirma tu cuenta desde el email de verificación

### 2. Configurar el servicio de Gmail
1. En el dashboard de EmailJS, ve a "Email Services"
2. Click en "Add New Service"
3. Selecciona "Gmail"
4. Nombra el servicio como: **service_testech**
5. Conecta tu cuenta de Gmail (testechmx@gmail.com)
6. Guarda el Service ID (debe ser exactamente: **service_testech**)

### 3. Crear la plantilla de email
1. Ve a "Email Templates"
2. Click en "Create New Template"
3. Configura lo siguiente:

**Template Name:** template_testech

**To Email:** testechmx@gmail.com

**From Name:** {{nombre}}

**From Email:** {{email}}

**Subject:** Nueva solicitud de TESTECH - {{empresa}}

**Content:**
```
Has recibido una nueva solicitud de inspección termográfica:

DATOS DE CONTACTO:
==================
Nombre: {{nombre}}
Empresa: {{empresa}}
Teléfono/WhatsApp: {{telefono}}
Email: {{email}}

DETALLES DEL SERVICIO:
=====================
Tipo de servicio: {{servicio}}
Urgencia: {{urgencia}}

Mensaje adicional:
{{mensaje}}

---
Este mensaje fue enviado desde el formulario web de TESTECH
Responder dentro de las próximas 4 horas según nuestro compromiso.
```

4. Guarda la plantilla con el ID: **template_testech**

### 4. Obtener tu Public Key
1. Ve a "Account" > "API Keys"
2. Copia tu Public Key
3. Reemplaza la key en el archivo testech-v2.html:
   - Busca la línea: `emailjs.init("pLx6pFqYL5eQBxOrK");`
   - Reemplaza "pLx6pFqYL5eQBxOrK" con tu Public Key real

### 5. Configurar Gmail (si es necesario)
Si Gmail bloquea el acceso:
1. Ve a tu cuenta de Google
2. Activa "Acceso de aplicaciones menos seguras" o usa App Passwords
3. O mejor aún, autoriza EmailJS cuando te lo solicite

## Prueba el formulario
1. Abre la página en el navegador
2. Llena el formulario con datos de prueba
3. Envía y verifica que llegue a testechmx@gmail.com

## Límites gratuitos
- EmailJS permite 200 emails/mes gratis
- Si necesitas más, considera actualizar el plan

## Soporte
Si tienes problemas:
- Revisa la consola del navegador (F12) para ver errores
- Verifica que los IDs coincidan exactamente:
  - Service ID: service_testech
  - Template ID: template_testech
- Asegúrate de que la Public Key esté correcta

## Alternativa: Usar Formspree
Si prefieres no configurar EmailJS, puedes usar Formspree:
1. Ve a https://formspree.io/
2. Regístrate con testechmx@gmail.com
3. Crea un nuevo formulario
4. Copia el endpoint (ejemplo: https://formspree.io/f/xyzabc)
5. En testech-v2.html, cambia la línea del form a:
   `<form action="https://formspree.io/f/TU_ID_AQUI" method="POST">`
6. Elimina todo el código de EmailJS