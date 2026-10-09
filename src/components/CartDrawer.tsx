import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingThreshold,
    formatPrice,
    setCurrentPage,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'BOLD10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "BOLD10"');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingAmount = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12.0;
  const finalTotal = subtotal - discountAmount + shippingAmount;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#ECE2D4]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#ECE2D4] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#171615]" />
              <h2 className="font-serif text-lg font-bold tracking-tight text-[#171615]">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono text-[#7D6D5A]">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#554C44] hover:text-[#171615] transition-colors rounded-md cursor-pointer"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#EFE8DD] border-b border-[#E2D7C8] text-xs">
            {amountNeededForFreeShipping === 0 ? (
              <p className="text-[#2F2925] font-medium flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#5B7052]" />
                You unlocked Complimentary Express Shipping!
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[#584D44]">
                  Add <span className="font-semibold text-[#171615] tabular-nums font-mono">{formatPrice(amountNeededForFreeShipping)}</span> more for Free Shipping
                </p>
                <div className="w-full bg-[#DDD2C4] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#171615] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#ECE2D4]/70">
            {cart.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <ShoppingBag size={40} className="text-[#C4B7A6] mb-3 stroke-[1.2]" />
                <h3 className="font-serif text-xl font-bold text-[#171615] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#6B5E53] max-w-xs mb-6">
                  Explore our curated pieces and discover looks crafted for bold souls.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-6 py-3 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-wider uppercase cursor-pointer hover:bg-[#342F2B] transition-colors"
                >
                  Shop New Arrivals
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="py-4 flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg bg-[#F5EFE8] border border-[#ECE2D4] overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm text-[#171615] truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-[#9C8F82] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs text-[#7D6D5A] mt-0.5">
                      Size: {item.selectedSize} · Color: {item.selectedColor}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center border border-[#D9CFC4] bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="p-1 px-2 text-[#554C44] hover:text-[#171615] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-[#171615] font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="p-1 px-2 text-[#554C44] hover:text-[#171615] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Line price */}
                      <span className="text-sm font-semibold text-[#171615] tabular-nums font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#F4EFEA] border-t border-[#ECE2D4] space-y-4">
              
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try BOLD10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-[#D9CFC4] px-3 py-2 text-xs text-[#171615] uppercase tracking-wider placeholder-[#9E9083] focus:outline-hidden focus:border-[#171615]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#171615] text-[#FAF6F0] text-xs font-medium uppercase tracking-wider hover:bg-[#342F2B] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {discountPercent > 0 && (
                <p className="text-[11px] text-[#557B4A] font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} /> 10% Welcome Discount applied (-{formatPrice(discountAmount)})
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#B91C1C]">{promoError}</p>
              )}

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-[#6B5E53] pt-1 border-t border-[#ECE2D4]/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171615] tabular-nums font-mono">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#557B4A]">
                    <span>Discount (10%)</span>
                    <span className="font-semibold tabular-nums font-mono">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#171615] tabular-nums font-mono">
                    {shippingAmount === 0 ? 'COMPLIMENTARY' : formatPrice(shippingAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#171615] pt-2 border-t border-[#ECE2D4]">
                  <span>Total</span>
                  <span className="tabular-nums font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleGoToCheckout}
                className="w-full py-4 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#38332E] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-[10px] text-center text-[#8C7E72]">
                Complimentary returns within 30 days · SSL 256-bit encryption
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
