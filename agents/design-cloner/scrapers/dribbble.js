import puppeteer from 'puppeteer';
import { readFile } from 'fs/promises';

export class DribbbleScraper {
  constructor() {
    this.config = null;
  }

  async loadConfig() {
    if (this.config) return;
    
    try {
      const configData = await readFile('./config/scrapers.config.json', 'utf-8');
      this.config = JSON.parse(configData).platforms.dribbble;
    } catch (error) {
      console.error('Error loading config:', error);
      this.config = {
        selectors: {
          shotImage: "picture.shot-thumbnail-base img",
          title: "h1.shot-title",
          description: ".shot-description",
          colorPalette: ".color-swatch",
          tags: ".shot-tags-list a"
        }
      };
    }
  }

  async scrape(url) {
    await this.loadConfig();

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
      
      // Extraer imagen principal del shot
      const images = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img');
        const imageUrls = [];
        
        for (let img of imgs) {
          if (img.src && (img.src.includes('dribbble') || img.src.includes('shot'))) {
            imageUrls.push(img.src);
          }
        }
        
        return imageUrls.slice(0, 3); // Limit to first 3 images
      });
    
      // Extraer metadatos básicos
      const metadata = await page.evaluate(() => {
        return {
          title: document.title || 'Dribbble Shot',
          description: document.querySelector('meta[name="description"]')?.content || 'Design shot from Dribbble', 
          tags: []
        };
      });
      
      // Mock colors for now
      const colors = ['#ea4c89', '#0d0c22', '#7c3aed'];
      
      await browser.close();
      
      return {
        platform: 'dribbble',
        shotId: this.extractShotId(url),
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

  extractShotId(url) {
    const match = url.match(/dribbble\.com\/shots\/(\d+)/);
    return match ? match[1] : null;
  }
}