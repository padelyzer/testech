import puppeteer from 'puppeteer';
import axios from 'axios';
import { readFile } from 'fs/promises';

export class BehanceScraper {
  constructor() {
    this.config = null;
  }

  async loadConfig() {
    if (this.config) return;
    
    try {
      const configData = await readFile('./config/scrapers.config.json', 'utf-8');
      this.config = JSON.parse(configData).platforms.behance;
    } catch (error) {
      console.error('Error loading config:', error);
      this.config = {
        selectors: {
          projectImages: "img[srcset*='project_modules']",
          title: "h1.ProjectInfo-projectTitle",
          description: ".ProjectInfo-projectDescription",
          colors: ".ProjectColors-color",
          tags: ".ProjectTags-tag"
        }
      };
    }
  }

  async scrape(url) {
    await this.loadConfig();
    
    const projectId = this.extractProjectId(url);
    
    // Intentar primero con API si está disponible
    try {
      return await this.scrapeViaAPI(projectId);
    } catch (error) {
      console.log('API no disponible, usando scraping...');
      return await this.scrapeViaDOM(url);
    }
  }

  extractProjectId(url) {
    const match = url.match(/behance\.net\/gallery\/(\d+)/);
    return match ? match[1] : null;
  }

  async scrapeViaDOM(url) {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Extraer imágenes del proyecto
      const images = await page.evaluate((selectors) => {
        const imgs = document.querySelectorAll('img');
        const imageUrls = [];
        
        for (let img of imgs) {
          if (img.src && (img.src.includes('behance') || img.src.includes('project'))) {
            imageUrls.push(img.src);
          }
        }
        
        return imageUrls.slice(0, 5); // Limit to first 5 images
      }, this.config.selectors);
    
      // Extraer metadatos básicos
      const metadata = await page.evaluate(() => {
        return {
          title: document.title || 'Behance Project',
          description: document.querySelector('meta[name="description"]')?.content || 'Design project from Behance',
          tags: []
        };
      });
      
      // Mock colors for now
      const colors = ['#007bff', '#6c757d', '#28a745'];
      
      await browser.close();
      
      return {
        platform: 'behance',
        projectId: this.extractProjectId(url),
        images,
        metadata,
        colors,
        url
      };
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  async scrapeViaAPI(projectId) {
    // Implementación de API si tienes acceso
    throw new Error('API no configurada');
  }
}