// this is made by claude
import { useRef, useEffect, type ReactNode, type FC } from "react";

interface ScrollWindowProps {
  children: ReactNode;
  /** Pause at the top before scrolling starts (ms) */
  startPause?: number;
  /** Time to scroll from top to bottom (ms) */
  scrollTime?: number;
  /** Pause at the bottom before looping (ms) */
  endPause?: number;
  /** Ease in at the start of the scroll */
  easeIn?: boolean;
  /** Ease out at the end of the scroll */
  easeOut?: boolean;
  className?: string;
}

type Phase = "startPause" | "scrolling" | "endPause";

function buildEase(easeIn: boolean, easeOut: boolean): (t: number) => number {
  if (easeIn && easeOut)
    return (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
  if (easeIn) return (t) => t * t;
  if (easeOut) return (t) => 1 - (1 - t) ** 2;
  return (t) => t;
}

export const ScrollWindow: FC<ScrollWindowProps> = ({
  children,
  startPause = 1000,
  scrollTime = 5000,
  endPause = 1000,
  easeIn = false,
  easeOut = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<{
    phase: Phase;
    elapsed: number;
    lastTime: number | null;
  }>({
    phase: "startPause",
    elapsed: 0,
    lastTime: null,
  });

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const ease = buildEase(easeIn, easeOut);

    const animate = (time: number) => {
      const s = stateRef.current;
      if (s.lastTime === null) s.lastTime = time;
      const delta = time - s.lastTime;
      s.lastTime = time;

      const maxOffset = inner.scrollHeight - container.clientHeight;

      if (maxOffset > 0) {
        s.elapsed += delta;

        if (s.phase === "startPause") {
          inner.style.transform = "translateY(0)";
          if (s.elapsed >= startPause) {
            s.phase = "scrolling";
            s.elapsed = 0;
          }
        } else if (s.phase === "scrolling") {
          const t = Math.min(s.elapsed / scrollTime, 1);
          inner.style.transform = `translateY(-${ease(t) * maxOffset}px)`;
          if (s.elapsed >= scrollTime) {
            s.phase = "endPause";
            s.elapsed = 0;
          }
        } else {
          inner.style.transform = `translateY(-${maxOffset}px)`;
          if (s.elapsed >= endPause) {
            s.phase = "startPause";
            s.elapsed = 0;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      stateRef.current = { phase: "startPause", elapsed: 0, lastTime: null };
    };
  }, [startPause, scrollTime, endPause, easeIn, easeOut]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
};
