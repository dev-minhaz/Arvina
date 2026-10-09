import React, { useState, useEffect } from 'react';
import { ArvinaLogo } from './ArvinaLogo';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, X, User, Globe } from 'lucide-react';
import { CurrencyCode, CURRENCIES } from '../data/products';

export const Header: React.FC = () => {
  const {
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen,
    currentPage,
    setCurrentPage,
    setSelectedCategory,
    currentCurrency,
    setCurrentCurrency,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      label: 'SHOP',
      page: 'shop' as const,
      action: () => {
        setSelectedCategory('all');
        setCurrentPage('shop');
      },
    },
    {
      label: 'NEW ARRIVALS',
      page: 'shop' as const,
      action: () => {
        setSelectedCategory('Outerwear');
        setCurrentPage('shop');
      },
    },
    {
      label: 'DRESSES',
      page: 'shop' as const,
      action: () => {
        setSelectedCategory('Dresses');
        setCurrentPage('shop');
      },
    },
    {
      label: 'ACCESSORIES',
      page: 'shop' as const,
      action: () => {
        setSelectedCategory('Accessories');
        setCurrentPage('shop');
      },
    },
    {
      label: 'LOOKBOOK',
      page: 'lookbook' as const,
      action: () => {
        setCurrentPage('lookbook');
      },
    },
    {
      label: 'ABOUT US',
      page: 'about' as const,
      action: () => {
        setCurrentPage('about');
      },
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top micro announcement bar with Currency Selector */}
      <div className="bg-[#1D1917] text-[#FAF6F0] text-[11px] tracking-[0.18em] uppercase py-2 px-4 font-medium">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* Left free shipping message */}
          <div className="hidden md:flex items-center gap-2">
            <span>PREMIUM APPAREL</span>
            <span className="text-[#A79888]" aria-hidden="true">·</span>
            <span>COMPLIMENTARY WORLDWIDE SHIPPING OVER $99</span>
          </div>

          {/* Center promotional message on mobile */}
          <div className="md:hidden mx-auto text-center">
            <span>COMPLIMENTARY EXPRESS SHIPPING OVER $99</span>
          </div>

          {/* Right currency & concierge shortcut */}
          <div className="hidden md:flex items-center gap-4 text-[#D5C7B7]">
            <button
              onClick={() => setCurrentPage('customer-care')}
              className="hover:text-white transition-colors"
            >
              Client Concierge
            </button>
            <span className="text-[#A79888]" aria-hidden="true">·</span>

            {/* Currency switcher dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Select currency"
              >
                <Globe size={12} />
                <span>{currentCurrency} ({CURRENCIES[currentCurrency].symbol})</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-6 bg-[#27211D] border border-[#3C342E] shadow-xl py-1 rounded-md z-50 min-w-[110px]">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrentCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#382F2A] transition-colors flex justify-between items-center ${
                        currentCurrency === code ? 'text-white font-bold' : 'text-[#B8ACA0]'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="font-mono">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-xs border-b border-[#ECE2D4]/80 py-3'
            : 'bg-[#FAF6F0] border-b border-[#ECE2D4]/60 py-4 lg:py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#171615] hover:text-[#7D6D5A] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.16em] text-[#2C2724]">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-1 hover:text-[#7D6D5A] transition-colors group whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-[#171615] font-bold' : ''
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#7D6D5A] transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex justify-center shrink-0">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
              aria-label="Arvina Home"
            >
              <ArvinaLogo variant="compact" size="md" />
            </button>
          </div>

          {/* Right Navigation Links (Desktop) */}
          <div className="flex items-center justify-end gap-6 sm:gap-7">
            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.16em] text-[#2C2724]">
              {navLinks.slice(3).map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      link.action();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1 hover:text-[#7D6D5A] transition-colors group whitespace-nowrap cursor-pointer ${
                      isActive ? 'text-[#171615] font-bold' : ''
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] bg-[#7D6D5A] transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Action Icons (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center gap-3 sm:gap-4 text-[#171615]">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 hover:text-[#7D6D5A] transition-colors cursor-pointer"
                aria-label="Search collection"
                title="Search"
              >
                <Search size={19} strokeWidth={1.75} />
              </button>

              {/* VIP & Account */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="p-1.5 hover:text-[#7D6D5A] transition-colors cursor-pointer"
                aria-label="Client Portal & Order Tracking"
                title="VIP & Orders"
              >
                <User size={19} strokeWidth={1.75} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 hover:text-[#E879A8] transition-colors cursor-pointer"
                aria-label="View wishlist"
                title="Wishlist"
              >
                <Heart size={19} strokeWidth={1.75} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E879A8] text-white text-[10px] font-medium flex items-center justify-center leading-none">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 flex items-center gap-2 hover:text-[#7D6D5A] transition-colors cursor-pointer"
                aria-label="View shopping bag"
                title="Cart"
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                <span className="w-5 h-5 rounded-full bg-[#171615] text-[#FAF6F0] text-[11px] font-medium flex items-center justify-center tabular-nums">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bottom-0 bg-[#FAF6F0] z-30 border-t border-[#ECE2D4] p-6 overflow-y-auto">
          <div className="flex flex-col gap-4 py-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-base font-serif tracking-[0.08em] text-[#171615] hover:text-[#7D6D5A] py-2.5 border-b border-[#ECE2D4]/50 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage('customer-care');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-base font-serif tracking-[0.08em] text-[#171615] hover:text-[#7D6D5A] py-2.5 border-b border-[#ECE2D4]/50 cursor-pointer"
            >
              CLIENT CARE & CONCIERGE
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#ECE2D4] space-y-4 text-xs tracking-wider text-[#645A51]">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECE2D4]">
              <span className="font-semibold text-[#171615] uppercase tracking-wider">Currency</span>
              <div className="flex gap-2">
                {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrentCurrency(c)}
                    className={`px-2 py-1 rounded text-[11px] font-mono ${
                      currentCurrency === c ? 'bg-[#171615] text-white font-bold' : 'bg-white border'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-semibold text-[#171615] tracking-[0.15em] uppercase">Built for Bold Souls</p>
            <p>Mon - Fri: 9:00 AM - 7:00 PM EST</p>
            <p>concierge@arvinafashion.com</p>

            <div className="pt-2 flex gap-4 text-[#171615]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="underline hover:text-[#7D6D5A]"
              >
                Saved Items ({wishlist.length})
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="underline hover:text-[#7D6D5A]"
              >
                VIP Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
