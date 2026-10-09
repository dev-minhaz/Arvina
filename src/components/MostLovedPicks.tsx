import React, { useState } from 'react';
import { Heart, Star, Eye, Plus, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { useShop } from '../context/ShopContext';

export const MostLovedPicks: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    openProductPage,
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    setCurrentPage,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'outerwear' | 'tops-dresses' | 'accessories'>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'sale') return product.originalPrice !== undefined;
      return product.category === selectedCategory;
    }

    if (activeTab === 'bestsellers') return product.badge === 'Bestseller' || product.rating >= 4.9;
    if (activeTab === 'outerwear') return product.category === 'Outerwear';
    if (activeTab === 'tops-dresses') return product.category === 'Tops' || product.category === 'Dresses';
    if (activeTab === 'accessories') return product.category === 'Accessories' || product.category === 'Bags' || product.category === 'Footwear';
    return true;
  });

  const displayList = filteredProducts.slice(0, 6);

  return (
    <section id="products" className="w-full bg-[#FAF6F0] py-14 sm:py-20 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
              BEST SELLERS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#171615] tracking-tight">
              Our Most Loved Picks
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Interactive Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F0EAE1] rounded-lg">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'bestsellers', label: 'Bestsellers' },
                { id: 'outerwear', label: 'Outerwear' },
                { id: 'tops-dresses', label: 'Tops & Dresses' },
                { id: 'accessories', label: 'Accessories' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === 'all' && activeTab === tab.id
                      ? 'bg-[#171615] text-[#FAF6F0] shadow-xs'
                      : 'text-[#584F47] hover:text-[#171615]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-[#7D6D5A] hover:underline px-2 py-1 cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* 6-Column Product Grid (like reference image bottom section) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {displayList.map((product) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FAF6F0] transition-all duration-300"
              >
                {/* Product Cutout Image Card on Warm Cream */}
                <div
                  onClick={() => openProductPage(product)}
                  className="relative aspect-[4/5] w-full rounded-xl bg-[#F5EFE8] border border-[#ECE2D4]/70 p-4 flex items-center justify-center overflow-hidden group-hover:border-[#C4B7A6] transition-all duration-300 cursor-pointer"
                >
                  
                  {/* Product Cutout Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Wishlist Button (Corner) with micro heart animation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 cursor-pointer ${
                      inWishlist
                        ? 'bg-white text-[#E879A8] shadow-xs scale-105'
                        : 'bg-white/80 text-[#554C44] hover:text-[#E879A8] hover:bg-white'
                    }`}
                    aria-label={`Save ${product.name} to wishlist`}
                  >
                    <Heart
                      size={15}
                      className={inWishlist ? 'fill-[#E879A8] text-[#E879A8]' : 'stroke-current'}
                    />
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-semibold text-[#7D6D5A]">
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Quick Actions Overlay */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="flex-1 bg-[#171615] text-[#FAF6F0] text-[11px] font-semibold tracking-wider py-2 px-2 hover:bg-[#38332E] transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-2 bg-white text-[#171615] hover:bg-[#FAF6F0] transition-colors border border-[#ECE2D4] shadow-xs cursor-pointer"
                      title="Quick View"
                      aria-label="Quick View"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="pt-3.5 pb-2 flex flex-col flex-1">
                  <h3
                    onClick={() => openProductPage(product)}
                    className="font-medium text-sm text-[#171615] hover:text-[#7D6D5A] transition-colors cursor-pointer truncate mb-1"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-1.5 font-sans">
                    <span className="text-sm font-semibold text-[#171615] tabular-nums font-mono">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#8A7C6E] line-through tabular-nums font-mono">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Star Rating & Review Count */}
                  <div className="flex items-center gap-1 text-[11px] text-[#7A6E63]">
                    <div className="flex text-[#C29B72]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-current text-[#C29B72]" />
                      ))}
                    </div>
                    <span className="tabular-nums font-medium">({product.reviewsCount})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Footer link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#171615] hover:text-[#7D6D5A] py-2.5 px-7 border border-[#171615] hover:border-[#7D6D5A] transition-colors cursor-pointer"
          >
            <span>View All Products in Catalog</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};
