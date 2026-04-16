import { motion } from "framer-motion";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "500+", label: "Premium Designs" },
  { icon: Globe, value: "50+", label: "Cities Served" },
  { icon: TrendingUp, value: "99%", label: "Satisfaction Rate" },
];

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-primary font-medium uppercase tracking-widest text-sm">About Us</p>
          <h2 className="section-heading">
            Crafting <span className="text-gradient">Premium Fashion</span> Since 2020
          </h2>
          <p className="section-subtext">
            ThreadSphere was born from a passion for blending cutting-edge technology with timeless fashion. 
            We believe every shirt tells a story — and our 3D experience lets you explore that story from every angle.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Based in Namakkal, Tamil Nadu, we source only the finest fabrics — from breathable organic cotton 
            to premium linen blends. Every stitch is crafted with precision, ensuring comfort that lasts all day 
            and style that turns heads.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Sustainable Fashion", "Handcrafted Quality", "Free Returns", "Express Delivery"].map((tag) => (
              <span key={tag} className="px-4 py-2 text-sm glass-card text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 text-center space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon size={24} className="text-primary" />
              </div>
              <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
