import Image from 'next/image';
import MobileNavigation from '../mobile-navigation';

const guideLinks = [
  ['/guide/booking', '預約與退費'],
  ['/guide/rooms', '房型介紹'],
  ['/guide/rental', '租帳方案'],
  ['/guide/rules', '入住須知'],
];

export default function GuideShell({ eyebrow, title, intro, active, children }:{ eyebrow:string; title:string; intro:string; active:string; children:React.ReactNode }) {
  return <main className="guide-page">
    <header className="site-header guide-header">
      <a className="brand" href="/" aria-label="返回可飛鹿營區首頁"><Image src="/kofelu-logo.png" alt="" width={64} height={64} sizes="64px" /><span><strong>可飛鹿營區</strong><small>COFELU · MOUNTAIN CAMP</small></span></a>
      <nav className="desktop-nav" aria-label="資訊頁導覽">{guideLinks.map(([href,label]) => <a className={active === href ? 'active' : ''} href={href} key={href}>{label}</a>)}</nav>
      <div className="header-actions"><a className="header-cta" href="/booking/date">提出預約申請</a></div>
      <MobileNavigation />
    </header>
    <section className="guide-hero">
      <p>{eyebrow}</p><h1>{title}</h1><span>{intro}</span>
    </section>
    <nav className="guide-tabs" aria-label="相關資訊">{guideLinks.map(([href,label]) => <a className={active === href ? 'active' : ''} href={href} key={href}>{label}</a>)}</nav>
    <article className="guide-content">{children}</article>
    <aside className="guide-cta"><div><small>READY TO GO?</small><h2>看完須知，開始整理預約需求。</h2><p>官網只協助整理資料，實際空位、價格與付款方式均由營主在官方 LINE 確認。</p></div><a href="/booking/date">開始預約申請 <span>→</span></a></aside>
    <footer><div className="footer-brand"><Image src="/kofelu-logo.png" alt="可飛鹿營區標誌" width={64} height={64} /><div><strong>可飛鹿營區</strong><span>COFELU CAMP</span></div></div><p>桃園復興・親子露營・免裝備露營屋</p><div className="footer-meta"><a href="/">返回首頁</a><a href="/booking/date">預約申請</a></div></footer>
  </main>;
}
