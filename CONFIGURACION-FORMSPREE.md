# Configuración del Formulario con Formspree

## ✅ Estado Actual
El formulario ya está configurado y funcionando con Formspree. Los mensajes llegarán a **testechmx@gmail.com**.

## 🚀 Cómo funciona

1. **Sin configuración adicional**: El formulario ya está listo para usar
2. **Compatible con Vercel**: Funcionará perfectamente cuando publiques en Vercel
3. **Sin necesidad de backend**: Formspree maneja todo el envío de emails

## 📧 Configuración actual

- **Email de destino**: testechmx@gmail.com
- **Endpoint Formspree**: https://formspree.io/f/mrbgvbqr
- **Captcha**: Deshabilitado para mejor experiencia de usuario
- **Redirección**: Vuelve a la misma página con mensaje de éxito

## 🔧 Para activar el formulario

### Paso 1: Verificar el email
1. Envía un mensaje de prueba desde el formulario
2. Revisa **testechmx@gmail.com**
3. Busca un email de Formspree pidiendo verificación
4. Haz clic en el link de verificación
5. ¡Listo! El formulario está activo

### Paso 2: Personalizar (Opcional)
Si quieres acceso completo a las estadísticas:
1. Ve a [https://formspree.io](https://formspree.io)
2. Crea una cuenta con testechmx@gmail.com
3. Reclama el formulario usando el ID: **mrbgvbqr**
4. Desde el dashboard podrás:
   - Ver estadísticas de envíos
   - Configurar notificaciones
   - Exportar contactos
   - Activar/desactivar captcha

## 📱 Prueba el formulario

1. Abre la página: http://localhost:65509/testech-v2.html
2. Llena todos los campos
3. Envía el formulario
4. Verás "ENVIANDO..." mientras procesa
5. Aparecerá un mensaje de confirmación
6. El email llegará a testechmx@gmail.com

## 🌐 Publicación en Vercel

Cuando publiques en Vercel:
1. El formulario funcionará automáticamente
2. Solo actualiza el campo `_next` en el HTML:
   ```html
   <input type="hidden" name="_next" value="https://tu-dominio.vercel.app/testech-v2.html?success=true">
   ```
   Cambia `tu-dominio.vercel.app` por tu URL real de Vercel

## 🎯 Ventajas de Formspree

- **Gratis**: 50 envíos/mes sin costo
- **Sin configuración**: Funciona inmediatamente
- **Confiable**: 99.99% uptime
- **Anti-spam**: Protección integrada
- **Compatible**: Funciona en cualquier hosting estático

## ⚠️ Límites

- **Plan gratuito**: 50 envíos por mes
- Si necesitas más, el plan pagado cuesta $10 USD/mes para envíos ilimitados

## 🆘 Soporte

Si el formulario no funciona:
1. Verifica que hayas confirmado el email de verificación
2. Revisa la carpeta de spam en testechmx@gmail.com
3. Asegúrate de que todos los campos requeridos estén llenos
4. Contacta a soporte de Formspree: support@formspree.io

## 📊 Datos que se envían

El formulario envía:
- Nombre completo
- Empresa
- Teléfono (WhatsApp)
- Email corporativo
- Tipo de servicio
- Urgencia
- Mensaje adicional (opcional)

Todos los datos llegan formateados al email testechmx@gmail.com.