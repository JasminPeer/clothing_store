import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import productCasual from "@/assets/product-casual-v2.png";
import productFormal from "@/assets/product-formal-v2.png";
import productCotton from "@/assets/product-cotton-v2.png";
import productPrinted from "@/assets/product-printed-v2.png";
import ProductViewer from "./ProductViewer";

const products = [
  { id: 1, name: "Classic Casual Shirt", category: "Casual Shirts", price: 1299, rating: 4.8, reviews: 124, image: productCasual },
  { id: 2, name: "Executive Formal Shirt", category: "Formal Shirts", price: 1899, rating: 4.9, reviews: 89, image: productFormal },
  { id: 3, name: "Premium Cotton Tee", category: "Cotton T-Shirts", price: 799, rating: 4.7, reviews: 256, image: productCotton },
  { id: 4, name: "Geometric Print Tee", category: "Printed Wear", price: 999, rating: 4.6, reviews: 178, image: productPrinted },
];

const ProductCard = ({ product, onView }: { product: typeof products[0]; onView: () => void }) => {
  const { addItem } = useCart();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [liked, setLiked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x: y, y: x });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size: "M",
      color: "Original",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card-hover group perspective-1000 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onView}
    >
      <div
        className="preserve-3d transition-transform duration-300"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className="relative overflow-hidden rounded-t-2xl bg-secondary/20 p-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={640}
            height={800}
            className="w-full h-72 object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
            <button onClick={(e) => { e.stopPropagation(); onView(); }} className="p-2.5 glass-card hover:bg-primary/20 transition-colors rounded-xl">
              <Eye size={18} className="text-foreground" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className="p-2.5 glass-card hover:bg-primary/20 transition-colors rounded-xl">
              <Heart size={18} className={liked ? "fill-destructive text-destructive" : "text-foreground"} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-xs text-primary font-medium uppercase tracking-wider">{product.category}</p>
          <h3 className="font-heading font-semibold text-foreground">{product.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"} />
              ))}
            </div>
            <span className="text-sm text-foreground font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="font-heading text-xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            <button onClick={handleAddToCart} className="glow-button !px-4 !py-2 text-sm flex items-center gap-2">
              <ShoppingCart size={14} /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  const [viewerProduct, setViewerProduct] = useState<typeof products[0] | null>(null);

  return (
    <>
      <section id="shop" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <p className="text-primary font-medium uppercase tracking-widest text-sm">Our Collection</p>
            <h2 className="section-heading">Featured Products</h2>
            <p className="section-subtext mx-auto">Handcrafted shirts designed for the modern gentleman</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onView={() => setViewerProduct(product)} />
            ))}
          </div>
        </div>
      </section>

      {viewerProduct && (
        <ProductViewer product={viewerProduct} onClose={() => setViewerProduct(null)} />
      )}
    </>
  );
};

export default FeaturedProducts;
