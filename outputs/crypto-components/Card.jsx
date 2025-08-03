import React from 'react';

export default function Card({ 
  title, 
  description, 
  icon, 
  highlight = false,
  className = '' 
}) {
  return (
    <div className={`
      relative p-8 rounded-2xl transition-all duration-300
      ${highlight 
        ? 'bg-[#E3FD72] text-black' 
        : 'bg-gray-50 dark:bg-gray-900 text-black dark:text-white border border-gray-200 dark:border-gray-800'
      }
      hover:transform hover:-translate-y-2 hover:shadow-xl
      ${className}
    `}>
      {/* Icon */}
      {icon && (
        <div className={`
          w-14 h-14 rounded-lg flex items-center justify-center mb-6
          ${highlight 
            ? 'bg-black/10' 
            : 'bg-[#E3FD72]/10 dark:bg-[#E3FD72]/20'
          }
        `}>
          <span className="text-2xl">{icon}</span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className={`
        text-lg leading-relaxed
        ${highlight 
          ? 'text-black/80' 
          : 'text-gray-600 dark:text-gray-400'
        }
      `}>
        {description}
      </p>

      {/* Subtle gradient overlay for non-highlighted cards */}
      {!highlight && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E3FD72]/0 to-[#E3FD72]/5 dark:to-[#E3FD72]/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </div>
  );
}

// Feature Card Component
export function FeatureCard({ feature }) {
  return (
    <Card
      icon={feature.icon}
      title={feature.title}
      description={feature.description}
      highlight={feature.highlight}
    />
  );
}

// Crypto Stats Card Component
export function StatsCard({ stat, value, change, icon }) {
  const isPositive = change > 0;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 dark:text-gray-400">{stat}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      
      <div className="text-3xl font-bold text-black dark:text-white mb-2">
        {value}
      </div>
      
      {change !== undefined && (
        <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
}