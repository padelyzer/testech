import React from 'react';
import Card from './Card';

export default function Features() {
  const features = [
    {
      icon: '🎯',
      title: 'Padel IQ Preciso',
      description: 'Escala 0-100 basada en ciencia real. No más mentiras sobre niveles de juego.',
      highlight: false
    },
    {
      icon: '🤖',
      title: 'Coach IA Personal',
      description: 'Análisis biomecánico de +15 golpes. Ve lo que coaches humanos no pueden detectar.',
      highlight: true
    },
    {
      icon: '💰',
      title: '100% Gratis',
      description: 'Módulo de reservas sin costo, sin comisiones. Playtomic cobra €250 + fees.',
      highlight: false
    },
    {
      icon: '📊',
      title: 'Suite Completa',
      description: 'Desde reservas hasta BI. Torneos de 1,000+ jugadores, ligas de 200+ usuarios.',
      highlight: false
    },
    {
      icon: '🔬',
      title: 'Computer Vision',
      description: 'TensorFlow + MediaPipe para análisis profesional. Vendemos ciencia, no especulación.',
      highlight: false
    },
    {
      icon: '🚀',
      title: 'Modular y Escalable',
      description: 'Activa solo lo que necesitas. Crece con tu club sin compromisos.',
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Por qué Padelyzer es
            <span className="text-[#E3FD72]"> diferente</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            La única plataforma que combina IA real, transparencia total y un modelo justo 
            para revolucionar el padel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              highlight={feature.highlight}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Padelyzer vs La Competencia
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-4 px-6 font-semibold text-black dark:text-white">Característica</th>
                  <th className="text-center py-4 px-6">
                    <span className="text-[#E3FD72] font-bold text-lg">Padelyzer</span>
                  </th>
                  <th className="text-center py-4 px-6 text-gray-500 dark:text-gray-500">Playtomic</th>
                  <th className="text-center py-4 px-6 text-gray-500 dark:text-gray-500">Otros</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Módulo de reservas</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500 font-bold">Gratis</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-500">€250/mes + fees</td>
                  <td className="text-center py-4 px-6 text-gray-500">€150-300/mes</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Análisis con IA</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Gestión financiera</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-400">Limitado</td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Business Intelligence</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Coach IA personal</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500">✓</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                  <td className="text-center py-4 px-6 text-gray-400">✗</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Verificación de nivel</td>
                  <td className="text-center py-4 px-6">
                    <span className="text-green-500">✓ Con IA</span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-400">Autodeclarado</td>
                  <td className="text-center py-4 px-6 text-gray-400">Autodeclarado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}