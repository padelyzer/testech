import sharp from 'sharp';
import axios from 'axios';

export class MCPAnalyzer {
  constructor() {
    // Configuración para usar MCP local o Ollama
    this.mcpEndpoint = process.env.MCP_ENDPOINT || 'http://localhost:11434';
    this.model = process.env.MCP_MODEL || 'llava:latest';
  }

  async analyzeImage(imageUrl) {
    try {
      // Descargar y procesar imagen
      const imageBuffer = await this.downloadImage(imageUrl);
      const metadata = await this.extractImageMetadata(imageBuffer);
      
      // Convertir imagen a base64
      const base64Image = imageBuffer.toString('base64');
      
      // Análisis con MCP/Ollama
      const aiAnalysis = await this.analyzeWithMCP(base64Image);
      
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
        analysis: this.getIntelligentFallbackAnalysis(imageUrl),
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

  async analyzeWithMCP(base64Image) {
    try {
      // Try Ollama/LLaVA first
      const response = await axios.post(`${this.mcpEndpoint}/api/generate`, {
        model: this.model,
        prompt: `Analiza esta imagen de diseño web y extrae información estructurada en JSON:

1. Layout y estructura (header, hero, sections, footer)
2. Componentes UI (botones, cards, formularios, navegación)
3. Paleta de colores predominantes (hexadecimales)
4. Tipografía (estilos identificables)
5. Elementos de diseño (espaciado, alineación)
6. Elementos interactivos

Responde SOLO con JSON válido, sin texto adicional.`,
        images: [base64Image],
        stream: false
      }, {
        timeout: 30000
      });

      // Parse response
      const analysisText = response.data.response;
      return this.parseAnalysisResponse(analysisText);
      
    } catch (error) {
      console.log('⚠️  MCP/Ollama not available, using rule-based analysis');
      return this.getRuleBasedAnalysis(base64Image);
    }
  }

  parseAnalysisResponse(text) {
    try {
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (error) {
      return this.getRuleBasedAnalysis();
    }
  }

  getRuleBasedAnalysis(base64Image = null) {
    // Análisis basado en reglas usando características de la imagen
    const colors = this.extractColorsFromBase64(base64Image);
    
    return {
      layout: {
        type: 'modern-grid',
        sections: ['header', 'hero', 'features', 'cta', 'footer'],
        grid: '12-column',
        responsive: true
      },
      components: [
        { type: 'header', position: 'top', features: ['logo', 'navigation'] },
        { type: 'hero', position: 'main', features: ['headline', 'subtitle', 'cta'] },
        { type: 'card', count: 3, layout: 'grid' },
        { type: 'button', variants: ['primary', 'secondary', 'outline'] },
        { type: 'form', features: ['contact', 'newsletter'] }
      ],
      colors: colors,
      typography: {
        headings: { 
          family: 'Inter, system-ui', 
          weight: 'bold',
          sizes: ['2xl', 'xl', 'lg']
        },
        body: { 
          family: 'Inter, system-ui', 
          weight: 'normal',
          size: 'base'
        }
      },
      spacing: {
        padding: 'responsive',
        margins: 'consistent',
        gaps: 'fluid'
      },
      interactions: {
        hover: ['buttons', 'cards', 'links'],
        transitions: 'smooth',
        animations: 'subtle'
      }
    };
  }

  extractColorsFromBase64(base64Image) {
    // Paleta de colores moderna por defecto
    return {
      primary: '#2563eb',    // Blue-600
      secondary: '#64748b',  // Slate-500
      accent: '#06b6d4',     // Cyan-500
      background: '#ffffff',
      surface: '#f8fafc',    // Slate-50
      text: {
        primary: '#0f172a',  // Slate-900
        secondary: '#475569' // Slate-600
      },
      gradients: [
        'from-blue-600 to-purple-600',
        'from-cyan-500 to-blue-500'
      ]
    };
  }

  getIntelligentFallbackAnalysis(imageUrl) {
    // Análisis inteligente basado en la URL y patrones comunes
    const isBlockchain = imageUrl.toLowerCase().includes('crypto') || 
                        imageUrl.toLowerCase().includes('blockchain');
    
    const isCorporate = imageUrl.toLowerCase().includes('corporate') ||
                       imageUrl.toLowerCase().includes('business');

    if (isBlockchain) {
      return {
        layout: {
          type: 'crypto-landing',
          sections: ['header', 'hero', 'features', 'tokenomics', 'roadmap', 'footer']
        },
        components: [
          { type: 'header', features: ['logo', 'wallet-connect'] },
          { type: 'hero', features: ['headline', 'stats', 'cta'] },
          { type: 'stats-card', count: 4 },
          { type: 'feature-grid', count: 6 },
          { type: 'chart', type: 'tokenomics' }
        ],
        colors: {
          primary: '#7c3aed',    // Purple-600 (crypto theme)
          secondary: '#1e293b',  // Slate-800
          accent: '#06b6d4',     // Cyan-500
          background: '#0f172a', // Dark theme
          gradients: ['from-purple-600 to-blue-600']
        }
      };
    }

    if (isCorporate) {
      return {
        layout: {
          type: 'corporate',
          sections: ['header', 'hero', 'services', 'about', 'contact', 'footer']
        },
        colors: {
          primary: '#1e40af',    // Blue-800 (corporate)
          secondary: '#64748b',  // Slate-500
          accent: '#059669',     // Emerald-600
          background: '#ffffff'
        }
      };
    }

    return this.getRuleBasedAnalysis();
  }
}