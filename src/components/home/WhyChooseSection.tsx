import React from 'react';
import { motion } from 'motion/react';
import { AnimatedCounter } from '../common/AnimatedCounter';
import {
  Users,
  FlaskConical,
  Sparkles,
  Factory,
  Building2,
  Microscope,
} from 'lucide-react';

interface CredentialCard {
  id: string;
  value: string;
  unit?: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CREDENTIALS: CredentialCard[] = [
  {
    id: 'brand-partnerships',
    value: '250+',
    title: 'Brand Partnerships',
    description: 'Supporting emerging & established beauty brands.',
    icon: Users,
  },
  {
    id: 'custom-formulations',
    value: '500+',
    title: 'Custom Formulations',
    description: 'Diverse portfolio across cosmetic categories.',
    icon: FlaskConical,
  },
  {
    id: 'fragrance-options',
    value: '300+',
    title: 'Fragrance Options',
    description: 'Versatile IFRA-compliant fragrance library.',
    icon: Sparkles,
  },
  {
    id: 'monthly-capacity',
    value: '1 Lakh',
    unit: 'Units / Mo',
    title: 'Production Capacity',
    description: 'Automated lines for bottles, tubes & jars.',
    icon: Factory,
  },
  {
    id: 'manufacturing-facility',
    value: '5,500',
    unit: 'Sq. Ft.',
    title: 'Manufacturing Facility',
    description: 'Dedicated GMP-compliant production space.',
    icon: Building2,
  },
  {
    id: 'formulation-expertise',
    value: 'R&D',
    title: 'Formulation Expertise',
    description: 'In-house cosmetic chemists & testing lab.',
    icon: Microscope,
  },
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-[#899C7D] pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 border-b border-[#08291E]/15 overflow-hidden relative"
    >
      {/* Background Soft Pattern Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-2xl pointer-events-none -z-0" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#08291E]/10 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-5 sm:space-y-6 relative z-10 text-left">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="w-full space-y-2 sm:space-y-2.5 text-left"
        >
          {/* Eyebrow in Dark Forest / Warm Cream */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6EDDA]/90 text-[#08291E] text-xs font-semibold tracking-wider uppercase border border-[#08291E]/20 shadow-2xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#08291E]" />
            <span>WHY CHOOSE THE BIOGLOBAL</span>
          </div>

          {/* Main Heading in Dark Forest */}
          <h2
            id="why-choose-heading"
            className="font-serif font-light text-2xl sm:text-3xl lg:text-[38px] text-[#08291E] tracking-tight leading-tight"
          >
            The Expertise Behind Exceptional Beauty Brands
          </h2>

          {/* Section Description in Dark Forest */}
          <p className="text-[#08291E]/90 text-xs sm:text-sm sm:leading-relaxed font-normal max-w-5xl lg:max-w-6xl">
            At The BioGlobal, we combine extensive cosmetic manufacturing experience with formulation expertise, certified production, and a commitment to quality. Our approach helps emerging and established beauty brands develop distinctive products and build collections that align with their business goals.
          </p>
        </motion.div>

        {/* 6 Cream Statistic Cards with Restrained Gold Borders in a Single Line Desktop Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-3 xl:gap-3.5 text-left">
          {CREDENTIALS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  delay: idx * 0.06,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 14px 28px rgba(8, 41, 30, 0.14)',
                }}
                className="bg-[#F6EDDA] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-xs border border-[#EBC679]/70 hover:border-[#D5A343] transition-all duration-300 relative group overflow-hidden"
              >
                {/* Top Row: Compact Icon Container & Optional Unit Badge */}
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 gap-1">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EFE3CD] border border-[#EBC679]/40 flex items-center justify-center text-[#10382A] group-hover:bg-[#10382A] transition-colors duration-300 shrink-0">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#10382A] group-hover:text-[#EBC679] transition-colors duration-300" />
                  </div>

                  {stat.unit && (
                    <span className="text-[10px] font-semibold text-[#14251D] bg-[#FAF2E1] border border-[#EBC679]/40 px-1.5 py-0.5 rounded shrink-0">
                      {stat.unit}
                    </span>
                  )}
                </div>

                {/* Content: Stat Number, Heading, and 2-Line Crisp Description */}
                <div className="space-y-1 flex-grow">
                  <span className="font-serif font-bold text-2xl sm:text-[26px] text-[#10382A] tracking-tight block leading-tight">
                    <AnimatedCounter value={stat.value} />
                  </span>

                  <h3 className="font-serif font-bold text-xs sm:text-[13px] xl:text-sm text-[#14251D] tracking-tight group-hover:text-[#10382A] transition-colors leading-snug">
                    {stat.title}
                  </h3>

                  <p className="text-[#14251D]/80 text-[11px] leading-relaxed font-normal line-clamp-2">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom Active Accent Indicator Line */}
                <div className="w-6 h-0.5 bg-[#EBC679] group-hover:w-12 group-hover:bg-[#10382A] rounded-full transition-all duration-300 mt-2.5 sm:mt-3" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
