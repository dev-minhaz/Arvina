import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Heart, Info } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#171615] text-[#FAF6F0] p-3.5 px-4 rounded-lg shadow-xl border border-[#3A332D] flex items-center gap-3 transition-all transform translate-y-0 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'pink' ? (
            <div className="w-5 h-5 rounded-full bg-[#E879A8]/20 flex items-center justify-center shrink-0">
              <Heart size={12} className="fill-[#E879A8] text-[#E879A8]" />
            </div>
          ) : toast.type === 'info' ? (
            <div className="w-5 h-5 rounded-full bg-[#8C7D6F]/20 flex items-center justify-center shrink-0">
              <Info size={12} className="text-[#C4B7A6]" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-[#5B7052]/20 flex items-center justify-center shrink-0">
              <Check size={12} className="text-[#98B88C]" />
            </div>
          )}
          <span className="text-xs font-medium tracking-wide leading-tight flex-1">
            {toast.message}
          </span>
        </div>
      ))}
    </div>
  );
};
