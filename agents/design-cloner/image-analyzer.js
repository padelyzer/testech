import OpenAI from 'openai';
import sharp from 'sharp';
import axios from 'axios';

export class ImageAnalyzer {
  constructor() {
    this.hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'tu-api-key-aqui';
    
    if (this.hasApiKey) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async analyzeImage(imageUrl) {
    try {
      // Descargar y procesar imagen
      const imageBuffer = await this.downloadImage(imageUrl);
      const metadata = await this.extractImageMetadata(imageBuffer);
      
      // Análisis con OpenAI Vision
      const aiAnalysis = await this.analyzeWithAI(imageUrl);
      
      return {
        url: imageUrl,
        metadata,
        analysis: aiAnalysis,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      return {
        url: imageUrl,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async downloadImage(url) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return Buffer.from(response.data);
  }

  async extractImageMetadata(buffer) {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      channels: metadata.channels,
      density: metadata.density
    };
  }

  async analyzeWithAI(imageUrl) {
    if (!this.hasApiKey) {
      console.log('⚠️  OpenAI API key not configured, using mock analysis');
      return this.getMockAnalysis();
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analiza esta imagen de diseño web y extrae:
                1. Layout y estructura (header, hero, sections, footer)
                2. Componentes UI identificados (botones, cards, formularios, etc.)
                3. Paleta de colores predominantes
                4. Tipografía (estilos de texto identificables)
                5. Elementos de diseño (espaciado, alineación, jerarquía visual)
                6. Elementos interactivos (navegación, CTAs, hover states)
                
                Responde en formato JSON estructurado.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high"
                }
              }
            ]
          }
        ],
        max_tokens: 1500
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI Analysis error:', error);
      return this.getMockAnalysis();
    }
  }

  getMockAnalysis() {
    return {
      layout: {
        type: 'modern',
        sections: ['header', 'hero', 'features', 'footer'],
        grid: '12-column'
      },
      components: [
        { type: 'header', position: 'top' },
        { type: 'hero', position: 'main' },
        { type: 'card', count: 3 },
        { type: 'button', variants: ['primary', 'secondary'] }
      ],
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        accent: '#28a745',
        background: '#ffffff'
      },
      typography: {
        headings: { family: 'sans-serif', weight: 'bold' },
        body: { family: 'sans-serif', weight: 'normal' }
      },
      spacing: {
        padding: 'large',
        margins: 'medium',
        gaps: 'consistent'
      }
    };
  }
}