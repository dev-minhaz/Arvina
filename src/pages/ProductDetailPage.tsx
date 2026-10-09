import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, PRODUCTS, Review } from '../data/products';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Ruler,
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    activeProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setCurrentPage,
    openProductPage,
    showToast,
  } = useShop();

  if (!activeProduct) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-xl">Product not found</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 px-6 py-2 bg-[#171615] text-white text-xs uppercase"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState(activeProduct.sizes[0] || 'One Size');
  const [selectedColor, setSelectedColor] = useState(activeProduct.colors[0]?.name || 'Standard');
  const [selectedImage, setSelectedImage] = useState(activeProduct.image);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('fabric');

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState<Review[]>(activeProduct.reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const inWishlist = isInWishlist(activeProduct.id);

  const images = [activeProduct.image];
  if (activeProduct.secondaryImage) {
    images.push(activeProduct.secondaryImage);
  }

  // Curated pairing items
  const pairingProducts = PRODUCTS.filter((p) =>
    activeProduct.pairingProductIds?.includes(p.id)
  );

  const handleAdd = () => {
    addToCart(activeProduct, selectedSize, selectedColor, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && newComment.trim()) {
      const rev: Review = {
        id: `user-rev-${Date.now()}`,
        author: newAuthor,
        location: 'Verified Client',
        rating: newRating,
        date: 'Today',
        title: newTitle || 'Outstanding craftsmanship',
        comment: newComment,
        verified: true,
        sizePurchased: selectedSize,
      };
      setReviewsList([rev, ...reviewsList]);
      setShowReviewForm(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
      showToast('Thank you! Your verified review has been published.', 'success');
    }
  };

  return (
    <div className="w-full bg-[#FAF6F0] py-6 sm:py-10 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615] transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <button onClick={() => setCurrentPage('shop')} className="hover:text-[#171615] transition-colors">
            Catalog
          </button>
          <ChevronRight size={12} />
          <span className="text-[#7D6D5A] uppercase tracking-wider">{activeProduct.category}</span>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium truncate max-w-xs">{activeProduct.name}</span>
        </nav>

        {/* Top Product View: Gallery Left, Sticky Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          
          {/* Gallery Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full rounded-2xl bg-[#F5EFE8] border border-[#ECE2D4] overflow-hidden flex items-center justify-center p-6 shadow-xs">
              <img
                src={selectedImage}
                alt={activeProduct.name}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-500"
              />

              {activeProduct.badge && (
                <div className="absolute top-5 left-5 bg-[#171615] text-[#FAF6F0] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-sm">
                  {activeProduct.badge}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border p-1 bg-white cursor-pointer transition-all ${
                      selectedImage === img
                        ? 'border-[#171615] ring-2 ring-[#171615]/20'
                        : 'border-[#D9CFC4] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Purchase Module Right */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#7D6D5A] uppercase tracking-[0.18em] font-semibold mb-2">
                <span>{activeProduct.category}</span>
                <span className="font-mono text-[11px]">SKU: {activeProduct.sku}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171615] tracking-tight mb-3">
                {activeProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#C29B72]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#7A6E63] font-medium">
                  {activeProduct.rating} ({reviewsList.length} verified reviews)
                </span>
                <span className="text-[#C4B7A6]">·</span>
                <a href="#reviews" className="text-xs text-[#7D6D5A] hover:underline">
                  Read client notes
                </a>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-5 border-b border-[#ECE2D4] font-sans">
                <span className="text-3xl font-bold text-[#171615] font-mono">
                  {formatPrice(activeProduct.price)}
                </span>
                {activeProduct.originalPrice && (
                  <span className="text-base text-[#8C7D6F] line-through font-mono">
                    {formatPrice(activeProduct.originalPrice)}
                  </span>
                )}
                {activeProduct.originalPrice && (
                  <span className="text-xs font-semibold text-[#8C4336] bg-[#FCEBE8] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Save {formatPrice(activeProduct.originalPrice - activeProduct.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#5C5148] leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Color Swatches */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#171615] mb-2.5">
                <span>COLOR: <span className="font-normal text-[#7D6D5A]">{selectedColor}</span></span>
              </div>
              <div className="flex gap-2.5">
                {activeProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border p-0.5 cursor-pointer transition-all ${
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

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-[#171615] mb-2.5">
                <span>SELECT SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#7D6D5A] hover:text-[#171615] underline cursor-pointer"
                >
                  <Ruler size={12} />
                  <span>Interactive Size & Fit Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activeProduct.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-medium tracking-wider border cursor-pointer transition-all ${
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

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs text-[#4F6846]">
              <span className="w-2 h-2 rounded-full bg-[#4F6846]" />
              <span>In stock at European central atelier · Ready to ship</span>
            </div>

            {/* Quantity Stepper & Buy Action */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Stepper */}
                <div className="inline-flex items-center border border-[#D9CFC4] bg-white rounded-none">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 px-3 text-[#554C44] hover:text-[#171615] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-[#171615]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 px-3 text-[#554C44] hover:text-[#171615] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                {/* Primary Add to Bag */}
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#342F2B] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className={`p-3.5 border transition-colors cursor-pointer ${
                    inWishlist
                      ? 'border-[#E879A8] bg-[#FCE8F1] text-[#E879A8]'
                      : 'border-[#D9CFC4] text-[#171615] hover:border-[#E879A8] hover:text-[#E879A8]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            {/* Trust guarantees strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#ECE2D4] text-[11px] text-[#695D52]">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#171615]" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw size={14} className="text-[#171615]" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#171615]" />
                <span>Atelier Verified</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#ECE2D4] divide-y divide-[#ECE2D4] text-xs pt-2">
              {[
                {
                  id: 'fabric',
                  title: 'Composition & Origin',
                  content: activeProduct.fabric,
                },
                {
                  id: 'fit',
                  title: 'Silhouette & Fit Advice',
                  content: activeProduct.fit,
                },
                {
                  id: 'care',
                  title: 'Garment Care & Preservation',
                  content: activeProduct.care,
                },
              ].map((acc) => (
                <div key={acc.id} className="py-3">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === acc.id ? '' : acc.id)}
                    className="w-full flex items-center justify-between text-left font-semibold text-[#171615] uppercase tracking-wider py-1 cursor-pointer"
                  >
                    <span>{acc.title}</span>
                    <span className="text-base font-mono">{activeAccordion === acc.id ? '−' : '+'}</span>
                  </button>
                  {activeAccordion === acc.id && (
                    <p className="pt-2 text-[#5C5148] leading-relaxed animate-in fade-in duration-200">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Curated Pairing: "Complete the Look" */}
        {pairingProducts.length > 0 && (
          <section className="mb-20 pt-12 border-t border-[#ECE2D4]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[#7D6D5A]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A]">
                ATELIER STYLING
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615] mb-8">
              Complete the Signature Look
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pairingProducts.map((pair) => (
                <div
                  key={pair.id}
                  className="bg-white rounded-xl border border-[#ECE2D4] p-4 flex gap-4 items-center shadow-2xs hover:shadow-md transition-all"
                >
                  <img
                    src={pair.image}
                    alt={pair.name}
                    className="w-20 h-24 object-contain mix-blend-multiply bg-[#F5EFE8] rounded-md p-2"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#7D6D5A] font-semibold block">
                      {pair.category}
                    </span>
                    <h4
                      onClick={() => openProductPage(pair)}
                      className="font-medium text-sm text-[#171615] truncate hover:underline cursor-pointer"
                    >
                      {pair.name}
                    </h4>
                    <p className="text-xs font-mono font-bold text-[#171615] mt-0.5">
                      {formatPrice(pair.price)}
                    </p>
                    <button
                      onClick={() => addToCart(pair)}
                      className="mt-2 text-[11px] text-[#171615] hover:text-[#7D6D5A] font-semibold uppercase tracking-wider underline cursor-pointer"
                    >
                      + Quick Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Customer Reviews Section */}
        <section id="reviews" className="pt-12 border-t border-[#ECE2D4]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
                VERIFIED VOICES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171615]">
                Client Reviews & Notes ({reviewsList.length})
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-5 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#342F2B] transition-colors self-start md:self-auto cursor-pointer"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Client Note'}
            </button>
          </div>

          {/* Review submission form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-2xl border border-[#ECE2D4] mb-8 max-w-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#171615]">Share Your Experience</h3>
              
              <div>
                <label className="text-xs font-semibold text-[#171615] block mb-1">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        size={18}
                        className={star <= newRating ? 'fill-[#C29B72] text-[#C29B72]' : 'text-[#D9CFC4]'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#171615] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Charlotte M."
                    className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-2.5 text-xs text-[#171615]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#171615] block mb-1">Headline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Unmatched tailoring"
                    className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-2.5 text-xs text-[#171615]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#171615] block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe the fabric weight, fit, and movement..."
                  className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-2.5 text-xs text-[#171615]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#342F2B] cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-xl border border-[#ECE2D4] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C29B72]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7D6F]">{rev.date}</span>
                </div>

                <h4 className="font-bold text-sm text-[#171615]">{rev.title}</h4>
                <p className="text-xs text-[#554C44] leading-relaxed">{rev.comment}</p>

                <div className="pt-2 border-t border-[#ECE2D4]/60 flex items-center justify-between text-[11px] text-[#7D6D5A]">
                  <span className="font-medium text-[#171615]">{rev.author} ({rev.location})</span>
                  {rev.sizePurchased && <span>Purchased: {rev.sizePurchased}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
