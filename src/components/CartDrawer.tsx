import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  MERCHANT_NATCASH_COPY,
  MERCHANT_NATCASH_DISPLAY,
  MERCHANT_WHATSAPP_NUMBER,
  Product,
  formatHTG,
} from '../data/products';

export interface CartItem {
  key: string;
  product: Product;
  chosenSize?: string;
  quantity: number;
}

interface ConfirmedOrder {
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  natcashTxId: string;
  items: CartItem[];
  total: number;
  whatsappUrl: string;
  plainSummary: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemKey: string, delta: number) => void;
  onRemoveItem: (itemKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [txId, setTxId] = useState('');
  const [formError, setFormError] = useState('');
  const [copiedMerchant, setCopiedMerchant] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCopyMerchant = async () => {
    try {
      await navigator.clipboard.writeText(MERCHANT_NATCASH_COPY);
      setCopiedMerchant(true);
      window.setTimeout(() => setCopiedMerchant(false), 1800);
    } catch {
      setCopiedMerchant(false);
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanAddress = address.trim();
    const cleanTxId = txId.trim();

    if (!cleanName || !cleanPhone || !cleanAddress || !cleanTxId) {
      setFormError('Tanpri ranpli tout chan yo ak ID Tranzaksyon Natcash la.');
      return;
    }

    setFormError('');
    const orderCode = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemLines = items
      .map((i) => {
        const sizeLabel = i.chosenSize ? ` [Gwosè: ${i.chosenSize}]` : '';
        return `- ${i.product.name}${sizeLabel} x${i.quantity} (${formatHTG(
          i.product.price * i.quantity,
        )})`;
      })
      .join('\n');

    const plainSummary =
      `*NOUVO KÒMAND - BOUTBEZWEN PIYAY STORE*\n` +
      `Kòd Kòmand: ${orderCode}\n\n` +
      `*Kliyan:* ${cleanName}\n` +
      `*Telefòn:* ${cleanPhone}\n` +
      `*Adrès:* ${cleanAddress}\n\n` +
      `*Pwodwi yo:*\n${itemLines}\n\n` +
      `*Total Peye:* ${formatHTG(totalAmount)}\n` +
      `*Metòd:* Natcash (4037-2842)\n` +
      `*ID Tranzaksyon:* ${cleanTxId}`;

    const whatsappUrl = `https://wa.me/${MERCHANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      plainSummary,
    )}`;

    setConfirmedOrder({
      orderCode,
      customerName: cleanName,
      customerPhone: cleanPhone,
      customerAddress: cleanAddress,
      natcashTxId: cleanTxId,
      items: [...items],
      total: totalAmount,
      whatsappUrl,
      plainSummary,
    });

    onClearCart();
    setName('');
    setPhone('');
    setAddress('');
    setTxId('');
  };

  const handleCopyReceipt = async () => {
    if (!confirmedOrder) return;
    try {
      await navigator.clipboard.writeText(confirmedOrder.plainSummary);
      setCopiedReceipt(true);
      window.setTimeout(() => setCopiedReceipt(false), 1800);
    } catch {
      setCopiedReceipt(false);
    }
  };

  const handleContinueShopping = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl border-l border-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-zinc-900" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900"
            >
              {confirmedOrder ? 'Konfimasyon Kòmand' : 'Panye Ou'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="Fèmen panye a"
            className="w-9 h-9 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {confirmedOrder ? (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Kòmand Anrejistre
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-zinc-900">
                  Kòmand #{confirmedOrder.orderCode} Konfime
                </h3>
                <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed">
                  Mèsi, <strong>{confirmedOrder.customerName}</strong>! Klike bouton WhatsApp la
                  anba a pou voye rezime peman Natcash ou a bay ekip livrezon nou an.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-neutral-50 p-5 space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-500">ID Tranzaksyon Natcash</span>
                  <span className="font-[family-name:var(--font-mono)] font-semibold text-zinc-900">
                    {confirmedOrder.natcashTxId}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-500">Telefòn</span>
                  <span className="font-medium text-zinc-900">{confirmedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-zinc-500">Adrès Livrezon</span>
                  <span className="font-medium text-zinc-900 text-right">
                    {confirmedOrder.customerAddress}
                  </span>
                </div>

                <div className="border-t border-zinc-200 pt-3 space-y-1.5">
                  {confirmedOrder.items.map((item) => (
                    <div key={item.key} className="flex justify-between gap-2 text-zinc-700">
                      <span>
                        {item.product.name}
                        {item.chosenSize ? ` (Gwosè: ${item.chosenSize})` : ''} × {item.quantity}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] tabular-nums font-medium shrink-0">
                        {formatHTG(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-3 flex justify-between items-center text-base font-bold text-zinc-900">
                  <span>Total Peye</span>
                  <span className="font-[family-name:var(--font-mono)] tabular-nums text-red-600">
                    {formatHTG(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={confirmedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] px-5 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Voye Kòmand la sou WhatsApp</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="w-full min-h-[42px] px-4 py-2.5 rounded-lg bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-800 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedReceipt ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      <span>Rezime Kòmand Kopye</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Kopye Rezime Kòmand lan</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleContinueShopping}
                  className="w-full min-h-[42px] px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Kontinye Achte
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 mx-auto flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold text-zinc-900">Panye ou vid pou kounye a.</p>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                Ajoute pwodwi ou bezwen yo nan katalòg la epi peye fasil ak Natcash.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 min-h-[42px] rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Gade Pwodwi yo
              </button>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-zinc-200">
                {items.map(({ key, product, chosenSize, quantity }) => (
                  <li key={key} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900 truncate">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        <span className="font-[family-name:var(--font-mono)] tabular-nums">
                          {formatHTG(product.price)}
                        </span>
                        {chosenSize && (
                          <span className="ml-2 font-semibold text-red-600">
                            · Gwosè: {chosenSize}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="inline-flex items-center border border-zinc-200 rounded-md bg-zinc-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(key, -1)}
                          aria-label={`Diminye ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:bg-zinc-200/70 rounded-l-md cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-[family-name:var(--font-mono)] tabular-nums text-xs font-semibold text-zinc-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(key, 1)}
                          aria-label={`Ogmante ${product.name}`}
                          className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:bg-zinc-200/70 rounded-r-md cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="w-24 text-right font-[family-name:var(--font-mono)] tabular-nums text-sm font-semibold text-zinc-900">
                        {formatHTG(product.price * quantity)}
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(key)}
                        aria-label={`Retire ${product.name}`}
                        className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-zinc-200 pt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-600">Total pou peye</span>
                <span className="font-[family-name:var(--font-mono)] tabular-nums text-xl font-bold text-zinc-900">
                  {formatHTG(totalAmount)}
                </span>
              </div>

              <div className="rounded-xl bg-orange-50/90 border border-orange-200 p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
                    Peman Sekirize
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-zinc-900 mt-0.5">
                    Peye ak Natcash
                  </h3>
                </div>

                <ol className="text-xs sm:text-sm text-zinc-700 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>
                    Konpoze <strong className="text-zinc-900">*202#</strong> oswa ouvri aplikasyon{' '}
                    <strong className="text-zinc-900">Natcash</strong> ou.
                  </li>
                  <li>
                    Voye{' '}
                    <strong className="font-[family-name:var(--font-mono)] text-zinc-900">
                      {formatHTG(totalAmount)}
                    </strong>{' '}
                    sou nimewo sa a:
                  </li>
                </ol>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2 bg-white border border-dashed border-orange-300 rounded-lg px-3.5 py-2.5">
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-sm font-semibold text-zinc-900">
                      {MERCHANT_NATCASH_DISPLAY}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMerchant}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                    >
                      {copiedMerchant ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Kopye!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Kopye</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-center text-zinc-600">
                    Boutbezwen Piyay Store
                  </p>
                </div>

                <p className="text-xs text-zinc-700">
                  3. Antre enfòmasyon ou ak <strong>ID Tranzaksyon Natcash</strong> la anba a pou
                  konfime kòmand lan:
                </p>

                <form onSubmit={handleConfirmOrder} className="space-y-3" noValidate>
                  {formError && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700"
                    >
                      {formError}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="cust-name"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      Non konplè ou
                    </label>
                    <input
                      id="cust-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Jean Baptiste"
                      className="w-full min-h-[40px] px-3 py-2 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cust-phone"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      Nimewo Telefòn / WhatsApp ou
                    </label>
                    <input
                      id="cust-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 3456-7890"
                      className="w-full min-h-[40px] px-3 py-2 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cust-address"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      Adrès Livrezon
                    </label>
                    <input
                      id="cust-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Delmas 33, Ri..."
                      className="w-full min-h-[40px] px-3 py-2 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="natcash-txid"
                      className="block text-xs font-semibold text-zinc-800 mb-1"
                    >
                      ID Tranzaksyon Natcash (Kòd konfimasyon SMS la)
                    </label>
                    <input
                      id="natcash-txid"
                      type="text"
                      required
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder="Ex: NC84920194"
                      className="w-full min-h-[40px] px-3 py-2 bg-white border border-zinc-300 rounded-lg font-[family-name:var(--font-mono)] text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] px-4 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Konfime Peman Natcash la
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};
