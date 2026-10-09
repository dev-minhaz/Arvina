import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, freeShippingThreshold, formatPrice, clearCart, setCurrentPage, showToast } =
    useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [email, setEmail] = useState('minhazkhanmk1990173@gmail.com');
  const [firstName, setFirstName] = useState('Minhaz');
  const [lastName, setLastName] = useState('Khan');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Suite 4B');
  const [city, setCity] = useState('New York');
  const [stateCode, setStateCode] = useState('NY');
  const [zipCode, setZipCode] = useState('10001');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('+1 (555) 019-2834');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'overnight'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('10/28');
  const [cardCvc, setCardCvc] = useState('891');

  const [promoCode, setPromoCode] = useState('BOLD10');
  const [discountApplied, setDiscountApplied] = useState(true);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const shippingCost =
    shippingMethod === 'overnight'
      ? 25.0
      : subtotal >= freeShippingThreshold || subtotal === 0
      ? 0.0
      : 12.0;

  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const finalTotal = subtotal - discountAmount + shippingCost + estimatedTax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
    clearCart();
    showToast('Order #ARV-99214 successfully placed!', 'success');
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-[#C4B7A6] mb-4 stroke-1" />
        <h2 className="font-serif text-3xl font-bold text-[#171615] mb-2">Your Bag is Empty</h2>
        <p className="text-xs text-[#6B5E53] max-w-sm mx-auto mb-6">
          Add items to your shopping bag before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen py-8 sm:py-12 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615]">
            Home
          </button>
          <ChevronRight size={12} />
          <button onClick={() => setCurrentPage('shop')} className="hover:text-[#171615]">
            Catalog
          </button>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium">Secure Checkout</span>
        </nav>

        {/* Order Confirmed View */}
        {step === 4 ? (
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-[#ECE2D4] shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E5D7C7] text-[#171615] flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-1">
                ORDER CONFIRMED
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171615]">
                Thank You, {firstName}
              </h1>
              <p className="text-xs text-[#6B5E53] mt-2">
                Order reference <span className="font-mono font-bold text-[#171615]">#ARV-99214</span>. A digital receipt has been sent to <span className="font-semibold text-[#171615]">{email}</span>.
              </p>
            </div>

            <div className="bg-[#FAF6F0] p-5 rounded-xl border border-[#ECE2D4] text-xs text-left space-y-3">
              <div className="flex justify-between border-b border-[#ECE2D4] pb-2 font-semibold text-[#171615]">
                <span>Shipping Address</span>
                <span>Delivery Window</span>
              </div>
              <div className="flex justify-between text-[#5C5148]">
                <div>
                  <p>{firstName} {lastName}</p>
                  <p>{address}, {apartment}</p>
                  <p>{city}, {stateCode} {zipCode}, {country}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#171615]">2 - 4 Business Days</p>
                  <p className="text-[11px] text-[#7D6D5A]">DHL Express Insured</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-8 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider hover:bg-[#342F2B] transition-colors"
              >
                Continue Exploring
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3.5 border border-[#171615] text-[#171615] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF6F0] transition-colors"
              >
                Print Official Receipt
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Form Steps Left */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Stepper Header */}
              <div className="flex items-center gap-3 border-b border-[#ECE2D4] pb-4 text-xs font-semibold uppercase tracking-wider">
                <span className={step >= 1 ? 'text-[#171615]' : 'text-[#A09285]'}>1. Address</span>
                <span className="text-[#C4B7A6]">→</span>
                <span className={step >= 2 ? 'text-[#171615]' : 'text-[#A09285]'}>2. Delivery</span>
                <span className="text-[#C4B7A6]">→</span>
                <span className={step >= 3 ? 'text-[#171615]' : 'text-[#A09285]'}>3. Payment</span>
              </div>

              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2D4] space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Shipping Details</h3>

                  <div>
                    <label className="text-xs font-semibold text-[#171615] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#171615] block mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#171615] block mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#171615] block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#171615] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#171615] block mb-1">State / Prov</label>
                      <input
                        type="text"
                        required
                        value={stateCode}
                        onChange={(e) => setStateCode(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#171615] block mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-4 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#342F2B] transition-colors cursor-pointer"
                  >
                    Continue to Delivery Method
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Options */}
              {step === 2 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2D4] space-y-5">
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Choose Delivery Speed</h3>

                  <div className="space-y-3">
                    <label
                      onClick={() => setShippingMethod('standard')}
                      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'standard'
                          ? 'border-[#171615] bg-[#FAF6F0] ring-1 ring-[#171615]'
                          : 'border-[#D9CFC4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck size={18} className="text-[#171615]" />
                        <div>
                          <strong className="block text-xs font-bold text-[#171615]">
                            Complimentary Express Delivery
                          </strong>
                          <span className="text-[11px] text-[#695D52]">2 - 4 business days · DHL Express</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#4B6842]">FREE</span>
                    </label>

                    <label
                      onClick={() => setShippingMethod('overnight')}
                      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                        shippingMethod === 'overnight'
                          ? 'border-[#171615] bg-[#FAF6F0] ring-1 ring-[#171615]'
                          : 'border-[#D9CFC4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck size={18} className="text-[#171615]" />
                        <div>
                          <strong className="block text-xs font-bold text-[#171615]">
                            Atelier Priority Overnight
                          </strong>
                          <span className="text-[11px] text-[#695D52]">Next business morning · Guaranteed</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold font-mono text-[#171615]">{formatPrice(25.0)}</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-[#D9CFC4] text-xs font-semibold uppercase"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#342F2B] transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2D4] space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-2xl font-bold text-[#171615]">Payment Method</h3>
                    <div className="flex items-center gap-1 text-[11px] text-[#557B4A]">
                      <Lock size={12} />
                      <span>256-Bit SSL Encrypted</span>
                    </div>
                  </div>

                  {/* Payment Methods Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 border text-xs font-semibold uppercase transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#171615] bg-[#171615] text-[#FAF6F0]'
                          : 'border-[#D9CFC4] bg-white text-[#171615]'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`py-3 border text-xs font-semibold uppercase transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-[#171615] bg-[#171615] text-[#FAF6F0]'
                          : 'border-[#D9CFC4] bg-white text-[#171615]'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`py-3 border text-xs font-semibold uppercase transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#171615] bg-[#171615] text-[#FAF6F0]'
                          : 'border-[#D9CFC4] bg-white text-[#171615]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#171615] block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-[#171615] block mb-1">Expires (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#171615] block mb-1">CVC Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-4 bg-[#FAF6F0] border border-[#ECE2D4] rounded-xl text-xs space-y-1 text-[#655A4F]">
                      <p className="font-semibold text-[#171615]">Pay upon physical parcel receipt</p>
                      <p>Please prepare exact cash for our bonded courier upon delivery.</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-[#D9CFC4] text-xs font-semibold uppercase"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 py-4 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#342F2B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Authorize & Place Order ({formatPrice(finalTotal)})</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Order Summary Right */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2D4] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#171615] pb-4 border-b border-[#ECE2D4]">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#ECE2D4] max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-16 object-contain mix-blend-multiply bg-[#F5EFE8] rounded-md p-1 border border-[#ECE2D4]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs text-[#171615] truncate">{item.product.name}</h4>
                      <p className="text-[11px] text-[#7D6D5A]">
                        {item.selectedSize} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#171615]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code applied */}
              {discountApplied && (
                <div className="flex justify-between items-center bg-[#FAF6F0] p-3 rounded-lg border border-[#ECE2D4] text-xs text-[#557B4A]">
                  <span className="font-semibold">Promo Code BOLD10</span>
                  <span>-10% (-{formatPrice(discountAmount)})</span>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-2 text-xs text-[#5C5148] pt-4 border-t border-[#ECE2D4]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#171615]">{formatPrice(subtotal)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#557B4A]">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-[#171615]">
                    {shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-[#171615]">{formatPrice(estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171615] pt-3 border-t border-[#ECE2D4]">
                  <span>Total Amount</span>
                  <span className="font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="text-[10px] text-center text-[#8C7D6F] flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck size={14} className="text-[#5B7052]" />
                <span>30-Day Money-Back Guarantee · Complimentary Return Shipping</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
