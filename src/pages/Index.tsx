import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { OpeningAnimation } from "@/components/wedding/OpeningAnimation";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { LoveStory } from "@/components/wedding/LoveStory";
import { Gallery } from "@/components/wedding/Gallery";
import { Events } from "@/components/wedding/Events";
import { Venue } from "@/components/wedding/Venue";
import { Family } from "@/components/wedding/Family";
import { RSVP } from "@/components/wedding/RSVP";
import { Closing } from "@/components/wedding/Closing";
import { MusicButton } from "@/components/wedding/MusicButton";
import { WhatsAppButton } from "@/components/wedding/WhatsAppButton";

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <main className="bg-background overflow-x-hidden">
      <AnimatePresence>
        {!opened && <OpeningAnimation onComplete={() => setOpened(true)} />}
      </AnimatePresence>

      <Hero />
      <Countdown />
      <LoveStory />
      <Gallery />
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
