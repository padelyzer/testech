#!/usr/bin/env python3
"""
Script para agregar formulario de contacto a todos los artículos del blog
"""
import os
import re

# Formulario HTML a insertar
CONTACT_FORM = '''    <!-- Contact Form Section -->
    <section class="cta-final" style="background: linear-gradient(135deg, #1a237e, #283593); padding: 60px 0;">
        <div class="container">
            <h2 style="color: white; text-align: center; margin-bottom: 20px;">No esperes a que falle. Agenda tu inspección hoy.</h2>
            <p class="lead mb-5" style="color: white; text-align: center;">Único servicio de termografía con base en Puebla • ROI promedio de 500% documentado</p>
            
            <div class="contact-form" style="max-width: 600px; margin: 0 auto;">
                <form action="https://formspree.io/f/mrbgvbqr" method="POST">
                    <input type="hidden" name="_subject" value="Nueva solicitud de inspección - TESTECH Blog">
                    <input type="hidden" name="_next" value="REDIRECT_URL">
                    <input type="hidden" name="_captcha" value="false">
                    
                    <input type="text" name="nombre" placeholder="Nombre completo *" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                    <input type="text" name="empresa" placeholder="Empresa *" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                    <input type="tel" name="telefono" placeholder="Teléfono (WhatsApp) *" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                    <input type="email" name="email" placeholder="Email corporativo *" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                    
                    <select name="servicio" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                        <option value="">Servicio de interés *</option>
                        <option value="basico">Inspección Básica - $8,000</option>
                        <option value="profesional">Mantenimiento Predictivo - $15,000</option>
                        <option value="premium">Socio Termográfico - $25,000/mes</option>
                        <option value="cotizacion">Cotización personalizada</option>
                    </select>
                    
                    <select name="urgencia" required style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;">
                        <option value="">Urgencia de la inspección *</option>
                        <option value="normal">Normal (próximos 30 días)</option>
                        <option value="urgente">Urgente (próxima semana)</option>
                        <option value="emergencia">🚨 EMERGENCIA (HOY)</option>
                    </select>
                    
                    <textarea name="mensaje" rows="3" placeholder="Describe los equipos críticos a inspeccionar" style="width: 100%; padding: 12px; margin-bottom: 15px; border: none; border-radius: 5px;"></textarea>
                    
                    <button type="submit" style="width: 100%; background: linear-gradient(135deg, #ff6f00, #ff8f00); color: white; font-size: 18px; font-weight: 700; padding: 15px; border: none; border-radius: 50px; cursor: pointer;">
                        OBTÉN TU INSPECCIÓN GRATUITA
                    </button>
                </form>
            </div>
        </div>
    </section>'''

# Archivos a actualizar (excluyendo el que ya actualizamos)
files_to_update = [
    'blog/caso-automotriz-termografia.html',
    'blog/cadena-frio-termografia.html',
    'blog/termografia-mecanica-guia.html',
    'blog/caso-textil-puebla.html',
    'blog/hvac-termografia-puebla.html'
]

def update_file(filepath):
    """Actualiza un archivo del blog con el formulario de contacto"""
    
    # Leer archivo
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Ya fue actualizado?
    if 'Contact Form Section' in content:
        print(f"✓ {filepath} - Ya actualizado")
        return
    
    # Obtener nombre del archivo para el redirect
    filename = os.path.basename(filepath)
    form_with_redirect = CONTACT_FORM.replace('REDIRECT_URL', f'https://testech.mx/blog/{filename}?success=true')
    
    # Buscar el footer y agregar el formulario antes
    footer_pattern = r'(\s*<!-- Footer -->|\s*<footer)'
    
    if re.search(footer_pattern, content):
        # Insertar el formulario antes del footer
        content = re.sub(footer_pattern, form_with_redirect + r'\n\n\1', content)
        
        # Guardar archivo actualizado
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ {filepath} - Actualizado con formulario")
    else:
        print(f"⚠️ {filepath} - No se encontró el footer")

def main():
    print("Actualizando archivos del blog con formulario de contacto...\n")
    
    for filepath in files_to_update:
        if os.path.exists(filepath):
            update_file(filepath)
        else:
            print(f"❌ {filepath} - No existe")
    
    print("\n✅ Proceso completado")

if __name__ == "__main__":
    main()