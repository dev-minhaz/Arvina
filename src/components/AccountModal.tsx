import React, { useState } from 'react';
import { X, User, Package, Award, MapPin, Search, CheckCircle2, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'tracking' | 'vip' | 'profile'>('tracking');
  const [orderQuery, setOrderQuery] = useState('ARV-89412');
  const [orderFound, setOrderFound] = useState<boolean | null>(true);

  if (!isAccountOpen) return null;

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setOrderFound(true);
      showToast(`Tracking status updated for ${orderQuery}`, 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAccountOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#ECE2D4] overflow-hidden my-8">
          
          {/* Close */}
          <button
            onClick={() => setIsAccountOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#554C44] hover:text-[#171615] rounded-full transition-colors cursor-pointer"
            aria-label="Close account modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-[#F4EFEA] border-b border-[#ECE2D4]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A]">
                THE BOLD COLLECTIVE
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615]">
              Client Portal & Order Concierge
            </h3>
            <p className="text-xs text-[#6B5E53] mt-1">
              Welcome back. Access order dispatches, concierge assistance, and private VIP previews.
            </p>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mt-6">
              {[
                { id: 'tracking', label: 'Order Tracking', icon: Package },
                { id: 'vip', label: 'VIP Membership', icon: Award },
                { id: 'profile', label: 'Client Profile', icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wider rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#171615] text-[#FAF6F0] shadow-xs'
                        : 'bg-white/80 text-[#61554A] hover:text-[#171615]'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Order Tracking */}
          {activeTab === 'tracking' && (
            <div className="p-6 sm:p-8">
              <form onSubmit={handleTrackOrder} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7D6F]" />
                  <input
                    type="text"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    placeholder="Enter Order Number (e.g. ARV-89412)"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D9CFC4] text-xs text-[#171615] rounded-none focus:outline-hidden focus:border-[#171615]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#342F2B] transition-colors cursor-pointer"
                >
                  Locate
                </button>
              </form>

              {orderFound && (
                <div className="bg-white border border-[#ECE2D4] rounded-xl p-5 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE2D4] pb-4">
                    <div>
                      <span className="text-[11px] text-[#7D6D5A] uppercase tracking-wider block">Order ID</span>
                      <strong className="text-sm font-mono text-[#171615]">ARV-89412</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#7D6D5A] uppercase tracking-wider block">Carrier</span>
                      <span className="text-xs font-semibold text-[#171615]">DHL Express Worldwide</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#7D6D5A] uppercase tracking-wider block">Estimated Delivery</span>
                      <span className="text-xs font-semibold text-[#171615]">Tomorrow by 2:00 PM</span>
                    </div>
                  </div>

                  {/* Status Steps */}
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2D7CA]">
                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#171615] text-white flex items-center justify-center">
                        <CheckCircle2 size={12} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#171615]">Out for Courier Delivery</h5>
                        <p className="text-[11px] text-[#695D52]">Courier vehicle dispatched at 07:45 AM (Local Hub)</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#171615] text-white flex items-center justify-center">
                        <CheckCircle2 size={12} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#171615]">Cleared Customs & In Transit</h5>
                        <p className="text-[11px] text-[#695D52]">Airport cargo verified · International sorting terminal</p>
                      </div>
                    </div>

                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#171615] text-white flex items-center justify-center">
                        <CheckCircle2 size={12} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-[#171615]">Hand-packaged at European Atelier</h5>
                        <p className="text-[11px] text-[#695D52]">Quality inspection passed · Ribbon sealed</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: VIP Membership */}
          {activeTab === 'vip' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-gradient-to-br from-[#27211D] to-[#171615] text-white rounded-xl p-6 shadow-md relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D5C7B7] block">TIER LEVEL</span>
                    <h4 className="font-serif text-2xl font-bold">Gold Atelier Member</h4>
                  </div>
                  <Award size={28} className="text-[#E879A8]" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D5C7B7] block">AVAILABLE CREDITS</span>
                    <span className="text-2xl font-mono font-bold">1,450 pts ($72.50 value)</span>
                  </div>
                  <span className="text-xs text-[#FAF6F0] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                    VIP Concierge Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#ECE2D4] rounded-xl text-xs">
                  <strong className="block text-[#171615] mb-1">Complimentary Garment Tailoring</strong>
                  <p className="text-[#655A4F]">Enjoy free hem & waist adjustments at partner ateliers in 18 metropolitan cities.</p>
                </div>
                <div className="p-4 bg-white border border-[#ECE2D4] rounded-xl text-xs">
                  <strong className="block text-[#171615] mb-1">Private Seasonal Previews</strong>
                  <p className="text-[#655A4F]">Access lookbooks and limited capsule editions 48 hours prior to public drop.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Client Profile */}
          {activeTab === 'profile' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="bg-white border border-[#ECE2D4] rounded-xl p-5 space-y-3 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[#ECE2D4]">
                  <div className="w-12 h-12 rounded-full bg-[#EAE2D8] flex items-center justify-center font-serif text-lg font-bold text-[#171615]">
                    MK
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#171615]">Minhaz Khan</h4>
                    <span className="text-[#7D6D5A]">minhazkhanmk1990173@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-[#554C44]">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#7D6D5A]" />
                    <span>Default Address: 742 Evergreen Terrace, New York, NY 10001</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-[#7D6D5A]" />
                    <span>Preferred Sizing: Size S / Shoes EU 38</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('Profile preferences updated', 'success');
                  setIsAccountOpen(false);
                }}
                className="w-full py-3 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-wider uppercase hover:bg-[#342F2B] transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
