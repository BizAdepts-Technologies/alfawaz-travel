const ScrollIndicator = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-0.5 h-10 bg-warm-gray/30 rounded-full overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-warm-gray rounded-full animate-scroll-dot" />
      </div>
      <span className="font-body font-medium text-[0.75rem] tracking-[0.1em] uppercase text-warm-gray/60">
        Scroll to explore
      </span>
    </div>
  );
};

export default ScrollIndicator;
