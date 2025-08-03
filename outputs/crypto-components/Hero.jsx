import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white dark:bg-black transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#E3FD72]/10 dark:bg-[#E3FD72]/20 mb-8">
            <span className="text-sm font-medium text-black dark:text-white">
              🚀 New Feature: Multi-Chain Support
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight">
            The Future of
            <span className="block text-[#E3FD72]">Crypto Trading</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Trade, earn, and manage your digital assets with the most advanced crypto platform. Built for traders, by traders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#E3FD72] text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d5ed62] transition-all transform hover:scale-105">
              Start Trading Now
            </button>
            <button className="border-2 border-gray-300 dark:border-gray-700 text-black dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">$2.4B+</div>
              <div className="text-gray-600 dark:text-gray-400">24h Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">1.2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E3FD72] mb-2">150+</div>
              <div className="text-gray-600 dark:text-gray-400">Cryptocurrencies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}