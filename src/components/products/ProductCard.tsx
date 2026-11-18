import React, { useState } from 'react';
import { Sparkles, Eye, ArrowUpRight, Package, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useQuoteModal } from '../../context/QuoteModalContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { openQuoteModal } = useQuoteModal();
  const [imgError, setImgError] = useState(false);

  const handleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuoteModal({
      productCategory: product.category,
      targetProduct: product.name,
      serviceType: 'Private Label Manufacturing',
      source: 'Product Category Page',
    });
  };

  const activeIngredients = product.ingredients || product.keyActives || [];
  const displayDescription = product.shortDescription || product.description;
  const primaryPackaging = product.packagingOptions?.[0];

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`View formulation details for ${product.name}`}
      onClick={() => onViewDetails(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails(product);
        }
      }}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-[#EBC679] shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 select-none focus:outline-hidden focus:ring-2 focus:ring-[#10382A]"
    >
      <div>
        {/* Product Visual Container with Aspect-Square and Padding for Perfect Fit */}
        <div className="relative aspect-square w-full bg-[#FAF9F5] p-5 flex items-center justify-center overflow-hidden">
          <img
            src={imgError ? '/images/bioglobal/categories/skincare.webp' : product.image}
            alt={`${product.name} — ${product.category} packaging`}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Left Category Badge */}
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-[#10382A]/90 backdrop-blur-md text-[#FAF2E1] text-[10px] font-bold tracking-wider uppercase shadow-xs border border-[#EBC679]/40">
              {product.category}
            </span>
          </div>

          {/* Bottom Right MOQ Badge */}
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-[#F6EDDA]/95 backdrop-blur-xs text-[#14251D] text-[10px] font-bold border border-[#D5C7AF] shadow-2xs">
              MOQ: {product.minOrderQuantity || '1,000 units'}
            </span>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#10382A] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#10382A] shrink-0" />
            <span className="truncate">{product.tagline || 'Approved Formulation Benchmark'}</span>
          </div>

          {/* Product Title (H3 with line clamp) */}
          <h3 className="font-serif text-base font-bold text-[#14251D] group-hover:text-[#10382A] transition-colors line-clamp-2 min-h-[44px] leading-snug">
            {product.name}
          </h3>

          {/* Product Short Description (12-22 words) */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed min-h-[34px]">
            {displayDescription}
          </p>

          {/* Key Actives Pill Preview (Max 3 Chips + Compact N More) */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 min-h-[28px]">
            {activeIngredients.slice(0, 3).map((act, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F6EDDA] text-[#10382A] font-semibold border border-[#D5C7AF] truncate max-w-[130px]"
              >
                {act}
              </span>
            ))}
            {activeIngredients.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500 font-medium border border-stone-200">
                +{activeIngredients.length - 3} more
              </span>
            )}
          </div>

          {/* Packaging & Pricing Info */}
          <div className="pt-2 border-t border-stone-100/80 flex items-center justify-between text-[11px]">
            {primaryPackaging ? (
              <div className="flex items-center gap-1 text-stone-500 truncate max-w-[58%]">
                <Package className="w-3 h-3 text-[#10382A] shrink-0" />
                <span className="truncate">{primaryPackaging}</span>
              </div>
            ) : <div />}
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10382A] bg-[#F6EDDA] px-2 py-0.5 rounded border border-[#D5C7AF]">
              <Tag className="w-2.5 h-2.5 text-[#EBC679]" />
              <span>Request Pricing</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions: View Details & Request a Quote (Fixed to bottom) */}
      <div className="p-3.5 bg-[#FAF9F5] border-t border-stone-100 grid grid-cols-2 gap-2 mt-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product);
          }}
          className="w-full py-2 px-2.5 rounded-xl border border-stone-300 hover:border-[#10382A] bg-white hover:bg-[#F6EDDA] text-[#14251D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-stone-500" />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={handleInquiry}
          className="w-full py-2 px-2.5 rounded-xl bg-[#10382A] hover:bg-[#08291E] text-[#FAF2E1] border border-[#EBC679]/30 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer group/btn"
        >
          <span>Request a Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#EBC679] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
