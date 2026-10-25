"use client";

import { useEffect, useState } from "react";

const words = ["pulsa", "kuota", "token PLN", "diamond ML", "saldo DANA", "bayar BPJS"];

export function WordRotator() {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      const word = words[wordIndex];

      if (deleting) {
        charIndex -= 1;
        setText(word.slice(0, Math.max(charIndex, 0)));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          charIndex = 0;
          timer = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex += 1;
        setText(words[wordIndex].slice(0, charIndex));
        if (charIndex >= words[wordIndex].length) {
          deleting = true;
          charIndex = words[wordIndex].length;
          timer = setTimeout(tick, 1600);
          return;
        }
      }

      timer = setTimeout(tick, deleting ? 45 : 90);
    };

    timer = setTimeout(tick, 1800);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span className="cur inline-block min-w-[5.5rem] rounded bg-sun px-1 text-left text-navy">
      {text || "\u00a0"}
    </span>
  );
}
