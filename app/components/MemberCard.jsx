"use client";

import Image from 'next/image';
import TypeWriter from './TypeWriter';
import { useState, useCallback, memo } from 'react';

const YouTubeShort = memo(({ videoId }) => (
  <div className="relative w-full pt-[177.77%]">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1&fs=0&iv_load_policy=3&disablekb=1`}
      className="absolute top-0 left-0 w-full h-full rounded-lg"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube Short"
    />
  </div>
));

YouTubeShort.displayName = 'YouTubeShort';

const MemberCard = memo(function MemberCard({ member }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreQuotes = member.quotes.length > 5;
  const visibleQuotes = isExpanded ? member.quotes : member.quotes.slice(0, 5);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const renderQuote = useCallback((quote, index) => (
    <li 
      key={index} 
      className="text-gray-400 text-sm pl-4 border-l-2 border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-300"
    >
      <span className="text-orange-500/70">{index + 1}.</span>{" "}
      {quote}
    </li>
  ), []);

  return (
    <div className={`group relative bg-gradient-to-b from-black to-gray-900 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${isExpanded ? 'z-10' : 'z-0'} inline-block w-full`}>
      {/* Efeito de glow no hover */}
      <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 rounded-lg blur-xl transition-opacity duration-500" />
      
      {/* Conteúdo do card */}
      <div className="relative">
        {/* Container da imagem com borda gradiente */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-white opacity-20 rounded-lg blur-md animate-pulse" />
          <div className="relative w-full h-full">
            {/* Contador de pérolas ou indicador de vídeo */}
            <div className="absolute -left-2 -top-2 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              {member.video ? '🎥 Short' : `${member.quotes.length} 💎`}
            </div>
            <Image
              src={`/members/${member.image}`}
              alt={member.name}
              className="rounded-lg object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500/50 transition-all duration-300"
              fill
              sizes="(max-width: 768px) 160px, 160px"
              priority={false}
              loading="lazy"
            />
            <div className={`absolute -bottom-2 -right-2 w-4 h-4 rounded-full border-2 border-black ${
              member.status === 'online' 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-gray-500'
            }`} />
          </div>
        </div>

        {/* Nome e descrição */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent mb-2">
            <TypeWriter key={member.name} text={member.name} delay={70} />
          </h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-orange-500 to-transparent mx-auto mb-3" />
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            <TypeWriter key={member.description} text={member.description} delay={30} />
          </p>
        </div>

        {/* Conteúdo: Vídeo ou Pérolas */}
        <div className={`space-y-3 transition-all duration-500 ${isExpanded ? 'relative bg-black/50 rounded-lg p-4' : ''}`}>
          <div className="flex items-center">
            <h4 className="text-orange-500 font-semibold">
              {member.video ? 'Short:' : 'Pérolas:'}
            </h4>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent ml-3" />
          </div>

          {member.video ? (
            <div className="w-full max-w-[280px] mx-auto">
              <YouTubeShort videoId={member.video.id} />
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {visibleQuotes.map(renderQuote)}
              </ul>
              
              {/* Botão Ver Mais/Ver Menos */}
              {hasMoreQuotes && (
                <button
                  onClick={toggleExpand}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 text-orange-500 rounded-lg transition-all duration-300 border border-orange-500/20 hover:border-orange-500/40"
                >
                  {isExpanded ? (
                    <>
                      Ver Menos <span className="ml-1">↑</span>
                    </>
                  ) : (
                    <>
                      Ver Mais {member.quotes.length - 5} Pérolas <span className="ml-1">↓</span>
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';
export default MemberCard; 