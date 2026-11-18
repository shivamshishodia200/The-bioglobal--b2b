import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  FlaskConical,
  Package,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Layers,
  FileCheck,
  Sparkle,
  SlidersHorizontal,
  ChevronRight,
  Building2,
  Cpu
} from 'lucide-react';
import { useQuoteModal } from '../../context/QuoteModalContext';

interface RoadmapPillar {
  id: string;
  stepNumber: string;
  tag: string;
  title: string;
  timeline: string;
  shortDesc: string;
  icon: React.ElementType;
  keyHighlights: string[];
  specs: { label: string; value: string }[];
  deliverables: string;
}

const ROADMAP_PILLARS: RoadmapPillar[] = [
  {
    id: 'formulation-selection',
    stepNumber: '01',
    tag: 'R&D & Formulation Library',
    title: 'Formula Selection & Active Optimization',
    timeline: 'Days 1 – 5',
    shortDesc:
      'Select from over 150+ clinically benchmarked base formulations or collaborate with our formulation chemists to infuse custom target actives, adapt textures, and adjust scent profiles.',
    icon: FlaskConical,
    keyHighlights: [
      'Access 150+ pre-stabilized cosmetic & personal care bases',
      'Infuse trending actives: Peptides, Ceramides, Bakuchiol, Vitamin C, Niacinamide',
      'Custom viscosity tuning from watery essences to rich whipped body butters',
      'Clean formulation standards: 100% Paraben, Sulphate, and Cruelty-Free options'
    ],
    specs: [
      { label: 'Formulation Options', value: '150+ Tested Bases' },
      { label: 'Active Customization', value: '100% Tailored' },
      { label: 'Stability Assessment', value: 'Pre-Validated' },
    ],
    deliverables: 'Tailored Formulation Spec Sheet & Active Profile',
  },
  {
    id: 'lab-sampling',
    stepNumber: '02',
    tag: 'Pre-Production Evaluation',
    title: 'Fast Lab Sampling & Sensory Sign-Off',
    timeline: 'Days 5 – 12',
    shortDesc:
      'Receive pre-production prototype samples directly at your office or lab within 5 to 7 business days to inspect skin absorption, texture, fragrance stability, and packaging compatibility.',
    icon: SlidersHorizontal,
    keyHighlights: [
      'Fast 5–7 day turnaround for benchtop formulation samples',
      'Comprehensive sensory evaluation kit with labeled trial batches',
      'Side-by-side benchmarking against commercial luxury references',
      'One round of complimentary refinement based on your sensory feedback'
    ],
    specs: [
      { label: 'Sample Turnaround', value: '5 – 7 Working Days' },
      { label: 'Sample Volume', value: '50ml – 100ml Jars/Bottles' },
      { label: 'Refinement Cycles', value: 'Rapid Iteration' },
    ],
    deliverables: 'Approved Benchmark Sample & Quality Baseline',
  },
  {
    id: 'packaging-artwork',
    stepNumber: '03',
    tag: 'Packaging & Brand Alignment',
    title: 'Luxury Packaging Sourcing & Custom Artwork',
    timeline: 'Days 12 – 18',
    shortDesc:
      'Pair your approved formulation with our signature ivory-gold packaging system, airless pumps, frosted glass dropper bottles, or custom-tooled components with high-definition branding.',
    icon: Package,
    keyHighlights: [
      'Standard luxury inventory: opaque ivory containers with mirror gold lids and pumps',
      'Precision silkscreen printing, UV varnishing, and metallic foil hot-stamping',
      'Secondary rigid luxury boxes, folding cartons, and tamper-evident induction seals',
      'Sustainable, recyclable PET, HDPE, and premium weight frosted glass options'
    ],
    specs: [
      { label: 'Primary Packaging', value: 'Jars, Droppers, Pumps, Tubes' },
      { label: 'Finishing Options', value: 'Hot-Foil, Screen-Print, Matte' },
      { label: 'Closure Options', value: 'Polished Metallic Gold & Silver' },
    ],
    deliverables: 'Pre-Press Artwork Proof & Packaging Dieline Sign-off',
  },
  {
    id: 'cleanroom-manufacturing',
    stepNumber: '04',
    tag: 'Production & Quality Assurance',
    title: 'cGMP Cleanroom Production & Fast Dispatch',
    timeline: 'Days 18 – 28',
    shortDesc:
      'Batch compounding, microbiological challenge testing, high-speed automated filling, and automated coding in our ISO 22716 certified cleanrooms, prepared for instant retail dispatch.',
    icon: ShieldCheck,
    keyHighlights: [
      'Compounded in ISO 22716 & cGMP certified cleanroom manufacturing facilities',
      '100% in-house microbiological, viscosity, and heavy-metal batch testing',
      'Automated batch coding, shrink-wrapping, and master carton palletization',
      'Complete documentation suite: Certificate of Analysis (COA) & Safety Data Sheets (MSDS)'
    ],
    specs: [
      { label: 'Production Facility', value: 'ISO 22716 GMP Certified' },
      { label: 'Quality Verification', value: '100% Batch COA Included' },
      { label: 'Lead Time', value: '21 – 28 Days Total' },
    ],
    deliverables: 'Finished Retail-Ready Units with Full COA & QC Dossier',
  },
];

export const TurnkeyManufacturingRoadmap: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(ROADMAP_PILLARS[0].id);
  const { openQuoteModal } = useQuoteModal();

  const activePillar = ROADMAP_PILLARS.find((p) => p.id === activePillarId) || ROADMAP_PILLARS[0];

  return (
    <div className="w-full space-y-6">
      {/* Main Roadmap Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-sm relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#86A55B]/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#DFBD89]/15 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stone-200/80 pb-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4EEE3] text-[#1D3C34] text-[11px] font-bold tracking-wider uppercase border border-[#C5DAC3]">
                <Sparkles className="w-3.5 h-3.5 text-[#708E50]" />
                <span>TURNKEY PRIVATE LABEL ROADMAP</span>
              </div>
              <h3 className="font-serif font-semibold text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight">
                From Formulation to Shelf: 4-Step Launch Process
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
                Skip lengthy R&amp;D cycles and heavy capital investments. Our structured turnkey contract manufacturing
                pipeline takes beauty and personal care brands from active formulation selection to retail-ready dispatch in as little as 4 weeks.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 self-start lg:self-auto shrink-0">
              <div className="px-4 py-2.5 rounded-2xl bg-[#FAF9F5] border border-stone-200 text-left">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Typical Lead Time
                </span>
                <span className="text-sm sm:text-base font-bold text-[#1D3C34]">
                  21–28 Days
                </span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-[#FAF9F5] border border-stone-200 text-left">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Trial MOQ
                </span>
                <span className="text-sm sm:text-base font-bold text-[#708E50]">
                  From 1,000 Units
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Step Navigation Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {ROADMAP_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              const isActive = pillar.id === activePillarId;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#1D3C34] text-white border-[#1D3C34] shadow-md scale-[1.02]'
                      : 'bg-[#FAF9F5] hover:bg-stone-100 text-stone-800 border-stone-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`text-xs font-bold tracking-widest ${
                        isActive ? 'text-[#DFBD89]' : 'text-stone-400'
                      }`}
                    >
                      STEP {pillar.stepNumber}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                        isActive
                          ? 'bg-white/15 text-stone-200'
                          : 'bg-stone-200/60 text-stone-600'
                      }`}
                    >
                      {pillar.timeline}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#DFBD89]' : 'text-[#708E50]'
                        }`}
                      />
                      <h4 className="font-serif font-bold text-sm sm:text-base leading-snug line-clamp-1">
                        {pillar.title.split('&')[0]}
                      </h4>
                    </div>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isActive ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {pillar.tag}
                    </p>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activePillarIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#DFBD89] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Description & Checklist (7 Cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#708E50] tracking-wider uppercase">
                      Phase {activePillar.stepNumber} Overview
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span className="text-xs font-semibold text-stone-500">
                      Estimated Duration: {activePillar.timeline}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {activePillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {activePillar.shortDesc}
                  </p>
                </div>

                {/* Key Checklist Highlights */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Key Execution Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePillar.keyHighlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#708E50] shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-stone-700 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables footer */}
                <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <FileCheck className="w-4 h-4 text-[#1D3C34]" />
                    <span className="font-bold text-stone-900">Milestone Output:</span>
                    <span className="text-stone-700 font-medium">{activePillar.deliverables}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'Private Label Manufacturing',
                        targetProduct: activePillar.title,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D3C34] hover:text-[#708E50] transition-colors cursor-pointer group"
                  >
                    <span>Discuss Phase Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Technical Specs Box (5 Cols) */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-6">
                <div className="space-y-1">
                  <h5 className="font-serif font-bold text-lg text-stone-900">
                    Phase Specifications
                  </h5>
                  <p className="text-xs text-stone-500">
                    Guaranteed manufacturing parameters for this development milestone:
                  </p>
                </div>

                <div className="divide-y divide-stone-100">
                  {activePillar.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="py-3 flex items-center justify-between text-xs">
                      <span className="text-stone-500 font-medium">{spec.label}</span>
                      <span className="text-stone-900 font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Turnkey Assurance Box */}
                <div className="bg-[#E4EEE3]/60 rounded-xl p-4 border border-[#C5DAC3] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#1D3C34] font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#708E50]" />
                    <span>The BioGlobal Quality Guarantee</span>
                  </div>
                  <p className="text-[11px] text-[#1D3C34]/85 leading-relaxed font-normal">
                    Every formulation is manufactured in accordance with ISO 22716 Good Manufacturing Practices, complete with batch traceability and stability validation.
                  </p>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'Private Label Manufacturing',
                    })
                  }
                  className="w-full py-3 rounded-xl bg-[#1D3C34] hover:bg-[#142B25] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Request Private Label Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#DFBD89]" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

