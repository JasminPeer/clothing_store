import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d={d} />
  </svg>
);

const socials = [
  { d: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2m4.5 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10m5.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2" },
  { d: "M22 4s-1.5-.7-2.8-.8c-.7.4-1.3.8-2.2 1C16 3.2 14.5 2.5 13 2.5c-3 0-5.5 2.5-5.5 5.5 0 .4 0 .9.1 1.3C5 9.1 2.7 7.8 1.2 5.8c-.5.8-.7 1.7-.7 2.7 0 1.9 1 3.6 2.5 4.6-.9 0-1.7-.3-2.5-.7v.1c0 2.7 1.9 4.9 4.4 5.4-.5.1-.9.2-1.4.2-.3 0-.7 0-1-.1.7 2.1 2.6 3.6 4.9 3.6-1.8 1.4-4 2.2-6.5 2.2-.4 0-.9 0-1.3-.1C2.3 25.3 5 26 7.8 26c9.3 0 14.4-7.7 14.4-14.4V11c1-.7 1.8-1.6 2.5-2.7-.9.4-1.9.7-2.9.8 1-.6 1.8-1.6 2.2-2.8" },
  { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
];
import logo from "@/assets/logo.png";

const ContactFooter = () => (
  <>
    {/* Contact Section */}
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-primary font-medium uppercase tracking-widest text-sm">Get in Touch</p>
          <h2 className="section-heading">Contact <span className="text-gradient">Us</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Mail size={20} className="text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">hello@threadsphere.in</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Phone size={20} className="text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground font-medium">+91 98765 43210</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin size={20} className="text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-foreground font-medium">45, Trichy Road, Namakkal, TN 637001</p>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <input type="email" placeholder="Your Email" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <textarea rows={4} placeholder="Your Message" className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none" />
            <button className="glow-button w-full flex items-center justify-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="ThreadSphere" width={32} height={32} loading="lazy" className="w-8 h-8" />
              <span className="font-heading text-lg font-bold">THREAD<span className="text-primary">SPHERE</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Style That Moves With You</p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                  <SocialIcon d={s.d} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Shop", links: ["Casual Shirts", "Formal Shirts", "T-Shirts", "Printed Wear"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
            { title: "Support", links: ["Help Center", "Returns", "Size Guide", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
          © 2026 ThreadSphere. All rights reserved.
        </div>
      </div>
    </footer>
  </>
);

export default ContactFooter;
