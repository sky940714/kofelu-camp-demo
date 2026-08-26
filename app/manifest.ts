import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return { name: '可飛鹿營區', short_name: '可飛鹿', description: '桃園復興親子露營與免裝備露營屋', start_url: '/', display: 'standalone', background_color: '#fffdf8', theme_color: '#073f3d', icons: [{ src: '/kofelu-logo.png', sizes: '1486x1486', type: 'image/png' }] }; }
