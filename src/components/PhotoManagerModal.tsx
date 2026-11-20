import React, { useEffect, useState } from 'react';
import { Camera, RotateCcw, Trash2, X } from 'lucide-react';
import { Product, formatHTG } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface PhotoManagerModalProps {
  isOpen: boolean;
  products: Product[];
  customImages: Record<number, string>;
  onClose: () => void;
  onSaveImage: (productId: number, dataUrl: string) => void;
  onRemoveImage: (productId: number) => void;
  onResetAll: () => void;
}

async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erè pandan lekti fichye a.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Fòma imaj sa a pa sipòte.'));
      img.onload = () => {
        const maxWidth = 720;
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const targetWidth = Math.round(img.width * scale);
        const targetHeight = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  products,
  customImages,
  onClose,
  onSaveImage,
  onRemoveImage,
  onResetAll,
}) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = async (
    product: Product,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const compressed = await compressImageFile(file);
      onSaveImage(product.id, compressed);
      setStatusMessage(`Foto "${product.name}" mete ajou avèk siksè.`);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Pa t kapab chaje foto sa a.',
      );
    }
  };

  const customCount = Object.keys(customImages).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-manager-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Camera className="w-5 h-5 text-zinc-900" aria-hidden="true" />
            <h2
              id="photo-manager-title"
              className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900"
            >
              Mete Vrè Foto Pwodwi yo
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fèmen jesyon foto"
            className="w-9 h-9 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-zinc-100 bg-neutral-50 text-xs sm:text-sm text-zinc-600 space-y-2">
          <p>
            Peze bouton <strong className="text-zinc-900">Chwazi Foto</strong> ki akote nenpòt
            pwodwi pou w mete yon foto reyèl ki soti nan galri telefòn oswa òdinatè ou. Foto yo
            ap sove otomatikman sou aparèy sa a.
          </p>
          {statusMessage && (
            <p className="text-emerald-700 font-medium" role="status">
              {statusMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 font-medium" role="alert">
              {errorMessage}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3 divide-y divide-zinc-200">
          {products.map((product) => {
            const hasCustom = Boolean(customImages[product.id]);
            return (
              <div
                key={product.id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-zinc-200 shrink-0">
                    <ProductArtwork
                      variant={product.artwork}
                      title={product.name}
                      customImg={customImages[product.id]}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      <span className="font-[family-name:var(--font-mono)] tabular-nums">
                        {formatHTG(product.price)}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{hasCustom ? 'Foto pèsonalize' : 'Foto orijinal'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {hasCustom && (
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveImage(product.id);
                        setStatusMessage(`Foto orijinal pou "${product.name}" retabli.`);
                      }}
                      aria-label={`Retire foto pèsonalize pou ${product.name}`}
                      className="p-2 rounded-lg border border-zinc-200 hover:bg-red-50 hover:border-red-200 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-lg bg-zinc-900 hover:bg-red-600 text-white text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap">
                    <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Chwazi Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(product, e)}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-zinc-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={customCount === 0}
            onClick={() => {
              onResetAll();
              setStatusMessage('Tout foto orijinal yo retabli.');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 disabled:opacity-45 disabled:pointer-events-none text-xs font-semibold text-zinc-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Remèt foto orijinal yo</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 min-h-[38px] rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Fini
          </button>
        </div>
      </div>
    </div>
  );
};
