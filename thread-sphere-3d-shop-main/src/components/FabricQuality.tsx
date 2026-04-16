import { motion } from "framer-motion";
import { Wind, Feather, Shield } from "lucide-react";

const features = [
  { icon: Wind, title: "Breathable", desc: "Advanced micro-weave allows air circulation, keeping you cool all day." },
  { icon: Feather, title: "Lightweight", desc: "Ultra-soft premium cotton that feels like a second skin." },
  { icon: Shield, title: "Long-lasting", desc: "Reinforced stitching and pre-shrunk fabric for enduring quality." },
];

const FabricQuality = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <p className="text-primary font-medium uppercase tracking-widest text-sm">Quality First</p>
        <h2 className="section-heading">
          Premium Fabric, <span className="text-gradient">Perfect Comfort</span>
        </h2>
        <p className="section-subtext mx-auto">
          Every shirt is crafted with 100% organic cotton, ensuring breathability, durability, and softness that lasts wash after wash.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover p-8 text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <feature.icon size={28} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FabricQuality;
