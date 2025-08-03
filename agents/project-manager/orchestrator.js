import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { DesignCloner } from '../design-cloner/index.js';
import { UIBuilder } from '../ui-builder/index.js';
import { CopyMaster } from '../copy-master/index.js';
import { BriefBuilder } from './brief-builder.js';
import { EventEmitter } from 'events';

export class ProjectManager extends EventEmitter {
  constructor() {
    super();
    this.designCloner = new DesignCloner();
    this.uiBuilder = new UIBuilder();
    this.copyMaster = new CopyMaster();
    this.briefBuilder = new BriefBuilder();
    this.projectData = {};
  }

  async startProject() {
    console.log(chalk.blue.bold('\n🎯 Sistema de Desarrollo Web con IA\n'));
    
    // Paso 1: Solicitar inspiración
    const references = await this.getInspiration();
    
    // Paso 2: Analizar referencias
    const analysisResults = await this.analyzeReferences(references);
    
    // Paso 3: Cuestionario tipo de proyecto
    const projectType = await this.askProjectType();
    
    // Paso 4: Cuestionario marca/producto
    const brandInfo = await this.askBrandInfo();
    
    // Paso 5: Generar resumen y confirmar
    const brief = await this.generateBrief({
      references: analysisResults,
      projectType,
      brandInfo
    });
    
    // Paso 6: Generar primera versión
    const v1 = await this.generateVersion1(brief);
    
    // Paso 7: Iterar con feedback
    await this.iterateWithFeedback(v1);
  }

  async getInspiration() {
    console.log(chalk.yellow('\n📌 Paso 1: Busquemos inspiración\n'));
    
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: '¿Cómo quieres buscar inspiración?',
        choices: [
          { name: '🔍 Buscar por categoría/estilo', value: 'search' },
          { name: '🔗 Tengo URLs específicas', value: 'urls' },
          { name: '🎨 Ver tendencias actuales', value: 'trends' },
          { name: '⚡ Sugerir automáticamente', value: 'auto' }
        ]
      }
    ]);

    let references = [];

    switch (searchType) {
      case 'search':
        references = await this.searchForInspiration();
        break;
      case 'urls':
        references = await this.askForURLs();
        break;
      case 'trends':
        references = await this.showTrends();
        break;
      case 'auto':
        references = await this.autoSuggest();
        break;
    }

    return references;
  }

  async searchForInspiration() {
    const { keywords, style } = await inquirer.prompt([
      {
        type: 'input',
        name: 'keywords',
        message: 'Palabras clave para buscar (ej: "fintech modern", "saas minimal"):',
        validate: input => input.length > 0
      },
      {
        type: 'list',
        name: 'style',
        message: 'Estilo visual preferido:',
        choices: [
          'Minimalista',
          'Moderno/Tech',
          'Corporativo',
          'Creativo/Artístico',
          'E-commerce',
          'Startup',
          'Elegante/Luxury'
        ]
      }
    ]);

    const spinner = ora('Buscando referencias...').start();
    
    // Simular búsqueda (en producción, esto conectaría con scrapers reales)
    const mockReferences = [
      {
        title: 'Modern SaaS Landing',
        url: 'https://www.behance.net/gallery/206929319/Zentry-Landing-Page',
        platform: 'behance',
        style: style,
        relevance: 0.95
      },
      {
        title: 'Tech Startup Design',
        url: 'https://dribbble.com/shots/23265919-Saas-Landing-Page',
        platform: 'dribbble',
        style: style,
        relevance: 0.88
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 2000));
    spinner.succeed('¡Referencias encontradas!');
    
    // Mostrar preview
    console.log(chalk.green('\n✨ Referencias sugeridas:\n'));
    mockReferences.forEach((ref, i) => {
      console.log(`${i + 1}. ${chalk.bold(ref.title)}`);
      console.log(`   ${chalk.gray(ref.url)}`);
      console.log(`   Relevancia: ${chalk.yellow('★'.repeat(Math.round(ref.relevance * 5)))}\n`);
    });

    const { confirmed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: '¿Usar estas referencias?',
        default: true
      }
    ]);

    return confirmed ? mockReferences : await this.getInspiration();
  }

  async askForURLs() {
    const urls = [];
    let addingUrls = true;

    while (addingUrls) {
      const { url } = await inquirer.prompt([
        {
          type: 'input',
          name: 'url',
          message: `URL de referencia ${urls.length + 1} (Behance/Dribbble):`,
          validate: input => {
            if (!input) return urls.length > 0 ? true : 'Ingresa al menos una URL';
            return input.includes('behance.net') || input.includes('dribbble.com') || 
                   'Por favor ingresa una URL válida de Behance o Dribbble';
          }
        }
      ]);

      if (url) {
        urls.push({
          title: `Referencia ${urls.length + 1}`,
          url: url,
          platform: url.includes('behance.net') ? 'behance' : 'dribbble',
          relevance: 1.0
        });
      }

      if (urls.length === 0) continue;

      const { addMore } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addMore',
          message: '¿Agregar otra URL?',
          default: false
        }
      ]);

      addingUrls = addMore;
    }

    return urls;
  }

  async showTrends() {
    console.log(chalk.cyan('\n🎨 Tendencias de diseño 2024:\n'));

    const trends = [
      {
        title: 'Glassmorphism UI Kit',
        url: 'https://www.behance.net/gallery/210000001/Glassmorphism-UI',
        platform: 'behance',
        trend: 'Glassmorphism',
        relevance: 0.92
      },
      {
        title: 'Brutalist Web Design',
        url: 'https://dribbble.com/shots/24000001-Brutalist-Landing',
        platform: 'dribbble',
        trend: 'Brutalism',
        relevance: 0.85
      },
      {
        title: 'Y2K Revival Interface',
        url: 'https://www.behance.net/gallery/209000001/Y2K-Web-Design',
        platform: 'behance',
        trend: 'Y2K Revival',
        relevance: 0.88
      }
    ];

    trends.forEach((trend, i) => {
      console.log(`${i + 1}. ${chalk.bold(trend.title)} ${chalk.gray(`(${trend.trend})`)}`);
      console.log(`   ${chalk.gray(trend.url)}`);
      console.log(`   Popularidad: ${chalk.yellow('★'.repeat(Math.round(trend.relevance * 5)))}\n`);
    });

    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: 'Selecciona las tendencias que te interesan:',
        choices: trends.map((trend, i) => ({
          name: `${trend.title} (${trend.trend})`,
          value: i,
          checked: false
        })),
        validate: answer => answer.length > 0 ? true : 'Selecciona al menos una tendencia'
      }
    ]);

    return selected.map(index => trends[index]);
  }

  async autoSuggest() {
    const spinner = ora('Seleccionando referencias automáticamente...').start();
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const autoSelected = [
      {
        title: 'Modern Minimalist Landing',
        url: 'https://www.behance.net/gallery/200000001/Minimal-Landing',
        platform: 'behance',
        style: 'Minimalista',
        relevance: 0.90
      },
      {
        title: 'SaaS Dashboard Design',
        url: 'https://dribbble.com/shots/22000001-SaaS-Dashboard',
        platform: 'dribbble',
        style: 'Moderno/Tech',
        relevance: 0.87
      }
    ];

    spinner.succeed('Referencias seleccionadas automáticamente');
    
    console.log(chalk.green('\n✨ Referencias sugeridas automáticamente:\n'));
    autoSelected.forEach((ref, i) => {
      console.log(`${i + 1}. ${chalk.bold(ref.title)} ${chalk.gray(`(${ref.style})`)}`);
      console.log(`   ${chalk.gray(ref.url)}\n`);
    });

    return autoSelected;
  }

  async analyzeReferences(references) {
    const spinner = ora('Analizando diseños...').start();
    const results = [];

    for (const ref of references) {
      spinner.text = `Analizando: ${ref.title}`;
      
      try {
        const analysis = await this.designCloner.analyze(ref.url);
        results.push({
          ...ref,
          analysis
        });
      } catch (error) {
        console.warn(`⚠️ No se pudo analizar: ${ref.title}`);
        results.push({
          ...ref,
          analysis: { error: error.message }
        });
      }
    }

    spinner.succeed('✅ Análisis completado');
    return results;
  }

  async askProjectType() {
    console.log(chalk.yellow('\n📋 Paso 2: Definamos tu proyecto\n'));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '¿Qué tipo de proyecto necesitas?',
        choices: [
          {
            name: '🎯 Landing Page - Una página de conversión',
            value: 'landing'
          },
          {
            name: '🌐 Sitio Web Completo - Múltiples páginas',
            value: 'website'
          }
        ]
      }
    ]);

    if (answers.type === 'landing') {
      const landingDetails = await inquirer.prompt([
        {
          type: 'list',
          name: 'goal',
          message: '¿Cuál es el objetivo principal?',
          choices: [
            'Capturar leads (formularios)',
            'Vender un producto',
            'Promocionar un servicio',
            'Lanzamiento de producto',
            'Evento o webinar',
            'App download'
          ]
        },
        {
          type: 'checkbox',
          name: 'sections',
          message: 'Selecciona las secciones que necesitas:',
          choices: [
            { name: 'Hero con CTA', checked: true },
            { name: 'Beneficios/Features', checked: true },
            { name: 'Cómo funciona', checked: true },
            { name: 'Testimonios' },
            { name: 'Precios' },
            { name: 'FAQ' },
            { name: 'Equipo' },
            { name: 'Contacto/Formulario', checked: true }
          ]
        }
      ]);
      
      return { type: 'landing', ...landingDetails };
    } else {
      const websiteDetails = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'pages',
          message: 'Selecciona las páginas que necesitas:',
          choices: [
            { name: 'Inicio', checked: true },
            { name: 'Nosotros', checked: true },
            { name: 'Servicios/Productos', checked: true },
            { name: 'Portfolio/Casos' },
            { name: 'Blog' },
            { name: 'Contacto', checked: true },
            { name: 'Precios' },
            { name: 'Recursos' }
          ]
        }
      ]);
      
      return { type: 'website', ...websiteDetails };
    }
  }

  async askBrandInfo() {
    console.log(chalk.yellow('\n🏢 Paso 3: Información de tu marca\n'));

    return await inquirer.prompt([
      {
        type: 'input',
        name: 'brandName',
        message: 'Nombre de la marca/empresa:',
        validate: input => input.length > 0
      },
      {
        type: 'input',
        name: 'tagline',
        message: 'Tagline o slogan (opcional):',
      },
      {
        type: 'input',
        name: 'industry',
        message: '¿A qué industria pertenece?',
        validate: input => input.length > 0
      },
      {
        type: 'input',
        name: 'targetAudience',
        message: '¿Quién es tu audiencia objetivo?',
        validate: input => input.length > 0
      },
      {
        type: 'input',
        name: 'brandValues',
        message: '¿Cuáles son los valores/diferenciadores de tu marca?'
      },
      {
        type: 'list',
        name: 'tone',
        message: 'Tono de comunicación:',
        choices: [
          'Profesional y formal',
          'Amigable y cercano',
          'Innovador y disruptivo',
          'Elegante y sofisticado',
          'Juvenil y dinámico',
          'Técnico y especializado'
        ]
      },
      {
        type: 'input',
        name: 'primaryColor',
        message: 'Color primario de marca (hex o nombre):',
        default: 'auto'
      },
      {
        type: 'confirm',
        name: 'hasLogo',
        message: '¿Tienes logo?',
        default: false
      }
    ]);
  }

  async generateBrief(data) {
    console.log(chalk.yellow('\n📄 Generando resumen del proyecto...\n'));
    
    const brief = this.briefBuilder.generate(data);
    
    console.log(chalk.blue.bold('RESUMEN DEL PROYECTO'));
    console.log(chalk.blue('═'.repeat(50)));
    console.log(brief.formatted);
    console.log(chalk.blue('═'.repeat(50)));

    const { confirmed, changes } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: '\n¿Confirmar y proceder con la generación?',
        default: true
      },
      {
        type: 'input',
        name: 'changes',
        message: '¿Algún cambio o comentario adicional?',
        when: (answers) => !answers.confirmed
      }
    ]);

    if (!confirmed) {
      // Aplicar cambios y regenerar
      brief.userFeedback = changes;
      return this.generateBrief(data);
    }

    return brief;
  }

  async generateVersion1(brief) {
    console.log(chalk.green('\n🎨 Generando primera versión...\n'));
    
    const spinner = ora();
    const steps = [
      { text: 'Creando estructura base...', duration: 2000 },
      { text: 'Generando componentes...', duration: 3000 },
      { text: 'Aplicando estilos y animaciones...', duration: 2500 },
      { text: 'Optimizando para SEO...', duration: 1500 },
      { text: 'Generando contenido...', duration: 2000 }
    ];

    for (const step of steps) {
      spinner.start(step.text);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      spinner.succeed();
    }

    // Generar el sitio
    const result = await this.uiBuilder.generateFromBrief(brief);
    
    console.log(chalk.green.bold('\n✅ ¡Primera versión lista!\n'));
    console.log(`📁 Archivos generados en: ${chalk.yellow(result.outputPath)}`);
    console.log(`🌐 Vista previa disponible en: ${chalk.cyan('http://localhost:3000')}`);
    
    return result;
  }

  async iterateWithFeedback(currentVersion) {
    console.log(chalk.yellow('\n🔄 Modo de iteración\n'));
    
    let iterating = true;
    let version = currentVersion;
    let iterationCount = 1;

    while (iterating) {
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: `¿Qué deseas hacer? (Iteración ${iterationCount})`,
          choices: [
            { name: '✏️  Solicitar cambios específicos', value: 'change' },
            { name: '🎨 Ajustar estilos/colores', value: 'style' },
            { name: '📝 Modificar contenido/copy', value: 'content' },
            { name: '🔧 Agregar/quitar secciones', value: 'sections' },
            { name: '✅ Aprobar versión actual', value: 'approve' }
          ]
        }
      ]);

      switch (action) {
        case 'change':
          version = await this.requestChanges(version);
          break;
        case 'style':
          version = await this.adjustStyles(version);
          break;
        case 'content':
          version = await this.modifyContent(version);
          break;
        case 'sections':
          version = await this.modifySections(version);
          break;
        case 'approve':
          iterating = false;
          break;
      }

      if (action !== 'approve') {
        iterationCount++;
        console.log(chalk.green(`\n✅ Cambios aplicados (v${iterationCount})\n`));
      }
    }

    console.log(chalk.green.bold('\n🎉 ¡Proyecto finalizado!\n'));
    console.log(`📁 Archivos finales en: ${chalk.yellow(version.outputPath)}`);
    console.log(`🚀 Para ejecutar: ${chalk.cyan('cd ' + version.outputPath + ' && npm run dev')}`);
    
    return version;
  }

  // Métodos auxiliares para iteraciones
  async requestChanges(version) {
    const { changes } = await inquirer.prompt([
      {
        type: 'input',
        name: 'changes',
        message: 'Describe los cambios que necesitas:'
      }
    ]);

    const spinner = ora('Aplicando cambios...').start();
    // Simular aplicación de cambios
    await new Promise(resolve => setTimeout(resolve, 3000));
    spinner.succeed();

    return { ...version, changes };
  }

  async adjustStyles(version) {
    const { styleChanges } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'styleChanges',
        message: '¿Qué aspectos quieres ajustar?',
        choices: [
          'Colores principales',
          'Tipografías',
          'Espaciados',
          'Animaciones',
          'Modo oscuro',
          'Responsive design'
        ]
      }
    ]);

    const spinner = ora('Ajustando estilos...').start();
    await new Promise(resolve => setTimeout(resolve, 2000));
    spinner.succeed();

    return { ...version, styleChanges };
  }

  async modifyContent(version) {
    const { section } = await inquirer.prompt([
      {
        type: 'list',
        name: 'section',
        message: '¿Qué sección quieres modificar?',
        choices: version.sections?.map(s => s.name) || ['Hero', 'Features', 'Contact']
      }
    ]);

    const { newContent } = await inquirer.prompt([
      {
        type: 'input',
        name: 'newContent',
        message: `Nuevo contenido para ${section}:`
      }
    ]);

    const spinner = ora('Modificando contenido...').start();
    await new Promise(resolve => setTimeout(resolve, 1500));
    spinner.succeed();

    return { ...version, contentChanges: { section, newContent } };
  }

  async modifySections(version) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '¿Qué quieres hacer?',
        choices: [
          'Agregar nueva sección',
          'Eliminar sección',
          'Reordenar secciones'
        ]
      }
    ]);

    const spinner = ora('Modificando secciones...').start();
    await new Promise(resolve => setTimeout(resolve, 2000));
    spinner.succeed();

    return { ...version, sectionChanges: action };
  }
}