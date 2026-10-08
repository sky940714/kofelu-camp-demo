'use client';

import { useEffect, useState } from 'react';

const links = [
  ['關於營區', '#story'],
  ['營位與房型', '#stay'],
  ['設施體驗', '#facilities'],
  ['互動地圖預約', '#booking'],
  ['入住須知', '#faq'],
];

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('mobile-menu-open', open);
    return () => document.documentElement.classList.remove('mobile-menu-open');
  }, [open]);

  return <>
    <div className="mobile-header-actions">
      <a className="mobile-book-now" href="/booking/date" onClick={() => setOpen(false)}><span>線上預約</span></a>
      <button className={`menu-toggle ${open ? 'open' : ''}`} type="button" aria-label={open ? '關閉導覽選單' : '開啟導覽選單'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
    </div>
    <nav id="mobile-navigation" className={`mobile-menu ${open ? 'open' : ''}`} aria-label="手機版主要導覽" aria-hidden={!open}>
      <p>EXPLORE COFELU</p>
      {links.map(([label, href], index) => <a href={href} key={href} onClick={() => setOpen(false)}><small>0{index + 1}</small><span>{label}</span><b>→</b></a>)}
      <div><span>桃園復興・羅馬公路</span><span>山林露營・親子假期</span></div>
    </nav>
  </>;
}
