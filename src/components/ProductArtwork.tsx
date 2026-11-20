import React from 'react';
import { ArtworkVariant } from '../data/products';

interface ProductArtworkProps {
  variant: ArtworkVariant;
  title: string;
  customImg?: string;
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  variant,
  title,
  customImg,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = React.useState(false);

  React.useEffect(() => {
    setImgFailed(false);
  }, [customImg]);

  if (customImg && !imgFailed) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-zinc-100 ${className}`}>
        <img
          src={customImg}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-zinc-100 via-stone-100 to-zinc-200 flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={title}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 62%)',
        }}
      />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[25%] bg-gradient-to-b from-zinc-200/70 to-zinc-300/60 border-t border-white/60" />

      {variant === 'gamepad' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_22px_rgba(24,24,27,0.18)]">
          <ellipse cx="180" cy="214" rx="108" ry="11" fill="rgba(24,24,27,0.15)" />
          <path
            d="M84 96 C96 74, 134 74, 180 74 C226 74, 264 74, 276 96 C294 128, 304 178, 286 196 C268 214, 246 198, 234 170 L126 170 C114 198, 92 214, 74 196 C56 178, 66 128, 84 96 Z"
            fill="#18181B"
            stroke="#3F3F46"
            strokeWidth="2"
          />
          <rect x="150" y="92" width="60" height="32" rx="8" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          {/* D-pad */}
          <path d="M108 106 H120 V94 H132 V106 H144 V118 H132 V130 H120 V118 H108 Z" fill="#3F3F46" />
          {/* Thumbsticks */}
          <circle cx="144" cy="146" r="16" fill="#27272A" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="144" cy="146" r="9" fill="#18181B" />
          <circle cx="216" cy="146" r="16" fill="#27272A" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="216" cy="146" r="9" fill="#18181B" />
          {/* Face buttons */}
          <circle cx="242" cy="96" r="6" fill="#EF4444" />
          <circle cx="256" cy="110" r="6" fill="#F59E0B" />
          <circle cx="242" cy="124" r="6" fill="#22C55E" />
          <circle cx="228" cy="110" r="6" fill="#3B82F6" />
        </svg>
      )}

      {variant === 'gaming_headset' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_22px_rgba(24,24,27,0.18)]">
          <ellipse cx="180" cy="222" rx="92" ry="11" fill="rgba(24,24,27,0.15)" />
          <path d="M96 142 C94 60, 134 34, 180 34 C226 34, 266 60, 264 142" fill="none" stroke="#18181B" strokeWidth="18" strokeLinecap="round" />
          <path d="M122 66 C148 44, 212 44, 238 66" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <rect x="76" y="130" width="38" height="82" rx="18" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          <rect x="246" y="130" width="38" height="82" rx="18" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          <circle cx="95" cy="171" r="13" fill="none" stroke="#DC2626" strokeWidth="3" />
          <circle cx="265" cy="171" r="13" fill="none" stroke="#DC2626" strokeWidth="3" />
          {/* Boom Mic */}
          <path d="M96 198 C96 220, 128 228, 162 216" fill="none" stroke="#3F3F46" strokeWidth="5" strokeLinecap="round" />
          <rect x="158" y="209" width="16" height="10" rx="5" fill="#DC2626" />
        </svg>
      )}

      {variant === 'phone_trigger' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[80%] h-[80%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="212" rx="86" ry="11" fill="rgba(24,24,27,0.14)" />
          {/* Phone Silhouette */}
          <rect x="74" y="72" width="212" height="122" rx="16" fill="#27272A" stroke="#52525B" strokeWidth="2" />
          <rect x="86" y="82" width="188" height="102" rx="10" fill="#18181B" />
          {/* Clip-on Analog Controller */}
          <rect x="76" y="102" width="68" height="68" rx="34" fill="#3F3F46" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="110" cy="136" r="18" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="110" cy="136" r="9" fill="#DC2626" />
          {/* Screen HUD Hint */}
          <circle cx="238" cy="126" r="14" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="212" cy="154" r="9" fill="#3F3F46" />
        </svg>
      )}

      {variant === 'phone_viseur' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[80%] h-[80%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="210" rx="92" ry="11" fill="rgba(24,24,27,0.14)" />
          {/* Phone Bar */}
          <rect x="66" y="88" width="228" height="114" rx="16" fill="#27272A" stroke="#52525B" strokeWidth="2" />
          <rect x="76" y="96" width="208" height="98" rx="10" fill="#18181B" />
          {/* Left & Right L1/R1 Viseur Triggers */}
          <path d="M84 88 L84 62 C84 54, 128 54, 134 66 L142 88 Z" fill="#DC2626" />
          <rect x="92" y="72" width="38" height="32" rx="6" fill="#3F3F46" stroke="#A1A1AA" strokeWidth="1.5" />
          <path d="M276 88 L276 62 C276 54, 232 54, 226 66 L218 88 Z" fill="#DC2626" />
          <rect x="230" y="72" width="38" height="32" rx="6" fill="#3F3F46" stroke="#A1A1AA" strokeWidth="1.5" />
          {/* Crosshair on Screen */}
          <circle cx="180" cy="145" r="22" fill="none" stroke="#EF4444" strokeWidth="2" />
          <line x1="152" y1="145" x2="208" y2="145" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="180" y1="117" x2="180" y2="173" stroke="#EF4444" strokeWidth="1.5" />
        </svg>
      )}

      {variant === 'hdmi_cable' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="212" rx="94" ry="11" fill="rgba(24,24,27,0.14)" />
          {/* Coiled Braided Cable */}
          <circle cx="180" cy="148" r="56" fill="none" stroke="#27272A" strokeWidth="12" />
          <circle cx="180" cy="148" r="42" fill="none" stroke="#3F3F46" strokeWidth="10" />
          {/* HDMI Connector Head */}
          <rect x="80" y="54" width="66" height="36" rx="6" fill="#18181B" stroke="#DC2626" strokeWidth="2" />
          <rect x="58" y="61" width="22" height="22" rx="2" fill="#D4AF37" />
          <path d="M146 72 C196 72, 224 92, 224 128" fill="none" stroke="#27272A" strokeWidth="10" strokeLinecap="round" />
          {/* USB-C / Adapter End */}
          <rect x="220" y="54" width="62" height="34" rx="6" fill="#3F3F46" stroke="#71717A" strokeWidth="1.5" />
          <rect x="282" y="63" width="18" height="16" rx="3" fill="#A1A1AA" />
          <text x="113" y="76" textAnchor="middle" fill="#FAFAFA" fontSize="11" fontWeight="700" fontFamily="monospace">
            HDMI
          </text>
        </svg>
      )}

      {variant === 'bluetooth_headphones' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_22px_rgba(24,24,27,0.18)]">
          <ellipse cx="180" cy="218" rx="92" ry="11" fill="rgba(24,24,27,0.15)" />
          <path d="M96 145 C94 62, 134 36, 180 36 C226 36, 266 62, 264 145" fill="none" stroke="#3F3F46" strokeWidth="18" strokeLinecap="round" />
          <path d="M116 86 C134 52, 226 52, 244 86" fill="none" stroke="#18181B" strokeWidth="12" strokeLinecap="round" />
          <path d="M96 135 L96 168" stroke="#A1A1AA" strokeWidth="6" strokeLinecap="round" />
          <path d="M264 135 L264 168" stroke="#A1A1AA" strokeWidth="6" strokeLinecap="round" />
          <rect x="78" y="132" width="36" height="80" rx="18" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <rect x="246" y="132" width="36" height="80" rx="18" fill="#18181B" stroke="#52525B" strokeWidth="1.5" />
          <circle cx="96" cy="172" r="9" fill="none" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="264" cy="172" r="9" fill="none" stroke="#F59E0B" strokeWidth="2" />
        </svg>
      )}

      {variant === 'fast_charger' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[80%] h-[80%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="218" rx="82" ry="10" fill="rgba(24,24,27,0.14)" />
          {/* Prongs */}
          <rect x="148" y="42" width="10" height="28" rx="3" fill="#A1A1AA" />
          <rect x="202" y="42" width="10" height="28" rx="3" fill="#A1A1AA" />
          {/* Adapter Body */}
          <rect x="122" y="68" width="116" height="122" rx="20" fill="#FFFFFF" stroke="#D4D4D8" strokeWidth="2" />
          <rect x="132" y="150" width="96" height="30" rx="10" fill="#F4F4F5" />
          {/* Lightning Bolt Icon */}
          <path d="M186 92 L166 124 H182 L174 150 L198 116 H182 Z" fill="#EA580C" />
          {/* USB-C Cable */}
          <path d="M180 190 C180 218, 240 218, 256 188" fill="none" stroke="#18181B" strokeWidth="8" strokeLinecap="round" />
          <rect x="248" y="160" width="18" height="28" rx="5" fill="#18181B" />
          <rect x="252" y="148" width="10" height="12" rx="2" fill="#A1A1AA" />
        </svg>
      )}

      {variant === 'perfume_adult' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[78%] h-[78%] drop-shadow-[0_18px_22px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="228" rx="64" ry="10" fill="rgba(24,24,27,0.15)" />
          <rect x="150" y="34" width="60" height="42" rx="6" fill="#18181B" />
          <rect x="162" y="76" width="36" height="14" rx="2" fill="#D4AF37" />
          <rect x="114" y="90" width="132" height="134" rx="18" fill="rgba(255,255,255,0.65)" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="124" y="102" width="112" height="106" rx="12" fill="#D97706" opacity="0.88" />
          <rect x="140" y="128" width="80" height="54" rx="4" fill="#FAFAFA" stroke="#E4E4E7" strokeWidth="1" />
          <text x="180" y="152" textAnchor="middle" fill="#18181B" fontSize="9.5" fontWeight="700" letterSpacing="1.5">
            PIYAY
          </text>
          <text x="180" y="172" textAnchor="middle" fill="#B45309" fontSize="7.5" fontFamily="monospace">
            100 ML
          </text>
        </svg>
      )}

      {variant === 'sandals_adult' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.18)]">
          <ellipse cx="180" cy="212" rx="110" ry="12" fill="rgba(24,24,27,0.15)" />
          {/* Left Sandal Slide */}
          <path d="M68 182 C70 198, 120 202, 224 198 C278 196, 304 186, 302 172 C300 160, 260 162, 180 162 C110 162, 66 168, 68 182 Z" fill="#18181B" />
          <path d="M72 184 C118 194, 240 194, 298 178 L296 186 C238 202, 118 202, 74 190 Z" fill="#DC2626" />
          {/* Wide Slide Strap */}
          <path d="M138 164 C144 106, 222 104, 244 162 L192 164 L138 164 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="2" />
          <path d="M160 128 H222" stroke="#FAFAFA" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}

      {variant === 'outfit_adult' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[82%] h-[82%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="226" rx="92" ry="10" fill="rgba(24,24,27,0.14)" />
          {/* Crewneck Tee */}
          <path
            d="M126 48 L156 42 C164 56, 196 56, 204 42 L234 48 L268 82 L246 106 L228 90 L228 158 L132 158 L132 90 L114 106 L92 82 Z"
            fill="#18181B"
          />
          <rect x="148" y="88" width="64" height="10" rx="3" fill="#DC2626" />
          {/* Matching Shorts */}
          <path
            d="M134 166 H226 L236 218 H192 L180 188 L168 218 H124 Z"
            fill="#27272A"
            stroke="#3F3F46"
            strokeWidth="1.5"
          />
          <line x1="176" y1="168" x2="176" y2="180" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="184" y1="168" x2="184" y2="180" stroke="#FAFAFA" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {variant === 'outfit_kids' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[80%] h-[80%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="224" rx="82" ry="10" fill="rgba(24,24,27,0.14)" />
          {/* Kids Hoodie / Tee */}
          <path
            d="M132 54 L158 48 C166 60, 194 60, 202 48 L228 54 L256 84 L236 104 L222 90 L222 152 L138 152 L138 90 L124 104 L104 84 Z"
            fill="#EA580C"
          />
          <circle cx="180" cy="102" r="14" fill="#FAFAFA" />
          <circle cx="180" cy="102" r="7" fill="#18181B" />
          {/* Kids Shorts */}
          <path d="M140 160 H220 L228 210 H188 L180 184 L172 210 H132 Z" fill="#1E3A8A" />
        </svg>
      )}

      {variant === 'sandals_kids' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[80%] h-[80%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.16)]">
          <ellipse cx="180" cy="212" rx="98" ry="11" fill="rgba(24,24,27,0.14)" />
          {/* Kids Sport Sandal */}
          <path d="M84 180 C86 196, 130 200, 214 196 C264 194, 286 184, 284 170 C282 158, 248 162, 180 162 C118 162, 82 168, 84 180 Z" fill="#0284C7" />
          <path d="M88 184 C128 194, 232 194, 280 176 L278 184 C230 200, 128 200, 90 190 Z" fill="#FFFFFF" />
          {/* Heel & Forefoot Velcro Straps */}
          <path d="M98 164 L112 122 L138 126 L124 164 Z" fill="#18181B" />
          <path d="M168 162 C174 114, 230 116, 248 162 Z" fill="#F59E0B" />
        </svg>
      )}

      {variant === 'perfume_kids' && (
        <svg viewBox="0 0 360 270" className="relative z-10 w-[76%] h-[76%] drop-shadow-[0_18px_20px_rgba(24,24,27,0.14)]">
          <ellipse cx="180" cy="224" rx="58" ry="10" fill="rgba(24,24,27,0.14)" />
          {/* Rounded Cap */}
          <circle cx="180" cy="62" r="24" fill="#38BDF8" />
          <rect x="166" y="80" width="28" height="12" rx="3" fill="#E4E4E7" />
          {/* Rounded Soft Glass Bottle */}
          <rect x="118" y="92" width="124" height="124" rx="44" fill="rgba(255,255,255,0.75)" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="128" y="106" width="104" height="98" rx="34" fill="#7DD3FC" opacity="0.72" />
          <rect x="144" y="132" width="72" height="44" rx="10" fill="#FFFFFF" />
          <text x="180" y="153" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="700">
            DOUX
          </text>
          <text x="180" y="167" textAnchor="middle" fill="#64748B" fontSize="7.5" fontWeight="600">
            TIMOUN
          </text>
        </svg>
      )}
    </div>
  );
};

export const HeroShowcaseArtwork: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 65% 28%, rgba(220,38,38,0.22) 0%, rgba(234,88,12,0.12) 34%, rgba(24,24,27,0) 70%)',
        }}
      />
      <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-lg">
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <ProductArtwork variant="gamepad" title="Manette Gaming" />
        </div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg translate-y-3">
          <ProductArtwork variant="gaming_headset" title="Casque Gaming Pro" />
        </div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg -translate-y-1">
          <ProductArtwork variant="sandals_adult" title="Sandal Granmoun" />
        </div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-lg translate-y-2">
          <ProductArtwork variant="perfume_adult" title="Parfum Granmoun (100ml)" />
        </div>
      </div>
    </div>
  );
};
