import './globals.css';
import { Nunito_Sans } from 'next/font/google';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Team Zona',
  description: 'Uma comunidade vibrante de jogadores unidos pela paixão aos games.',
  keywords: ['team zona', 'comunidade de jogadores', 'gamers', 'gaming community', 'discord gaming', 'team gaming'],
  authors: [{ name: 'Team Zona' }],
  creator: 'Team Zona',
  publisher: 'Team Zona',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://teamzona.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Team Zona',
    description: 'Uma comunidade vibrante de jogadores unidos pela diversão, amizade e momentos memoráveis. Junte-se a nós!',
    url: 'https://teamzona.com.br',
    siteName: 'Team Zona',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Team Zona',
      }
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Zona',
    description: 'Uma comunidade vibrante de jogadores unidos pela diversão, amizade e momentos memoráveis. Junte-se a nós!',
    images: ['/og-image.jpg'],
    creator: '@teamzona',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'seu-código-de-verificação-google',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={nunitoSans.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Team Zona",
              "description": "Comunidade de jogadores unidos pela diversão e pelas pérolas memoráveis",
              "url": "https://teamzona.com.br",
              "logo": "https://teamzona.com.br/logo.png",
              "sameAs": [
                "https://discord.gg/jYQFRMrAuZ",
              ]
            })
          }}
        />
      </head>
      <body className="bg-black">
        <div className="min-h-screen">
          {children}
          <footer className="bg-black text-gray-600 text-sm py-8">
            <div className="container mx-auto px-4">
              <p>© 2024 Team Zona. Todos os direitos reservados.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 