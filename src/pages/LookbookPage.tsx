import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOK_STORIES, PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, ShoppingBag, Eye, ChevronRight } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { setCurrentPage, openProductPage, addToCart, formatPrice } = useShop();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen py-8 sm:py-12 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615] transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium">Seasonal Lookbook</span>
          <ChevronRight size={12} />
          <span className="text-[#7D6D5A]">Spring / Summer 2026</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#7D6D5A] block mb-3">
            EDITORIAL ARCHIVE · VOL. 04
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171615] tracking-tight mb-5">
            The Spring / Summer Edit
          </h1>
          <p className="text-sm sm:text-base text-[#655A4F] leading-relaxed">
            An exploration of organic fibers, fluid tailoring, and sculptural geometry. Captured in natural Mediterranean light, celebrating the courage to wear understated luxury.
          </p>
        </div>

        {/* Chapter Stories */}
        <div className="space-y-24 sm:space-y-32">
          {LOOKBOOK_STORIES.map((story, idx) => {
            const isEven = idx % 2 === 0;
            const linkedProduct = PRODUCTS.find((p) => p.id === story.productId);

            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Photo with Interactive Hotspots */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#EAE2D8] shadow-md ${
                    isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'
                  }`}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-[450px] sm:h-[580px] lg:h-[640px] object-cover object-center"
                    loading="lazy"
                  />

                  {/* Hotspots */}
                  {story.hotspots?.map((spot, sIdx) => {
                    const spotKey = `${story.id}-${sIdx}`;
                    const spotProduct = PRODUCTS.find((p) => p.id === spot.id);
                    const isOpen = activeHotspot === spotKey;

                    return (
                      <div
                        key={sIdx}
                        className="absolute"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      >
                        {/* Hotspot trigger pulse */}
                        <button
                          onClick={() => setActiveHotspot(isOpen ? null : spotKey)}
                          className="relative w-7 h-7 rounded-full bg-white/90 text-[#171615] border border-black/20 flex items-center justify-center shadow-lg transition-transform hover:scale-125 cursor-pointer focus:outline-hidden"
                          aria-label={`Inspect ${spot.title}`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#171615]" />
                          <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping pointer-events-none" />
                        </button>

                        {/* Popover */}
                        {isOpen && spotProduct && (
                          <div className="absolute left-9 -top-6 z-30 w-52 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#ECE2D4] shadow-xl text-xs animate-in fade-in zoom-in-95 duration-150">
                            <h4 className="font-bold text-[#171615] truncate mb-0.5">{spotProduct.name}</h4>
                            <p className="font-mono text-[#7D6D5A] font-semibold mb-2">
                              {formatPrice(spotProduct.price)}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openProductPage(spotProduct)}
                                className="flex-1 py-1.5 bg-[#171615] text-[#FAF6F0] text-[10px] uppercase font-bold tracking-wider hover:bg-[#342F2B]"
                              >
                                View Piece
                              </button>
                              <button
                                onClick={() => addToCart(spotProduct)}
                                className="p-1.5 border border-[#D9CFC4] hover:bg-[#FAF6F0]"
                                title="Add to Bag"
                              >
                                <ShoppingBag size={12} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Chapter Story Narrative */}
                <div
                  className={`flex flex-col justify-center space-y-5 ${
                    isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1'
                  }`}
                >
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#7D6D5A]">
                    {story.chapter}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171615] tracking-tight">
                    {story.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#5C5148] leading-relaxed">
                    {story.subtitle}
                  </p>

                  {/* Featured Product Card */}
                  {linkedProduct && (
                    <div className="bg-white border border-[#ECE2D4] rounded-xl p-4 flex gap-4 items-center shadow-2xs mt-4">
                      <img
                        src={linkedProduct.image}
                        alt={linkedProduct.name}
                        className="w-16 h-20 object-contain mix-blend-multiply bg-[#F5EFE8] rounded-md p-1 border border-[#ECE2D4]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#7D6D5A] font-semibold block">
                          Featured In This Look
                        </span>
                        <h4 className="text-sm font-semibold text-[#171615] truncate">
                          {linkedProduct.name}
                        </h4>
                        <p className="text-xs font-mono font-bold text-[#171615] mt-0.5">
                          {formatPrice(linkedProduct.price)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {linkedProduct && (
                    <div className="flex flex-wrap gap-3 pt-3">
                      <button
                        onClick={() => addToCart(linkedProduct)}
                        className="px-6 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#342F2B] transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag size={14} />
                        <span>Add Look to Bag</span>
                      </button>

                      <button
                        onClick={() => openProductPage(linkedProduct)}
                        className="px-6 py-3.5 border border-[#171615] text-[#171615] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#171615] hover:text-white transition-colors cursor-pointer"
                      >
                        Explore Silhouettes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lookbook Journal / Notes */}
        <div className="mt-24 sm:mt-32 p-8 sm:p-12 bg-[#F4EFEA] rounded-2xl border border-[#ECE2D4] text-center max-w-3xl mx-auto">
          <Sparkles size={20} className="mx-auto text-[#7D6D5A] mb-3" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615] mb-4">
            A Note from the Atelier
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5148] italic leading-relaxed mb-6">
            "When we designed the Arvina Spring collection, we stripped away the unnecessary. Every seam exists with intention. The women and men who wear Arvina don’t need loud logos to command a room; the cut speaks for them."
          </p>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#171615]">
            — HELENA V., HEAD OF DESIGN, ARVINA PARIS
          </span>
        </div>

      </div>
    </div>
  );
};
