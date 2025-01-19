import './globals.css'

export const metadata = {
    title: 'Team Zona',
    description: 'Uma comunidade de jogadores unidos pela diversão e pelas pérolas memoráveis',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    )
} 