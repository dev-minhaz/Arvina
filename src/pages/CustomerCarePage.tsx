import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FAQS } from '../data/products';
import {
  HelpCircle,
  Truck,
  RefreshCw,
  Mail,
  ChevronRight,
  ChevronDown,
  Search,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export const CustomerCarePage: React.FC = () => {
  const { setCurrentPage, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'faq' | 'shipping' | 'returns' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Return Portal Simulator state
  const [returnOrderNum, setReturnOrderNum] = useState('');
  const [returnReason, setReturnReason] = useState('size');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Product Sizing Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (returnOrderNum.trim()) {
      setReturnSubmitted(true);
      showToast('Prepaid return authorization & shipping label generated', 'success');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && contactMessage.trim()) {
      setContactSuccess(true);
      showToast('Concierge ticket #ARV-HELP-591 created. We will reply within 4 hours.', 'success');
    }
  };

  return (
    <div className="w-full bg-[#FAF6F0] min-h-screen py-8 sm:py-12 border-b border-[#ECE2D4]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#7D6D5A] mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-[#171615] transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-[#171615] font-medium">Customer Care</span>
          <ChevronRight size={12} />
          <span className="text-[#7D6D5A] capitalize">{activeTab}</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7D6D5A] block mb-2">
            CLIENT CONCIERGE & SUPPORT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171615] tracking-tight mb-4">
            How May We Assist You?
          </h1>
          <p className="text-xs sm:text-sm text-[#655A4F] leading-relaxed">
            Our atelier specialists are available around the clock to assist with bespoke sizing, international shipping, and seamless returns.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-6 border-b border-[#ECE2D4]">
          {[
            { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle },
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'returns', label: 'Returns & Exchange Portal', icon: RefreshCw },
            { id: 'contact', label: 'Contact Atelier Concierge', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#171615] text-[#FAF6F0] shadow-sm'
                    : 'bg-white text-[#655A4F] border border-[#ECE2D4] hover:text-[#171615]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: FAQ */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7D6F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inquiries (e.g. shipping times, materials, sizing, returns)..."
                className="w-full bg-white border border-[#D9CFC4] pl-11 pr-4 py-3 text-xs sm:text-sm text-[#171615] rounded-xl focus:outline-hidden focus:border-[#171615]"
              />
            </div>

            {/* Accordion list */}
            <div className="divide-y divide-[#ECE2D4] bg-white rounded-2xl border border-[#ECE2D4] p-6 shadow-2xs">
              {filteredFaqs.map((faq, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                    className="w-full text-left flex justify-between items-center gap-4 py-1 text-sm font-semibold text-[#171615] hover:text-[#7D6D5A] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#7D6D5A] transition-transform duration-200 shrink-0 ${
                        expandedFaqIndex === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaqIndex === idx && (
                    <p className="pt-2 text-xs sm:text-sm text-[#5C5148] leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Shipping */}
        {activeTab === 'shipping' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="font-serif text-2xl font-bold text-[#171615] mb-4">
                Worldwide Shipping Rates & Schedules
              </h3>
              <p className="text-xs text-[#5C5148] mb-6">
                All shipments are fully insured, signature-required upon delivery, and dispatched from our European central fulfillment hub in Porto.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#ECE2D4] rounded-lg overflow-hidden">
                  <thead className="bg-[#F4EFEA] text-[#171615] font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Carrier</th>
                      <th className="p-3">Standard Delivery (Orders $99+)</th>
                      <th className="p-3">Standard Delivery (Under $99)</th>
                      <th className="p-3">Priority Overnight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE2D4] text-[#554C44]">
                    <tr>
                      <td className="p-3 font-semibold text-[#171615]">United States & Canada</td>
                      <td className="p-3">DHL Express / FedEx</td>
                      <td className="p-3 font-bold text-[#4B6842]">Complimentary (2-4 Days)</td>
                      <td className="p-3">$12.00</td>
                      <td className="p-3">$25.00</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#171615]">European Union & UK</td>
                      <td className="p-3">DPD / Royal Mail Tracked</td>
                      <td className="p-3 font-bold text-[#4B6842]">Complimentary (1-3 Days)</td>
                      <td className="p-3">$10.00</td>
                      <td className="p-3">$20.00</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#171615]">Asia, Australia & Middle East</td>
                      <td className="p-3">DHL Worldwide Priority</td>
                      <td className="p-3 font-bold text-[#4B6842]">Complimentary (3-5 Days)</td>
                      <td className="p-3">$18.00</td>
                      <td className="p-3">$35.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#ECE2D4] space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#171615]">Customs & Duties Prepaid</h4>
                <p className="text-xs text-[#5C5148] leading-relaxed">
                  For all orders entering the US, Canada, EU, and UK, import duties and VAT are fully calculated and prepaid at checkout. No surprise charges at your doorstep.
                </p>
              </div>

              <div className="bg-[#F4EFEA] p-6 rounded-2xl border border-[#ECE2D4] space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#171615]">Carbon Neutral Shipping</h4>
                <p className="text-xs text-[#5C5148] leading-relaxed">
                  We invest in Verified Carbon Standard (VCS) climate credits to neutralize the exact carbon footprint generated by all domestic and international shipments.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Returns */}
        {activeTab === 'returns' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="font-serif text-2xl font-bold text-[#171615] mb-2">
                Automated Returns & Exchanges Portal
              </h3>
              <p className="text-xs text-[#5C5148] mb-6">
                Generate an immediate prepaid return airway bill within our 30-day return window.
              </p>

              {returnSubmitted ? (
                <div className="bg-[#FAF6F0] border border-[#C4B7A6] p-6 rounded-xl text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E5D7C7] text-[#171615] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#171615]">Return Authorized (#RMA-90812)</h4>
                  <p className="text-xs text-[#5C5148] max-w-sm mx-auto">
                    A prepaid printable return label and pickup instructions have been emailed to your account address. Drop off at any authorized DHL / FedEx parcel depot.
                  </p>
                  <button
                    onClick={() => setReturnSubmitted(false)}
                    className="px-6 py-2.5 bg-[#171615] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider"
                  >
                    Start Another Return
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReturnSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#171615] block mb-1">Order Identifier</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ARV-89412"
                      value={returnOrderNum}
                      onChange={(e) => setReturnOrderNum(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] rounded-none focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#171615] block mb-1">Reason for Return or Exchange</label>
                    <select
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] rounded-none focus:outline-hidden"
                    >
                      <option value="size">Size exchange needed (Too small/large)</option>
                      <option value="color">Color exchange requested</option>
                      <option value="style">Style preference / does not suit</option>
                      <option value="gift">Gift return for store credit</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#171615] text-[#FAF6F0] font-semibold uppercase tracking-[0.16em] hover:bg-[#342F2B] transition-colors cursor-pointer mt-2"
                  >
                    Generate Prepaid Return Label
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 4: Contact */}
        {activeTab === 'contact' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#ECE2D4] shadow-2xs">
              <h3 className="font-serif text-2xl font-bold text-[#171615] mb-2">
                Direct Atelier Concierge
              </h3>
              <p className="text-xs text-[#5C5148] mb-6">
                Need tailoring guidance or advice on styling? Send our styling team a note.
              </p>

              {contactSuccess ? (
                <div className="bg-[#FAF6F0] border border-[#C4B7A6] p-6 rounded-xl text-center space-y-3">
                  <CheckCircle2 size={28} className="mx-auto text-[#5B7052]" />
                  <h4 className="font-serif text-lg font-bold">Inquiry Dispatched</h4>
                  <p className="text-xs text-[#5C5148]">
                    Your ticket #ARV-HELP-591 is now in queue. A senior atelier advisor will review your note and respond shortly.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="px-6 py-2 bg-[#171615] text-[#FAF6F0] text-xs uppercase font-semibold"
                  >
                    Submit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-[#171615] block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Vivian Vance"
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#171615] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="vivian@example.com"
                        className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#171615] block mb-1">Topic</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] focus:outline-hidden"
                    >
                      <option>Product Sizing Inquiry</option>
                      <option>Bespoke Styling Advice</option>
                      <option>Order Delivery Status</option>
                      <option>Press & Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#171615] block mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="How may our stylists assist you today?"
                      className="w-full bg-[#FAF6F0] border border-[#D9CFC4] p-3 text-xs text-[#171615] focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#171615] text-[#FAF6F0] font-semibold uppercase tracking-[0.16em] hover:bg-[#342F2B] transition-colors cursor-pointer"
                  >
                    Send to Atelier Concierge
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
