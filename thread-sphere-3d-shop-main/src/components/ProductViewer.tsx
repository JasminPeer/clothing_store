import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw, ShoppingCart, Minus, Plus, Play, Pause } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
}

const colorOptions = [
  { name: "Original", filter: "none", dot: "bg-muted border-primary" },
  { name: "Black", filter: "brightness(0.3) contrast(1.2)", dot: "bg-[#1a1a1a]" },
  { name: "Navy Blue", filter: "hue-rotate(200deg) saturate(1.3) brightness(0.85)", dot: "bg-[#1e3a5f]" },
  { name: "Red", filter: "hue-rotate(330deg) saturate(1.6) brightness(0.85)", dot: "bg-[#c0392b]" },
  { name: "Green", filter: "hue-rotate(100deg) saturate(1.2) brightness(0.85)", dot: "bg-[#27ae60]" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductViewer = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const { addItem } = useCart();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>();

  // Auto-rotate like Flipkart/Amazon 360° view
  useEffect(() => {
    if (!autoRotate) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      setRotation((prev) => ({ ...prev, y: prev.y + delta * 0.05 }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [autoRotate]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setAutoRotate(false);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.5)),
      y: prev.y + dx * 0.5,
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.5, Math.min(3, z - e.deltaY * 0.002)));
  }, []);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        size: sizes[selectedSize],
        color: colorOptions[selectedColor].name,
      });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-6 md:p-8 max-w-3xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 360° Viewer */}
            <div className="space-y-4">
              <div
                className="relative h-80 md:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none bg-secondary/20 rounded-xl overflow-hidden touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onWheel={handleWheel}
              >
                {/* Grid bg */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />

                <div style={{
                  transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
                  transition: isDragging.current ? "none" : "transform 0.1s ease-out",
                  transformStyle: "preserve-3d",
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 md:h-80 object-contain pointer-events-none"
                    style={{
                      filter: `${colorOptions[selectedColor].filter} drop-shadow(0 0 20px hsl(213 100% 50% / 0.15))`,
                    }}
                    draggable={false}
                  />
                </div>

                {/* Info overlays */}
                <div className="absolute bottom-3 left-3 text-xs text-muted-foreground bg-card/80 backdrop-blur px-2 py-1 rounded-lg">
                  {Math.round(zoom * 100)}%
                </div>
                <div className="absolute top-3 left-3 text-xs text-muted-foreground bg-card/80 backdrop-blur px-2 py-1 rounded-lg">
                  Drag to rotate · Scroll to zoom
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                  <ZoomOut size={16} />
                </button>
                <div className="w-20 h-1.5 bg-secondary rounded-full relative">
                  <div className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all" style={{ width: `${((zoom - 0.5) / 2.5) * 100}%` }} />
                </div>
                <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                  <ZoomIn size={16} />
                </button>
                <button onClick={() => { setRotation({ x: 0, y: 0 }); setZoom(1); }} className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors ml-1">
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-2 glass-card rounded-lg transition-colors ml-1 ${autoRotate ? "bg-primary/20 text-primary" : "hover:bg-primary/20"}`}
                >
                  {autoRotate ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-5">
              <div>
                <p className="text-xs text-primary uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-heading text-2xl font-bold text-foreground">{product.name}</h3>
                <p className="text-3xl font-heading font-bold text-primary mt-2">₹{product.price}</p>
              </div>

              {/* Color */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Color: <span className="text-foreground font-medium">{colorOptions[selectedColor].name}</span></p>
                <div className="flex items-center gap-2">
                  {colorOptions.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color.dot} ${
                        selectedColor === i ? "border-primary ring-2 ring-primary/30 scale-110" : "border-border"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Size: <span className="text-foreground font-medium">{sizes[selectedSize]}</span></p>
                <div className="flex items-center gap-2">
                  {sizes.map((size, i) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(i)}
                      className={`w-10 h-10 rounded-lg border text-sm font-medium transition-all ${
                        selectedSize === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/30 text-muted-foreground border-border/50 hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-heading text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button onClick={handleAddToCart} className="glow-button w-full flex items-center justify-center gap-2 text-base mt-4">
                <ShoppingCart size={18} /> Add to Cart — ₹{product.price * quantity}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductViewer;
