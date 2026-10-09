import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const EditorialSaleSection: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useShop();

  const handleSaleClick = () => {
    setSelectedCategory('sale');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewInClick = () => {
    setSelectedCategory('Outerwear');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="editorial" className="w-full bg-[#FAF6F0] py-12 sm:py-18 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8 sm:space-y-10">
        
        {/* Top Band: The Spring Sale Editorial (Reference Image Top Band) */}
        <div className="bg-[#F4EFEA] rounded-2xl border border-[#ECE2D4] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-xs">
          {/* Left Side: Editorial Fashion Portrait in Trench Coat */}
          <div className="lg:col-span-5 h-[320px] sm:h-[400px] lg:h-[460px] relative overflow-hidden bg-[#EAE2D8]">
            <img
              src="/src/assets/images/editorial_trench_spring_1791555493745.jpg"
              alt="Arvina Spring Trench Coat Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right Side: Sale Offer Text & CTA */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#7D6D5A]" />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A]">
                LIMITED TIME OFFER
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#171615] tracking-tight mb-4">
              Spring Sale <br />
              <span className="italic font-normal text-[#7D6D5A]">Up to 50% Off</span>
            </h3>

            <p className="text-base text-[#554C44] leading-relaxed max-w-xl mb-8">
              Explore curated looks, artisanal textures, and transitional layers for the new season. 
              Elevate your everyday rotation with distinctive wardrobe signatures.
            </p>

            <div>
              <button
                onClick={handleSaleClick}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase rounded-none hover:bg-[#38332E] transition-all duration-200 cursor-pointer"
              >
                <span>Shop The Sale</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Band: Fresh Styles Just Landed (Reference Image Bottom Band) */}
        <div className="bg-[#F4EFEA] rounded-2xl border border-[#ECE2D4] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-xs">
          
          {/* Left Side: New In Text & CTA */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-3">
              NEW ARRIVALS
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] leading-tight font-bold text-[#171615] tracking-tight mb-4">
              Fresh Styles <br />
              <span className="italic font-normal text-[#7D6D5A]">Just Landed</span>
            </h3>

            <p className="text-base text-[#554C44] leading-relaxed max-w-xl mb-8">
              A special curation of one-of-a-kind styles. Tailored blazers, fluid suiting, and 
              essential accessories designed to inspire confidence and individuality.
            </p>

            <div>
              <button
                onClick={handleNewInClick}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase rounded-none hover:bg-[#38332E] transition-all duration-200 cursor-pointer"
              >
                <span>Explore New In</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>

          {/* Right Side: Rack of Minimalist Blazers */}
          <div className="lg:col-span-5 h-[320px] sm:h-[400px] lg:h-[460px] relative overflow-hidden bg-[#EAE2D8] order-1 lg:order-2">
            <img
              src="/src/assets/images/rack_minimal_blazers_1791555526887.jpg"
              alt="Curated neutral blazers on apparel rack"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
