// Adapted from React Bits, David Haz. See third-party/react-bits-LICENSE.md.
// Upstream: 3a1c7f2f9f94ed833934ab5c2635760b9e644583.
// Local pointer events replace a global listener; only the decorative inner
// element moves (max 5px). Native link hitboxes and keyboard focus remain still.
import { useRef, type PropsWithChildren, type PointerEvent } from 'react';

export default function Magnet({ children, disabled = false }: PropsWithChildren<{ disabled?: boolean }>) {
  const inner = useRef<HTMLSpanElement>(null);
  const reset = () => { if (inner.current) inner.current.style.transform = ''; };
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (disabled || e.pointerType !== 'mouse' || !inner.current) { reset(); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const clamp = (n: number) => Math.max(-5, Math.min(5, n / 4));
    inner.current.style.transform = `translate3d(${clamp(e.clientX - rect.left - rect.width / 2)}px, ${clamp(e.clientY - rect.top - rect.height / 2)}px, 0)`;
  };
  return <span className="magnet" onPointerMove={move} onPointerLeave={reset} data-motion={disabled ? 'off' : 'on'}><span ref={inner} className="magnet-inner">{children}</span></span>;
}
