import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border/30 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-heading text-lg font-bold text-foreground">Your Cart ({totalItems})</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag size={48} className="text-muted-foreground/30" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <button onClick={() => setIsCartOpen(false)} className="glow-button-outline text-sm !px-6 !py-2">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 glass-card p-3"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg bg-secondary/30" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-semibold text-foreground truncate">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.size} · {item.color}</p>
                      <p className="text-sm font-bold text-primary mt-1">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-heading text-lg font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-border/30 pt-3">
                  <span className="font-heading font-bold text-foreground">Total</span>
                  <span className="font-heading text-xl font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
                </div>
                <button className="glow-button w-full text-base">Checkout — ₹{totalPrice.toLocaleString()}</button>
                <button onClick={clearCart} className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
