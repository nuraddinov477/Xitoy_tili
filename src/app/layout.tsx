import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xitoy tili - HSK Mavzulari',
  description: '15 ta HSK mavzusi - Xitoy tilini o\'rganish',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
