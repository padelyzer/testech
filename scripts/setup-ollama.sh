#!/bin/bash

echo "🤖 Configurando Ollama para análisis de imágenes gratuito..."

# Detectar sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if ! command -v ollama &> /dev/null; then
        echo "📥 Instalando Ollama en macOS..."
        curl -fsSL https://ollama.ai/install.sh | sh
    else
        echo "✅ Ollama ya está instalado"
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if ! command -v ollama &> /dev/null; then
        echo "📥 Instalando Ollama en Linux..."
        curl -fsSL https://ollama.ai/install.sh | sh
    else
        echo "✅ Ollama ya está instalado"
    fi
else
    echo "⚠️  Sistema operativo no soportado automáticamente"
    echo "Por favor instala Ollama manualmente desde: https://ollama.ai"
    exit 1
fi

# Iniciar servicio de Ollama
echo "🚀 Iniciando servicio Ollama..."
ollama serve &

# Esperar a que el servicio inicie
sleep 5

# Descargar modelo de visión (LLaVA)
echo "📦 Descargando modelo LLaVA para análisis de imágenes..."
ollama pull llava:latest

# Descargar modelo de texto (opcional)
echo "📦 Descargando modelo de texto Llama..."
ollama pull llama3.2:latest

echo ""
echo "✅ ¡Configuración completada!"
echo ""
echo "🎯 Ollama está ejecutándose en: http://localhost:11434"
echo "🔍 Modelos disponibles:"
ollama list

echo ""
echo "💡 Para usar el sistema ahora:"
echo "   node agents/cli.js analyze <url>"
echo "   node agents/cli.js clone <url>"