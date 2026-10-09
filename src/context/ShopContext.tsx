import React, { createContext, useContext, useState } from 'react';
import { Product, PRODUCTS, CurrencyCode, CURRENCIES } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'pink';
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'lookbook'
  | 'about'
  | 'customer-care'
  | 'checkout';

interface ShopContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  activeProduct: Product | null;
  openProductPage: (product: Product) => void;

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLookbookOpen: boolean;
  setIsLookbookOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Category Filtering
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Currency
  currentCurrency: CurrencyCode;
  setCurrentCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'pink') => void;

  // Calculated totals
  subtotal: number;
  totalItems: number;
  freeShippingThreshold: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeProduct, setActiveProduct] = useState<Product | null>(PRODUCTS[0]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const sample = PRODUCTS[0];
    return [
      {
        product: sample,
        quantity: 1,
        selectedSize: 'S',
        selectedColor: sample.colors[0].name,
      },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(['prod-4', 'prod-6']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const freeShippingThreshold = 99.0;

  const showToast = (message: string, type: 'success' | 'info' | 'pink' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const openProductPage = (product: Product) => {
    setActiveProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (amountInUSD: number): string => {
    const cfg = CURRENCIES[currentCurrency] || CURRENCIES.USD;
    const converted = amountInUSD * cfg.rate;
    if (cfg.code === 'JPY') {
      return `${cfg.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${cfg.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: string,
    qty = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'One Size';
    const chosenColor = color || product.colors[0]?.name || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }
      return [...prev, { product, quantity: qty, selectedSize: chosenSize, selectedColor: chosenColor }];
    });

    showToast(`Added "${product.name}" to shopping bag (${chosenSize})`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    const removedItem = cart.find(
      (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
    );
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
    if (removedItem) {
      showToast(`Removed "${removedItem.product.name}" from bag`, 'info');
    }
  };

  const updateQuantity = (
    productId: string,
    size: string,
    color: string,
    qty: number
  ) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved to wishlist ♥`, 'pink');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeProduct,
        openProductPage,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isLookbookOpen,
        setIsLookbookOpen,
        isAccountOpen,
        setIsAccountOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedCategory,
        setSelectedCategory,
        currentCurrency,
        setCurrentCurrency,
        formatPrice,
        toasts,
        showToast,
        subtotal,
        totalItems,
        freeShippingThreshold,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
