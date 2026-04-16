import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import productCasual from "@/assets/product-casual-v2.png";
import productFormal from "@/assets/product-formal-v2.png";
import productCotton from "@/assets/product-cotton-v2.png";
import productPrinted from "@/assets/product-printed-v2.png";

const collections = [
  { name: "Casual Essentials", description: "Everyday comfort meets effortless style", image: productCasual, count: "24 Items" },
  { name: "Formal Collection", description: "Sharp looks for the modern professional", image: productFormal, count: "18 Items" },
  { name: "Cotton Classics", description: "Pure cotton comfort in timeless designs", image: productCotton, count: "32 Items" },
  { name: "Printed Originals", description: "Bold patterns that make a statement", image: productPrinted, count: "15 Items" },
];

const CollectionSection = () => (
  <section id="collection" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <p className="text-primary font-medium uppercase tracking-widest text-sm">Explore</p>
        <h2 className="section-heading">Our <span className="text-gradient">Collections</span></h2>
        <p className="section-subtext mx-auto">Browse curated collections designed for every occasion</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {collections.map((col, i) => (
          <motion.div
            key={col.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover group cursor-pointer overflow-hidden"
          >
            <div className="flex items-center gap-6 p-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-xl bg-secondary/20 flex items-center justify-center overflow-hidden">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-28 h-28 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-xs text-primary font-medium">{col.count}</span>
                <h3 className="font-heading text-xl font-bold text-foreground">{col.name}</h3>
                <p className="text-sm text-muted-foreground">{col.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium pt-1 group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CollectionSection;
