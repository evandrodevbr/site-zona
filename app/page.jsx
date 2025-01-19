import { Suspense } from "react";
import dynamic from 'next/dynamic';
import TypeWriter from "./components/TypeWriter";

// Carregamento dinâmico dos componentes pesados
const MemberGrid = dynamic(() => import("./components/MemberGrid"), {
  loading: () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-96 bg-black/50 rounded-lg animate-pulse mb-4 break-inside-avoid" />
      ))}
    </div>
  )
});

const MemberSlider = dynamic(() => import("./components/MemberSlider"), {
  loading: () => (
    <div className="w-full h-[600px] bg-black/50 animate-pulse flex items-center justify-center text-white">
      <TypeWriter text="Carregando destaque..." delay={50} />
    </div>
  )
});

// Função para buscar membros
async function getMembers() {
  const response = await fetch("http://localhost:3000/api/members", {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default async function Home() {
  const members = await getMembers();
  const sortedMembers = [...members].sort((a, b) => b.quotes.length - a.quotes.length);

  return (
    <main className="min-h-screen bg-black">
      {/* Título */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-6xl md:text-7xl font-bold mb-4 animate-title">
          <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent animate-gradient">
            <TypeWriter text="Team" delay={100} />
          </span>{" "}
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
            <TypeWriter text="Zona" delay={100} />
          </span>
        </h1>
        <div className="text-center text-xs text-gray-600 mb-4 hover:text-gray-400 transition-colors duration-300">
          <a href="https://evandro.dev.br" target="_blank" rel="noopener noreferrer">
            <TypeWriter text="made by evandro.dev.br" delay={50} />
          </a>
        </div>
        <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
          <TypeWriter 
            text="Uma comunidade de jogadores unidos pela diversão e pelas pérolas memoráveis"
            delay={30}
          />
        </p>
      </div>

      {/* Slider de Destaque */}
      <Suspense 
        fallback={
          <div className="w-full h-[600px] bg-black/50 animate-pulse flex items-center justify-center text-white">
            <TypeWriter text="Carregando destaque..." delay={50} />
          </div>
        }
      >
        <MemberSlider members={sortedMembers} />
      </Suspense>

      {/* Grid de Membros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              <TypeWriter text="Todos os Membros" delay={70} />
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-transparent rounded-full mt-2" />
          </div>
          
          {/* Botão do Discord */}
          <a
            href="https://discord.gg/jYQFRMrAuZ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-[#5865F2] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(88,101,242,0.5)] hover:scale-105"
          >
            {/* Efeito de glow */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            {/* Conteúdo do botão */}
            <div className="relative flex items-center space-x-3">
              {/* Ícone do Discord */}
              <svg
                className="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              
              <span className="text-white font-semibold whitespace-nowrap">
                <TypeWriter text="Junte-se a nós" delay={50} />
              </span>
            </div>
          </a>
        </div>

        <Suspense 
          fallback={
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-black/50 rounded-lg animate-pulse mb-4 break-inside-avoid" />
              ))}
            </div>
          }
        >
          <MemberGrid members={sortedMembers} />
        </Suspense>
      </div>
    </main>
  );
} 