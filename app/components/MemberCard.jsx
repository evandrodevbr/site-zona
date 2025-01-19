"use client";

import Image from 'next/image';
import TypeWriter from './TypeWriter';
import { useState, useCallback, memo, useLayoutEffect } from 'react';
import { motion } from "motion/react";
import { Hover, ScaleIn, FadeIn, Float, Pulse } from './MotionWrapper';

// Modal de confirmação de idade
const AgeConfirmationModal = memo(({ onConfirm, onDeny }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg max-w-md w-full border border-orange-500/20"
    >
      <h3 className="text-xl font-bold text-orange-500 mb-2">⚠️ Aviso de Conteúdo</h3>
      <p className="text-gray-300 mb-6">Esta imagem pode conter conteúdo sensível. Você confirma que é maior de 18 anos?</p>
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
        >
          Sim, sou maior de 18
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeny}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
        >
          Não
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
));

AgeConfirmationModal.displayName = 'AgeConfirmationModal';

// Componente de imagem com blur condicional
const BlurredImage = memo(({ member, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [isBlurred, setIsBlurred] = useState(member.name.toLowerCase().includes('millanez'));
  const shouldBlur = member.name.toLowerCase().includes('milannez') && isBlurred;

  const handleImageClick = () => {
    if (shouldBlur) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setIsBlurred(false);
    setShowModal(false);
  };

  const handleDeny = () => {
    setShowModal(false);
  };

  return (
    <>
      <div 
        className={`relative w-full h-full cursor-pointer ${shouldBlur ? 'group/blur' : ''}`}
        onClick={handleImageClick}
      >
        <Image
          src={`/members/${member.image}`}
          alt={member.name}
          className={`rounded-lg object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500/50 transition-all duration-300 ${
            shouldBlur ? 'blur-xl brightness-[0.15]' : ''
          }`}
          fill
          sizes="(max-width: 768px) 160px, 160px"
          priority={false}
          loading="lazy"
        />
        {shouldBlur && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="p-3 rounded-full bg-black/50 text-orange-500"
              whileHover={{ scale: 1.1 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828 2.828a9 9 0 001.414 1.414M6.343 6.343a5 5 0 00-.707.707m-2.828 2.828a9 9 0 00-.707.707M4 10l-.707.707M17.657 6.343l.707-.707M20 10l.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M12 4v.01M12 20v.01M4 12h.01M20 12h.01" 
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
      {showModal && (
        <AgeConfirmationModal onConfirm={handleConfirm} onDeny={handleDeny} />
      )}
    </>
  );
});

BlurredImage.displayName = 'BlurredImage';

const YouTubeShort = memo(({ videoId }) => {
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full pt-[177.77%]">
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/50" />
      </div>
    );
  }

  return (
    <ScaleIn delay={0.2}>
      <div className="relative w-full pt-[177.77%]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&showinfo=0&modestbranding=1&fs=0&iv_load_policy=3&disablekb=1`}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Short"
        />
      </div>
    </ScaleIn>
  );
});

YouTubeShort.displayName = 'YouTubeShort';

const MemberCard = memo(function MemberCard({ member }) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreQuotes = member.quotes.length > 5;
  const visibleQuotes = isExpanded ? member.quotes : member.quotes.slice(0, 5);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const renderQuote = useCallback((quote, index) => (
    <motion.li 
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }}
      className="text-gray-400 text-sm pl-4 border-l-2 border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-300"
    >
      <span className="text-orange-500/70">{index + 1}.</span>{" "}
      {quote}
    </motion.li>
  ), []);

  if (!mounted) {
    return (
      <div className="group relative bg-gradient-to-b from-black to-gray-900 rounded-lg p-8 shadow-lg inline-block w-full opacity-0">
        {/* Placeholder content */}
      </div>
    );
  }

  return (
    <Hover>
      <motion.div 
        layout
        className={`group relative bg-gradient-to-b from-black to-gray-900 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ${isExpanded ? 'z-10' : 'z-0'} inline-block w-full`}
      >
        {/* Efeito de glow no hover */}
        <motion.div 
          className="absolute inset-0 bg-orange-500 rounded-lg blur-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Conteúdo do card */}
        <div className="relative">
          {/* Container da imagem com borda gradiente */}
          <Float>
            <ScaleIn>
              <div className="relative w-40 h-40 mx-auto mb-6">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-white opacity-20 rounded-lg blur-md"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative w-full h-full">
                  {/* Contador de pérolas ou indicador de vídeo */}
                  <motion.div 
                    className="absolute -left-2 -top-2 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.video ? '🎥 Short' : `${member.quotes.length} 💎`}
                  </motion.div>
                  <BlurredImage member={member} />
                  {member.status === 'online' ? (
                    <Pulse>
                      <motion.div 
                        className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full border-2 border-black bg-green-500"
                      />
                    </Pulse>
                  ) : (
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full border-2 border-black bg-gray-500"
                    />
                  )}
                </div>
              </div>
            </ScaleIn>
          </Float>

          {/* Nome e descrição */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent mb-2">
                <TypeWriter key={member.name} text={member.name} delay={70} />
              </h3>
              <motion.div 
                className="h-0.5 w-16 bg-gradient-to-r from-orange-500 to-transparent mx-auto mb-3"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                <TypeWriter key={member.description} text={member.description} delay={30} />
              </p>
            </div>
          </FadeIn>

          {/* Conteúdo: Vídeo ou Pérolas */}
          <motion.div 
            layout
            className={`space-y-3 transition-all duration-500 ${isExpanded ? 'relative bg-black/50 rounded-lg p-4' : ''}`}
          >
            <div className="flex items-center">
              <h4 className="text-orange-500 font-semibold">
                {member.video ? 'Short:' : 'Pérolas:'}
              </h4>
              <motion.div 
                className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent ml-3"
                animate={{ scaleX: [0, 1], originX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>

            {member.video ? (
              <div className="w-full max-w-[280px] mx-auto">
                <YouTubeShort videoId={member.video.id} />
              </div>
            ) : (
              <>
                <motion.ul layout className="space-y-2">
                  {visibleQuotes.map(renderQuote)}
                </motion.ul>
                
                {/* Botão Ver Mais/Ver Menos */}
                {hasMoreQuotes && (
                  <motion.button
                    layout
                    onClick={toggleExpand}
                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 text-orange-500 rounded-lg transition-all duration-300 border border-orange-500/20 hover:border-orange-500/40"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.button>
                )}
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Hover>
  );
});

MemberCard.displayName = 'MemberCard';
export default MemberCard; 