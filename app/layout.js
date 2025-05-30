import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata = {
  title: 'E-Commerce App',
  description: 'Modern E-Commerce Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
