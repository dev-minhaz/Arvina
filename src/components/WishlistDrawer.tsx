import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, formatPrice, setCurrentPage } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col border-l border-[#ECE2D4]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#ECE2D4] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2">
              <Heart size={18} className="fill-[#E879A8] text-[#E879A8]" />
              <h2 className="font-serif text-lg font-bold tracking-tight text-[#171615]">
                Saved Wishlist
              </h2>
              <span className="text-xs font-mono text-[#7D6D5A]">
                ({savedProducts.length})
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#554C44] hover:text-[#171615] transition-colors rounded-md cursor-pointer"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#ECE2D4]/70">
            {savedProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center">
                <Heart size={40} className="text-[#D9CFC4] mb-3 stroke-[1.2]" />
                <h3 className="font-serif text-xl font-bold text-[#171615] mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#6B5E53] max-w-xs mb-6">
                  Save your favorite styles by tapping the heart icon on any piece.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="px-6 py-3 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-wider uppercase cursor-pointer hover:bg-[#342F2B] transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <div className="w-20 h-24 rounded-lg bg-[#F5EFE8] border border-[#ECE2D4] overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm text-[#171615] truncate pr-2">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#9C8F82] hover:text-[#B91C1C] transition-colors p-1 cursor-pointer"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-[#171615] tabular-nums font-mono mt-1">
                      {formatPrice(product.price)}
                    </div>

                    <div className="mt-3">
                      <button
                        onClick={() => {
                          addToCart(product);
                          toggleWishlist(product.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171615] text-[#FAF6F0] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#342F2B] transition-colors cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {savedProducts.length > 0 && (
            <div className="p-5 bg-[#F4EFEA] border-t border-[#ECE2D4]">
              <button
                onClick={() => {
                  savedProducts.forEach((p) => addToCart(p));
                  savedProducts.forEach((p) => toggleWishlist(p.id));
                }}
                className="w-full py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add All to Shopping Bag</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
