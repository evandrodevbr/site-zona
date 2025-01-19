'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const BATCH_SIZE = 3; // Número de caracteres por batch
const MIN_DELAY = 10; // Delay mínimo entre batches

export default function TypeWriter({ text, delay = 50, className = '' }) {
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);
  const batchQueueRef = useRef([]);
  const lastRenderTimeRef = useRef(Date.now());

  // Limpa o timeout ao desmontar ou quando o texto muda
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset quando o texto muda
  useEffect(() => {
    setCurrentText('');
    setIsTyping(true);
    batchQueueRef.current = text.split('');
    lastRenderTimeRef.current = Date.now();
    startTyping();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text]);

  // Função otimizada para processar batches de caracteres
  const processNextBatch = useCallback(() => {
    if (!batchQueueRef.current.length) {
      setIsTyping(false);
      return;
    }

    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTimeRef.current;
    
    // Ajusta dinamicamente o tamanho do batch baseado no tempo de renderização
    const dynamicBatchSize = Math.max(
      1,
      Math.min(
        BATCH_SIZE,
        Math.floor(BATCH_SIZE * (delay / Math.max(timeSinceLastRender, MIN_DELAY)))
      )
    );

    const batch = batchQueueRef.current.splice(0, dynamicBatchSize);
    
    if (batch.length) {
      setCurrentText(prev => prev + batch.join(''));
      lastRenderTimeRef.current = now;
    }

    // Agenda o próximo batch
    const nextDelay = Math.max(MIN_DELAY, delay / dynamicBatchSize);
    timeoutRef.current = setTimeout(processNextBatch, nextDelay);
  }, [delay]);

  // Inicia o processo de digitação
  const startTyping = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    processNextBatch();
  }, [processNextBatch]);

  // Memoiza o output para prevenir re-renders desnecessários
  const output = useMemo(() => {
    // Adiciona uma classe de cursor apenas quando está digitando
    const cursorClass = isTyping ? 'after:content-[""] after:w-0.5 after:h-4 after:bg-orange-500 after:ml-0.5 after:inline-block after:animate-blink' : '';
    
    return (
      <span className={`${className} ${cursorClass}`}>
        {currentText}
      </span>
    );
  }, [className, currentText, isTyping]);

  return output;
} 