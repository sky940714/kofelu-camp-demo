'use client';

import { useEffect } from 'react';

export default function SiteInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>('.hero');
    const booking = document.querySelector<HTMLElement>('#booking');
    const progress = document.querySelector<HTMLElement>('.scroll-progress');
    const sectionIds = ['top', 'story', 'stay', 'facilities', 'booking', 'faq'];
    const sectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a, .mobile-menu a'));
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(
      '.intro, .stay-section, .experience, .facility-gallery, .booking-section, .faq-section, .location-section',
    ));
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    root.classList.add('enhanced-motion');
    revealTargets.forEach((element) => element.classList.add('reveal-section'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach((element) => observer.observe(element));

    function handlePointerMove(event: PointerEvent) {
      if (!hero || !finePointer.matches || reducedMotion.matches) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty('--pointer-x', `${x * 12}px`);
      hero.style.setProperty('--pointer-y', `${y * 9}px`);
    }

    function resetPointer() {
      hero?.style.setProperty('--pointer-x', '0px');
      hero?.style.setProperty('--pointer-y', '0px');
    }

    hero?.addEventListener('pointermove', handlePointerMove);
    hero?.addEventListener('pointerleave', resetPointer);

    let frame = 0;
    function updatePagePosition() {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
      progress?.style.setProperty('--scroll-progress', String(ratio));
      root.classList.toggle('is-scrolled', window.scrollY > 48);

      const marker = Math.min(window.innerHeight * 0.32, 260);
      let activeId = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) activeId = id;
      }
      sectionLinks.forEach((link) => {
        const current = link.getAttribute('href') === `#${activeId}`;
        link.classList.toggle('is-current', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function requestPagePosition() {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePagePosition);
    }

    updatePagePosition();
    window.addEventListener('scroll', requestPagePosition, { passive:true });
    window.addEventListener('resize', requestPagePosition);

    const bookingObserver = new IntersectionObserver(([entry]) => {
      root.classList.toggle('booking-in-view', entry.isIntersecting);
    }, { threshold: 0.12 });
    if (booking) bookingObserver.observe(booking);

    return () => {
      observer.disconnect();
      bookingObserver.disconnect();
      hero?.removeEventListener('pointermove', handlePointerMove);
      hero?.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', requestPagePosition);
      window.removeEventListener('resize', requestPagePosition);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('enhanced-motion');
      root.classList.remove('booking-in-view');
      root.classList.remove('is-scrolled');
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
