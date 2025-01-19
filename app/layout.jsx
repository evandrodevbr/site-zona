import './globals.css'

export const metadata = {
  title: {
    default: 'Site Zona - Comunidade de Amigos e Entretenimento',
    template: '%s | Site Zona'
  },
  description: 'Comunidade vibrante de amigos compartilhando momentos, diversão e entretenimento. Conheça nossa zona de conforto cheia de histórias, memes e muito mais.',
  keywords: [
    'comunidade',
    'amigos',
    'entretenimento',
    'diversão',
    'memes',
    'zona',
    'histórias',
    'momentos',
    'grupo de amigos',
    'comunidade online'
  ],
  authors: [{ name: 'Site Zona Team' }],
  creator: 'Site Zona',
  publisher: 'Site Zona',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sitezona.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Site Zona - Comunidade de Amigos e Entretenimento',
    description: 'Comunidade vibrante de amigos compartilhando momentos, diversão e entretenimento. Conheça nossa zona de conforto cheia de histórias, memes e muito mais.',
    url: 'https://sitezona.com.br',
    siteName: 'Site Zona',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Site Zona - Comunidade de Amigos'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Zona - Comunidade de Amigos e Entretenimento',
    description: 'Comunidade vibrante de amigos compartilhando momentos, diversão e entretenimento.',
    images: ['/twitter-image.jpg'],
    creator: '@sitezona'
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
  verification: {
    google: 'adicione_seu_codigo_de_verificacao',
    yandex: 'adicione_seu_codigo_de_verificacao',
    yahoo: 'adicione_seu_codigo_de_verificacao',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black min-h-screen text-white">
        <div className="fixed bottom-2 right-2 text-xs text-gray-600 hover:text-gray-400 transition-colors duration-300">
          <a href="https://evandro.dev.br" target="_blank" rel="noopener noreferrer">
            made by evandro.dev.br
          </a>
        </div>
        {children}
      </body>
    </html>
  )
} 