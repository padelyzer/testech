#!/usr/bin/env python3
"""
Script para comprimir imágenes PNG manteniendo buena calidad
"""
import os
from PIL import Image
import glob

def compress_image(input_path, output_path, quality=85):
    """Comprime una imagen PNG"""
    try:
        # Abrir imagen
        img = Image.open(input_path)
        
        # Convertir a RGB si es RGBA (para mejor compresión)
        if img.mode in ('RGBA', 'LA'):
            # Crear fondo blanco
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'RGBA':
                background.paste(img, mask=img.split()[3])  # 3 es el canal alpha
            else:
                background.paste(img, mask=img.split()[1])
            img = background
        elif img.mode not in ('RGB', 'L'):
            img = img.convert('RGB')
        
        # Redimensionar si es muy grande
        max_width = 1920
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Guardar con compresión
        img.save(output_path, 'PNG', optimize=True, quality=quality)
        
        # Calcular reducción
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        reduction = (1 - new_size/original_size) * 100
        
        print(f"✓ {os.path.basename(input_path)}: {original_size//1024}KB → {new_size//1024}KB (-{reduction:.1f}%)")
        return True
    except Exception as e:
        print(f"✗ Error con {input_path}: {e}")
        return False

def main():
    # Crear directorio de salida
    output_dir = "testech-images-compressed"
    os.makedirs(output_dir, exist_ok=True)
    
    # Procesar todas las imágenes PNG
    images = glob.glob("testech-images/*.png")
    
    if not images:
        print("No se encontraron imágenes PNG en testech-images/")
        return
    
    print(f"Comprimiendo {len(images)} imágenes...\n")
    
    success_count = 0
    for img_path in images:
        filename = os.path.basename(img_path)
        output_path = os.path.join(output_dir, filename)
        if compress_image(img_path, output_path):
            success_count += 1
    
    print(f"\n✅ Compresión completada: {success_count}/{len(images)} imágenes procesadas")
    print(f"📁 Imágenes optimizadas guardadas en: {output_dir}/")

if __name__ == "__main__":
    main()