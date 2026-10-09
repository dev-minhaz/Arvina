import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOK_STORIES, PRODUCTS } from '../data/products';

export const LookbookModal: React.FC = () => {
  const { isLookbookOpen, setIsLookbookOpen, addToCart, setQuickViewProduct } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isLookbookOpen) return null;

  const currentStory = LOOKBOOK_STORIES[currentSlide];
  const linkedProduct = PRODUCTS.find((p) => p.id === currentStory.productId);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % LOOKBOOK_STORIES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + LOOKBOOK_STORIES.length) % LOOKBOOK_STORIES.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsLookbookOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#ECE2D4] overflow-hidden my-6">
          
          {/* Close button */}
          <button
            onClick={() => setIsLookbookOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 bg-[#FAF6F0]/90 text-[#171615] hover:bg-white rounded-full transition-colors cursor-pointer shadow-sm"
            aria-label="Close lookbook"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Visual Look Slide Left */}
            <div className="md:col-span-7 relative h-[380px] sm:h-[480px] md:h-[560px] bg-black overflow-hidden">
              <img
                src={currentStory.image}
                alt={currentStory.title}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />

              {/* Slide Navigation Overlay */}
              <div className="absolute inset-y-0 left-3 flex items-center">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/70 hover:bg-white text-[#171615] transition-colors cursor-pointer shadow-md"
                  aria-label="Previous look"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <div className="absolute inset-y-0 right-3 flex items-center">
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/70 hover:bg-white text-[#171615] transition-colors cursor-pointer shadow-md"
                  aria-label="Next look"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-4 left-6 right-6 flex gap-2">
                {LOOKBOOK_STORIES.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1 flex-1 rounded-full cursor-pointer transition-all ${
                      idx === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Look Details & Direct Purchase Right */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF6F0]">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] mb-2">
                  <Sparkles size={13} />
                  <span>SPRING / SUMMER LOOKBOOK 0{currentSlide + 1}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615] mb-3 leading-snug">
                  {currentStory.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5148] leading-relaxed mb-6">
                  {currentStory.subtitle}
                </p>

                {/* Linked Outfit Card */}
                {linkedProduct && (
                  <div className="bg-[#F4EFEA] border border-[#ECE2D4] rounded-xl p-4 flex gap-4 items-center mb-6">
                    <img
                      src={linkedProduct.image}
                      alt={linkedProduct.name}
                      className="w-16 h-20 object-contain mix-blend-multiply bg-white rounded-md p-1 border border-[#E2D8CC]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#7D6D5A] font-semibold block">
                        Featured Piece
                      </span>
                      <h4 className="text-sm font-medium text-[#171615] truncate">
                        {linkedProduct.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#171615] tabular-nums mt-0.5">
                        ${linkedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-[#ECE2D4]">
                {linkedProduct && (
                  <button
                    onClick={() => {
                      addToCart(linkedProduct);
                      setIsLookbookOpen(false);
                    }}
                    className="w-full py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#342F2B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>Shop This Look</span>
                  </button>
                )}

                {linkedProduct && (
                  <button
                    onClick={() => {
                      setIsLookbookOpen(false);
                      setQuickViewProduct(linkedProduct);
                    }}
                    className="w-full py-2.5 text-xs font-medium text-[#7D6D5A] hover:text-[#171615] hover:underline transition-colors"
                  >
                    View Complete Garment Details
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
