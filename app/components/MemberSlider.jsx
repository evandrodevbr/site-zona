"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

function generateRotations(count) {
  const rotations = [];
  for (let i = 0; i < count; i++) {
    // Usa o índice para gerar ângulos distribuídos entre -45 e 45 graus
    rotations.push(-45 + (90 * (i / count)));
  }
  return rotations;
}

export default function MemberSlider({ members }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Gera rotações fixas para as pérolas
  const rotations = useMemo(() => generateRotations(10), []);

  useEffect(() => {
    if (members.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % members.length);
        setIsTransitioning(false);
      }, 500); // Tempo da transição
    }, 10000); // Muda a cada 10 segundos

    return () => clearInterval(interval);
  }, [members.length]);

  if (!members.length) return null;

  const currentMember = members[currentIndex];

  return (
    <div className="relative w-full min-h-[600px] overflow-hidden bg-black mb-16">
      {/* Imagem de fundo com efeito de pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="flex gap-8 p-4 animate-scroll">
          {rotations.map((rotation, i) => (
            currentMember.quotes.map((quote, index) => (
              <div
                key={`${i}-${index}`}
                className="text-white text-2xl font-bold whitespace-nowrap"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  opacity: 0.1
                }}
              >
                {quote}
              </div>
            ))
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
          {/* Imagem */}
          <div className="relative w-72 h-72 mx-auto md:w-[500px] md:h-[500px] transform hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-orange-500 rounded-lg opacity-20 blur-xl animate-pulse" />
            <Image
              src={`/members/${currentMember.image}`}
              alt={currentMember.name}
              className="rounded-lg object-cover shadow-2xl ring-4 ring-orange-500/50"
              fill
              sizes="(max-width: 768px) 288px, 500px"
              priority
            />
          </div>

          {/* Informações */}
          <div className="text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
                {currentMember.name}
              </h2>
              <div className="h-1 w-32 bg-orange-500 rounded-full mx-auto md:mx-0" />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {currentMember.description}
            </p>
            
            <div className="space-y-4 bg-black/50 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-orange-500 font-semibold text-xl">Pérolas Memoráveis:</h3>
              {currentMember.quotes.slice(0, 3).map((quote, index) => (
                <p
                  key={index}
                  className="text-white italic text-lg border-l-4 border-orange-500/50 pl-4"
                >
                  "{quote}"
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      {members.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {members.map((_, index) => (
            <button
              key={index}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 bg-orange-500' 
                  : 'w-2 bg-gray-500 hover:bg-orange-500/50'
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
} 