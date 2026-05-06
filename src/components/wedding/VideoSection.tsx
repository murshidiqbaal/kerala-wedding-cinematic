import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import coupleImg from "@/assets/optimized/couple-hero.webp";

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen bg-background overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          poster={coupleImg}
          className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'grayscale-0 filter-none scale-100' : 'grayscale-[40%] brightness-50 scale-105'}`}
        >
          {/* Replace with actual wedding video MP4 */}
          {/* <source src="/path/to/your/wedding-video.mp4" type="video/mp4" /> */}
        </video>
        
        {/* Cinematic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-black/40 to-background transition-opacity duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      {/* Content Overlay */}
      <div className={`relative z-10 text-center px-6 transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.5em] text-luxury-gold/80 mb-6">
            The Film
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-white mb-12 drop-shadow-xl">
            Watch Our Story
          </h2>

          <button
            onClick={togglePlay}
            className="group relative flex items-center justify-center w-24 h-24 rounded-full border border-white/30 bg-black/20 backdrop-blur-md transition-all duration-500 hover:bg-luxury-gold hover:border-luxury-gold hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white ml-1 group-hover:scale-90 transition-transform" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 text-white ml-2 group-hover:scale-90 transition-transform" fill="currentColor" />
            )}
            
            {/* Ripple Effect */}
            {!isPlaying && (
              <>
                <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-0 rounded-full border border-white/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
