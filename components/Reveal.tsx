"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (reduced) {
              setVisible(true);
            } else {
              setTimeout(() => setVisible(true), delayMs);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={`reveal ${visible ? "in-view" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
