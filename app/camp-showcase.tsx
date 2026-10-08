'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const heroSlides = [
  { src:'/camp-gallery/980014_0.jpg', alt:'可飛鹿營區山林中的露營屋外觀' },
  { src:'/camp-gallery/980004_0.jpg', alt:'夜晚燈光下的可飛鹿露營屋' },
  { src:'/camp-gallery/980015_0.jpg', alt:'可飛鹿營區寬廣草地與瞭望台' },
  { src:'/camp-gallery/980012_0.jpg', alt:'可飛鹿露營屋山景木造露臺' },
];

const stayTypes = [
  { id:'grass', nav:'草皮露營', title:'草皮露營', eyebrow:'BRING YOUR OWN HOME', copy:'A–L 區依山勢分層，保留每帳自在呼吸的距離。客人可指定區域，實際位置由營區安排。', meta:['約 72 帳','6 × 8 公尺','集中停車'], images:['/camp-gallery/980015_0.jpg','/camp-gallery/980014_0.jpg'] },
  { id:'two', nav:'2 人房', title:'2 人露營屋', eyebrow:'A QUIET STAY FOR TWO', copy:'營一區與營二區各有三間雙人房，房內提供冷氣、床寢與獨立休憩空間，適合兩人輕裝入住。', meta:['共 6 間','雙人床','冷氣設備'], images:['/camp-gallery/980007_0.jpg','/camp-gallery/980008_0.jpg','/camp-gallery/980009_0.jpg','/camp-gallery/980001_0.jpg','/camp-gallery/980002_0.jpg','/camp-gallery/980003_0.jpg'] },
  { id:'four', nav:'4 人房', title:'4 人露營屋', eyebrow:'ROOM FOR THE FAMILY', copy:'營一區與營二區各有兩間四人房，寬敞雙床配置，讓親子與好友同行也能舒適休息。', meta:['共 4 間','雙床配置','冷氣設備'], images:['/camp-gallery/980010_0.jpg','/camp-gallery/980011_0.jpg','/camp-gallery/979998_0.jpg','/camp-gallery/979999_0.jpg'] },
  { id:'six', nav:'6 人房', title:'6 人露營屋', eyebrow:'STAY TOGETHER', copy:'營一區與營二區各有一間六人房，適合家庭與小團體同住，保留共享時光也兼顧睡眠空間。', meta:['共 2 間','最多 6 人','團體入住'], images:['/camp-gallery/980006_0.jpg','/camp-gallery/980000_0.jpg'] },
  { id:'rv', nav:'露營車', title:'露營車營位', eyebrow:'DRIVE INTO NATURE', copy:'營區設有四個露營車專屬營位。車型、尺寸、用電與設備需求，請於預約時交由營主確認。', meta:['限定 4 位','規格先確認','山林景觀'], images:['/camp-gallery/980014_0.jpg','/camp-gallery/980012_0.jpg','/camp-gallery/980013_0.jpg'] },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % heroSlides.length), 5600);
    return () => window.clearInterval(timer);
  }, []);
  return <>
    <div className="hero-slides" aria-live="polite">{heroSlides.map((slide, index) => <Image key={slide.src} className={`hero-image ${active === index ? 'is-active' : ''}`} src={slide.src} alt={active === index ? slide.alt : ''} aria-hidden={active !== index} fill sizes="(max-width: 700px) 100vw, 62vw" priority={index === 0} />)}</div>
    <div className="hero-carousel-controls" aria-label="首圖輪播控制"><button type="button" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="上一張">←</button><span>{heroSlides.map((slide, index) => <button key={slide.src} type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-label={`顯示第 ${index + 1} 張`} />)}</span><button type="button" onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="下一張">→</button></div>
  </>;
}

export function StayExplorer() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const stay = stayTypes[active];
  useEffect(() => {
    document.body.classList.toggle('stay-explorer-open', open);
    return () => document.body.classList.remove('stay-explorer-open');
  }, [open]);
  return <div id="stay">
    <button className="stay-float" type="button" onClick={() => setOpen(true)} aria-label="開啟營位與房型介紹"><small>點我看看</small><i>⌂</i><span>今晚<br />怎麼住？</span></button>
    {open && <div className="stay-explorer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="stay-explorer" role="dialog" aria-modal="true" aria-labelledby="stay-explorer-title"><header><div><small>CHOOSE YOUR STAY</small><h2 id="stay-explorer-title">今晚，想怎麼住？</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="關閉房型介紹">×</button></header><nav aria-label="房型分類">{stayTypes.map((item,index) => <button type="button" key={item.id} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>{item.nav}</button>)}</nav><div className="stay-explorer-body"><div className="stay-explorer-copy"><p>{stay.eyebrow}</p><h3>{stay.title}</h3><span>{stay.copy}</span><ul>{stay.meta.map((item) => <li key={item}>{item}</li>)}</ul><a href="/booking/date" onClick={() => setOpen(false)}>選擇日期並預約 <b>→</b></a></div><div className="stay-explorer-gallery">{stay.images.map((image,index) => <figure key={image}><Image src={image} alt={`${stay.title}實景照片 ${index + 1}`} fill sizes="(max-width: 700px) 82vw, 36vw" /><figcaption>{String(index + 1).padStart(2,'0')} / {String(stay.images.length).padStart(2,'0')}</figcaption></figure>)}</div></div></section></div>}
  </div>;
}
