import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { MERCHANT_NATCASH_COPY, MERCHANT_NATCASH_DISPLAY } from '../data/products';

export const NatcashGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(MERCHANT_NATCASH_COPY);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="kijan-sa-mache"
      className="bg-white border-t border-b border-zinc-200 py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
            Pwosesis Kòmand
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Kijan pou w kòmande epi peye ak Natcash
          </h2>
        </div>

        {/* 3-step editorial row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-neutral-50 border border-zinc-200">
            <p className="font-[family-name:var(--font-mono)] text-xs font-semibold text-red-600 mb-2">
              01. Chwazi Pwodwi
            </p>
            <h3 className="text-base font-semibold text-zinc-900">
              Ajoute atik ou yo nan panye a
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Chwazi pwodwi ou bezwen yo, verifye pri an Goud (HTG), epi louvri panye ou anlè adwat.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-50 border border-zinc-200">
            <p className="font-[family-name:var(--font-mono)] text-xs font-semibold text-orange-600 mb-2">
              02. Peman Natcash (*202#)
            </p>
            <h3 className="text-base font-semibold text-zinc-900">
              Voye montan total la sou Natcash
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Konpoze <strong className="font-semibold text-zinc-900">*202#</strong> oswa ouvri
              aplikasyon Natcash pou voye lajan an sou nimewo machann lan epi kenbe ID tranzaksyon an.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-50 border border-zinc-200">
            <p className="font-[family-name:var(--font-mono)] text-xs font-semibold text-zinc-900 mb-2">
              03. Konfimasyon WhatsApp
            </p>
            <h3 className="text-base font-semibold text-zinc-900">
              Voye detay livrezon ou yo
            </h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Ranpli fòm lan nan panye a ak ID Tranzaksyon Natcash la pou voye rezime kòmand lan dirèk
              sou WhatsApp.
            </p>
          </div>
        </div>

        {/* Dedicated Natcash Merchant Reference Block */}
        <div
          id="natcash"
          className="rounded-xl bg-orange-50/80 border border-orange-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700 mb-1">
              Kont Machann Ofisyèl Natcash
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-zinc-900">
              Nimewo pou transfè Natcash (*202#)
            </h3>
            <p className="mt-1.5 text-sm text-zinc-700 leading-relaxed">
              Toujou verifye non machann lan (<strong>Boutbezwen Piyay Store</strong>) anvan ou
              konfime kòd PIN ou sou *202# oswa nan aplikasyon Natcash la.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-lg bg-white border border-orange-200 font-[family-name:var(--font-mono)] tabular-nums text-base sm:text-lg font-semibold text-zinc-900 text-center">
              {MERCHANT_NATCASH_DISPLAY}
            </div>
            <button
              type="button"
              onClick={handleCopyNumber}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Kopye!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Kopye Nimewo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
