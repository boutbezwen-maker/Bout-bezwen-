import React, { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Product, formatHTG } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface ProductModalProps {
  product: Product | null;
  customImg?: string;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, chosenSize?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  customImg,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    setQuantity(1);
    if (product?.hasSize && product.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(undefined);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const handleConfirmAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fèmen detay pwodwi"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="aspect-[4/3] md:aspect-auto md:min-h-[340px]">
          <ProductArtwork variant={product.artwork} title={product.name} customImg={customImg} />
        </div>

        <div className="p-6 flex flex-col justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {product.catLabel} · {product.availability}
            </p>
            <h2
              id="product-modal-title"
              className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-900"
            >
              {product.name}
            </h2>
            <p className="mt-2 font-[family-name:var(--font-mono)] tabular-nums text-xl font-semibold text-red-600">
              {formatHTG(product.price)}
            </p>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-4 space-y-1.5 border-t border-zinc-200 pt-4 text-xs sm:text-sm text-zinc-700">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2">
                  <span className="text-zinc-400" aria-hidden="true">
                    —
                  </span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-3 border-t border-zinc-200">
            {product.hasSize && product.sizes && (
              <div>
                <label
                  htmlFor="modal-size-select"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Chwazi Gwosè:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => {
                    const isActive = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 min-h-[34px] rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700">Kantite</span>
              <div className="inline-flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminye kantite"
                  className="w-9 h-9 flex items-center justify-center text-zinc-700 hover:bg-zinc-200/60 rounded-l-lg cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-[family-name:var(--font-mono)] tabular-nums text-sm font-semibold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Ogmante kantite"
                  className="w-9 h-9 flex items-center justify-center text-zinc-700 hover:bg-zinc-200/60 rounded-r-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="w-full min-h-[44px] px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Ajoute nan Panye · {formatHTG(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
