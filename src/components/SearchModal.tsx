import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct, setSelectedCategory } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product: any) => {
    setQuickViewProduct(product);
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setIsSearchOpen(false);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#ECE2D4] overflow-hidden">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#ECE2D4] flex items-center gap-3 bg-white">
            <Search size={20} className="text-[#7D6D5A]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for blazers, linen, trousers, bags, or dresses..."
              className="flex-1 text-base text-[#171615] placeholder-[#9E9184] bg-transparent focus:outline-hidden"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-[#6D6054] hover:text-[#171615] rounded-md transition-colors"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick suggestions if no query */}
          {!query.trim() && (
            <div className="p-6">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#7D6D5A] block mb-3">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Linen Blazer', 'Trousers', 'Leather Bag', 'Wrap Dress', 'Sunglasses', 'Sale'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-[#F4EFEA] hover:bg-[#EAE2D8] text-xs font-medium text-[#171615] rounded-full transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <span className="text-xs font-semibold tracking-wider uppercase text-[#7D6D5A] block mb-3">
                Browse Collections
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Outerwear', id: 'Outerwear' },
                  { name: 'Dresses', id: 'Dresses' },
                  { name: 'Bags & Accessories', id: 'Accessories' },
                  { name: 'Sale Up to 50%', id: 'sale' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleSelectCategory(c.id)}
                    className="p-3 bg-[#F4EFEA] hover:bg-[#EAE2D8] text-left text-xs font-medium text-[#171615] rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{c.name}</span>
                    <ArrowRight size={12} className="text-[#7D6D5A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
              <div className="text-xs text-[#7D6D5A] mb-3">
                Found {results.length} results for "{query}"
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-[#6D6054]">
                  <p className="font-serif text-lg text-[#171615] mb-1">No pieces found</p>
                  <p className="text-xs">Try searching for keywords like "linen", "blazer", "dress", or "bag".</p>
                </div>
              ) : (
                <div className="divide-y divide-[#ECE2D4]">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="py-3 flex items-center gap-4 hover:bg-[#F4EFEA] -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="w-14 h-16 rounded bg-[#F4EFEA] p-1 border border-[#ECE2D4] shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[#171615] truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs text-[#7D6D5A]">
                          {product.category} · ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <ArrowRight size={14} className="text-[#8C7D6F]" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
