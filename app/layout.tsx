import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: {
    default: 'Cahaya Imani - Marketplace Umrah, Tour & Travel Indonesia',
    template: '%s | Cahaya Imani',
  },
  description: 'Temukan paket umrah, tour travel terbaik dengan harga kompetitif. Marketplace terpercaya untuk perjalanan ibadah dan wisata halal.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://cahayaimani.id',
    siteName: 'Cahaya Imani',
    title: 'Cahaya Imani - Marketplace Umrah, Tour & Travel Indonesia',
    description: 'Temukan paket umrah, tour travel terbaik dengan harga kompetitif. Marketplace terpercaya untuk perjalanan ibadah dan wisata halal.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cahaya Imani - Marketplace Umrah, Tour & Travel Indonesia',
    description: 'Temukan paket umrah, tour travel terbaik dengan harga kompetitif.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
