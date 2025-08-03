import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-black transition-colors duration-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#E3FD72] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E3FD72] rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3FD72]/10 dark:bg-[#E3FD72]/20 mb-8 animate-fade-in">
            <span className="text-sm font-medium text-black dark:text-white">
              🚀 Beta exclusiva: Solo 4 clubes disponibles en Puebla
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight animate-slide-up">
            El futuro del padel
            <span className="block text-[#E3FD72]">es inteligente</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            La primera plataforma que combina IA, computer vision y ciencia para revolucionar 
            cómo juegas y gestionas el padel.
          </p>

          {/* Split CTA Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Para Clubes */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animation-delay-400">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Para Clubes
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Digitaliza tu club gratis. Gestión completa con IA: reservas, torneos, finanzas y BI.
              </p>
              <Button variant="primary" size="lg" className="w-full">
                Digitaliza tu club gratis
              </Button>
              <p className="text-sm text-[#E3FD72] mt-3 font-medium">
                Sin costos ocultos • Sin comisiones
              </p>
            </div>

            {/* Para Jugadores */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in animation-delay-600">
              <div className="text-4xl mb-4">🎾</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                Para Jugadores
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tu coach IA personal. Analiza tu juego, mejora tu técnica y encuentra rivales de tu nivel real.
              </p>
              <div className="flex gap-3">
                <Button variant="dark" size="lg" className="flex-1">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </Button>
                <Button variant="dark" size="lg" className="flex-1">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Gratis para reservas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">+15</div>
              <div className="text-gray-600 dark:text-gray-400">Golpes analizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">0-100</div>
              <div className="text-gray-600 dark:text-gray-400">Escala Padel IQ</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">IA</div>
              <div className="text-gray-600 dark:text-gray-400">Computer Vision</div>
            </div>
          </div>

          {/* Trust Signal */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Revolucionando el padel con tecnología de
            </p>
            <div className="flex items-center justify-center gap-8 mt-4 opacity-60">
              <span className="font-mono text-gray-600 dark:text-gray-400">TensorFlow</span>
              <span className="font-mono text-gray-600 dark:text-gray-400">MediaPipe</span>
              <span className="font-mono text-gray-600 dark:text-gray-400">Computer Vision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}