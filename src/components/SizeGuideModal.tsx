import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SIZE_CHART } from '../data/products';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#ECE2D4] p-6 sm:p-8 overflow-hidden my-8">
          
          {/* Close */}
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#554C44] hover:text-[#171615] rounded-full transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <Ruler size={18} className="text-[#7D6D5A]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A]">
              PRECISION FIT GUIDE
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615] mb-2">
            Garment Size & Measurement Matrix
          </h3>
          <p className="text-xs text-[#6B5E53] leading-relaxed mb-6">
            All Arvina tailored garments are cut to European standards. If you are between sizes, we recommend sizing down for tailored cuts or sizing up for intentional relaxed silhouettes.
          </p>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#171615]">
              Measurement Standard:
            </span>
            <div className="flex items-center gap-1 p-1 bg-[#EAE2D8] rounded-lg">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  unit === 'inches' ? 'bg-[#171615] text-[#FAF6F0] shadow-xs' : 'text-[#655A4F]'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  unit === 'cm' ? 'bg-[#171615] text-[#FAF6F0] shadow-xs' : 'text-[#655A4F]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#ECE2D4] rounded-xl bg-white mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F4EFEA] border-b border-[#ECE2D4] text-[#171615] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3.5 font-bold">Size</th>
                  <th className="py-3 px-3.5 font-medium">US</th>
                  <th className="py-3 px-3.5 font-medium">UK</th>
                  <th className="py-3 px-3.5 font-medium">EU</th>
                  <th className="py-3 px-3.5 font-medium">Bust</th>
                  <th className="py-3 px-3.5 font-medium">Waist</th>
                  <th className="py-3 px-3.5 font-medium">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECE2D4]/70">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF6F0]/60 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-[#171615]">{row.size}</td>
                    <td className="py-3 px-3.5 text-[#5C5148]">{row.us}</td>
                    <td className="py-3 px-3.5 text-[#5C5148]">{row.uk}</td>
                    <td className="py-3 px-3.5 text-[#5C5148]">{row.eu}</td>
                    <td className="py-3 px-3.5 text-[#171615] font-mono">
                      {unit === 'inches' ? row.bustIn : row.bustCm}
                    </td>
                    <td className="py-3 px-3.5 text-[#171615] font-mono">
                      {unit === 'inches' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-3 px-3.5 text-[#171615] font-mono">
                      {unit === 'inches' ? row.hipIn : row.hipCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#F4EFEA] p-4 rounded-xl border border-[#ECE2D4]">
            <div>
              <strong className="block font-semibold text-[#171615] mb-0.5">1. Bust</strong>
              <p className="text-[#655A4F]">Measure around the fullest part of your chest with tape horizontal.</p>
            </div>
            <div>
              <strong className="block font-semibold text-[#171615] mb-0.5">2. Natural Waist</strong>
              <p className="text-[#655A4F]">Measure around the narrowest part of your waistline above the navel.</p>
            </div>
            <div>
              <strong className="block font-semibold text-[#171615] mb-0.5">3. Hips</strong>
              <p className="text-[#655A4F]">Stand feet together and measure around the fullest part of your hips.</p>
            </div>
          </div>

          {/* Done CTA */}
          <div className="mt-6 text-right">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="px-6 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#342F2B] transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
