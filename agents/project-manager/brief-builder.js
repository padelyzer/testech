export class BriefBuilder {
  generate(data) {
    const { references, projectType, brandInfo } = data;
    
    const brief = {
      project: {
        type: projectType.type,
        goal: projectType.goal || 'general',
        sections: projectType.sections || projectType.pages,
      },
      brand: {
        name: brandInfo.brandName,
        tagline: brandInfo.tagline,
        industry: brandInfo.industry,
        targetAudience: brandInfo.targetAudience,
        values: brandInfo.brandValues,
        tone: brandInfo.tone,
        colors: {
          primary: brandInfo.primaryColor === 'auto' 
            ? this.extractPrimaryColor(references) 
            : brandInfo.primaryColor
        },
        hasLogo: brandInfo.hasLogo
      },
      design: {
        style: this.determineStyle(references),
        inspirations: references.map(r => ({
          title: r.title,
          url: r.url,
          platform: r.platform,
          keyElements: this.extractKeyElements(r.analysis)
        })),
        colorPalette: this.consolidateColors(references),
        typography: this.determineTypography(references),
        layout: this.determineLayout(references)
      },
      technical: {
        framework: 'nextjs',
        animations: true,
        responsive: true,
        seo: true,
        performance: true,
        port: process.env.PORT || 9200
      },
      content: {
        language: 'es',
        tone: brandInfo.tone,
        keywords: this.extractKeywords(brandInfo),
        cta: this.generateCTA(projectType, brandInfo)
      }
    };

    brief.formatted = this.formatBrief(brief);
    
    return brief;
  }

  extractPrimaryColor(references) {
    // Extraer color más común de las referencias
    const colors = [];
    
    references.forEach(ref => {
      if (ref.analysis && ref.analysis.colorPalette) {
        if (ref.analysis.colorPalette.primary) {
          colors.push(ref.analysis.colorPalette.primary);
        }
      }
      // También extraer de colores de plataforma
      if (ref.colors && ref.colors.length > 0) {
        colors.push(...ref.colors.slice(0, 2));
      }
    });
    
    // Usar el primer color válido o un default inteligente
    const validColor = colors.find(color => 
      typeof color === 'string' && 
      (color.startsWith('#') || color.startsWith('rgb'))
    );
    
    return validColor || this.getIndustryDefaultColor(references[0]?.analysis?.metadata?.industry);
  }

  getIndustryDefaultColor(industry = '') {
    const industryColors = {
      'tech': '#0066FF',
      'fintech': '#6C5CE7',
      'saas': '#00CEC9',
      'crypto': '#7C3AED',
      'ecommerce': '#E17055',
      'health': '#2ECC71',
      'education': '#3498DB',
      'corporate': '#2C3E50',
      'startup': '#FF6348'
    };

    const key = Object.keys(industryColors).find(k => 
      industry.toLowerCase().includes(k)
    );
    
    return industryColors[key] || '#0066FF';
  }

  determineStyle(references) {
    // Analizar referencias para determinar estilo predominante
    const styles = references.map(r => r.style).filter(Boolean);
    
    if (styles.length === 0) {
      return 'modern';
    }
    
    // Contar frecuencias
    const styleCount = {};
    styles.forEach(style => {
      styleCount[style] = (styleCount[style] || 0) + 1;
    });
    
    // Retornar el más común
    const mostCommon = Object.entries(styleCount)
      .sort(([,a], [,b]) => b - a)[0];
    
    return mostCommon ? mostCommon[0].toLowerCase() : 'modern';
  }

  extractKeyElements(analysis) {
    if (!analysis || analysis.error) {
      return ['modern layout', 'responsive design', 'clean typography'];
    }

    const elements = [];
    
    if (analysis.components) {
      elements.push(...analysis.components.map(c => c.type || c.name).filter(Boolean));
    }
    
    if (analysis.layout) {
      elements.push(`${analysis.layout.type} layout`);
    }
    
    if (analysis.colorPalette) {
      elements.push('custom color scheme');
    }
    
    return elements.length > 0 ? elements : ['modern components', 'clean design'];
  }

  consolidateColors(references) {
    const allColors = {
      primary: [],
      secondary: [],
      accent: []
    };

    references.forEach(ref => {
      if (ref.analysis && ref.analysis.colorPalette) {
        const palette = ref.analysis.colorPalette;
        if (palette.primary) allColors.primary.push(palette.primary);
        if (palette.secondary) allColors.secondary.push(palette.secondary);
        if (palette.accent) allColors.accent.push(...(Array.isArray(palette.accent) ? palette.accent : [palette.accent]));
      }
    });

    return {
      primary: allColors.primary[0] || '#0066FF',
      secondary: allColors.secondary[0] || '#64748B',
      accent: allColors.accent[0] || '#10B981',
      gradients: ['from-blue-600 to-purple-600', 'from-purple-500 to-pink-500']
    };
  }

  determineTypography(references) {
    // Determinar familia tipográfica basada en estilo
    const styles = references.map(r => r.style).filter(Boolean);
    const hasTech = styles.some(s => s.toLowerCase().includes('tech') || s.toLowerCase().includes('modern'));
    const hasElegant = styles.some(s => s.toLowerCase().includes('elegant') || s.toLowerCase().includes('luxury'));
    
    if (hasElegant) {
      return {
        headings: { family: 'Playfair Display, serif', weight: 'bold' },
        body: { family: 'Inter, sans-serif', weight: 'normal' }
      };
    } else if (hasTech) {
      return {
        headings: { family: 'Space Grotesk, sans-serif', weight: 'bold' },
        body: { family: 'Inter, sans-serif', weight: 'normal' }
      };
    }
    
    return {
      headings: { family: 'Inter, sans-serif', weight: 'bold' },
      body: { family: 'Inter, sans-serif', weight: 'normal' }
    };
  }

  determineLayout(references) {
    // Analizar layouts de referencias
    const layouts = references
      .map(r => r.analysis?.layout?.type)
      .filter(Boolean);
    
    const hasGrid = layouts.some(l => l.includes('grid'));
    const hasModern = layouts.some(l => l.includes('modern'));
    
    return {
      type: hasGrid ? 'grid' : hasModern ? 'modern' : 'standard',
      columns: 12,
      responsive: true,
      maxWidth: '1200px'
    };
  }

  extractKeywords(brandInfo) {
    const keywords = [];
    
    if (brandInfo.industry) {
      keywords.push(brandInfo.industry);
    }
    if (brandInfo.brandValues) {
      keywords.push(...brandInfo.brandValues.split(/[,\s]+/).filter(k => k.length > 3));
    }
    if (brandInfo.targetAudience) {
      keywords.push(...brandInfo.targetAudience.split(/[,\s]+/).filter(k => k.length > 3));
    }
    
    return keywords.slice(0, 10); // Limitar a 10 keywords
  }

  generateCTA(projectType, brandInfo) {
    const ctas = {
      'landing': {
        'Capturar leads (formularios)': ['Obtener Demo Gratis', 'Empezar Ahora', 'Solicitar Información'],
        'Vender un producto': ['Comprar Ahora', 'Ver Precios', 'Obtener Acceso'],
        'Promocionar un servicio': ['Contratar Servicio', 'Consulta Gratuita', 'Más Información'],
        'Lanzamiento de producto': ['Acceso Anticipado', 'Registrarse', 'Ser el Primero'],
        'Evento o webinar': ['Registrarse Gratis', 'Reservar Lugar', 'Unirse Ahora'],
        'App download': ['Descargar App', 'Probar Gratis', 'Instalar Ahora']
      },
      'website': ['Contactar', 'Conocer Más', 'Empezar', 'Ver Portfolio']
    };
    
    if (projectType.type === 'landing' && projectType.goal) {
      return ctas.landing[projectType.goal] || ctas.website;
    }
    
    return ctas.website;
  }

  formatBrief(brief) {
    const sectionsStr = Array.isArray(brief.project.sections) 
      ? brief.project.sections.join('\n   • ')
      : 'No especificadas';

    const inspirationsStr = brief.design.inspirations
      .map(i => `${i.title} (${i.platform})`)
      .join('\n   • ');

    const keyElementsStr = brief.design.inspirations
      .flatMap(i => i.keyElements)
      .slice(0, 5)
      .join('\n   • ');

    return `
📌 TIPO: ${brief.project.type === 'landing' ? 'Landing Page' : 'Sitio Web'}
🎯 OBJETIVO: ${brief.project.goal || 'Presencia digital profesional'}

🏢 MARCA: ${brief.brand.name}
${brief.brand.tagline ? `   "${brief.brand.tagline}"` : ''}
📊 INDUSTRIA: ${brief.brand.industry}
👥 AUDIENCIA: ${brief.brand.targetAudience}
💬 TONO: ${brief.brand.tone}
🎨 COLOR PRINCIPAL: ${brief.brand.colors.primary}

📐 SECCIONES/PÁGINAS:
   • ${sectionsStr}

🎨 ESTILO VISUAL: ${brief.design.style}
💡 REFERENCIAS (${brief.design.inspirations.length}):
   • ${inspirationsStr}

🔑 ELEMENTOS CLAVE:
   • ${keyElementsStr}

⚙️ ESPECIFICACIONES TÉCNICAS:
   • Framework: Next.js 14+
   • Estilos: Tailwind CSS
   • Animaciones: Framer Motion
   • SEO: Optimizado
   • Performance: Core Web Vitals
   • Responsive: Mobile-first
   • Puerto: ${brief.technical.port}

📝 CONTENIDO:
   • Idioma: ${brief.content.language}
   • Keywords SEO: ${brief.content.keywords.slice(0, 5).join(', ')}
   • CTAs sugeridos: ${brief.content.cta.slice(0, 3).join(', ')}
`;
  }
}