// Adapted from React Bits, David Haz. See third-party/react-bits-LICENSE.md.
// Upstream: 3a1c7f2f9f94ed833934ab5c2635760b9e644583.
// Adds a reduced-motion/coarse-pointer guard and preserves native focus feedback.
import { useRef, type PropsWithChildren, type PointerEvent } from 'react';

export default function SpotlightCard({ children, className = '', disabled = false }: PropsWithChildren<{ className?: string; disabled?: boolean }>) {
  const divRef = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType !== 'mouse' || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };
  return <div ref={divRef} onPointerMove={move} className={`card-spotlight ${className}`} data-motion={disabled ? 'off' : 'on'}>{children}</div>;
}
