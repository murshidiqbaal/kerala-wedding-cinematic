import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { 
  ArrowLeft, Camera, Sparkles, ExternalLink, Copy, Share2, 
  CheckCircle2, FolderHeart, Calendar, Heart
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEFAULT_ALBUMS } from "@/lib/gdrive";
import { AmbientBackground } from "@/components/wedding/AmbientBackground";

export const LivePhotos = () => {
  // Retrieve synced folders from local storage (set by photographer/admin)
  const [folders] = useState<any[]>(() => {
    const saved = localStorage.getItem("gdrive_synced_folders");
    return saved ? JSON.parse(saved) : [];
  });

  // Map the 6 categories with either dynamic synced links or pre-configured fallbacks
  const albums = DEFAULT_ALBUMS.map((defaultAlbum) => {
    const matchedFolder = folders.find(
      (f) => f.name.toLowerCase() === defaultAlbum.title.toLowerCase()
    );
    return {
      title: defaultAlbum.title,
      subtitle: defaultAlbum.subtitle,
      image: defaultAlbum.image,
      link: matchedFolder ? matchedFolder.shareLink : defaultAlbum.link,
      isSynced: !!matchedFolder
    };
  });

  const handleCopyLink = (link: string, title: string) => {
    navigator.clipboard.writeText(link);
    toast.success(`Google Drive link for "${title}" copied!`);
  };

  const handleShareWhatsApp = (link: string, title: string) => {
    const text = encodeURIComponent(
      `Relive our wedding memories! Check out the live photos for *${title}* here: ${link} 🤍`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <main className="bg-background min-h-screen overflow-x-hidden relative text-foreground py-16 px-4 md:px-8">
      {/* Premium ambient backdrop */}
      <AmbientBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Floating home return link */}
        <div className="mb-12">
          <Link to="/">
            <motion.button
              whileHover={{ x: -4 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/50 dark:bg-stone-900/70 dark:border-stone-850 hover:bg-white text-stone-700 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider luxury-shadow transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-luxury-gold" />
              <span>Back to Invitation</span>
            </motion.button>
          </Link>
        </div>

        {/* Ethereal Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold mb-2"
          >
            <Camera className="h-5 w-5 animate-pulse" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif tracking-wide text-foreground leading-tight"
          >
            Live Photo Streams
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-1.5 text-luxury-gold text-xs font-serif italic"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Relive Every Ethereal Moment Live</span>
            <Sparkles className="h-3.5 w-3.5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-stone-500 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed"
          >
            Our photographer is streaming captured high-resolution pictures directly into corresponding folders on Google Drive. 
            Tap **"Open Album"** to view and download, or scan the QR Code on your mobile device to view them instantly!
          </motion.p>
        </div>

        {/* Sync Indicator Info Card */}
        {folders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12 max-w-xl mx-auto rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 p-4 text-center flex items-center justify-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
          >
            <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
            <span>Photographer Live Sync Active! Albums are updated in real-time.</span>
          </motion.div>
        )}

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/50 dark:border-stone-850 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-luxury-gold/30 transition-all duration-500 group relative"
            >
              {/* Image Cover */}
              <div className="h-44 w-full overflow-hidden relative">
                <img 
                  src={album.image} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-stone-900 via-white/20 dark:via-stone-900/20 to-transparent" />
                
                {/* Synced Badge */}
                {album.isSynced && (
                  <span className="absolute top-4 right-4 bg-emerald-500/90 text-white font-sans text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm border border-emerald-400/20 font-bold">
                    Live Synced
                  </span>
                )}

                <div className="absolute bottom-4 left-5">
                  <span className="text-[10px] text-luxury-gold font-bold uppercase tracking-widest font-sans">
                    Wedding Album
                  </span>
                  <h3 className="text-xl font-serif text-foreground font-semibold mt-0.5">{album.title}</h3>
                </div>
              </div>

              {/* Album Details & Action Grid */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                
                {/* Subtitle description */}
                <p className="text-stone-500 text-xs leading-relaxed min-h-[36px]">
                  {album.subtitle}
                </p>

                {/* QR Code Block */}
                <div className="flex items-center gap-4 bg-stone-50/50 dark:bg-stone-950/20 border border-stone-100 dark:border-stone-900 p-3.5 rounded-xl justify-between select-none">
                  <div className="p-2 bg-white rounded-lg inline-flex shadow-sm border border-stone-200">
                    <QRCode
                      id={`public-qr-${index}`}
                      size={80}
                      value={album.link}
                      level="M"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <div className="text-[10px] text-stone-400 font-sans leading-relaxed max-w-[170px] text-right space-y-1">
                    <p className="text-stone-600 dark:text-stone-300 font-medium font-serif italic">Scan to relives</p>
                    <p>Point your smartphone camera to view this folder directly.</p>
                  </div>
                </div>

                {/* Interactive button drawer */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-900/60 flex items-center justify-between gap-3">
                  <a
                    href={album.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs text-white bg-gradient-to-r from-luxury-gold to-amber-600 hover:from-amber-600 hover:to-amber-800 py-3 rounded-xl font-semibold tracking-wide shadow-md shadow-luxury-gold/15 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5"
                  >
                    <span>Open Album</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                  
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyLink(album.link, album.title)}
                      className="border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-xl h-10 w-10 shrink-0 text-stone-500 hover:text-luxury-gold"
                      title="Copy Album Link"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleShareWhatsApp(album.link, album.title)}
                      className="border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-900 rounded-xl h-10 w-10 shrink-0 text-stone-500 hover:text-emerald-500"
                      title="Share via WhatsApp"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Accent */}
        <div className="mt-20 text-center flex flex-col items-center justify-center space-y-3">
          <Heart className="h-4 w-4 text-luxury-gold animate-beat fill-luxury-gold" />
          <p className="text-stone-400 font-serif italic text-xs">
            "Reliving magical moments, frame by frame, together."
          </p>
        </div>

      </div>
    </main>
  );
};

export default LivePhotos;
