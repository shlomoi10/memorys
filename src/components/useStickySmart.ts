import { useEffect, useRef } from 'react';

export function useStickySmart() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const fullyVisible = rect.top >= 0 && rect.bottom <= vh;
      const atTop = rect.top <= 0 && rect.bottom < vh;
      const atBottom = rect.bottom >= vh && rect.top > 0;
      el.classList.remove('sticky-top', 'sticky-bottom', 'sticky-free');
      if (fullyVisible) {
        el.classList.add('sticky-free');
      } else if (atTop) {
        el.classList.add('sticky-top');
      } else if (atBottom) {
        el.classList.add('sticky-bottom');
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return ref;
}
