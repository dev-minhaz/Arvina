import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductHighlightsGrid: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useShop();

  const highlightCards = [
    {
      id: 'womens-style',
      title: "Women's Collection",
      subtitle: 'Curated Collection',
      image: '/src/assets/images/cat_womens_collection_1791555446091.jpg',
      category: 'all',
      alt: "Arvina Women's Collection featuring tailored ivory suit",
    },
    {
      id: 'mens-apparel',
      title: "Men's Collection",
      subtitle: 'Modern Classics',
      image: '/src/assets/images/cat_mens_collection_1791555457090.jpg',
      category: 'Outerwear',
      alt: "Arvina Men's Collection featuring suede overshirt",
    },
    {
      id: 'dresses-editorial',
      title: 'Dresses',
      subtitle: 'Effortless Silhouettes',
      image: '/src/assets/images/cat_dresses_collection_1791555469714.jpg',
      category: 'Dresses',
      alt: 'Arvina Dresses featuring black wrap midi dress',
    },
    {
      id: 'finishing-touches',
      title: 'Accessories',
      subtitle: 'Finishing Touches',
      image: '/src/assets/images/cat_accessories_bag_1791555481939.jpg',
      category: 'Accessories',
      alt: 'Arvina Luxury Handbags and Accessories',
    },
  ];

  const handleCardClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#FAF6F0] py-14 sm:py-20 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171615] tracking-tight">
              Find Your Perfect Style
            </h2>
          </div>

          <button
            onClick={() => handleCardClick('all')}
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#171615] hover:text-[#7D6D5A] transition-colors pb-1 border-b border-[#171615]/20 hover:border-[#7D6D5A] self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Large Square Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {highlightCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.category)}
              className="group relative aspect-square w-full overflow-hidden rounded-xl bg-[#F0EAE1] cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            >
              {/* Background Photo */}
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Text & Action Lockup */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#E5D7C7] mb-1">
                  {card.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight mb-3">
                  {card.title}
                </h3>

                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-white/90 group-hover:text-white group-hover:underline underline-offset-4 transition-all">
                  <span>Explore Now</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
