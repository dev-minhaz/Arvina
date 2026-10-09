import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Ruler, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openProductPage,
    setIsSizeGuideOpen,
  } = useShop();

  if (!quickViewProduct) return null;

  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]?.name || 'Standard');
  const [selectedImage, setSelectedImage] = useState(quickViewProduct.image);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      setQuickViewProduct(null);
    }, 600);
  };

  const handleFullDetails = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openProductPage(prod);
  };

  const images = [quickViewProduct.image];
  if (quickViewProduct.secondaryImage) {
    images.push(quickViewProduct.secondaryImage);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#ECE2D4] overflow-hidden my-8">
          
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 text-[#554C44] hover:text-[#171615] bg-[#FAF6F0]/80 rounded-full transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Left */}
            <div className="bg-[#F5EFE8] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ECE2D4]">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 justify-center">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-16 rounded-md overflow-hidden border p-1 bg-white cursor-pointer transition-all ${
                        selectedImage === img ? 'border-[#171615] ring-1 ring-[#171615]' : 'border-[#D9CFC4] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] mb-2">
                  <span>{quickViewProduct.category}</span>
                  {quickViewProduct.badge && (
                    <span className="text-[#171615] font-bold">{quickViewProduct.badge}</span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615] mb-2">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#C29B72]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#7A6E63] font-medium">
                    {quickViewProduct.rating} ({quickViewProduct.reviewsCount} verified reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-5 font-sans">
                  <span className="text-2xl font-bold text-[#171615] tabular-nums font-mono">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#8C7D6F] line-through tabular-nums font-mono">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs font-semibold text-[#8C4336] uppercase tracking-wider">
                      Save {formatPrice(quickViewProduct.originalPrice - quickViewProduct.price)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5C5148] leading-relaxed mb-5">
                  {quickViewProduct.description}
                </p>

                {/* Color Swatches */}
                <div className="mb-4">
                  <span className="text-xs font-medium text-[#171615] block mb-2">
                    Color: <span className="text-[#7D6D5A]">{selectedColor}</span>
                  </span>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border p-0.5 cursor-pointer transition-all ${
                          selectedColor === c.name ? 'border-[#171615] ring-2 ring-[#171615]/30' : 'border-[#D9CFC4]'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Options */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#171615]">
                      Select Size:
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#7D6D5A] hover:text-[#171615] underline cursor-pointer"
                    >
                      <Ruler size={11} />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-medium tracking-wider border cursor-pointer transition-all ${
                          selectedSize === s
                            ? 'bg-[#171615] text-[#FAF6F0] border-[#171615]'
                            : 'bg-white text-[#171615] border-[#D9CFC4] hover:border-[#171615]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material & Details specs */}
                <div className="text-[11px] text-[#695D52] space-y-1.5 pt-3 border-t border-[#ECE2D4] mb-6">
                  <p><strong className="text-[#171615]">Fabric:</strong> {quickViewProduct.fabric}</p>
                  <p><strong className="text-[#171615]">Fit:</strong> {quickViewProduct.fit}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#342F2B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={15} />
                    <span>{addedNotice ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 border transition-colors cursor-pointer ${
                      inWishlist
                        ? 'border-[#E879A8] bg-[#FCE8F1] text-[#E879A8]'
                        : 'border-[#D9CFC4] text-[#171615] hover:border-[#E879A8] hover:text-[#E879A8]'
                    }`}
                    aria-label="Save to wishlist"
                  >
                    <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                  </button>
                </div>

                <button
                  onClick={handleFullDetails}
                  className="w-full py-2 text-xs font-semibold uppercase tracking-wider text-[#7D6D5A] hover:text-[#171615] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Complete Details & Client Notes</span>
                  <ArrowRight size={13} />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#7A6E63] pt-2 border-t border-[#ECE2D4]">
                  <span className="flex items-center gap-1">
                    <Truck size={13} /> Complimentary Shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw size={13} /> 30-Day Returns
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} /> 100% Guaranteed
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
