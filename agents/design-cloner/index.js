import { BehanceScraper } from './scrapers/behance.js';
import { DribbbleScraper } from './scrapers/dribbble.js';
import { MCPAnalyzer } from './mcp-analyzer.js';
import { ComponentExtractor } from './component-extractor.js';
import chalk from 'chalk';
import ora from 'ora';

export class DesignCloner {
  constructor() {
    this.scrapers = {
      behance: new BehanceScraper(),
      dribbble: new DribbbleScraper()
    };
    this.analyzer = new MCPAnalyzer();
    this.extractor = new ComponentExtractor();
  }

  async clone(url, options) {
    const spinner = ora('Procesando URL...').start();
    
    try {
      // Detectar plataforma
      const platform = this.detectPlatform(url);
      
      if (platform) {
        spinner.text = `Extrayendo desde ${platform}...`;
        const projectData = await this.scrapers[platform].scrape(url);
        
        spinner.text = 'Analizando imágenes...';
        const analysis = await this.analyzeProject(projectData);
        
        spinner.text = 'Generando componentes...';
        const components = await this.generateComponents(analysis);
        
        spinner.succeed('✅ Diseño clonado exitosamente!');
        
        return {
          platform,
          projectData,
          analysis,
          components
        };
      } else {
        // Es una imagen directa
        spinner.text = 'Analizando imagen...';
        const analysis = await this.analyzer.analyzeImage(url);
        const components = await this.generateComponents(analysis);
        
        spinner.succeed('✅ Imagen analizada!');
        
        return { analysis, components };
      }
    } catch (error) {
      spinner.fail(`❌ Error: ${error.message}`);
      throw error;
    }
  }

  detectPlatform(url) {
    if (url.includes('behance.net')) return 'behance';
    if (url.includes('dribbble.com')) return 'dribbble';
    return null;
  }

  async analyzeProject(projectData) {
    const analyses = [];
    
    for (const imageUrl of projectData.images) {
      const analysis = await this.analyzer.analyzeImage(imageUrl);
      analyses.push(analysis);
    }
    
    // Consolidar análisis
    return this.consolidateAnalyses(analyses, projectData);
  }

  consolidateAnalyses(analyses, projectData) {
    return {
      layout: this.extractLayout(analyses),
      colorPalette: this.extractColors(analyses, projectData.colors),
      typography: this.extractTypography(analyses),
      components: this.extractComponents(analyses),
      animations: this.detectAnimations(analyses),
      metadata: projectData.metadata,
      rawAnalyses: analyses // Include raw analyses for component generation
    };
  }

  async generateComponents(analysis) {
    return this.extractor.generateFromAnalysis(analysis);
  }

  async analyze(url) {
    const platform = this.detectPlatform(url);
    
    if (platform) {
      const projectData = await this.scrapers[platform].scrape(url);
      return this.analyzeProject(projectData);
    } else {
      return this.analyzer.analyzeImage(url);
    }
  }

  // Métodos auxiliares
  extractLayout(analyses) {
    // Lógica para extraer estructura de layout
    return {
      type: 'grid',
      columns: 12,
      sections: []
    };
  }

  extractColors(analyses, platformColors = []) {
    // Combinar colores detectados con los de la plataforma
    return {
      primary: '#000000',
      secondary: '#ffffff',
      accent: [],
      gradients: []
    };
  }

  extractTypography(analyses) {
    return {
      headings: {},
      body: {},
      special: {}
    };
  }

  extractComponents(analyses) {
    // Return component definitions that the extractor can use
    return [
      { type: 'header', position: 'top' },
      { type: 'hero', position: 'main' },
      { type: 'card', count: 3 },
      { type: 'button', variants: ['primary', 'secondary'] },
      { type: 'footer', position: 'bottom' }
    ];
  }

  detectAnimations(analyses) {
    return {
      scroll: [],
      hover: [],
      entrance: []
    };
  }
}