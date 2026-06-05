import { useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(MotionPathPlugin);

const GlobeCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const globeGridRef = useRef<SVGGElement>(null);
  const globeGroupRef = useRef<SVGGElement>(null);
  const airplaneRef = useRef<SVGGElement>(null);
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!canvasRef.current || !globeGridRef.current) return;

    const globeGrid = globeGridRef.current;
    const canvas = canvasRef.current;

    // Set transform origin for rotation
    gsap.set(globeGrid, { transformOrigin: '400px 400px' });

    // Slow continuous rotation
    rotationTweenRef.current = gsap.to(globeGrid, {
      rotation: -360,
      duration: 120,
      ease: 'none',
      repeat: -1,
    });

    // Airplane orbit animation
    if (airplaneRef.current) {
      gsap.to(airplaneRef.current, {
        duration: 12,
        repeat: -1,
        ease: 'none',
        motionPath: {
          path: '#airplane-orbit',
          align: '#airplane-orbit',
          alignOrigin: [0.5, 0.5],
        },
      });
    }

    // Mouse interaction for rotation speed
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const targetSpeed = 1 + (mouseX / rect.width) * 4;
      gsap.to(rotationTweenRef.current, {
        timeScale: targetSpeed,
        duration: 2,
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(rotationTweenRef.current, {
        timeScale: 1,
        duration: 3,
        overwrite: true,
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Scroll parallax
    const handleScroll = () => {
      if (!globeGroupRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      gsap.set(globeGroupRef.current, { y: -200 * progress });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, { scope: canvasRef });

  // Generate meridian paths
  const meridians = Array.from({ length: 12 }, (_, i) => {
    const lon = -180 + i * 30;
    const points: string[] = [];
    for (let j = 0; j <= 100; j++) {
      const beta = -90 + (j / 100) * 180;
      const rad = 300 * Math.cos((beta * Math.PI) / 180);
      const x = 400 + rad * Math.cos((lon * Math.PI) / 180);
      const y = 400 - 300 * Math.sin((beta * Math.PI) / 180);
      points.push(`${x},${y}`);
    }
    return { d: `M ${points.join(' L ')}`, lon };
  });

  // Generate parallel paths
  const parallels = Array.from({ length: 7 }, (_, i) => {
    const lat = -60 + i * 20;
    const cosLat = Math.cos((lat * Math.PI) / 180);
    const sinLat = Math.sin((lat * Math.PI) / 180);
    const rx = 300 * cosLat;
    const ry = 100 * cosLat;
    const py = 400 - 300 * sinLat;
    return {
      d: `M ${400 - rx},${py} A ${rx},${ry} 0 0,1 ${400 + rx},${py} A ${rx},${ry} 0 0,1 ${400 - rx},${py}`,
      lat,
      ry: rx,
      cy: py,
    };
  });

  // Generate dot grid at intersections
  const dots: { cx: number; cy: number; z: number }[] = [];
  for (let mi = 0; mi < 12; mi++) {
    for (let pi = 0; pi < 7; pi++) {
      const lon = -180 + mi * 30;
      const lat = -60 + pi * 20;
      const x = 400 + 300 * Math.cos((lat * Math.PI) / 180) * Math.cos((lon * Math.PI) / 180);
      const y = 400 - 300 * Math.sin((lat * Math.PI) / 180);
      const z = Math.sin((lat * Math.PI) / 180) * Math.cos((lon * Math.PI) / 180);
      if (z > -0.3 && z < 0.3) {
        dots.push({ cx: x, cy: y, z });
      }
    }
  }

  return (
    <div
      ref={canvasRef}
      id="hero-canvas"
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ background: '#FFF8F0' }}
      role="img"
      aria-label="Animated globe showing travel routes"
    >
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0A6B6B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0A6B6B" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g ref={globeGroupRef}>
          {/* Ambient glow */}
          <circle cx="400" cy="400" r="320" fill="url(#globeGlow)" />

          <g ref={globeGridRef} id="globe-grid">
            {/* Main sphere outline */}
            <circle
              cx="400"
              cy="400"
              r="300"
              fill="none"
              stroke="#0A6B6B"
              strokeWidth="1.5"
              opacity="0.3"
            />

            {/* Meridians */}
            {meridians.map((m, i) => (
              <path
                key={`meridian-${i}`}
                d={m.d}
                fill="none"
                stroke="#0A6B6B"
                strokeWidth="0.8"
                opacity={Math.abs(m.lon) < 90 ? 0.5 : 0.2}
              />
            ))}

            {/* Parallels */}
            {parallels.map((p, i) => (
              <ellipse
                key={`parallel-${i}`}
                cx="400"
                cy="400"
                rx={300 * Math.cos((p.lat * Math.PI) / 180)}
                ry={100 * Math.cos((p.lat * Math.PI) / 180)}
                fill="none"
                stroke="#0A6B6B"
                strokeWidth="0.8"
                opacity={Math.abs(p.lat) < 40 ? 0.5 : 0.2}
              />
            ))}

            {/* Dot grid at intersections */}
            {dots.map((dot, i) => (
              <circle
                key={`dot-${i}`}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.z > 0 ? 1.8 : 1}
                fill={dot.z > 0 ? '#0A6B6B' : '#6B6B6B'}
                opacity={dot.z > 0 ? 0.7 : 0.3}
              />
            ))}
          </g>

          {/* Sun arc decoration */}
          <path
            d="M 120 400 A 280 280 0 0 1 680 400"
            fill="none"
            stroke="#E8912A"
            strokeWidth="3"
            strokeDasharray="20 10 200 400"
            opacity="0.4"
          />

          {/* Airplane orbit path (hidden, for motionPath) */}
          <ellipse
            id="airplane-orbit"
            cx="400"
            cy="320"
            rx="310"
            ry="100"
            fill="none"
            stroke="none"
          />

          {/* Airplane */}
          <g ref={airplaneRef} id="airplane" filter="url(#glow)">
            <path
              d="M -12 0 L -4 -4 L -4 -2 L 8 -2 L 12 -6 L 14 -6 L 10 0 L 14 6 L 12 6 L 8 2 L -4 2 L -4 4 Z"
              fill="#E8912A"
              stroke="#E8912A"
              strokeWidth="1.5"
            />
          </g>

          {/* Traveler silhouettes on lower orbit */}
          <ellipse
            id="traveler-orbit"
            cx="400"
            cy="480"
            rx="280"
            ry="60"
            fill="none"
            stroke="none"
          />

          {/* 3 traveler figures */}
          {[0, 120, 240].map((offset, i) => (
            <g
              key={`traveler-${i}`}
              className="traveler"
              style={{ transformOrigin: 'center' }}
            >
              <circle
                cx={400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180)}
                cy={480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180)}
                r="4"
                fill="#0F8B8B"
                opacity="0.7"
              />
              <path
                d={`M ${400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180)} ${480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180) + 4} Q ${400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180) - 3} ${480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180) + 12} ${400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180)} ${480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180) + 14} Q ${400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180) + 3} ${480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180) + 12} ${400 + 280 * Math.cos(((offset - 90) * Math.PI) / 180)} ${480 + 60 * Math.sin(((offset - 90) * Math.PI) / 180) + 4}`}
                fill="none"
                stroke="#0F8B8B"
                strokeWidth="1.5"
                opacity="0.7"
              />
            </g>
          ))}

          {/* Decorative rings */}
          <circle
            cx="400"
            cy="400"
            r="340"
            fill="none"
            stroke="#C4A882"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
};

export default GlobeCanvas;
