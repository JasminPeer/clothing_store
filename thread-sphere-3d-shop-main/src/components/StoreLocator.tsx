import { motion } from "framer-motion";
import { MapPin, Phone, Navigation, Search, ExternalLink } from "lucide-react";

const stores = [
  { name: "ThreadSphere Namakkal Main", address: "45, Trichy Road, Namakkal, Tamil Nadu 637001", phone: "+91 98765 43210", distance: "0.5 km", lat: 11.2189, lng: 78.1674 },
  { name: "ThreadSphere Mohanur", address: "12, Gandhi Street, Mohanur, Namakkal Dt. 637015", phone: "+91 98765 43211", distance: "8.2 km", lat: 11.0614, lng: 78.1378 },
  { name: "ThreadSphere Rasipuram", address: "78, Salem Road, Rasipuram, Namakkal Dt. 637408", phone: "+91 98765 43212", distance: "15.4 km", lat: 11.4598, lng: 78.1828 },
];

const StoreLocator = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <p className="text-primary font-medium uppercase tracking-widest text-sm">Visit Us</p>
        <h2 className="section-heading">Find Us <span className="text-gradient">Near You</span></h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Real embedded map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="p-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search clothing stores in Namakkal"
                className="w-full bg-secondary/50 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          <div className="h-80 relative">
            <iframe
              title="ThreadSphere Store Location - Namakkal"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.0%2C11.1%2C78.3%2C11.3&layer=mapnik&marker=11.2189%2C78.1674"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
            <a
              href="https://www.openstreetmap.org/?mlat=11.2189&mlon=78.1674#map=12/11.2189/78.1674"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-1 text-xs glass-card px-3 py-1.5 text-primary hover:bg-primary/10 transition-colors"
            >
              <ExternalLink size={12} /> Open Full Map
            </a>
          </div>
        </motion.div>

        {/* Store list */}
        <div className="space-y-4">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{store.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                    {store.address}
                  </p>
                </div>
                <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">{store.distance}</span>
              </div>
              <div className="flex items-center gap-4">
                <a href={`tel:${store.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} /> {store.phone}
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Navigation size={14} /> Directions
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StoreLocator;
