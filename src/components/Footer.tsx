import React from 'react';
import { MERCHANT_NATCASH_DISPLAY, MERCHANT_WHATSAPP_NUMBER } from '../data/products';

interface FooterProps {
  onOpenPhotoManager: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPhotoManager }) => {
  return (
    <footer id="kontak" className="bg-zinc-900 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-base font-bold text-white">
            Boutbezwen Piyay Store
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            Tout sa w bezwen a pri piyay · Peman sekirize ak Natcash (*202#)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <button
            type="button"
            onClick={onOpenPhotoManager}
            className="text-zinc-300 hover:text-white hover:underline underline-offset-4 font-medium cursor-pointer"
          >
            Mete Foto Pwodwi
          </button>
          <a
            href={`https://wa.me/${MERCHANT_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline underline-offset-4 font-medium"
          >
            Peman Natcash &amp; Kontak: {MERCHANT_NATCASH_DISPLAY}
          </a>
          <span className="text-zinc-500">
            &copy; 2026 Boutbezwen Piyay Store — Tout dwa rezève.
          </span>
        </div>
      </div>
    </footer>
  );
};
