import { Suspense } from "react";
import MemberCard from "./components/MemberCard";
import MemberSlider from "./components/MemberSlider";

async function getMembers() {
  const response = await fetch("http://localhost:3000/api/members", {
    next: { revalidate: 0 },
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default async function Home() {
  const members = await getMembers();

  return (
    <main className="min-h-screen bg-black">
      {/* Título */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-6xl md:text-7xl font-bold mb-4 animate-title">
          <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent animate-gradient">
            Team
          </span>{" "}
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Zona
          </span>
        </h1>
        <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto">
          Uma comunidade de jogadores unidos pela diversão e pelas pérolas memoráveis
        </p>
      </div>

      {/* Slider de Destaque */}
      <Suspense 
        fallback={
          <div className="w-full h-[600px] bg-black/50 animate-pulse flex items-center justify-center text-white">
            Carregando destaque...
          </div>
        }
      >
        <MemberSlider members={members} />
      </Suspense>

      {/* Grid de Membros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              Todos os Membros
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
                Junte-se a nós
              </span>
            </div>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-black/50 rounded-lg animate-pulse" />
                ))}
              </div>
            }
          >
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </Suspense>
        </div>
      </div>
    </main>
  );
} 