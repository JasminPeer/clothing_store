import { useState } from "react";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "./ThemeToggle";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const links = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "Collection", href: "#collection" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ThreadSphere" width={40} height={40} className="w-10 h-10" />
          <span className="font-heading text-xl font-bold tracking-tight">
            THREAD<span className="text-primary">SPHERE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Heart size={20} />
          </button>
          <button
            className="relative text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm font-medium uppercase"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
