export class CopyMaster {
  constructor() {
    this.contentTemplates = {
      'Profesional y formal': this.generateFormalContent,
      'Amigable y cercano': this.generateFriendlyContent,
      'Innovador y disruptivo': this.generateInnovativeContent,
      'Elegante y sofisticado': this.generateElegantContent,
      'Juvenil y dinámico': this.generateDynamicContent,
      'Técnico y especializado': this.generateTechnicalContent
    };
    
    this.industryKeywords = {
      'tecnología': ['innovación', 'digital', 'automatización', 'eficiencia', 'escalabilidad'],
      'fintech': ['seguridad', 'transparencia', 'rentabilidad', 'inversión', 'crecimiento'],
      'saas': ['productividad', 'colaboración', 'optimización', 'integración', 'analytics'],
      'ecommerce': ['conversión', 'experiencia', 'personalización', 'omnicanalidad', 'fidelización'],
      'salud': ['bienestar', 'prevención', 'calidad', 'profesionalismo', 'confianza'],
      'educación': ['aprendizaje', 'desarrollo', 'conocimiento', 'competencias', 'futuro'],
      'consultoría': ['estrategia', 'resultados', 'expertise', 'transformación', 'valor']
    };
  }

  generateContent(brief) {
    const generator = this.contentTemplates[brief.brand.tone] || this.generateFormalContent;
    
    return {
      hero: generator.call(this, 'hero', brief),
      features: generator.call(this, 'features', brief),
      about: generator.call(this, 'about', brief),
      contact: generator.call(this, 'contact', brief),
      cta: this.generateCTAs(brief),
      seo: this.generateSEOContent(brief),
      social: this.generateSocialContent(brief)
    };
  }

  generateFormalContent(section, brief) {
    const content = {
      hero: {
        title: `Excelencia en ${brief.brand.industry}`,
        subtitle: `${brief.brand.name} ofrece soluciones profesionales de alta calidad para ${brief.brand.targetAudience}`,
        description: `Con años de experiencia y un enfoque centrado en resultados, proporcionamos servicios especializados que impulsan el crecimiento empresarial.`
      },
      features: {
        title: 'Nuestros Servicios Profesionales',
        subtitle: 'Soluciones integrales diseñadas para su éxito empresarial',
        items: [
          {
            title: 'Expertise Profesional',
            description: `Equipo altamente calificado con profundo conocimiento en ${brief.brand.industry}`
          },
          {
            title: 'Resultados Medibles',
            description: 'Metodologías probadas que garantizan el retorno de inversión'
          },
          {
            title: 'Soporte Integral',
            description: 'Acompañamiento completo desde la planificación hasta la implementación'
          }
        ]
      },
      about: {
        title: `Acerca de ${brief.brand.name}`,
        description: `Somos una empresa líder en ${brief.brand.industry}, comprometida con la excelencia operacional y la satisfacción del cliente. Nuestro enfoque profesional y metodologías probadas nos permiten entregar resultados excepcionales.`,
        values: brief.brand.values || 'Integridad, excelencia y compromiso con nuestros clientes'
      },
      contact: {
        title: 'Contacto Profesional',
        subtitle: 'Discutamos cómo podemos contribuir a su éxito empresarial',
        description: 'Nuestro equipo está disponible para una consultoría inicial sin compromiso.'
      }
    };

    return content[section];
  }

  generateFriendlyContent(section, brief) {
    const content = {
      hero: {
        title: `¡Hola! Somos ${brief.brand.name}`,
        subtitle: `Te ayudamos con ${brief.brand.industry} de forma fácil y personalizada`,
        description: `Creemos que trabajar juntos debe ser una experiencia agradable. Por eso, nos enfocamos en entenderte y ofrecerte exactamente lo que necesitas.`
      },
      features: {
        title: '¿Por qué trabajar con nosotros?',
        subtitle: 'Porque nos importas y queremos verte triunfar',
        items: [
          {
            title: 'Trato Personal',
            description: 'Cada cliente es único y merece atención personalizada'
          },
          {
            title: 'Comunicación Clara',
            description: 'Te explicamos todo de manera sencilla, sin tecnicismos'
          },
          {
            title: 'Estamos Contigo',
            description: 'Te acompañamos en cada paso del proceso'
          }
        ]
      },
      about: {
        title: `Conoce a ${brief.brand.name}`,
        description: `Somos un equipo apasionado por ${brief.brand.industry}. Nos levantamos cada día pensando en cómo podemos ayudar mejor a personas como tú. Creemos en las relaciones duraderas y en hacer las cosas bien.`,
        values: brief.brand.values || 'Cercanía, honestidad y pasión por lo que hacemos'
      },
      contact: {
        title: '¡Hablemos!',
        subtitle: 'Estamos aquí para ayudarte con cualquier duda',
        description: 'No importa si es una pregunta pequeña o un proyecto grande, nos encanta conversar.'
      }
    };

    return content[section];
  }

  generateInnovativeContent(section, brief) {
    const content = {
      hero: {
        title: `Revolucionando ${brief.brand.industry}`,
        subtitle: `${brief.brand.name}: Donde la innovación encuentra la ejecución`,
        description: `Desafiamos el status quo y creamos soluciones que transforman industrias. El futuro no se espera, se construye.`
      },
      features: {
        title: 'Innovación en Acción',
        subtitle: 'Tecnología disruptiva que redefine posibilidades',
        items: [
          {
            title: 'Vanguardia Tecnológica',
            description: 'Utilizamos las últimas innovaciones para crear ventajas competitivas'
          },
          {
            title: 'Pensamiento Disruptivo',
            description: 'Cuestionamos todo y reinventamos las reglas del juego'
          },
          {
            title: 'Futuro Hoy',
            description: 'Implementamos soluciones que otros aún están imaginando'
          }
        ]
      },
      about: {
        title: `La Revolución ${brief.brand.name}`,
        description: `No somos una empresa tradicional de ${brief.brand.industry}. Somos disruptores, innovadores que creen que todo puede mejorarse. Cada proyecto es una oportunidad de cambiar las reglas y crear el futuro.`,
        values: brief.brand.values || 'Innovación radical, audacia y transformación constante'
      },
      contact: {
        title: 'Únete a la Revolución',
        subtitle: 'Construyamos juntos el futuro de tu industria',
        description: 'Si estás listo para romper moldes y liderar el cambio, hablemos.'
      }
    };

    return content[section];
  }

  generateElegantContent(section, brief) {
    const content = {
      hero: {
        title: `Distinción en ${brief.brand.industry}`,
        subtitle: `${brief.brand.name}: Donde la elegancia encuentra la funcionalidad`,
        description: `Creamos experiencias excepcionales que reflejan sofisticación y atención al detalle. Cada elemento está cuidadosamente diseñado para superar expectativas.`
      },
      features: {
        title: 'Excelencia Refinada',
        subtitle: 'Servicios de distinción para clientes exigentes',
        items: [
          {
            title: 'Atención Exclusiva',
            description: 'Servicios premium diseñados para satisfacer los más altos estándares'
          },
          {
            title: 'Diseño Sofisticado',
            description: 'Cada detalle refleja elegancia y funcionalidad superior'
          },
          {
            title: 'Experiencia Premium',
            description: 'Tratamiento VIP desde el primer contacto hasta la entrega final'
          }
        ]
      },
      about: {
        title: `El Arte de ${brief.brand.name}`,
        description: `Representamos la excelencia en ${brief.brand.industry}. Cada proyecto es una obra maestra, cuidadosamente crafteada para clientes que valoran la distinción y la calidad sin compromisos.`,
        values: brief.brand.values || 'Elegancia, exclusividad y perfección en cada detalle'
      },
      contact: {
        title: 'Conversación Distinguida',
        subtitle: 'Discutamos su visión de excelencia',
        description: 'Reservamos tiempo exclusivo para comprender sus expectativas más refinadas.'
      }
    };

    return content[section];
  }

  generateDynamicContent(section, brief) {
    const content = {
      hero: {
        title: `¡Energía pura en ${brief.brand.industry}!`,
        subtitle: `${brief.brand.name} - Velocidad, creatividad y resultados épicos`,
        description: `¿Estás listo para la aventura? Transformamos ideas en realidades increíbles con la energía de un equipo que nunca se rinde. ¡Vamos a brillar juntos!`
      },
      features: {
        title: '¡Somos Imparables!',
        subtitle: 'Energía contagiosa que impulsa tu éxito',
        items: [
          {
            title: 'Velocidad Extrema',
            description: '¡Nos movemos rápido y entregamos resultados que te van a encantar!'
          },
          {
            title: 'Creatividad Sin Límites',
            description: 'Ideas frescas, soluciones únicas y mucha diversión en el proceso'
          },
          {
            title: 'Resultados Épicos',
            description: 'No hacemos las cosas a medias. Cada proyecto es una obra maestra'
          }
        ]
      },
      about: {
        title: `¡Conoce al Team ${brief.brand.name}!`,
        description: `Somos un grupo de apasionados de ${brief.brand.industry} que creemos que el trabajo debe ser emocionante. Combinamos experiencia con energía juvenil para crear experiencias inolvidables.`,
        values: brief.brand.values || 'Pasión, energía y diversión en todo lo que hacemos'
      },
      contact: {
        title: '¡Conectemos!',
        subtitle: '¿Listo para empezar esta aventura juntos?',
        description: '¡Escríbenos! Queremos conocer tu proyecto y hacerlo realidad de la forma más épica posible.'
      }
    };

    return content[section];
  }

  generateTechnicalContent(section, brief) {
    const content = {
      hero: {
        title: `Soluciones Técnicas Especializadas en ${brief.brand.industry}`,
        subtitle: `${brief.brand.name}: Expertise técnico de vanguardia`,
        description: `Implementamos arquitecturas robustas y metodologías probadas para resolver desafíos técnicos complejos. Nuestra experiencia especializada garantiza soluciones escalables y eficientes.`
      },
      features: {
        title: 'Competencias Técnicas Avanzadas',
        subtitle: 'Especialización profunda en tecnologías de vanguardia',
        items: [
          {
            title: 'Arquitectura Escalable',
            description: 'Diseños técnicos robustos que soportan crecimiento exponencial'
          },
          {
            title: 'Optimización Avanzada',
            description: 'Performance tuning y optimización de recursos críticos'
          },
          {
            title: 'Integración Compleja',
            description: 'Conectividad seamless entre sistemas enterprise'
          }
        ]
      },
      about: {
        title: `Expertise Técnico ${brief.brand.name}`,
        description: `Nuestro equipo combina profundo conocimiento técnico con experiencia práctica en implementaciones enterprise. Especializados en arquitecturas complejas y soluciones de alta disponibilidad en ${brief.brand.industry}.`,
        values: brief.brand.values || 'Precisión técnica, innovación y excelencia operacional'
      },
      contact: {
        title: 'Consultoría Técnica Especializada',
        subtitle: 'Analicemos los requerimientos técnicos de su proyecto',
        description: 'Nuestros arquitectos senior están disponibles para deep-dive técnicos y diseño de soluciones.'
      }
    };

    return content[section];
  }

  generateCTAs(brief) {
    const baseCTAs = brief.content.cta || [];
    const toneCTAs = {
      'Profesional y formal': [
        'Solicitar Consultoría',
        'Agendar Reunión',
        'Obtener Propuesta',
        'Contactar Especialista'
      ],
      'Amigable y cercano': [
        'Charlemos',
        'Empecemos Juntos',
        '¡Hablemos!',
        'Contáctanos'
      ],
      'Innovador y disruptivo': [
        'Revolucionar Ahora',
        'Transformar Todo',
        'Romper Moldes',
        'Crear el Futuro'
      ],
      'Elegante y sofisticado': [
        'Experiencia Premium',
        'Servicio Exclusivo',
        'Distinción Total',
        'Excelencia Garantizada'
      ],
      'Juvenil y dinámico': [
        '¡Súmate!',
        '¡Vamos!',
        'Hagámoslo Épico',
        '¡Empezamos Ya!'
      ],
      'Técnico y especializado': [
        'Implementar Solución',
        'Analizar Requerimientos',
        'Consulta Técnica',
        'Arquitectura Personalizada'
      ]
    };

    return [
      ...baseCTAs,
      ...(toneCTAs[brief.brand.tone] || toneCTAs['Profesional y formal'])
    ].slice(0, 5);
  }

  generateSEOContent(brief) {
    const industryKeywords = this.getIndustryKeywords(brief.brand.industry);
    const location = 'España'; // Por defecto
    
    return {
      title: `${brief.brand.name} - ${brief.brand.industry} Profesional | ${location}`,
      description: `${brief.brand.name}: Especialistas en ${brief.brand.industry} para ${brief.brand.targetAudience}. ${brief.brand.values || 'Calidad garantizada'}. Contacta hoy.`,
      keywords: [
        brief.brand.industry,
        brief.brand.name.toLowerCase(),
        ...brief.brand.targetAudience.split(' ').slice(0, 2),
        ...industryKeywords,
        location.toLowerCase()
      ].join(', '),
      h1: `${brief.brand.name}: Líder en ${brief.brand.industry}`,
      h2: [
        `Servicios de ${brief.brand.industry} en ${location}`,
        `¿Por qué elegir ${brief.brand.name}?`,
        `Contacto y ubicación`,
        `Casos de éxito en ${brief.brand.industry}`
      ]
    };
  }

  getIndustryKeywords(industry) {
    const industryLower = industry.toLowerCase();
    
    for (const [key, keywords] of Object.entries(this.industryKeywords)) {
      if (industryLower.includes(key)) {
        return keywords;
      }
    }
    
    return ['calidad', 'experiencia', 'profesional', 'servicios', 'soluciones'];
  }

  generateSocialContent(brief) {
    const baseTone = brief.brand.tone;
    
    return {
      facebook: {
        bio: `${brief.brand.name} - Especialistas en ${brief.brand.industry}. ${brief.brand.values || 'Tu éxito es nuestro compromiso'}.`,
        posts: [
          `🚀 Nuevos proyectos en ${brief.brand.industry}. ¡Síguenos para ver nuestro trabajo!`,
          `💼 ¿Necesitas ayuda con ${brief.brand.industry}? Estamos aquí para ti.`,
          `⭐ Gracias a nuestros clientes por confiar en ${brief.brand.name}`
        ]
      },
      instagram: {
        bio: `${brief.brand.name} ✨\n📍 ${brief.brand.industry}\n🎯 ${brief.brand.targetAudience}\n👇 Contacto`,
        hashtags: [
          `#${brief.brand.name.replace(/\s+/g, '')}`,
          `#${brief.brand.industry.replace(/\s+/g, '')}`,
          '#emprendimiento',
          '#calidad',
          '#profesional'
        ]
      },
      linkedin: {
        company: `${brief.brand.name} es una empresa especializada en ${brief.brand.industry}, enfocada en brindar soluciones de calidad a ${brief.brand.targetAudience}. ${brief.brand.values || 'Nuestro compromiso es la excelencia'}.`,
        posts: [
          `Nuevo artículo sobre tendencias en ${brief.brand.industry}`,
          `Caso de éxito: Cómo ayudamos a nuestros clientes`,
          `${brief.brand.name} crece y busca nuevos talentos`
        ]
      }
    };
  }

  generateNewsletterContent(brief) {
    return {
      welcome: {
        subject: `¡Bienvenido a ${brief.brand.name}!`,
        content: `Gracias por suscribirte. Te mantendremos informado sobre ${brief.brand.industry} y nuestras novedades.`
      },
      monthly: {
        subject: `Newsletter ${brief.brand.name} - Novedades del mes`,
        sections: [
          'Tendencias en la industria',
          'Casos de éxito',
          'Tips profesionales',
          'Próximos eventos'
        ]
      }
    };
  }

  adaptContentForAudience(content, audience) {
    const audienceLower = audience.toLowerCase();
    
    if (audienceLower.includes('empresa') || audienceLower.includes('corporativo')) {
      return this.makeContentMoreCorporate(content);
    } else if (audienceLower.includes('pyme') || audienceLower.includes('pequeña')) {
      return this.makeContentMoreAccessible(content);
    } else if (audienceLower.includes('joven') || audienceLower.includes('startup')) {
      return this.makeContentMoreDynamic(content);
    }
    
    return content;
  }

  makeContentMoreCorporate(content) {
    // Adaptar vocabulario para empresas grandes
    return content.replace(/\b(ayudamos|te)\b/gi, 'asistimos a su organización')
                  .replace(/\btú\b/gi, 'su empresa')
                  .replace(/\bnosotros\b/gi, 'nuestro equipo');
  }

  makeContentMoreAccessible(content) {
    // Simplificar para PYMEs
    return content.replace(/metodologías/gi, 'métodos')
                  .replace(/implementación/gi, 'puesta en marcha')
                  .replace(/optimización/gi, 'mejora');
  }

  makeContentMoreDynamic(content) {
    // Hacer más dinámico para audiencia joven
    return content.replace(/servicios/gi, 'soluciones increíbles')
                  .replace(/profesional/gi, 'top-tier')
                  .replace(/calidad/gi, 'excelencia total');
  }
}