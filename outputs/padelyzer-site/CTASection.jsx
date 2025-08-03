import React from 'react';
import Button from './Button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Beta CTA for Clubs */}
        <div className="bg-black dark:bg-white rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden mb-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E3FD72] rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#E3FD72] rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3FD72] text-black mb-6">
              <span className="text-sm font-bold">🔥 BETA EXCLUSIVA</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-black mb-4">
              Solo 4 clubes en Puebla
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-8 max-w-2xl mx-auto">
              Sé pionero en la revolución del padel. Digitaliza tu club gratis y obtén ventaja 
              competitiva antes que tu competencia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Reservar mi lugar
              </Button>
              <Button variant="outline" size="lg" className="border-white dark:border-black text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white">
                Agendar demo
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-6">
              Sin tarjeta de crédito • Sin compromisos • Setup en 24h
            </p>
          </div>
        </div>

        {/* Players CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#E3FD72] to-[#d5ed62] rounded-3xl p-8 lg:p-12">
            <div className="text-black">
              <h3 className="text-3xl font-bold mb-4">
                ¿Listo para mejorar tu juego?
              </h3>
              <p className="text-lg mb-6 text-black/80">
                Descubre tu verdadero nivel con Padel IQ. Analiza tu técnica, 
                encuentra rivales de tu nivel y mejora con tu coach IA personal.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Análisis de +15 golpes</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Nivel real, sin trampas</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Comunidad de jugadores</span>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <Button variant="dark" size="md">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </Button>
                <Button variant="dark" size="md">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-black dark:text-white mb-8">
              La revolución en números
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-5xl font-bold text-[#E3FD72] mb-1">€0</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Costo de reservas (Playtomic cobra €250/mes)
                </p>
              </div>
              
              <div>
                <div className="text-5xl font-bold text-[#E3FD72] mb-1">100%</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Precisión en clasificación con IA
                </p>
              </div>
              
              <div>
                <div className="text-5xl font-bold text-[#E3FD72] mb-1">24h</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Setup completo para tu club
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}