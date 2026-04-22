import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import gallery1b from "@/assets/couple-hero.jpg";

export const wedding = {
  bride: "Aishwarya",
  groom: "Arjun",
  date: "2026-02-14T10:30:00",
  dateLabel: "14th February 2026",
  tagline: "Two souls, one sacred journey",
  whatsappNumber: "919999999999",
  story: [
    { year: "2021", title: "First Meet", text: "A chance meeting at a temple festival in Kochi.", image: story1 },
    { year: "2023", title: "The Proposal", text: "Under the fairy lights of a Munnar tea garden.", image: story2 },
    { year: "2025", title: "Engagement", text: "Blessed by elders, hearts united with rings.", image: story3 },
    { year: "2026", title: "Wedding", text: "The sacred union before the holy fire.", image: gallery1 },
  ],
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery1b],
  events: [
    { name: "Engagement", date: "10 Feb 2026", time: "6:00 PM", location: "Hotel Taj, Kochi" },
    { name: "Mehendi", date: "12 Feb 2026", time: "4:00 PM", location: "Family Residence, Trivandrum" },
    { name: "Sangeet", date: "13 Feb 2026", time: "7:00 PM", location: "Le Meridien, Kochi" },
    { name: "Wedding Ceremony", date: "14 Feb 2026", time: "10:30 AM", location: "Guruvayur Temple Hall" },
    { name: "Reception", date: "14 Feb 2026", time: "7:00 PM", location: "Grand Hyatt, Kochi" },
  ],
  venue: {
    name: "Guruvayur Temple Hall",
    address: "East Nada, Guruvayur, Thrissur, Kerala 680101",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0!2d76.0411!3d10.5946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM1JzQwLjYiTiA3NsKwMDInMjguMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
    directions: "https://maps.google.com/?q=Guruvayur+Temple",
  },
  family: {
    bride: {
      title: "Daughter of",
      parents: "Mr. Ramachandran Nair & Mrs. Lakshmi Nair",
      place: "Trivandrum, Kerala",
    },
    groom: {
      title: "Son of",
      parents: "Mr. Krishnan Menon & Mrs. Parvathy Menon",
      place: "Kochi, Kerala",
    },
  },
};
