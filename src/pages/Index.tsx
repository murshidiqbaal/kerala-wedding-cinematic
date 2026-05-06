import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { AmbientBackground } from "@/components/wedding/AmbientBackground";
import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { LoveStory } from "@/components/wedding/LoveStory";
import { Signature } from "@/components/wedding/Signature";
import { Gallery } from "@/components/wedding/Gallery";
import { VideoSection } from "@/components/wedding/VideoSection";
import { Events } from "@/components/wedding/Events";
import { Venue } from "@/components/wedding/Venue";
import { Family } from "@/components/wedding/Family";
import { RSVP } from "@/components/wedding/RSVP";
import { Closing } from "@/components/wedding/Closing";
import { MusicButton } from "@/components/wedding/MusicButton";
import { WhatsAppButton } from "@/components/wedding/WhatsAppButton";

const Index = () => {
  const [opened, setOpened] = useState(false);

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
      <VideoSection />
      <Events />
      <Venue />
      <Family />
      <RSVP />
      <Closing />

      <MusicButton />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
