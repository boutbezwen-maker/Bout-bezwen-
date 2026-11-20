import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { NatcashGuide } from './components/NatcashGuide';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { Footer } from './components/Footer';
import { PRODUCTS, Product } from './data/products';

const STORAGE_KEY = 'boutbezwen_custom_images';

function loadSavedImages(): Record<number, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<number, string>>(loadSavedImages);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customImages));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [customImages]);

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const handleAddToCart = (product: Product, quantity = 1, chosenSize?: string) => {
    const resolvedSize =
      chosenSize ?? (product.hasSize && product.sizes?.length ? product.sizes[0] : undefined);
    const key = `${product.id}-${resolvedSize ?? 'std'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { key, product, chosenSize: resolvedSize, quantity }];
    });

    const sizeSuffix = resolvedSize ? ` (Gwosè: ${resolvedSize})` : '';
    setToastText(`"${product.name}"${sizeSuffix} ajoute nan panye a.`);
    window.setTimeout(() => {
      setToastText((prev) =>
        prev === `"${product.name}"${sizeSuffix} ajoute nan panye a.` ? null : prev,
      );
    }, 3000);
  };

  const handleUpdateQuantity = (itemKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (itemKey: string) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSaveCustomImage = (productId: number, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [productId]: dataUrl }));
  };

  const handleRemoveCustomImage = (productId: number) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleResetAllImages = () => {
    setCustomImages({});
  };

  const handleExploreProducts = () => {
    const el = document.getElementById('pwodwi');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-zinc-900">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero onExploreProducts={handleExploreProducts} />

        <ProductCatalog
          products={PRODUCTS}
          customImages={customImages}
          onAddToCart={(product, chosenSize) => handleAddToCart(product, 1, chosenSize)}
          onSelectProduct={setSelectedProduct}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />

        <NatcashGuide />
      </main>

      <Footer onOpenPhotoManager={() => setIsPhotoManagerOpen(true)} />

      {toastText && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 max-w-sm bg-zinc-900 text-white border border-zinc-700 rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 text-sm"
        >
          <span className="flex-1 leading-snug">{toastText}</span>
          <button
            type="button"
            onClick={() => {
              setToastText(null);
              setIsCartOpen(true);
            }}
            className="px-2.5 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            Wè Panye
          </button>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        customImg={selectedProduct ? customImages[selectedProduct.id] : undefined}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        products={PRODUCTS}
        customImages={customImages}
        onClose={() => setIsPhotoManagerOpen(false)}
        onSaveImage={handleSaveCustomImage}
        onRemoveImage={handleRemoveCustomImage}
        onResetAll={handleResetAllImages}
      />
    </div>
  );
}
