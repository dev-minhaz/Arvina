import React, { useState } from 'react';
import { ArvinaLogo } from './ArvinaLogo';
import { ArrowRight, Instagram, Facebook, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setCurrentPage, showToast } = useShop();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail.trim()) {
      setFooterSubscribed(true);
      showToast('Welcome to the Arvina Inner Circle. 10% discount applied.', 'success');
    }
  };

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageNav = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="w-full bg-[#1A1614] text-[#FAF6F0] pt-16 sm:pt-20 pb-12 border-t border-[#2F2925]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main 5-Section Layout (Brand Story on left + 4 Link Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#342D28]">
          
          {/* Brand Info & Vision */}
          <div className="lg:col-span-4 flex flex-col pr-0 lg:pr-8">
            <button onClick={() => handlePageNav('home')} className="inline-block mb-4 text-left cursor-pointer">
              <ArvinaLogo variant="light" size="md" />
            </button>

            <p className="text-sm text-[#BDB2A5] leading-relaxed max-w-sm mb-6 font-sans">
              Timeless fashion for every moment. Designed with you in mind, crafted for bold souls who embrace elegance, individuality, and conscious luxury.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-[#A89C8F]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#27211D] border border-[#3A322C] flex items-center justify-center hover:text-white hover:border-[#FAF6F0] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#27211D] border border-[#3A322C] flex items-center justify-center hover:text-white hover:border-[#FAF6F0] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#27211D] border border-[#3A322C] flex items-center justify-center hover:text-white hover:border-[#FAF6F0] transition-colors"
                aria-label="Pinterest"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-5">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A89C8F]">
              <li>
                <button
                  onClick={() => handleCategoryNav('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Outerwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Outerwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Classics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Dresses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dresses & Silk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('sale')}
                  className="hover:text-white text-[#D9A376] transition-colors cursor-pointer"
                >
                  Sale Up to 50%
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: CUSTOMER CARE */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-5">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A89C8F]">
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size & Fit Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Payment Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT ARVINA */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-5">
              ABOUT US
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A89C8F]">
              <li>
                <button
                  onClick={() => handlePageNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('lookbook')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seasonal Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sustainability Charter
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artisan Ateliers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageNav('customer-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flagship Store Locator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: STAY CONNECTED */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-white mb-3">
              STAY CONNECTED
            </h4>
            <p className="text-xs text-[#A89C8F] mb-4">
              Sign up for private previews and get 10% off your first order.
            </p>

            {footerSubscribed ? (
              <p className="text-xs text-[#D9A376] font-medium">
                Thank you for subscribing! Code BOLD10 unlocked.
              </p>
            ) : (
              <form onSubmit={handleFooterSubscribe} className="relative">
                <input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#27211D] border border-[#3C342E] text-xs text-white placeholder-[#786E63] px-3.5 py-3 pr-9 rounded-none focus:outline-hidden focus:border-[#FAF6F0] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Submit email"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A89C8F] hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Line & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#807467]">
          <p>© {new Date().getFullYear()} Arvina Apparel LLC. All rights reserved. Built for bold souls.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handlePageNav('customer-care')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => handlePageNav('customer-care')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={() => handlePageNav('customer-care')} className="hover:text-white transition-colors">
              Accessibility
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
