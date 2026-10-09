import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArvinaLogo } from '../components/ArvinaLogo';
import { ArrowRight, Sparkles, Shield, HeartHandshake, Feather, ChevronRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useShop();

  const pillars = [
    {
      title: 'Architectural Tailoring',
      desc: 'We treat clothing as wearable sculpture. Every lapel notch, pleat depth, and shoulder contour is calibrated for balanced proportions.',
      icon: Feather,
    },
    {
      title: 'Normandy Flax & Italian Leathers',
      desc: 'Our textiles are sustainably harvested from European flax farms and certified Florentine tanneries that preserve heritage techniques.',
      icon: Sparkles,
    },
    {
      title: 'Ethical Family Ateliers',
      desc: 'Crafted in small batches across multi-generational workshops in Porto and Milan, guaranteeing living wages and humane artisan conditions.',
      icon: HeartHandshake,
    },
    {
      title: 'Heirloom Longevity',
      desc: 'We design against planned obsolescence. Every Arvina piece is built to endure decades in your wardrobe with timeless modernism.',
      icon: Shield,
    },
  ];

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen py-8 sm:py-12 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615] transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium">About Arvina</span>
          <ChevronRight size={12} />
          <span className="text-[#7D6D5A]">Our Story & Ethos</span>
        </nav>

        {/* Brand Manifesto Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="flex justify-center mb-6">
            <ArvinaLogo variant="full" size="md" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171615] tracking-tight mb-6">
            Built for Bold Souls Who Move with Quiet Confidence
          </h1>

          <p className="text-sm sm:text-base text-[#5C5148] leading-relaxed font-sans">
            Arvina was founded on a simple conviction: luxury is not about excessive ornamentation or ostentatious logos. True luxury is tactile comfort, immaculate tailoring, and the courage to wear pieces that let your own soul take center stage.
          </p>
        </div>

        {/* Editorial Split: The Origin & The Ateliers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block">
              OUR HERITAGE & ATELIERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171615]">
              Where Slow Fashion Meets Contemporary Mastery
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5148] leading-relaxed">
              Every season begins not on digital trend boards, but on the loom floors of Northern Portugal and the leather workshops of Tuscany. We collaborate directly with master weavers who have perfected natural fiber spinning for centuries.
            </p>
            <p className="text-xs sm:text-sm text-[#5C5148] leading-relaxed">
              By rejecting seasonal overproduction and manufacturing strictly in limited editions, we ensure zero landfill waste and maintain uncompromising quality across every hand-finished seam.
            </p>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#F4EFEA] border border-[#ECE2D4] aspect-[4/3] shadow-md">
            <img
              src="/src/assets/images/rack_minimal_blazers_1791555526887.jpg"
              alt="Arvina atelier showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
              FOUNDATIONAL COMMITMENTS
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#171615]">
              The Four Pillars of Arvina
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-white p-6 rounded-2xl border border-[#ECE2D4] shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#ECE2D4] flex items-center justify-center text-[#171615]">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#171615]">{p.title}</h4>
                  <p className="text-xs text-[#5C5148] leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sustainability & Carbon Neutral Pledge */}
        <div className="bg-[#171615] text-[#FAF6F0] rounded-2xl p-8 sm:p-14 mb-20 text-center max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#C4B7A6] block mb-3 font-mono">
            RESPONSIBLE PRODUCTION CHARTER
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            100% Plastic-Free & Carbon Balanced Deliveries
          </h3>
          <p className="text-xs sm:text-sm text-[#BDB2A5] leading-relaxed max-w-xl mx-auto mb-8">
            Every order is dispatched in FSC-certified compostable mailers with organic cotton dustbags. We calculate and offset 100% of transport emissions via certified global reforestation initiatives.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-8 py-3.5 bg-[#FAF6F0] text-[#171615] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-white transition-colors cursor-pointer"
          >
            Explore The Conscious Collection
          </button>
        </div>

      </div>
    </div>
  );
};
