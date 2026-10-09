import React from 'react';
import { ArrowRight, Play, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { setIsLookbookOpen, setSelectedCategory, setCurrentPage } = useShop();

  const handleShopNow = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#FAF6F0] overflow-hidden pt-4 pb-12 sm:pb-16 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Split Side-by-Side Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[640px]">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center py-6 sm:py-10 lg:pr-6">
            
            {/* Small Taupe Kicker */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] uppercase text-[#7D6D5A]">
                NEW COLLECTION · CURATED FOR THE BOLD
              </span>
            </div>

            {/* Main Headline (Bold Luxury Serif) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold text-[#171615] tracking-tight mb-5 sm:mb-6 text-balance">
              Elevate Your <br className="hidden sm:inline" />
              Everyday Style
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#554C44] font-normal leading-relaxed max-w-xl mb-8 sm:mb-10 font-sans">
              Timeless pieces crafted for elegance and self-expression. 
              Discover our curated wardrobe essentials, tailored cuts, and refined textures made for bold souls.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
              {/* Primary: Solid Black */}
              <button
                onClick={handleShopNow}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase rounded-none hover:bg-[#342F2B] transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Secondary: Outlined Minimalist Watch Lookbook */}
              <button
                onClick={() => setIsLookbookOpen(true)}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#171615] text-[#171615] text-xs font-semibold tracking-[0.16em] uppercase rounded-none hover:bg-[#171615] hover:text-[#FAF6F0] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-transparent border border-current flex items-center justify-center">
                  <Play size={9} className="ml-0.5 fill-current" />
                </div>
                <span>Watch Lookbook</span>
              </button>
            </div>

            {/* Editorial Tag */}
            <div className="text-xs text-[#8A7C6E] tracking-wider pt-2 flex items-center gap-2">
              <span>LOOKBOOK NO. 04 · SPRING / SUMMER</span>
              <span>·</span>
              <button
                onClick={() => {
                  setCurrentPage('lookbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#171615] underline hover:text-[#7D6D5A]"
              >
                Explore Story
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Hero Image & Index Indicators */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-[560px] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-xs border border-[#ECE2D4]/60 bg-[#F4EFEA]">
              <img
                src="/src/assets/images/hero_blazer_model_1791555424939.jpg"
                alt="Arvina Spring Collection featuring tailored cream blazer"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Editorial floating tag */}
              <div className="absolute bottom-5 left-5 bg-[#FAF6F0]/90 backdrop-blur-md px-4 py-2 border border-[#ECE2D4] text-[11px] tracking-[0.18em] uppercase text-[#171615]">
                <span>EDITORIAL · THE OATMEAL BLAZER</span>
              </div>
            </div>

            {/* Vertical Number Navigation Indicator (01 / 02 / 03) */}
            <div className="hidden xl:flex flex-col items-center gap-5 absolute -right-6 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8C7D6F] tracking-widest select-none">
              <span className="font-bold text-[#171615] scale-110">01</span>
              <div className="w-[1px] h-6 bg-[#C4B7A6]" />
              <button
                onClick={() => {
                  setCurrentPage('lookbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#8C7D6F] hover:text-[#171615] cursor-pointer"
              >
                02
              </button>
              <button
                onClick={() => {
                  setCurrentPage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#8C7D6F] hover:text-[#171615] cursor-pointer"
              >
                03
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust Elements Strip (3 distinct columns from reference image) */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-[#ECE2D4] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Trust item 1 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F0E8DD] flex items-center justify-center text-[#171615] shrink-0">
              <Truck size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                FREE SHIPPING
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                On orders over $99
              </p>
            </div>
          </div>

          {/* Trust item 2 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F0E8DD] flex items-center justify-center text-[#171615] shrink-0">
              <RefreshCw size={17} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                EASY RETURNS
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                30-day return window
              </p>
            </div>
          </div>

          {/* Trust item 3 */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#F0E8DD] flex items-center justify-center text-[#171615] shrink-0">
              <ShieldCheck size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                SECURE PAYMENT
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                100% Protected checkout
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
