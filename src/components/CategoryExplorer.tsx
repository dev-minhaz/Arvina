import React from 'react';
import { CATEGORY_CIRCLES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategoryExplorer: React.FC = () => {
  const { setSelectedCategory, setCurrentPage, currentPage } = useShop();

  const handleCategoryClick = (categoryId: string) => {
    const mapping: Record<string, string> = {
      women: 'all',
      men: 'Outerwear',
      dresses: 'Dresses',
      tops: 'Tops',
      shoes: 'Footwear',
      bags: 'Bags',
      accessories: 'Accessories',
      sale: 'sale',
    };

    const targetCategory = mapping[categoryId] || 'all';
    setSelectedCategory(targetCategory);

    if (currentPage !== 'home') {
      setCurrentPage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentPage('shop');
      }
    }
  };

  return (
    <section className="w-full bg-[#FAF6F0] py-10 sm:py-14 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Category Circle Row with horizontal scroll on small screens */}
        <div className="flex items-center justify-start lg:justify-between gap-6 sm:gap-8 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {CATEGORY_CIRCLES.map((cat) => {
            const isSale = cat.isSale;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center gap-3 shrink-0 cursor-pointer focus:outline-hidden"
              >
                {/* Circular image card */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 relative ${
                    isSale
                      ? 'bg-[#171615] text-[#FAF6F0] shadow-sm group-hover:scale-105 ring-2 ring-transparent group-hover:ring-[#171615]'
                      : 'bg-[#F4EFEA] border border-[#ECE2D4] shadow-2xs group-hover:shadow-md group-hover:scale-105 group-hover:border-[#7D6D5A]'
                  }`}
                >
                  {isSale ? (
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <span className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-white">
                        SALE
                      </span>
                      <span className="text-[9px] tracking-wider text-[#D5C7B7] uppercase font-sans mt-0.5">
                        UP TO 50%
                      </span>
                    </div>
                  ) : (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {/* Micro overlay pulse on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-full" />
                </div>

                {/* Category label */}
                <span className="text-xs sm:text-[13px] font-medium tracking-[0.06em] text-[#171615] group-hover:text-[#7D6D5A] transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
