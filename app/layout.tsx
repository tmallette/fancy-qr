import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Fancy QR',
  description: 'Generate free custom QR codes.',
};

export default function RootLayout({children}:Readonly<{children: React.ReactNode}>) {
  return <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} >
        <Header />
        <main className="w-90% mx-5% lg:mx-auto lg:max-w-1280px mt-40px flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
};