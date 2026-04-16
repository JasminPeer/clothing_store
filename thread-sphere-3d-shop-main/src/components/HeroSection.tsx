import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroModel from "@/assets/hero-model.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const parallaxY = scrollY * 0.3;
  const scale = Math.max(0.85, 1 - scrollY * 0.0004);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0 hero-glow" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] transition-transform duration-1000"
        style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] transition-transform duration-1000"
        style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm text-muted-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            New Collection 2026
          </motion.div>

          <h1 className="section-heading leading-[1.1]">
            Experience Style{" "}
            <span className="text-gradient">in 3D</span>
          </h1>

          <p className="section-subtext">
            Explore premium shirts with interactive 3D viewing. See every angle before you buy.
          </p>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection("shop")} className="glow-button text-base">
              Shop Now
            </button>
            <button onClick={() => scrollToSection("collection")} className="glow-button-outline text-base">
              View Collection
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Premium Styles" },
              { value: "4.9", label: "Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero image with advanced effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center relative"
        >
          <div
            className="relative transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 12}deg) scale(${scale}) translateY(${-parallaxY * 0.2}px)`,
            }}
          >
            {/* Orbiting rings */}
            <div className="absolute inset-0 -m-10">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="absolute inset-0 -m-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Glowing backdrop */}
            <div className="absolute inset-0 m-8 rounded-full bg-primary/10 blur-[60px]" />

            {/* Model image */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent rounded-3xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <img
                src={heroModel}
                alt="3D Model wearing premium shirt"
                width={768}
                height={1024}
                className="w-full max-w-md mx-auto drop-shadow-[0_0_50px_hsl(213_100%_50%/0.25)]"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute top-10 -right-4 glass-card px-4 py-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-xs text-muted-foreground">Fabric</p>
              <p className="font-heading font-bold text-sm text-foreground">100% Cotton</p>
            </motion.div>
            <motion.div
              className="absolute bottom-20 -left-4 glass-card px-4 py-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="font-heading font-bold text-sm text-foreground">⭐ 4.9/5</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
