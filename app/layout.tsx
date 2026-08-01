import type { Metadata } from 'next';
import './globals.css';
import './overrides.css';
export const metadata: Metadata = {
  title: 'GX1 – BRD to Production Platform',
  description: 'BRD Intake & Registration',
  icons: { icon: '/favicon.svg' },
};
export default function Layout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
