import MobileNavigation from './mobile-navigation';
import SiteInteractions from './site-interactions';
import { HeroCarousel, StayExplorer } from './camp-showcase';
import Image from 'next/image';

const highlights = [
  { value: '301–500m', label: '山林海拔' },
  { value: '72 帳', label: '草皮露營空間' },
  { value: '12 間', label: '2–6 人露營屋' },
];

const facilities = ['親子戲水池', '遮陽玩沙坑', '林蔭吊床與鞦韆', '男女分區親子衛浴', '冷藏冷凍與飲水機', '每帳獨立電源'];

const faqs = [
  ['營區什麼時間開放？', '目前主要開放週末、連假與年假；星期一至星期五須滿 10 帳以上才開放預約，自搭帳與租帳篷皆適用。租帳價格將另行公告，特殊休園日與實際可預約日期以營區確認為準。'],
  ['自搭帳的入住與離場時間？', '一般假日 11:00 後進場，隔日 12:00 前離場；連續假日的第二天起為 14:00 後進場、隔日 11:00 前離場。'],
  ['可以攜帶寵物嗎？', '自搭帳可以攜帶寵物，請全程繫繩或安置於籠內並維護清潔；免裝備露營屋室內禁止寵物進入。'],
  ['營位可以停車嗎？', '一般營位採集中停車，每一營位包含一個停車位，營區提供推車搬運裝備；另設有 4 個露營車專用營位，車型、尺寸與設備需求請於預約時先行確認。'],
  ['預約後需要支付多少訂金？', '預約由營區確認後需支付 50% 訂金。付款方式、保留期限與退款規則將在確認通知中完整說明。'],
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Campground',
  name: '可飛鹿營區',
  alternateName: 'Cofelu Camp',
  description: '位於桃園復興羅馬公路的親子露營區，提供草皮營位、團體露營與2至6人免裝備露營屋。',
  image: ['/camp-gallery/980014_0.jpg', '/camp-gallery/980015_0.jpg', '/camp-gallery/980007_0.jpg'],
  priceRange: 'NT$1,200–NT$5,600',
  address: { '@type': 'PostalAddress', streetAddress: '奎輝2鄰12號之3（桃118線羅馬公路52.3公里處）', addressLocality: '復興區', addressRegion: '桃園市', addressCountry: 'TW' },
  geo: { '@type': 'GeoCoordinates', latitude: 24.798452, longitude: 121.329184 },
  petsAllowed: '自搭帳可攜帶寵物，露營屋室內禁止寵物',
  amenityFeature: facilities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
};

export default function Home() {
  return (
    <main>
      <SiteInteractions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="可飛鹿營區首頁">
          <Image src="/kofelu-logo.png" alt="" width={64} height={64} sizes="64px" />
          <span><strong>可飛鹿營區</strong><small>COFELU · MOUNTAIN CAMP</small></span>
        </a>
        <nav className="desktop-nav" aria-label="主要導覽">
          <a href="/booking/date">線上預約</a><a href="#stay">營位與房型</a><a href="#facilities">設施體驗</a><a href="#faq">入住須知</a>
        </nav>
        <div className="header-actions">
          <a className="admin-entry" href="/admin" aria-label="進入營主管理後台">營主後台</a>
          <a className="header-cta" href="/booking/date">查詢空位</a>
        </div>
        <MobileNavigation />
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroCarousel />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">COFELU CAMP · TAOYUAN</p>
          <h1 id="hero-title">走進山裡，<br /><em>住進一晚好風景。</em></h1>
          <p className="hero-copy">從草地露營到免裝備小屋，讓第一次露營的你，也能自在享受一家人的山林假期。</p>
          <div className="hero-actions"><a className="button button-primary" href="/booking/date">立即查詢空位</a><a className="button button-ghost" href="#facilities">探索可飛鹿</a></div>
        </div>
        <p className="hero-note"><span>24°47′ N</span>團露大空間 · 親子共遊 · 免裝備入住</p>
      </section>

      <section className="booking-section booking-featured" id="booking" aria-labelledby="booking-title">
        <div className="booking-copy"><p className="section-kicker">BOOK YOUR ESCAPE</p><h2 id="booking-title">下一次出走，<br />從選一個日期開始。</h2><p>選擇入住日期與想要的空間，留下聯絡資訊。第一階段採人工確認，避免熱門日期或團露需求重複預訂。</p><div className="booking-steps"><span><b>01</b>送出預約需求</span><span><b>02</b>營區確認空位</span><span><b>03</b>支付 50% 訂金</span></div></div>
        <div className="booking-entry-card"><small>3 STEPS · ABOUT 2 MINUTES</small><h3>開始安排你的山林假期</h3><p>日期、住宿方式與營區位置會分成三個清楚頁面，手機操作更輕鬆。</p><a className="wizard-next" href="/booking/date">開始預約 <span>→</span></a></div>
      </section>

      <StayExplorer />

      <section className="intro" id="story" aria-labelledby="story-title">
        <div className="intro-heading"><p className="section-kicker">WELCOME TO COFELU</p><h2 id="story-title">山明水秀，<br /><em>把日常留在山下。</em></h2></div>
        <div className="intro-body"><p>Cofelu 是泰雅族語，源自水鹿與山羌曾經聚集的地方。營區緊鄰桃118線羅馬公路，沿著山勢分層規劃，保留每一區自在呼吸的距離。</p><p>帶上自己的帳篷，或輕裝入住露營小屋。孩子在草地奔跑，大人在樹影下慢慢坐著，入夜後一起看山色沉進星光裡。</p></div>
        <div className="highlights" aria-label="營區特色數據">{highlights.map((item) => <div className="highlight" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      </section>

      <section className="experience" id="facilities" aria-labelledby="facilities-title">
        <div className="experience-image"><Image src="/camp-gallery/980015_0.jpg" alt="可飛鹿營區寬廣草地與瞭望台" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="experience-copy"><p className="section-kicker">FOR THE WHOLE FAMILY</p><h2 id="facilities-title">把孩子的笑聲，<br />放進森林裡。</h2><p>大草地、戲水池、玩沙坑與林蔭吊床，讓孩子盡情探索；親子衛浴、冷藏冷凍與完善用電，讓大人放心享受戶外生活。</p><ul>{facilities.map((facility) => <li key={facility}>{facility}</li>)}</ul></div>
      </section>

      <section className="facility-gallery" aria-label="營區設施照片">
        <figure><Image src="/camp-gallery/980012_0.jpg" alt="露營屋山景木造露臺" fill sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>山景露臺與戶外空間</figcaption></figure>
        <figure><Image src="/camp-gallery/980013_0.jpg" alt="露營屋公共吧台與彩繪牆" fill sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>共用吧台與休憩空間</figcaption></figure>
        <figure><Image src="/camp-gallery/980014_0.jpg" alt="山林中的可飛鹿露營屋" fill sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>山林裡的露營屋</figcaption></figure>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div><p className="section-kicker">GOOD TO KNOW</p><h2 id="faq-title">出發前，先知道。</h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="location-section" aria-labelledby="location-title">
        <div className="location-card"><p className="section-kicker">FIND US</p><h2 id="location-title">沿著羅馬公路，<br />遇見山裡的可飛鹿。</h2><p>桃園市復興區奎輝2鄰12號之3<br />桃118線羅馬公路 52.3 公里處</p><div className="location-actions"><a className="button button-primary" href="https://www.google.com/maps/search/?api=1&query=24.798452,121.329184" target="_blank" rel="noreferrer">開啟 Google 地圖</a><a className="text-link" href="#top">回到頁首 ↑</a></div></div>
        <div className="location-image"><Image src="/camp-gallery/980015_0.jpg" alt="可飛鹿營區草地與山景瞭望台" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
      </section>

      <footer><div className="footer-brand"><Image src="/kofelu-logo.png" alt="可飛鹿營區標誌" width={64} height={64} sizes="64px" /><div><strong>可飛鹿營區</strong><span>COFELU CAMP</span></div></div><p>桃園復興・親子露營・免裝備露營屋</p><div className="footer-meta"><small>© {new Date().getFullYear()} 可飛鹿營區</small><a href="/admin">營主後台</a></div></footer>
      <a className="mobile-booking" href="/booking/date" aria-label="立即查詢營位空房"><span>立即預約</span><strong>查詢空位 →</strong></a>
    </main>
  );
}
