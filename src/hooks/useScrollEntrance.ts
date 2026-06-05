import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
}

export const useScrollEntrance = <T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) => {
  const ref = useRef<T>(null);

  const {
    y = 40,
    x = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.12,
    ease = 'power3.out',
    start = 'top 80%',
    childSelector,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current.children;

    if (!targets || targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y, x });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [y, x, duration, delay, stagger, ease, start, childSelector]);

  return ref;
};

export default useScrollEntrance;
