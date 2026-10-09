import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, Product } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, Grid, LayoutGrid, Heart, Eye, Plus, Star, X, ChevronRight } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    openProductPage,
    setCurrentPage,
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'standard' | 'compact'>('standard');

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'Outerwear', label: 'Outerwear & Blazers' },
    { id: 'Tops', label: 'Tops & Knits' },
    { id: 'Bottoms', label: 'Tailored Trousers' },
    { id: 'Dresses', label: 'Dresses' },
    { id: 'Bags', label: 'Handbags & Totes' },
    { id: 'Footwear', label: 'Footwear & Heels' },
    { id: 'Accessories', label: 'Accessories & Eyewear' },
    { id: 'sale', label: 'Seasonal Sale' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'sale') {
          if (!product.originalPrice) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Max price
      if (product.price > maxPrice) return false;

      // Color
      if (selectedColor !== 'all') {
        if (!product.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) {
          return false;
        }
      }

      // Size
      if (selectedSize !== 'all') {
        if (!product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviewsCount - a.reviewsCount;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, maxPrice, selectedColor, selectedSize, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setMaxPrice(250);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedColor !== 'all' || selectedSize !== 'all' || maxPrice < 250;

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen py-6 sm:py-10 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615] transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium">Catalog & Collections</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight size={12} />
              <span className="text-[#7D6D5A] uppercase tracking-wider">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Catalog Banner */}
        <div className="mb-10 pb-6 border-b border-[#ECE2D4] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
              CURATED WARDROBE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171615] tracking-tight">
              The Complete Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#655A4F] mt-2 max-w-xl">
              Engineered with sculptural simplicity and luxurious textures. Each silhouette is crafted for versatile styling and bold self-expression.
            </p>
          </div>

          <div className="text-xs font-mono text-[#7D6D5A]">
            Showing <strong className="text-[#171615] font-bold">{filteredProducts.length}</strong> of {PRODUCTS.length} curated styles
          </div>
        </div>

        {/* Toolbar Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#F4EFEA] p-3.5 sm:p-4 rounded-xl border border-[#ECE2D4]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D9CFC4] text-xs font-medium text-[#171615] rounded-md"
            >
              <Filter size={14} />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#7D6D5A] hover:text-[#171615] underline flex items-center gap-1"
              >
                <X size={12} />
                <span>Reset All</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#655A4F] hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-white border border-[#D9CFC4] px-3 py-1.5 rounded-md text-xs font-medium text-[#171615] focus:outline-hidden"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Bestselling & New</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Layout Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-[#D9CFC4] p-1 rounded-md">
              <button
                onClick={() => setLayoutMode('standard')}
                className={`p-1 rounded ${layoutMode === 'standard' ? 'bg-[#171615] text-white' : 'text-[#655A4F]'}`}
                title="Standard 3-column view"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-1 rounded ${layoutMode === 'compact' ? 'bg-[#171615] text-white' : 'text-[#655A4F]'}`}
                title="Compact 4-column view"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid + Sidebar Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar Filters */}
          <aside className={`lg:col-span-3 space-y-7 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Category Filter */}
            <div className="bg-white p-5 rounded-xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#171615] mb-3 pb-2 border-b border-[#ECE2D4]">
                Categories
              </h3>
              <ul className="space-y-2 text-xs text-[#554C44]">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                        selectedCategory === cat.id ? 'font-bold text-[#171615]' : 'hover:text-[#171615]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#171615]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-5 rounded-xl border border-[#ECE2D4] shadow-2xs">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#ECE2D4]">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#171615]">
                  Max Price
                </h3>
                <span className="text-xs font-mono font-bold text-[#171615]">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Filter by maximum price"
                className="w-full accent-[#171615] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7D6D5A] mt-2 font-mono">
                <span>{formatPrice(20)}</span>
                <span>{formatPrice(250)}</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white p-5 rounded-xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#171615] mb-3 pb-2 border-b border-[#ECE2D4]">
                Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {['all', 'XS', 'S', 'M', 'L', 'XL', 'One Size'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#171615] text-[#FAF6F0] border-[#171615]'
                        : 'bg-[#FAF6F0] text-[#554C44] border-[#D9CFC4] hover:border-[#171615]'
                    }`}
                  >
                    {sz === 'all' ? 'All Sizes' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color filter */}
            <div className="bg-white p-5 rounded-xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#171615] mb-3 pb-2 border-b border-[#ECE2D4]">
                Color Palette
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'all', label: 'All', hex: '#FAF6F0' },
                  { name: 'Sand', label: 'Sand', hex: '#D7C4B0' },
                  { name: 'Ivory', label: 'Ivory', hex: '#EDE6DA' },
                  { name: 'Noir', label: 'Noir', hex: '#1C1A18' },
                  { name: 'Camel', label: 'Camel', hex: '#C29B72' },
                  { name: 'Tortoise', label: 'Tortoise', hex: '#4B3728' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border transition-all ${
                      selectedColor === c.name
                        ? 'border-[#171615] bg-[#171615] text-white'
                        : 'border-[#D9CFC4] bg-white text-[#554C44] hover:border-[#171615]'
                    }`}
                  >
                    {c.name !== 'all' && (
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                    )}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#ECE2D4] p-12 text-center">
                <h3 className="font-serif text-2xl font-bold text-[#171615] mb-2">No matching pieces</h3>
                <p className="text-xs text-[#655A4F] max-w-sm mx-auto mb-6">
                  We could not find items matching your active filter criteria. Try adjusting your price range or selected categories.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-5 sm:gap-6 ${
                  layoutMode === 'standard'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-white rounded-xl border border-[#ECE2D4] p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      {/* Image container */}
                      <div
                        onClick={() => openProductPage(product)}
                        className="relative aspect-[4/5] w-full rounded-lg bg-[#F5EFE8] flex items-center justify-center overflow-hidden cursor-pointer mb-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 cursor-pointer ${
                            inWishlist
                              ? 'bg-white text-[#E879A8] shadow-xs scale-105'
                              : 'bg-white/80 text-[#554C44] hover:text-[#E879A8] hover:bg-white'
                          }`}
                          aria-label={`Save ${product.name} to wishlist`}
                        >
                          <Heart
                            size={14}
                            className={inWishlist ? 'fill-[#E879A8] text-[#E879A8]' : 'stroke-current'}
                          />
                        </button>

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-2.5 left-2.5 text-[9px] tracking-widest uppercase font-bold text-[#7D6D5A] bg-white/90 px-2 py-0.5 rounded-sm">
                            {product.badge}
                          </div>
                        )}

                        {/* Hover action overlay */}
                        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="flex-1 bg-[#171615] text-[#FAF6F0] text-[11px] font-semibold tracking-wider py-2 px-2 hover:bg-[#342F2B] transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Quick Add</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(product);
                            }}
                            className="p-2 bg-white text-[#171615] hover:bg-[#FAF6F0] transition-colors border border-[#ECE2D4] shadow-xs cursor-pointer"
                            title="Quick View"
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-[#7D6D5A] font-semibold mb-1">
                          {product.category}
                        </div>

                        <h3
                          onClick={() => openProductPage(product)}
                          className="font-medium text-sm text-[#171615] hover:text-[#7D6D5A] transition-colors cursor-pointer truncate mb-1"
                        >
                          {product.name}
                        </h3>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-sm font-bold text-[#171615] tabular-nums font-mono">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#8A7C6E] line-through tabular-nums font-mono">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Stars */}
                        <div className="mt-auto pt-2 border-t border-[#ECE2D4]/60 flex items-center justify-between text-[11px] text-[#7A6E63]">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="fill-[#C29B72] text-[#C29B72]" />
                            <span className="font-semibold text-[#171615]">{product.rating}</span>
                            <span>({product.reviewsCount})</span>
                          </div>
                          <span className="text-[10px] text-[#5B7052] font-medium">In Stock</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
