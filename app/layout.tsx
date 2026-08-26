import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: '可飛鹿營區｜桃園復興親子露營・免裝備露營屋', template: '%s｜可飛鹿營區' },
  description: '可飛鹿營區位於桃園復興羅馬公路，提供草皮營位、團體露營、親子設施與2至6人免裝備露營屋，輕鬆安排一晚山林假期。',
  keywords: ['可飛鹿營區','桃園露營區','復興區露營','親子露營','免裝備露營','懶人露營','羅馬公路露營','團體露營'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'zh_TW', url: '/', siteName: '可飛鹿營區', title: '可飛鹿營區｜走進山裡，住進一晚好風景', description: '桃園復興親子露營、草皮營位與2至6人免裝備露營屋。', images: [{ url: '/og.png', width: 1600, height: 900, alt: '可飛鹿營區山林露營夜景' }] },
  twitter: { card: 'summary_large_image', title: '可飛鹿營區｜走進山裡，住進一晚好風景', description: '桃園復興親子露營、草皮營位與2至6人免裝備露營屋。', images: ['/og.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  category: 'travel',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#073f3d', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
