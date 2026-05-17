import { AmbientBackground } from "@/components/wedding/AmbientBackground";
import { Closing } from "@/components/wedding/Closing";
import { Countdown } from "@/components/wedding/Countdown";
import { Events } from "@/components/wedding/Events";
import { Family } from "@/components/wedding/Family";
import { Gallery } from "@/components/wedding/Gallery";
import { Hero } from "@/components/wedding/Hero";
import { LoveStory } from "@/components/wedding/LoveStory";
import { MusicButton } from "@/components/wedding/MusicButton";
import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { Signature } from "@/components/wedding/Signature";
import { Venue } from "@/components/wedding/Venue";
import { VideoSection } from "@/components/wedding/VideoSection";
import { WhatsAppButton } from "@/components/wedding/WhatsAppButton";
import { AdminModal } from "@/components/wedding/AdminModal";
import { AdminDashboard } from "@/components/wedding/AdminDashboard";
import { LiveMemoriesSection } from "@/components/wedding/LiveMemoriesSection";
import { FloatingLiveButton } from "@/components/wedding/FloatingLiveButton";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [opened, setOpened] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [gdriveToken, setGdriveToken] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Set up standard keyboard shortcut listener (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        
        // Double check if token is already present and still valid in local storage
        const savedToken = localStorage.getItem("gdrive_access_token");
        const expiry = localStorage.getItem("gdrive_token_expiry");
        const isExpired = expiry ? Date.now() > parseInt(expiry, 10) : true;

        if (savedToken && !isExpired) {
          setGdriveToken(savedToken);
          setShowDashboard(true);
          toast.success("Active Google session restored! Welcome to Dashboard.");
        } else {
          setIsAdminModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLoginSuccess = (token: string) => {
    setGdriveToken(token);
    setIsAdminModalOpen(false);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setShowDashboard(false);
    localStorage.removeItem("gdrive_access_token");
    localStorage.removeItem("gdrive_token_expiry");
    toast.success("Dashboard closed successfully.");
  };

  return (
    <main className="bg-background overflow-x-hidden relative">
      <AmbientBackground />
      <AnimatePresence>
        {!opened && <OpeningAnimation onComplete={() => setOpened(true)} />}
      </AnimatePresence>

      <Hero />
      <Countdown />
      <LoveStory />
      <Signature />
      <Gallery />
      
      {/* ── LIVE MEMORIES PUBLIC SECTION ── */}
      <LiveMemoriesSection />

      <VideoSection />
      <Events />
      <Venue />
      <Family />
      {/* <RSVP /> */}
      <Closing />

      <MusicButton />
      <WhatsAppButton />
      
      {/* ── LIVE GUEST FLOAT SCROLLER ── */}
      <FloatingLiveButton />

      {/* ── ADMIN OVERLAYS ── */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AnimatePresence>
        {showDashboard && (
          <AdminDashboard 
            token={gdriveToken} 
            onLogout={handleLogout} 
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
