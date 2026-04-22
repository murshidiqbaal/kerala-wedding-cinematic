import gallery1b from "@/assets/couple-hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import story1 from "@/assets/story-1.jpg";
import story3 from "@/assets/story-3.jpg";

export const wedding = {
  bride: "Anjana",
  groom: "Rohith",
  date: "2026-07-07T11:00:00",
  dateLabel: "7th Jun 2026",
  tagline: "Two souls, one sacred journey",
  whatsappNumber: "919999999999",
  story: [
    { year: "2025", title: "First Meet", text: "A chance meeting at a temple festival.", image: story1 },
    // { year: "2023", title: "The Proposal", text: "Under the fairy lights of a Munnar tea garden.", image: story2 },
    { year: "2025", title: "Engagement", text: "Blessed by elders, hearts united with rings.", image: story3 },
    { year: "2026", title: "Wedding", text: "The sacred union before the holy fire.", image: gallery1 },
  ],
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery1b],
  events: [
    // { name: "Engagement", date: "10 Feb 2026", time: "6:00 PM", location: "Hotel Taj, Kochi" },
    // { name: "Mehendi", date: "12 Feb 2026", time: "4:00 PM", location: "Family Residence, Trivandrum" },
    // { name: "Sangeet", date: "13 Feb 2026", time: "7:00 PM", location: "Le Meridien, Kochi" },
    {
      name: "Wedding Ceremony",
      date: "7 Jun 2026",
      time: "11:00 AM",
      location: "Puzhakkarakkavu Temple, Muvattupuzha",
      mapLink: "https://maps.google.com/?q=Puzhakkarakkavu+Temple+Muvattupuzha"
    },
    {
      name: "Reception",
      date: "7 Jun 2026",
      time: "6:00 PM",
      location: "St. Sebastian's Church, Neyyassery",
      mapLink: "https://maps.app.goo.gl/c6Y95PUNyqLzwtSA7"
    },
  ],
  venue: {
    name: "St. Sebastian's Church, Neyyassery",
    address: "Neyyassery, Kerala 685581",
    mapEmbed: "https://www.google.com/maps?q=St.+Sebastian's+Church,+Neyyassery&output=embed",
    directions: "https://maps.app.goo.gl/c6Y95PUNyqLzwtSA7",
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
