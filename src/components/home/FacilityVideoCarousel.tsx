import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  Link as LinkIcon,
  CheckCircle2
} from 'lucide-react';

export interface VideoSlide {
  id: string;
  title: string;
  subtitle?: string;
  poster: string;
  videoUrl?: string; // MP4, WebM, YouTube, or Vimeo URL
}

const DEFAULT_SLIDES: VideoSlide[] = [
  {
    id: 'formulation',
    title: 'Product Formulation & Innovation',
    subtitle: 'Advanced cosmetic formulation, texture development, and raw ingredient stability testing.',
    poster: '/images/bioglobal/video/poster-formulation-innovation.jpg',
    videoUrl: '', // Pending client delivery
  },
  {
    id: 'manufacturing',
    title: 'Our Manufacturing Process',
    subtitle: 'Cleanroom batch compounding, temperature-controlled stainless steel kettles, and automated production.',
    poster: '/images/bioglobal/video/poster-manufacturing-process.jpg',
    videoUrl: '', // Pending client delivery
  },
  {
    id: 'packaging',
    title: 'Packaging & Quality Assurance',
    subtitle: 'High-speed conveyor packaging lines, torque-controlled capping, and strict multi-point QA inspection.',
    poster: '/images/bioglobal/video/poster-packaging-quality.jpg',
    videoUrl: '', // Pending client delivery
  },
];

export const FacilityVideoCarousel: React.FC = () => {
  // Start with "Our Manufacturing Process" in center (index 1) as requested
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slides, setSlides] = useState<VideoSlide[]>(DEFAULT_SLIDES);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentSlide = slides[activeIndex];

  // Pause and reset playback state whenever active slide changes
  const changeSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setIsPlaying(false);
    setVideoError(false);
    setShowUrlInput(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveIndex(newIndex);
  };

  const handlePrev = () => {
    const nextIndex = (activeIndex - 1 + slides.length) % slides.length;
    changeSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    changeSlide(nextIndex);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Determine indices for 3-card desktop layout
  const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  const nextIndex = (activeIndex + 1) % slides.length;

  const prevSlide = slides[prevIndex];
  const nextSlide = slides[nextIndex];

  // Helper resolvers for YouTube / Vimeo embeds
  const isYouTube = (url: string) =>
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i.test(url);
  const getYouTubeEmbed = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    );
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : url;
  };

  const isVimeo = (url: string) => /vimeo\.com\/(?:video\/)?([0-9]+)/i.test(url);
  const getVimeoEmbed = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : url;
  };

  // Handle play action on active center card
  const handlePlayClick = () => {
    if (!currentSlide.videoUrl) {
      setShowUrlInput(true);
      return;
    }
    setIsPlaying(true);
    setVideoError(false);
  };

  // Allow setting or testing a video URL for current slide
  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setSlides((prev) =>
      prev.map((s, idx) => (idx === activeIndex ? { ...s, videoUrl: inputUrl.trim() } : s))
    );
    setShowUrlInput(false);
    setIsPlaying(true);
    setInputUrl('');
  };

  // Sample stream for client preview testing
  const handleLoadDemoVideo = () => {
    const demoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    setSlides((prev) =>
      prev.map((s, idx) => (idx === activeIndex ? { ...s, videoUrl: demoUrl } : s))
    );
    setShowUrlInput(false);
    setIsPlaying(true);
  };

  return (
    <section
      id="facility-video"
      aria-label="Inside Our Manufacturing Facility Video Showcase"
      onKeyDown={handleKeyDown}
      className="relative py-14 sm:py-20 lg:py-24 bg-[#10382A] text-white overflow-hidden select-none"
    >
      {/* Background Ambience: Subtle Soft Olive Glow behind center stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-[#657C44]/25 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#EBC679]/10 rounded-full blur-[90px] pointer-events-none -z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: Centered ivory serif with gold underline  */}
        {/* ======================================================== */}
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          <h2 className="font-serif font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FAF2E1] tracking-tight">
            Inside Our Manufacturing Facility
          </h2>
          {/* Short champagne-gold underline */}
          <div className="w-16 sm:w-20 h-0.5 bg-[#EBC679] mx-auto rounded-full" />
        </div>

        {/* ======================================================== */}
        {/* 3-CARD CAROUSEL ROW WITH EXTERNAL CIRCULAR ARROWS        */}
        {/* ======================================================== */}
        <div 
          className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous video slide"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#EBC679]/70 text-[#EBC679] hover:bg-[#EBC679]/20 hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EBC679] z-20 cursor-pointer shadow-lg bg-[#10382A]/60 backdrop-blur-xs"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Horizontal Layout Container */}
          <div className="flex-1 flex items-center justify-center gap-3 sm:gap-5 md:gap-8 max-w-6xl mx-auto overflow-hidden sm:overflow-visible">
            
            {/* ---------------------------------------------------- */}
            {/* 1. LEFT CARD (~60% width, vertically centered)      */}
            {/* ---------------------------------------------------- */}
            <div 
              onClick={() => changeSlide(prevIndex)}
              className="hidden md:flex flex-col items-center w-[28%] max-w-[280px] shrink-0 opacity-65 hover:opacity-90 transition-all duration-300 cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={`View ${prevSlide.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter') changeSlide(prevIndex); }}
            >
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-black/60">
                <img
                  src={prevSlide.poster}
                  alt={prevSlide.title}
                  className="w-full h-full object-cover brightness-85 group-hover:brightness-100 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#08291E]/30 group-hover:bg-transparent transition-colors" />
                
                {/* Small Play Button on side card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/60 text-white flex items-center justify-center backdrop-blur-xs shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & subtle underline beneath left card */}
              <div className="text-center mt-3 w-full">
                <p className="text-xs sm:text-sm font-light text-[#FAF2E1]/80 truncate tracking-wide">
                  {prevSlide.title}
                </p>
                <div className="w-6 h-0.5 bg-[#EBC679]/60 mx-auto mt-1 rounded-full" />
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* 2. CENTER ACTIVE CARD (Largest, 100% scale, 16:9)     */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col items-center w-full md:w-[54%] max-w-[620px] shrink-0 z-10">
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#EBC679] shadow-2xl bg-black/90">
                
                {!isPlaying ? (
                  /* Thumbnail View with Prominent Circular Gold Play Button */
                  <div 
                    onClick={handlePlayClick}
                    className="relative w-full h-full cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Play ${currentSlide.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlayClick(); }}
                  >
                    <img
                      src={currentSlide.poster}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08291E]/80 via-transparent to-black/20" />

                    {/* Prominent Circular Gold Play Button in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        {/* Soft Outer Ping Glow */}
                        <span className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EBC679]/30 animate-ping pointer-events-none" />

                        {/* Gold Button Disc */}
                        <button
                          type="button"
                          aria-label={`Play ${currentSlide.title}`}
                          className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#FFE3A0] via-[#EBC679] to-[#D5A343] text-[#08291E] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/70 focus:outline-none focus:ring-4 focus:ring-[#EBC679]/60 cursor-pointer"
                        >
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Video Duration / Controls Simulation Bar as seen in Mockup */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#FAF2E1]/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md pointer-events-none">
                      <div className="flex items-center gap-2">
                        <Play className="w-3 h-3 fill-current" />
                        <span>0:00 / 3:24</span>
                      </div>
                      <div className="flex-1 mx-3 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-[#EBC679]" />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>HD</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Active Inline Video Player */
                  <div className="w-full h-full relative bg-black flex items-center justify-center">
                    {currentSlide.videoUrl && isYouTube(currentSlide.videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbed(currentSlide.videoUrl)}
                        title={currentSlide.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : currentSlide.videoUrl && isVimeo(currentSlide.videoUrl) ? (
                      <iframe
                        src={getVimeoEmbed(currentSlide.videoUrl)}
                        title={currentSlide.title}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={currentSlide.videoUrl}
                        controls
                        playsInline
                        autoPlay
                        poster={currentSlide.poster}
                        onError={() => setVideoError(true)}
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support HTML5 video playback.
                      </video>
                    )}

                    {/* Fallback if error occurs */}
                    {videoError && (
                      <div className="absolute inset-0 bg-[#08291E]/95 flex flex-col items-center justify-center p-4 text-center space-y-2">
                        <AlertCircle className="w-8 h-8 text-[#EBC679]" />
                        <p className="text-xs sm:text-sm font-semibold text-[#FAF2E1]">
                          Unable to stream footage
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPlaying(false);
                            setShowUrlInput(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#EBC679] text-[#08291E] text-xs font-bold hover:bg-[#FFE3A0]"
                        >
                          Provide Custom Video URL
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Title & Short Gold Underline beneath Center Active Card */}
              <div className="text-center mt-3.5 w-full">
                <h3 className="font-serif text-sm sm:text-base md:text-lg text-[#FAF2E1] tracking-wide font-normal">
                  {currentSlide.title}
                </h3>
                <div className="w-8 h-0.5 bg-[#EBC679] mx-auto mt-1 rounded-full" />
              </div>

              {/* Informative Missing Source Modal / In-Card Form */}
              {showUrlInput && (
                <div className="mt-4 w-full p-4 rounded-xl bg-[#08291E] border border-[#EBC679]/40 text-left shadow-2xl animate-in fade-in space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-[#EBC679] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#FAF2E1]">
                        Official footage for &ldquo;{currentSlide.title}&rdquo; is pending client upload.
                      </p>
                      <p className="text-[11px] text-[#FAF2E1]/75 mt-0.5">
                        You can paste your YouTube, Vimeo, or direct MP4 link below to test immediate inline playback.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveUrl} className="flex gap-2">
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=... or /facility-tour.mp4"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-[#EBC679]/40 text-xs text-[#FAF2E1] focus:outline-none focus:ring-1 focus:ring-[#EBC679]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FFE3A0] to-[#D5A343] text-[#08291E] text-xs font-bold hover:opacity-95 shrink-0 cursor-pointer"
                    >
                      Save & Play
                    </button>
                  </form>

                  <div className="flex items-center justify-between pt-1 border-t border-[#EBC679]/20 text-[11px]">
                    <button
                      type="button"
                      onClick={handleLoadDemoVideo}
                      className="text-[#EBC679] hover:underline font-medium cursor-pointer"
                    >
                      ▶ Preview Sample Video Stream
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(false)}
                      className="text-[#FAF2E1]/60 hover:text-white cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------- */}
            {/* 3. RIGHT CARD (~60% width, vertically centered)     */}
            {/* ---------------------------------------------------- */}
            <div 
              onClick={() => changeSlide(nextIndex)}
              className="hidden md:flex flex-col items-center w-[28%] max-w-[280px] shrink-0 opacity-65 hover:opacity-90 transition-all duration-300 cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={`View ${nextSlide.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter') changeSlide(nextIndex); }}
            >
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-black/60">
                <img
                  src={nextSlide.poster}
                  alt={nextSlide.title}
                  className="w-full h-full object-cover brightness-85 group-hover:brightness-100 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#08291E]/30 group-hover:bg-transparent transition-colors" />

                {/* Small Play Button on side card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/60 text-white flex items-center justify-center backdrop-blur-xs shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Title & subtle underline beneath right card */}
              <div className="text-center mt-3 w-full">
                <p className="text-xs sm:text-sm font-light text-[#FAF2E1]/80 truncate tracking-wide">
                  {nextSlide.title}
                </p>
                <div className="w-6 h-0.5 bg-[#EBC679]/60 mx-auto mt-1 rounded-full" />
              </div>
            </div>

          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next video slide"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#EBC679]/70 text-[#EBC679] hover:bg-[#EBC679]/20 hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EBC679] z-20 cursor-pointer shadow-lg bg-[#10382A]/60 backdrop-blur-xs"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* PAGINATION DOTS (Active dot highlighted in Gold)          */}
        {/* ======================================================== */}
        <div className="flex items-center justify-center gap-3 mt-7 sm:mt-9">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => changeSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#EBC679] ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-[#EBC679] shadow-sm scale-110'
                    : 'w-2.5 h-2.5 bg-[#FAF2E1]/40 hover:bg-[#FAF2E1]/70'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
