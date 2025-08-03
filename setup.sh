#!/bin/bash

echo "🔧 Configurando el Sistema de Agentes Web..."

# Instalar dependencias
npm install

# Crear archivo .env si no existe
if [ ! -f .env.local ]; then
  echo "OPENAI_API_KEY=tu-api-key-aqui" > .env.local
  echo "PROJECT_ROOT=$(pwd)" >> .env.local
  echo "NODE_ENV=development" >> .env.local
fi

# Dar permisos de ejecución al CLI
chmod +x agents/cli.js

# Crear alias global (opcional)
echo "alias web-agents='node $(pwd)/agents/cli.js'" >> ~/.bashrc

echo "✅ Configuración completada!"
echo ""
echo "📚 Comandos disponibles:"
echo "  node agents/cli.js clone <url>    - Clonar diseño"
echo "  node agents/cli.js analyze <url>  - Analizar diseño"
echo "  node agents/cli.js generate       - Generar sitio completo"