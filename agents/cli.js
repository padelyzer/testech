#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { config } from 'dotenv';
import { DesignCloner } from './design-cloner/index.js';
import { ProjectManager } from './project-manager/index.js';

config();

const program = new Command();

program
  .name('web-agents')
  .description('Sistema de Agentes para Desarrollo Web Profesional')
  .version('1.0.0');

// Comando para clonar diseños
program
  .command('clone <url>')
  .description('Clona un diseño desde Behance, Dribbble o una imagen')
  .option('-o, --output <path>', 'Directorio de salida', './outputs')
  .option('-n, --name <name>', 'Nombre del proyecto')
  .action(async (url, options) => {
    console.log(chalk.blue('🎨 Iniciando clonado de diseño...'));
    
    const cloner = new DesignCloner();
    await cloner.clone(url, options);
  });

// Comando para generar sitio completo
program
  .command('generate')
  .description('Genera un sitio web completo')
  .option('-r, --reference <url>', 'URL de referencia (Behance/Dribbble)')
  .option('-b, --brief <file>', 'Archivo con brief del proyecto')
  .option('-l, --languages <langs>', 'Idiomas (es,en)', 'es,en')
  .option('-t, --type <type>', 'Tipo de sitio (landing/corporate)', 'landing')
  .action(async (options) => {
    console.log(chalk.green('🚀 Generando sitio web...'));
    
    const pm = new ProjectManager();
    await pm.generateSite(options);
  });

// Comando para analizar un diseño
program
  .command('analyze <url>')
  .description('Analiza un diseño y extrae componentes')
  .action(async (url) => {
    console.log(chalk.yellow('🔍 Analizando diseño...'));
    
    const cloner = new DesignCloner();
    const analysis = await cloner.analyze(url);
    console.log(JSON.stringify(analysis, null, 2));
  });

// Comando para mostrar componentes generados
program
  .command('components <url>')
  .description('Genera y muestra componentes React desde un diseño')
  .action(async (url) => {
    console.log(chalk.cyan('⚡ Generando componentes React...'));
    
    const cloner = new DesignCloner();
    const result = await cloner.clone(url);
    
    if (result.components) {
      console.log(chalk.green('\n✨ Componentes generados:\n'));
      
      result.components.components.forEach((component, index) => {
        console.log(chalk.blue(`\n🧩 ${component.name} (${component.type})`));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(component.code);
        
        if (component.props && component.props.length > 0) {
          console.log(chalk.yellow('\n📋 Props:'));
          component.props.forEach(prop => {
            console.log(`  • ${prop.name}: ${prop.type} ${prop.required ? '(required)' : '(optional)'}`);
          });
        }
      });
      
      if (result.components.styles) {
        console.log(chalk.magenta('\n🎨 Estilos Tailwind CSS:'));
        console.log(JSON.stringify(result.components.styles.tailwind, null, 2));
      }
    }
  });

program.parse();