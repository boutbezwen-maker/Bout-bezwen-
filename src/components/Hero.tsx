import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroShowcaseArtwork } from './ProductArtwork';

interface HeroProps {
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
  return (
    <section className="bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-3">
              Boutik anliy Ayisyen · Pòtoprens &amp; Pwovens
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-zinc-900 [text-wrap:balance] max-w-xl">
              Tout sa w bezwen, a pri piyay.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-lg">
              Gaming, Telefòn, Rad, Sandal &amp; Pafen pou timoun kou granmoun—peye fasil ak{' '}
              <strong className="font-semibold text-zinc-900">Natcash (*202#)</strong> ak
              konfimasyon dirèk sou WhatsApp.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-zinc-900 hover:bg-red-600 text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              >
                <span>Gade Pwodwi yo</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href="#natcash"
                className="inline-flex items-center px-4 py-3 min-h-[44px] text-sm font-semibold text-zinc-700 hover:text-zinc-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Kijan pou peye ak Natcash
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-500">
              <span>Pri nan Goud (HTG)</span>
              <span aria-hidden="true">·</span>
              <span>Peman Natcash *202#</span>
              <span aria-hidden="true">·</span>
              <span>Livrezon rapid nan 24–48è</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <HeroShowcaseArtwork />
          </div>
        </div>
      </div>
    </section>
  );
};
