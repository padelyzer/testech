#!/usr/bin/env node
import { ProjectManager } from './project-manager/orchestrator.js';
import chalk from 'chalk';
import figlet from 'figlet';

async function main() {
  console.clear();
  
  // Banner
  console.log(
    chalk.cyan(
      figlet.textSync('Web AI Agents', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
  
  console.log(chalk.gray('Sistema de Desarrollo Web con IA - v1.0.0\n'));
  console.log(chalk.yellow('🚀 Crea sitios web profesionales desde referencias de diseño\n'));
  
  try {
    const pm = new ProjectManager();
    await pm.startProject();
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    if (process.env.NODE_ENV === 'development') {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}

// Manejar interrupciones
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n👋 ¡Hasta pronto!'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n\n👋 Proceso terminado'));
  process.exit(0);
});

// Ejecutar
main().catch(console.error);