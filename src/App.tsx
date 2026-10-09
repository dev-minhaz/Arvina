import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryExplorer } from './components/CategoryExplorer';
import { ProductHighlightsGrid } from './components/ProductHighlightsGrid';
import { EditorialSaleSection } from './components/EditorialSaleSection';
import { MostLovedPicks } from './components/MostLovedPicks';
import { SecondaryTrustNewsletter } from './components/SecondaryTrustNewsletter';
import { Footer } from './components/Footer';

// Full Page Views
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { AboutPage } from './pages/AboutPage';
import { CustomerCarePage } from './pages/CustomerCarePage';
import { CheckoutPage } from './pages/CheckoutPage';

// Global Drawers & Modals
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { LookbookModal } from './components/LookbookModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AccountModal } from './components/AccountModal';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#171615] flex flex-col font-sans selection:bg-[#7D6D5A] selection:text-white">
      {/* Navigation */}
      <Header />

      {/* Main Multi-Page Routed Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <CategoryExplorer />
            <ProductHighlightsGrid />
            <EditorialSaleSection />
            <MostLovedPicks />
            <SecondaryTrustNewsletter />
          </>
        )}

        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'lookbook' && <LookbookPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'customer-care' && <CustomerCarePage />}
        {currentPage === 'checkout' && <CheckoutPage />}
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Interactive Drawers, Modals & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <LookbookModal />
      <SearchModal />
      <SizeGuideModal />
      <AccountModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
