import React, { useState, useMemo } from 'react';
import { Camera, Check, Plus, Search, X } from 'lucide-react';
import {
  CATEGORY_TABS,
  Product,
  ProductCategory,
  formatHTG,
} from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface ProductCatalogProps {
  products: Product[];
  customImages: Record<number, string>;
  onAddToCart: (product: Product, chosenSize?: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenPhotoManager: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  customImages,
  onAddToCart,
  onSelectProduct,
  onOpenPhotoManager,
}) => {
  const [activeCategory, setActiveCategory] = useState<'tout' | ProductCategory>('tout');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [recentlyAddedKey, setRecentlyAddedKey] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat = activeCategory === 'tout' || p.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.catLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [products, activeCategory, searchQuery]);

  const getChosenSize = (product: Product): string | undefined => {
    if (!product.hasSize || !product.sizes?.length) return undefined;
    return selectedSizes[product.id] ?? product.sizes[0];
  };

  const handleSizeChange = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuickAdd = (product: Product) => {
    const chosenSize = getChosenSize(product);
    onAddToCart(product, chosenSize);
    const feedbackKey = `${product.id}-${chosenSize ?? 'std'}`;
    setRecentlyAddedKey(feedbackKey);
    window.setTimeout(() => {
      setRecentlyAddedKey((prev) => (prev === feedbackKey ? null : prev));
    }, 1100);
  };

  return (
    <section id="pwodwi" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
            Katalòg Pwodwi
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Gwo Piyay Disponib Jodi a
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
            <Search
              className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chèche yon pwodwi..."
              aria-label="Chèche yon pwodwi"
              className="w-full min-h-[42px] pl-10 pr-9 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Efase rechèch la"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenPhotoManager}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[42px] rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <span>Mete Foto</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Kategori pwodwi"
        className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-lg w-fit mb-8"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 min-h-[36px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-10 text-center">
          <p className="text-base font-semibold text-zinc-900">
            Pa gen pwodwi ki koresponn ak rechèch ou a.
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            Eseye yon lòt mo kle oswa gade tout pwodwi yo.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('tout');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 min-h-[40px] rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Afiche Tout Pwodwi yo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const chosenSize = getChosenSize(product);
            const feedbackKey = `${product.id}-${chosenSize ?? 'std'}`;
            const isAdded = recentlyAddedKey === feedbackKey;

            return (
              <article
                key={product.id}
                className="group bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  aria-label={`Wè detay pou ${product.name}`}
                  className="block w-full aspect-[4/3] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-red-600"
                >
                  <ProductArtwork
                    variant={product.artwork}
                    title={product.name}
                    customImg={customImages[product.id]}
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 mb-1.5">
                      <span className="uppercase tracking-wider font-semibold">
                        {product.catLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-zinc-600">{product.availability}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left block w-full cursor-pointer"
                    >
                      <h3 className="text-base font-semibold text-zinc-900 group-hover:text-red-600 transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </button>

                    <p className="mt-2 font-[family-name:var(--font-mono)] tabular-nums text-[15px] font-semibold text-red-600">
                      {formatHTG(product.price)}
                    </p>

                    {product.hasSize && product.sizes && (
                      <div className="mt-3">
                        <label
                          htmlFor={`size-${product.id}`}
                          className="block text-xs font-medium text-zinc-600 mb-1"
                        >
                          Chwazi Gwosè:
                        </label>
                        <select
                          id={`size-${product.id}`}
                          value={chosenSize}
                          onChange={(e) => handleSizeChange(product.id, e.target.value)}
                          className="w-full min-h-[38px] px-2.5 py-1.5 bg-neutral-50 border border-zinc-200 rounded-md text-sm font-medium text-zinc-900 focus:outline-none focus:border-zinc-900 cursor-pointer"
                        >
                          {product.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className={`w-full min-h-[42px] px-4 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-zinc-900 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Ajoute{chosenSize ? ` (${chosenSize})` : ''}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Ajoute nan Panye</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
