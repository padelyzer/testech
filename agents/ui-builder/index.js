import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UIBuilder {
  constructor() {
    this.outputBase = path.join(process.cwd(), 'outputs', 'builds');
    this.templates = {
      landing: this.generateLandingPage,
      website: this.generateWebsite
    };
  }

  async generateFromBrief(brief) {
    const projectName = this.sanitizeProjectName(brief.brand.name);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(this.outputBase, `${projectName}-${timestamp}`);

    // Crear directorio del proyecto
    await mkdir(outputPath, { recursive: true });

    // Generar estructura base de Next.js
    await this.createNextJSStructure(outputPath, brief);

    // Generar componentes basados en el brief
    await this.generateComponents(outputPath, brief);

    // Generar páginas
    await this.generatePages(outputPath, brief);

    // Generar estilos
    await this.generateStyles(outputPath, brief);

    // Generar archivos de configuración
    await this.generateConfig(outputPath, brief);

    return {
      outputPath,
      projectName,
      brief,
      sections: this.generateSectionList(brief),
      tech: {
        framework: 'Next.js 14',
        styling: 'Tailwind CSS',
        components: 'React',
        animations: 'CSS Transitions'
      }
    };
  }

  sanitizeProjectName(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async createNextJSStructure(outputPath, brief) {
    const dirs = [
      'src/components',
      'src/components/ui',
      'src/components/sections',
      'src/app',
      'src/lib',
      'src/styles',
      'public',
      'public/images'
    ];

    for (const dir of dirs) {
      await mkdir(path.join(outputPath, dir), { recursive: true });
    }
  }

  async generateComponents(outputPath, brief) {
    // Generar componentes UI básicos
    await this.generateUIComponents(outputPath, brief);
    
    // Generar componentes de secciones
    await this.generateSectionComponents(outputPath, brief);
  }

  async generateUIComponents(outputPath, brief) {
    const components = {
      'Button.jsx': this.generateButtonComponent(brief),
      'Card.jsx': this.generateCardComponent(brief),
      'Container.jsx': this.generateContainerComponent(brief),
      'Logo.jsx': this.generateLogoComponent(brief)
    };

    for (const [filename, content] of Object.entries(components)) {
      await writeFile(
        path.join(outputPath, 'src/components/ui', filename),
        content
      );
    }
  }

  generateButtonComponent(brief) {
    const primaryColor = brief.design.colorPalette.primary || '#0066FF';
    
    return `import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
}`;
  }

  generateCardComponent(brief) {
    return `import React from 'react';

export default function Card({ 
  children, 
  className = '',
  hover = false,
  padding = 'md'
}) {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : '';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return (
    <div className={\`\${baseClasses} \${hoverClasses} \${paddings[padding]} \${className}\`}>
      {children}
    </div>
  );
}`;
  }

  generateContainerComponent(brief) {
    return `import React from 'react';

export default function Container({ 
  children, 
  className = '',
  size = 'default'
}) {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };
  
  return (
    <div className={\`\${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 \${className}\`}>
      {children}
    </div>
  );
}`;
  }

  generateLogoComponent(brief) {
    return `import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <div className={\`text-2xl font-bold text-primary \${className}\`}>
      ${brief.brand.name}
    </div>
  );
}`;
  }

  async generateSectionComponents(outputPath, brief) {
    const sections = {
      'Header.jsx': this.generateHeaderComponent(brief),
      'Hero.jsx': this.generateHeroComponent(brief),
      'Features.jsx': this.generateFeaturesComponent(brief),
      'Contact.jsx': this.generateContactComponent(brief),
      'Footer.jsx': this.generateFooterComponent(brief)
    };

    for (const [filename, content] of Object.entries(sections)) {
      await writeFile(
        path.join(outputPath, 'src/components/sections', filename),
        content
      );
    }
  }

  generateHeaderComponent(brief) {
    return `import React, { useState } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inicio', href: '#' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Contacto', href: '#contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-6">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button>Contactar</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary font-medium"
                >
                  {item.name}
                </a>
              ))}
              <Button className="mt-4">Contactar</Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}`;
  }

  generateHeroComponent(brief) {
    const title = brief.brand.tagline || `Bienvenido a ${brief.brand.name}`;
    const description = `Somos especialistas en ${brief.brand.industry} enfocados en ${brief.brand.targetAudience}`;
    
    return `import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-32">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ${title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-light max-w-2xl mx-auto">
            ${description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              ${brief.content.cta[0] || 'Empezar Ahora'}
            </Button>
            <Button size="lg" variant="outline">
              Conocer Más
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}`;
  }

  generateFeaturesComponent(brief) {
    return `import React from 'react';
import Container from '../ui/Container';
import Card from '../ui/Card';

export default function Features() {
  const features = [
    {
      title: 'Profesional',
      description: 'Servicios de alta calidad para ${brief.brand.targetAudience}',
      icon: '🚀'
    },
    {
      title: 'Confiable',
      description: 'Años de experiencia en ${brief.brand.industry}',
      icon: '⭐'
    },
    {
      title: 'Innovador',
      description: 'Soluciones modernas y actualizadas',
      icon: '💡'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir ${brief.brand.name}?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ${brief.brand.values || 'Ofrecemos soluciones excepcionales'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}`;
  }

  generateContactComponent(brief) {
    return `import React, { useState } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contacta con nosotros
          </h2>
          <p className="text-xl text-gray-600">
            Estamos aquí para ayudarte con ${brief.brand.industry}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full">
                ${brief.content.cta[1] || 'Enviar Mensaje'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}`;
  }

  generateFooterComponent(brief) {
    return `import React from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <Logo className="text-white mb-4" />
            <p className="text-gray-300 mb-4 max-w-md">
              ${brief.brand.values || `Expertos en ${brief.brand.industry} comprometidos con la excelencia.`}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>info@${this.sanitizeProjectName(brief.brand.name)}.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} ${brief.brand.name}. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}`;
  }

  async generatePages(outputPath, brief) {
    // Generar página principal
    const homePage = this.generateHomePage(brief);
    await writeFile(path.join(outputPath, 'src/app/page.jsx'), homePage);

    // Generar layout
    const layout = this.generateLayout(brief);
    await writeFile(path.join(outputPath, 'src/app/layout.jsx'), layout);
  }

  generateHomePage(brief) {
    return `import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}`;
  }

  generateLayout(brief) {
    return `import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '${brief.brand.name} - ${brief.brand.tagline || brief.brand.industry}',
  description: '${brief.brand.values || `Especialistas en ${brief.brand.industry}`}',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`;
  }

  async generateStyles(outputPath, brief) {
    const globalCSS = this.generateGlobalCSS(brief);
    await writeFile(path.join(outputPath, 'src/app/globals.css'), globalCSS);

    const tailwindConfig = this.generateTailwindConfig(brief);
    await writeFile(path.join(outputPath, 'tailwind.config.js'), tailwindConfig);
  }

  generateGlobalCSS(brief) {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: ${brief.design.colorPalette.primary};
  --color-secondary: ${brief.design.colorPalette.secondary};
  --color-accent: ${brief.design.colorPalette.accent};
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${brief.design.typography.body.family};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${brief.design.typography.headings.family};
    font-weight: ${brief.design.typography.headings.weight};
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-dark;
  }
  
  .text-primary {
    color: var(--color-primary);
  }
  
  .bg-primary {
    background-color: var(--color-primary);
  }
  
  .border-primary {
    border-color: var(--color-primary);
  }
}`;
  }

  generateTailwindConfig(brief) {
    const primaryColor = brief.design.colorPalette.primary;
    
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${primaryColor}',
          dark: '${this.darkenColor(primaryColor)}',
          light: '${this.lightenColor(primaryColor)}',
        },
        secondary: '${brief.design.colorPalette.secondary}',
        accent: '${brief.design.colorPalette.accent}',
      },
      fontFamily: {
        sans: ['${brief.design.typography.body.family}'],
        heading: ['${brief.design.typography.headings.family}'],
      },
    },
  },
  plugins: [],
}`;
  }

  async generateConfig(outputPath, brief) {
    // package.json
    const packageJson = {
      name: this.sanitizeProjectName(brief.brand.name),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: `next dev -p ${brief.technical.port}`,
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        next: '14.0.0',
        react: '^18',
        'react-dom': '^18'
      },
      devDependencies: {
        autoprefixer: '^10',
        eslint: '^8',
        'eslint-config-next': '14.0.0',
        postcss: '^8',
        tailwindcss: '^3'
      }
    };

    await writeFile(
      path.join(outputPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // next.config.js
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`;

    await writeFile(path.join(outputPath, 'next.config.js'), nextConfig);

    // PostCSS config
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    await writeFile(path.join(outputPath, 'postcss.config.js'), postcssConfig);
  }

  generateSectionList(brief) {
    return [
      { name: 'Header', component: 'Header' },
      { name: 'Hero', component: 'Hero' },
      { name: 'Features', component: 'Features' },
      { name: 'Contact', component: 'Contact' },
      { name: 'Footer', component: 'Footer' }
    ];
  }

  darkenColor(color) {
    // Simplificado - en producción usaría una librería de colores
    return color.replace(/[0-9A-F]/gi, (char) => {
      const num = parseInt(char, 16);
      return Math.max(0, num - 2).toString(16);
    });
  }

  lightenColor(color) {
    // Simplificado - en producción usaría una librería de colores
    return color.replace(/[0-9A-F]/gi, (char) => {
      const num = parseInt(char, 16);
      return Math.min(15, num + 3).toString(16);
    });
  }
}