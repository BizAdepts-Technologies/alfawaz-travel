import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 35, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: 'K+', label: 'Happy Travelers' },
  { value: 100, suffix: '+', label: 'Airline Partners' },
  { value: 24, suffix: '/7', label: 'Customer Support' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        stats.forEach((stat, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-teal py-12 md:py-14">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display font-bold text-white leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {stat.value === 24 ? (
                  <>
                    {counts[i]}<span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  </>
                ) : (
                  <>
                    {counts[i]}{stat.suffix}
                  </>
                )}
              </div>
              <p className="font-body text-sm text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
