import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { FolderHeart, Sparkles, ExternalLink, Share2, Copy, Check, MessageSquareCode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEFAULT_ALBUMS } from "@/lib/gdrive";

export const LiveMemoriesSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Realtime folder links loaded dynamically from local persistence
  const [albums, setAlbums] = useState(DEFAULT_ALBUMS);

  useEffect(() => {
    // Check if real google drive links are synced in localStorage
    const updatedAlbums = DEFAULT_ALBUMS.map((album) => {
      const syncedLink = localStorage.getItem(`gdrive_link_${album.title.replace(/\s+/g, "")}`);
      if (syncedLink) {
        return {
          ...album,
          link: syncedLink,
        };
      }
      return album;
    });
    setAlbums(updatedAlbums);

    // Event listener to check for update events from Admin dashboard within the same tab
    const handleStorageChange = () => {
      const currentAlbums = DEFAULT_ALBUMS.map((album) => {
        const syncedLink = localStorage.getItem(`gdrive_link_${album.title.replace(/\s+/g, "")}`);
        if (syncedLink) {
          return {
            ...album,
            link: syncedLink,
          };
        }
        return album;
      });
      setAlbums(currentAlbums);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleCopyLink = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    toast.success("Album link copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShareWhatsApp = (link: string, title: string) => {
    const text = encodeURIComponent(
      `Check out the live wedding album for Rohith & Anjana: *${title}*! Scan or click here to view and download all premium photos: ${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section id="memories" className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 px-4">
      
      {/* Decorative Floral / Ambient Glow Backgrounds */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-12 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping duration-1000" />
        <div className="absolute bottom-12 right-1/3 w-1 h-1 bg-amber-200 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title Container */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/5 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Instant Live Access</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl text-amber-100 tracking-wide font-serif"
          >
            Live Wedding Memories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          >
            Our photographer is uploading premium cinematic frames live! Scan the QR codes on your mobile phone or click to view and download full-resolution wedding photographs instantly.
          </motion.p>
        </div>

        {/* 6 Category Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-stone-850 hover:border-amber-500/30 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              {/* Gold dynamic edge glows */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/0 group-hover:via-amber-500/40 to-transparent transition-all duration-500" />
              
              <div>
                {/* Visual Category Banner image */}
                <div className="h-44 w-full relative overflow-hidden bg-stone-900">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-stone-800 text-amber-400 shadow-md">
                    <FolderHeart className="h-4 w-4" />
                  </div>

                  <div className="absolute bottom-4 left-5">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Live Album</span>
                    <h3 className="text-xl font-serif text-amber-100 font-medium tracking-wide mt-0.5">{album.title}</h3>
                  </div>
                </div>

                {/* Subtitle / Instructions */}
                <div className="px-6 pt-5 pb-2 text-stone-400 text-xs leading-relaxed">
                  {album.subtitle}
                </div>
              </div>

              {/* QR Access block and Actions */}
              <div className="p-6 pt-2 space-y-5">
                
                {/* Guest QR Code Generator panel */}
                <div className="rounded-xl bg-[#090C0E]/90 border border-stone-900 p-4 flex items-center gap-4.5">
                  <div className="p-2 bg-white rounded-lg inline-flex shadow-[0_4px_10px_rgba(0,0,0,0.3)] shrink-0 select-none">
                    <QRCode
                      size={64}
                      value={album.link}
                      level="M"
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80 flex items-center gap-1">
                      <MessageSquareCode className="h-3.5 w-3.5 text-amber-500/80" /> Scan QR code
                    </h4>
                    <p className="text-[10px] text-stone-500 leading-normal">
                      Scan this barcode with your phone camera for instant instant access.
                    </p>
                  </div>
                </div>

                {/* Navigation and Sharing actions */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={album.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold tracking-wide h-10 rounded-lg shadow-md transition-all cursor-pointer border-0"
                  >
                    <span>View Album</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  {/* Share buttons */}
                  <Button
                    onClick={() => handleCopyLink(album.link, index)}
                    size="sm"
                    variant="outline"
                    className="border-stone-850 hover:bg-stone-900 text-stone-400 h-10 w-10 p-0 shrink-0"
                  >
                    {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>

                  <Button
                    onClick={() => handleShareWhatsApp(album.link, album.title)}
                    size="sm"
                    variant="outline"
                    className="border-stone-850 hover:bg-emerald-950/20 hover:text-emerald-400 text-stone-400 h-10 w-10 p-0 shrink-0"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Host Note */}
        <div className="mt-20 text-center relative max-w-lg mx-auto">
          <div className="border border-stone-850/60 rounded-xl bg-black/25 p-5 text-[11px] text-stone-500 leading-relaxed italic">
            "Photos are stored directly on our wedding Google Drive account storage and synchronized globally. No login or installation required. Keep this tab open to check back as additional cinematic albums fill up live!"
          </div>
        </div>

      </div>
    </section>
  );
};
