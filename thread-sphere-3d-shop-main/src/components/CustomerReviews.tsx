import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Arun Kumar", rating: 5, text: "Best quality shirts I've ever bought! The cotton fabric is incredibly soft and the fit is perfect.", location: "Namakkal" },
  { name: "Priya Sharma", rating: 5, text: "The 3D preview helped me choose the right color. Amazing shopping experience and fast delivery!", location: "Chennai" },
  { name: "Rajesh Mohan", rating: 4, text: "Premium quality at affordable prices. The formal shirts are excellent for office wear.", location: "Salem" },
  { name: "Deepa Venkat", rating: 5, text: "Love the printed tees! Unique designs and the fabric quality is top-notch. Will order again.", location: "Coimbatore" },
];

const CustomerReviews = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <p className="text-primary font-medium uppercase tracking-widest text-sm">Testimonials</p>
        <h2 className="section-heading">What Our <span className="text-gradient">Customers Say</span></h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-6 space-y-4"
          >
            <Quote size={24} className="text-primary/40" />
            <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14} className={j < review.rating ? "fill-primary text-primary" : "text-muted"} />
              ))}
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground text-sm">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CustomerReviews;
