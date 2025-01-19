"use client";

import Image from 'next/image';

export default function MemberCard({ member }) {
  return (
    <div className="group relative bg-gradient-to-b from-black to-gray-900 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Efeito de glow no hover */}
      <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-5 rounded-lg blur-xl transition-opacity duration-500" />
      
      {/* Conteúdo do card */}
      <div className="relative">
        {/* Container da imagem com borda gradiente */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-white opacity-20 rounded-lg blur-md animate-pulse" />
          <div className="relative w-full h-full">
            <Image
              src={`/members/${member.image}`}
              alt={member.name}
              className="rounded-lg object-cover ring-2 ring-orange-500/30 group-hover:ring-orange-500/50 transition-all duration-300"
              fill
              sizes="160px"
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
            {member.name}
          </h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-orange-500 to-transparent mx-auto mb-3" />
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {member.description}
          </p>
        </div>

        {/* Pérolas */}
        <div className="space-y-3">
          <div className="flex items-center">
            <h4 className="text-orange-500 font-semibold">Pérolas:</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent ml-3" />
          </div>
          <ul className="space-y-2">
            {member.quotes.map((quote, index) => (
              <li 
                key={index} 
                className="text-gray-400 text-sm pl-4 border-l-2 border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-300"
              >
                <span className="text-orange-500/70">{index + 1}.</span> {quote}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 