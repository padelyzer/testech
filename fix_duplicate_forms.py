#!/usr/bin/env python3
"""
Script para eliminar formularios duplicados en los artículos del blog
"""
import os
import re

# Archivos del blog a revisar
blog_files = [
    'blog/tableros-electricos-termografia.html',
    'blog/caso-automotriz-termografia.html',
    'blog/cadena-frio-termografia.html',
    'blog/termografia-mecanica-guia.html',
    'blog/caso-textil-puebla.html',
    'blog/hvac-termografia-puebla.html'
]

def fix_duplicate_forms(filepath):
    """Elimina formularios duplicados del archivo"""
    
    # Leer archivo
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Patrón para encontrar el formulario de contacto
    form_pattern = r'(\s*<!-- Contact Form Section -->.*?</section>)'
    
    # Encontrar todos los formularios
    forms = re.findall(form_pattern, content, re.DOTALL)
    
    if len(forms) > 1:
        print(f"⚠️  {filepath} - Encontrados {len(forms)} formularios")
        
        # Eliminar todos los formularios
        content_no_forms = re.sub(form_pattern, '', content, flags=re.DOTALL)
        
        # Agregar un solo formulario antes del footer
        footer_pattern = r'(\s*<footer)'
        if re.search(footer_pattern, content_no_forms):
            # Insertar el formulario limpio antes del footer
            clean_form = forms[0].strip()
            content_fixed = re.sub(footer_pattern, '\n\n    ' + clean_form + r'\n\n\1', content_no_forms)
            
            # Guardar archivo corregido
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content_fixed)
            
            print(f"✅ {filepath} - Corregido (1 formulario)")
        else:
            print(f"❌ {filepath} - No se encontró el footer")
    elif len(forms) == 1:
        print(f"✓  {filepath} - OK (1 formulario)")
    else:
        print(f"❌ {filepath} - Sin formulario")

def main():
    print("Revisando y corrigiendo formularios duplicados en el blog...\n")
    
    for filepath in blog_files:
        if os.path.exists(filepath):
            fix_duplicate_forms(filepath)
        else:
            print(f"❌ {filepath} - No existe")
    
    print("\n✅ Proceso completado")

if __name__ == "__main__":
    main()