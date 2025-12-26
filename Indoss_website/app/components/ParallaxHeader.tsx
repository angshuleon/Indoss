import { useEffect, useRef, useState } from "react";

type ParallaxHeaderProps = {
  src: string;
  alt?: string;
  heightClassName?: string; // example: "h-[260px] sm:h-[320px] md:h-[420px]"
  strength?: number; // 0.1 to 0.4 feels good
  overlay?: boolean;
  children?: React.ReactNode; // optional text content over image
};

export default function ParallaxHeader({
  src,
  alt = "",
  heightClassName = "h-[260px] sm:h-[320px] md:h-[600px]",
  strength = 0.22,
  overlay = true,
  children,
}: ParallaxHeaderProps) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || 0;

        // progress near 0 when header is top aligned, varies smoothly as it leaves viewport
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));

        // translate range in px. tweak 40 to 90 if you want stronger effect
        const translate = (clamped - 0.5) * 2 * 70 * strength;
        setOffset(translate);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <section
      ref={(n) => {
        wrapRef.current = n;
      }}
      className={`relative w-full overflow-hidden ${heightClassName}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-[120%] w-full object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        draggable={false}
      />

      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />
      ) : null}

      {children ? <div className="relative h-full">{children}</div> : null}
    </section>
  );
}
