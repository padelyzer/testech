# 🎨 Crypto Platform Design System

## Design System basado en el diseño de Najeeb Khalid

### 🎯 Paleta de Colores

#### Color Principal
- **Primary**: `#E3FD72` (Verde lima/amarillo neón)
- **Primary Dark**: `#d5ed62`
- **Primary Light**: `#e8ff82`

#### Dark Mode
- **Background**: `#000000` (Negro puro)
- **Surface**: `#0A0A0A` (Casi negro)
- **Border**: `#262626` (Gris muy oscuro)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A3A3A3`

#### Light Mode
- **Background**: `#FFFFFF` (Blanco)
- **Surface**: `#F5F5F5` (Gris muy claro)
- **Border**: `#E5E5E5` (Gris claro)
- **Text Primary**: `#000000`
- **Text Secondary**: `#525252`

### 📦 Componentes Implementados

1. **Header.jsx**
   - Navegación responsive
   - Toggle de tema dark/light integrado
   - Logo y menú de navegación
   - Botón CTA con color primary

2. **Hero.jsx**
   - Sección hero estilo crypto
   - Badge de feature
   - Título con color de acento
   - Estadísticas destacadas
   - CTAs prominentes

3. **Card.jsx**
   - Card base reutilizable
   - FeatureCard para características
   - StatsCard para estadísticas crypto
   - Efectos hover y glassmorphism sutil

4. **Button.jsx**
   - 5 variantes: primary, secondary, outline, ghost, dark
   - 4 tamaños: sm, md, lg, xl
   - IconButton para iconos
   - ButtonGroup para agrupar botones

5. **ThemeProvider.jsx**
   - Context API para gestión de temas
   - Persistencia en localStorage
   - Detección de preferencia del sistema
   - Hook useTheme para acceso fácil

### 🔧 Configuración

#### Tailwind CSS (`tailwind.config.js`)
- Dark mode con clase
- Colores personalizados crypto
- Animaciones (fade-in, slide-up, glow)
- Sombras con efecto glow
- Fuentes: Inter para UI, JetBrains Mono para código

#### Estilos Globales (`globals.css`)
- Variables CSS para temas
- Estilos base responsive
- Componentes glassmorphism
- Scrollbar personalizado
- Utilidades de gradientes y animaciones

### 🚀 Uso

```jsx
import { ThemeProvider } from './ThemeProvider';
import Header from './Header';
import Hero from './Hero';
import Card from './Card';
import Button from './Button';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black">
        <Header />
        <Hero />
        {/* Tu contenido */}
      </div>
    </ThemeProvider>
  );
}
```

### ✨ Características

- **Dark/Light Mode**: Toggle suave con transiciones
- **Responsive**: Mobile-first design
- **Accesible**: ARIA labels y focus states
- **Performante**: Optimizado con Tailwind
- **Moderno**: Glassmorphism y efectos sutiles
- **Consistente**: Design system unificado

### 🎨 Inspiración

Diseño basado en:
- [Dribbble](https://dribbble.com/shots/25919515-Crypto-Platform-UI-UX-Design-Blockchain)
- [Behance](https://www.behance.net/gallery/221271317/Crypto-Platform-UIUX-Design-Blockchain)

Por Najeeb Khalid - Crypto Platform UI/UX Design