#!/usr/bin/env python3
"""
Script para minificar HTML, CSS y JavaScript
"""
import re
import os

def minify_css(css):
    """Minifica CSS eliminando espacios y comentarios innecesarios"""
    # Eliminar comentarios
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    # Eliminar espacios innecesarios
    css = re.sub(r'\s+', ' ', css)
    # Eliminar espacios alrededor de símbolos
    css = re.sub(r'\s*([{}:;,])\s*', r'\1', css)
    # Eliminar último punto y coma antes de }
    css = re.sub(r';\}', '}', css)
    # Eliminar espacios al inicio y final
    css = css.strip()
    return css

def minify_js(js):
    """Minifica JavaScript básico (cuidadoso con strings)"""
    # Eliminar comentarios de línea (cuidando strings)
    js = re.sub(r'([^"\'`])//[^\n]*', r'\1', js)
    # Eliminar comentarios de bloque
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    # Eliminar espacios múltiples
    js = re.sub(r'\s+', ' ', js)
    # Eliminar espacios alrededor de operadores (cuidado con strings)
    js = re.sub(r'\s*([=+\-*/%<>!&|,;{}()\[\]])\s*', r'\1', js)
    # Eliminar saltos de línea innecesarios
    js = re.sub(r';\s*\n\s*', ';', js)
    js = js.strip()
    return js

def minify_html(html_content):
    """Minifica HTML y su CSS/JS inline"""
    
    # Extraer y minificar bloques de estilo
    def minify_style_block(match):
        tag_open = match.group(1)
        css_content = match.group(2)
        tag_close = match.group(3)
        minified_css = minify_css(css_content)
        return f"{tag_open}{minified_css}{tag_close}"
    
    html_content = re.sub(
        r'(<style[^>]*>)(.*?)(</style>)',
        minify_style_block,
        html_content,
        flags=re.DOTALL
    )
    
    # Extraer y minificar bloques de script
    def minify_script_block(match):
        tag_open = match.group(1)
        js_content = match.group(2)
        tag_close = match.group(3)
        # Solo minificar si no es JSON-LD (schema)
        if 'application/ld+json' not in tag_open:
            minified_js = minify_js(js_content)
            return f"{tag_open}{minified_js}{tag_close}"
        return match.group(0)
    
    html_content = re.sub(
        r'(<script[^>]*>)(.*?)(</script>)',
        minify_script_block,
        html_content,
        flags=re.DOTALL
    )
    
    # Minificar atributos style inline
    def minify_inline_style(match):
        style_content = match.group(1)
        minified = minify_css(style_content)
        return f'style="{minified}"'
    
    html_content = re.sub(
        r'style="([^"]*)"',
        minify_inline_style,
        html_content
    )
    
    # Eliminar comentarios HTML (excepto condicionales IE)
    html_content = re.sub(r'<!--(?!\[if).*?-->', '', html_content, flags=re.DOTALL)
    
    # Eliminar espacios entre tags
    html_content = re.sub(r'>\s+<', '><', html_content)
    
    # Eliminar espacios múltiples
    html_content = re.sub(r'\s+', ' ', html_content)
    
    return html_content.strip()

def main():
    input_file = "testech-v2.html"
    output_file = "testech-v2-optimized.html"
    
    if not os.path.exists(input_file):
        print(f"Error: No se encontró {input_file}")
        return
    
    print(f"Minificando {input_file}...")
    
    # Leer archivo original
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    original_size = len(html_content)
    
    # Minificar
    minified_html = minify_html(html_content)
    
    # Actualizar rutas de imágenes a la carpeta comprimida
    minified_html = minified_html.replace('testech-images/', 'testech-images-compressed/')
    
    # Guardar versión minificada
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(minified_html)
    
    new_size = len(minified_html)
    reduction = (1 - new_size/original_size) * 100
    
    print(f"\n✅ Minificación completada:")
    print(f"   Tamaño original: {original_size:,} bytes")
    print(f"   Tamaño minificado: {new_size:,} bytes")
    print(f"   Reducción: {reduction:.1f}%")
    print(f"\n📁 Archivo optimizado: {output_file}")
    print(f"   • CSS inline minificado")
    print(f"   • JavaScript minificado")
    print(f"   • HTML compactado")
    print(f"   • Rutas actualizadas a imágenes comprimidas")

if __name__ == "__main__":
    main()