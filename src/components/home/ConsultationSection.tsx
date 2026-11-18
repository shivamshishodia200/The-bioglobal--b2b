import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  FlaskConical,
  Package,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ConsultationForm } from '../consultation/ConsultationForm';

export const ConsultationSection: React.FC = () => {
  return (
    <section
      id="consultation-section"
      className="py-10 sm:py-14 lg:py-16 bg-[#08291E] text-white relative overflow-hidden scroll-mt-24"
      aria-labelledby="consultation-heading"
    >
      {/* Background Decorative Ambient Halos */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#657C44]/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EBC679]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column: Streamlined, Compact Info with Reduced Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-3.5"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10382A] text-[#EBC679] text-xs font-semibold uppercase tracking-wider border border-[#EBC679]/30 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#EBC679]" />
              <span>START YOUR BEAUTY BRAND</span>
            </div>

            {/* Main Heading H2 */}
            <h2
              id="consultation-heading"
              className="font-serif font-light text-2xl sm:text-3xl lg:text-3xl text-[#FAF2E1] leading-tight tracking-tight"
            >
              Your Next Beauty Product Starts With a Conversation
            </h2>

            {/* Short, focused description */}
            <p className="text-[#FAF2E1]/80 text-xs sm:text-sm leading-relaxed font-light">
              Share your product concept, packaging preferences, and target volume. Our formulation engineers provide direct technical guidance and batch pricing.
            </p>

            {/* Two Compact Feature Pills (Reduced height & content) */}
            <div className="space-y-2 pt-1">
              {/* Point 1: Formulation & R&D */}
              <div className="p-2.5 rounded-xl bg-[#10382A]/70 border border-[#EBC679]/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBC679]/15 flex items-center justify-center shrink-0 text-[#EBC679]">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#FAF2E1]">
                    Custom Formulation & R&D
                  </h3>
                  <p className="text-[11px] text-[#FAF2E1]/70 truncate">
                    Active ingredients, stability profiles, and texture development.
                  </p>
                </div>
              </div>

              {/* Point 2: Packaging & Batch Scaling */}
              <div className="p-2.5 rounded-xl bg-[#10382A]/70 border border-[#EBC679]/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EBC679]/15 flex items-center justify-center shrink-0 text-[#EBC679]">
                  <Package className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#FAF2E1]">
                    Packaging & Batch Production
                  </h3>
                  <p className="text-[11px] text-[#FAF2E1]/70 truncate">
                    From 1,000 units MOQ with automated cleanroom filling.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges: Compact Inline Row */}
            <div className="pt-2 border-t border-[#EBC679]/15 flex flex-wrap items-center gap-4 text-xs text-[#FAF2E1]/70 font-light">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EBC679] shrink-0" />
                <span>NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EBC679] shrink-0" />
                <span>WHO-GMP & ISO 9001:2015</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Sleek, Compact Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <ConsultationForm source="homepage_consultation" compact={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
