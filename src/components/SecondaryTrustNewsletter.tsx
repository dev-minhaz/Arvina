import React, { useState } from 'react';
import { Truck, RefreshCw, ShieldCheck, Headphones, Check, ArrowRight } from 'lucide-react';

export const SecondaryTrustNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section className="w-full bg-[#FAF6F0] py-14 sm:py-20 border-b border-[#ECE2D4]/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        
        {/* Top 4-Column Secondary Trust Strip (Reference Image Trust Row) */}
        <div className="bg-[#F4EFEA] rounded-xl p-6 sm:p-8 border border-[#ECE2D4] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#ECE2D4] flex items-center justify-center text-[#171615] shrink-0">
              <Truck size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                Free Shipping
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                On orders over $99
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#ECE2D4] flex items-center justify-center text-[#171615] shrink-0">
              <RefreshCw size={17} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                Easy Returns
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                30-day returns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#ECE2D4] flex items-center justify-center text-[#171615] shrink-0">
              <ShieldCheck size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                Secure Payment
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                100% protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#ECE2D4] flex items-center justify-center text-[#171615] shrink-0">
              <Headphones size={18} strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#171615]">
                24/7 Support
              </h4>
              <p className="text-[12px] text-[#695F56] font-normal">
                We're here to help
              </p>
            </div>
          </div>

        </div>

        {/* Newsletter Section with Inset Photo (Directly matching reference image layout) */}
        <div className="bg-[#F4EFEA] rounded-2xl border border-[#ECE2D4] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left: Inset Photo of Brand Model */}
          <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[460px] relative overflow-hidden bg-[#EAE2D8]">
            <img
              src="/src/assets/images/newsletter_model_coffee_1791555569919.jpg"
              alt="Arvina community and lifestyle"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right: Newsletter Text and Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
              GET 10% OFF YOUR FIRST ORDER
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-tight font-bold text-[#171615] tracking-tight mb-4 text-balance">
              Join Our Style List
            </h3>

            <p className="text-base text-[#554C44] leading-relaxed max-w-lg mb-8">
              Sign up for exclusive offers, preview access to seasonal edits, new arrivals, and style inspiration.
            </p>

            {subscribed ? (
              <div className="bg-[#FAF6F0] border border-[#C4B7A6] p-5 rounded-lg max-w-md">
                <div className="flex items-center gap-2 text-[#171615] font-semibold text-sm mb-1">
                  <Check size={18} className="text-[#7D6D5A]" />
                  <span>Welcome to the Arvina Inner Circle!</span>
                </div>
                <p className="text-xs text-[#62564C] leading-relaxed">
                  Use promotional code <span className="font-mono font-bold text-[#171615] bg-[#EAE2D8] px-1.5 py-0.5 rounded">BOLD10</span> at checkout for 10% off your purchase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3.5 bg-white text-sm text-[#171615] placeholder-[#94887D] border border-[#D9CFC4] rounded-none focus:outline-hidden focus:border-[#171615] transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase rounded-none hover:bg-[#342F2B] transition-colors active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#8C7D6F] mt-3">
              By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
