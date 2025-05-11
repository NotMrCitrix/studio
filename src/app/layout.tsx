import type { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: 'CitriPage',
  description: 'A personal page for MrCitrix, built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${vt323.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
