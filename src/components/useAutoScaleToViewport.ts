import { useEffect, useRef, useState } from 'react';

export function useAutoScaleToViewport(margin = 40) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const panelHeight = rect.height;
      const maxHeight = vh - margin;
      if (panelHeight > maxHeight) {
        setScale(Math.max(0.6, maxHeight / panelHeight));
      } else {
        setScale(1);
      }
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [margin]);

  return [ref, scale] as const;
}
