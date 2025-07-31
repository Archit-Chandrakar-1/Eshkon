import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Content Builder Platform',
    template: '%s | Content Builder Platform',
  },
  description: 'A powerful platform for building and managing dynamic content layouts with Contentful integration.',
  keywords: ['content management', 'contentful', 'page builder', 'cms', 'nextjs'],
  authors: [{ name: 'Content Builder Team' }],
  creator: 'Content Builder Platform',
  publisher: 'Content Builder Platform',
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}