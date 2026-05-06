import gallery1b from "@/assets/optimized/couple-hero.webp";
import gallery1 from "@/assets/optimized/gallery-1.webp";
import wa1 from "@/assets/optimized/WhatsApp Image 2026-04-22 at 12.53.49 PM.webp";
import wa2 from "@/assets/optimized/WhatsApp Image 2026-04-22 at 12.53.50 PM (1).webp";
import wa3 from "@/assets/optimized/WhatsApp Image 2026-04-22 at 12.53.50 PM.webp";
import wa4 from "@/assets/optimized/WhatsApp Image 2026-04-22 at 12.53.51 PM (1).webp";
import wa5 from "@/assets/optimized/WhatsApp Image 2026-04-22 at 12.53.51 PM.webp";

export const wedding = {
  bride: "Anjana",
  groom: "Rohith",
  date: "2026-06-07T11:00:00",
  dateLabel: "7th Jun 2026",
  tagline: "Two souls, one sacred journey",
  whatsappNumber: "917306352194",
  story: [
    { year: "2026", title: "Wedding", text: "The sacred union before the holy fire.", image: gallery1 },
  ],
  gallery: [gallery1, gallery1b, wa1, wa2, wa3, wa4, wa5],
  events: [
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
      place: "Puthuppadi, Kothamangalam, Kerala",
    },
    groom: {
      title: "Son of",
      parents: "Mr. Krishnan Menon & Mrs. Parvathy Menon",
      place: "Mulappuram, Thommankuthu, Kerala",
    },
  },
};
