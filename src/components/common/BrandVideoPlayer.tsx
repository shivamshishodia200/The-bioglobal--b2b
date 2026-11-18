import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, AlertCircle } from 'lucide-react';
import facilityImg from '../../assets/capabilities/cosmetic_manufacturing_facility.jpg';

interface BrandVideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const BrandVideoPlayer: React.FC<BrandVideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title = 'Inside Our GMP-Certified Manufacturing Facility',
  subtitle = 'Experience our sterile cleanroom batch compounding, automated filling lines, and rigorous analytical quality control.',
  badge = 'VIRTUAL FACILITY TOUR',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [customUrl, setCustomUrl] = useState(videoUrl || '');
  const [showInput, setShowInput] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if URL is YouTube or Vimeo
  const isYouTube = (url: string) => /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i.test(url);
  const getYouTubeEmbed = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : url;
  };

  const isVimeo = (url: string) => /vimeo\.com\/(?:video\/)?([0-9]+)/i.test(url);
  const getVimeoEmbed = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
    return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1` : url;
  };

  // High-reliability sample video stream for cosmetics / laboratory demonstration if no user video URL is set
  const activeVideoUrl = customUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const posterImage = thumbnailUrl || facilityImg;

  const handleStartPlayback = () => {
    setIsPlaying(true);
    setVideoError(false);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Outer Card with Client-Approved Palette: Forest Green + Gold Border + Warm Ivory */}
      <div className="bg-[#08291E] border border-[#EBC679]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#657C44]/25 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EBC679]/15 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Header Information */}
        <div className="relative z-10 mb-4 sm:mb-6 text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10382A] border border-[#EBC679]/40 text-[#EBC679] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#EBC679]" />
            <span>{badge}</span>
          </div>
          <h3 className="font-serif font-light text-2xl sm:text-3xl text-[#FAF2E1] tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF2E1]/80 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 16:9 Video Player Container */}
        <div className="relative z-10 w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/90 border border-[#EBC679]/35 shadow-xl">
          {!isPlaying ? (
            /* Video Thumbnail Preview with Centered Luxury Play Button */
            <div className="relative w-full h-full group cursor-pointer" onClick={handleStartPlayback}>
              <img
                src={posterImage}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08291E]/90 via-[#08291E]/40 to-transparent transition-opacity group-hover:opacity-75" />

              {/* Pulsing Animated Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Halo */}
                  <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EBC679]/30 animate-ping pointer-events-none" />
                  
                  {/* Play Button Disc */}
                  <button
                    type="button"
                    aria-label="Play facility video"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#FFE3A0] to-[#D5A343] text-[#08291E] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/60 focus:outline-none focus:ring-4 focus:ring-[#EBC679]/50 cursor-pointer"
                  >
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
                  </button>
                </div>

                <div className="mt-4 px-4 py-1.5 rounded-full bg-[#08291E]/80 backdrop-blur-md border border-[#EBC679]/50 text-[#FAF2E1] text-xs sm:text-sm font-semibold tracking-wide shadow-md group-hover:bg-[#08291E] transition-colors">
                  Click to Watch Video
                </div>
              </div>
            </div>
          ) : (
            /* Inline Video Playback */
            <div className="w-full h-full relative bg-black">
              {isYouTube(activeVideoUrl) ? (
                <iframe
                  src={getYouTubeEmbed(activeVideoUrl)}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : isVimeo(activeVideoUrl) ? (
                <iframe
                  src={getVimeoEmbed(activeVideoUrl)}
                  title={title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  src={activeVideoUrl}
                  controls
                  playsInline
                  autoPlay
                  poster={posterImage}
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              )}

              {/* Error Fallback */}
              {videoError && (
                <div className="absolute inset-0 bg-[#08291E]/95 flex flex-col items-center justify-center p-6 text-center text-[#FAF2E1] space-y-3">
                  <AlertCircle className="w-10 h-10 text-[#EBC679]" />
                  <p className="text-sm font-semibold">Video could not be loaded</p>
                  <p className="text-xs text-[#FAF2E1]/70 max-w-md">
                    Please provide a valid MP4 file or YouTube/Vimeo embed URL to play your video inline.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setShowInput(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#EBC679] text-[#08291E] text-xs font-bold hover:bg-[#FFE3A0] transition-colors cursor-pointer"
                  >
                    Change Video Source URL
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video Source Switcher for Testing & Custom URLs */}
        <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FAF2E1]/70 pt-2 border-t border-[#EBC679]/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EBC679]" />
            <span>Responsive 16:9 Player • Inline Controls • Fullscreen Enabled</span>
          </div>

          <button
            type="button"
            onClick={() => setShowInput(!showInput)}
            className="text-[#EBC679] hover:underline font-medium cursor-pointer"
          >
            {showInput ? 'Hide Video Source Setting' : 'Set / Change Video URL'}
          </button>
        </div>

        {showInput && (
          <div className="relative z-10 mt-3 p-3.5 rounded-xl bg-[#10382A]/90 border border-[#EBC679]/30 space-y-2">
            <label className="text-xs font-semibold text-[#FAF2E1] block">
              Video URL (Direct MP4, YouTube, or Vimeo):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or /videos/facility-tour.mp4"
                className="flex-grow px-3 py-2 rounded-lg bg-[#08291E] border border-[#EBC679]/40 text-[#FAF2E1] text-xs focus:outline-none focus:ring-2 focus:ring-[#EBC679]"
              />
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(true);
                  setVideoError(false);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFE3A0] to-[#D5A343] text-[#08291E] text-xs font-bold hover:opacity-95 cursor-pointer shrink-0"
              >
                Apply & Play
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
