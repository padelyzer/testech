export class ComponentExtractor {
  constructor() {
    this.componentTemplates = {
      header: this.generateHeader,
      hero: this.generateHero,
      card: this.generateCard,
      button: this.generateButton,
      footer: this.generateFooter
    };
  }

  async generateFromAnalysis(analysis) {
    const components = [];
    
    if (analysis.components) {
      for (const component of analysis.components) {
        const generated = await this.generateComponent(component, analysis);
        if (generated) {
          components.push(generated);
        }
      }
    }
    
    return {
      components,
      styles: this.generateStyles(analysis),
      layout: this.generateLayout(analysis),
      metadata: {
        generated: new Date().toISOString(),
        source: analysis.metadata?.title || 'Unknown',
        framework: 'Next.js + Tailwind CSS'
      }
    };
  }

  async generateComponent(componentData, analysis) {
    const generator = this.componentTemplates[componentData.type];
    if (generator) {
      return generator.call(this, componentData, analysis);
    }
    return null;
  }

  generateHeader(componentData, analysis) {
    return {
      name: 'Header',
      type: 'header',
      code: `
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="text-2xl font-bold text-gray-900">
              Logo
            </a>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Services
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}`,
      props: [],
      dependencies: []
    };
  }

  generateHero(componentData, analysis) {
    const primaryColor = analysis.colors?.primary || '#007bff';
    
    return {
      name: 'Hero',
      type: 'hero',
      code: `
export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            ${analysis.metadata?.title || 'Amazing Design'}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            ${analysis.metadata?.description || 'Transform your ideas into reality with our professional design services.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      props: [],
      dependencies: []
    };
  }

  generateCard(componentData, analysis) {
    return {
      name: 'Card',
      type: 'card',
      code: `
export default function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          Learn More →
        </button>
      </div>
    </div>
  );
}`,
      props: [
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'string', required: true },
        { name: 'image', type: 'string', required: false }
      ],
      dependencies: []
    };
  }

  generateButton(componentData, analysis) {
    return {
      name: 'Button',
      type: 'button',
      code: `
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}`,
      props: [
        { name: 'children', type: 'ReactNode', required: true },
        { name: 'variant', type: "'primary' | 'secondary' | 'outline'", required: false },
        { name: 'size', type: "'sm' | 'md' | 'lg'", required: false },
        { name: 'onClick', type: 'function', required: false }
      ],
      dependencies: []
    };
  }

  generateFooter(componentData, analysis) {
    return {
      name: 'Footer',
      type: 'footer',
      code: `
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Your Company</h3>
            <p className="text-gray-300 mb-4">
              Building amazing digital experiences that inspire and engage users worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>hello@company.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`,
      props: [],
      dependencies: []
    };
  }

  generateStyles(analysis) {
    const colors = analysis.colors || {};
    
    return {
      tailwind: {
        theme: {
          extend: {
            colors: {
              primary: colors.primary || '#007bff',
              secondary: colors.secondary || '#6c757d',
              accent: colors.accent || '#28a745'
            }
          }
        }
      },
      css: `
/* Custom styles based on design analysis */
:root {
  --color-primary: ${colors.primary || '#007bff'};
  --color-secondary: ${colors.secondary || '#6c757d'};
  --color-accent: ${colors.accent || '#28a745'};
}
      `
    };
  }

  generateLayout(analysis) {
    return {
      type: analysis.layout?.type || 'standard',
      sections: analysis.layout?.sections || ['header', 'main', 'footer'],
      grid: analysis.layout?.grid || '12-column'
    };
  }
}