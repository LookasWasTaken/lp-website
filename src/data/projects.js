const logos = import.meta.glob("../assets/brands/*", { eager: true });
const tilts = import.meta.glob("../assets/products/*", { eager: true });

const logo = (filename) =>
  logos[`../assets/brands/${filename}`]?.default ?? null;

const tilt = (filename) =>
  tilts[`../assets/products/${filename}`]?.default ?? null;

const projects = [
  {
    id: 1,
    nome: "Bionuvya",
    descrizione: "E-commerce skincare",
    coloreBackground: "#006072",
    coloreTesto: "#ffffff",
    fontFamily: "font-gothic",
    logo: logo("bionuvya.png"),
    immagineTilt: tilt("prodotti_bionuvya.png"),
    tags: ["WordPress", "WooCommerce", "PHP", "JavaScript", "CSS"],
    link: "https://bionuvya.it/",
  },
  {
    id: 2,
    nome: "Progetto 2",
    descrizione: "Sito vetrina",
    coloreBackground: "#ffffff",
    coloreTesto: "#222222",
    fontFamily: "font-syne",
    logo: null,
    immagineTilt:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80",
    tags: ["WordPress", "PHP", "CSS"],
    link: "https://esempio.com",
  },
  {
    id: 3,
    nome: "luca.dev",
    descrizione: "Portfolio personale",
    coloreBackground: "#1a0d2e",
    coloreTesto: "#e8e8f0",
    fontFamily: "font-grotesk",
    logo: null,
    immagineTilt:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80",
    tags: ["React", "Tailwind", "Motion", "Vite"],
    link: "/",
  },
  {
    id: 4,
    nome: "vMix Production",
    descrizione: "Produzione video live",
    coloreBackground: "#1a0a0a",
    coloreTesto: "#e8e8f0",
    fontFamily: "font-gothic",
    logo: null,
    immagineTilt:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80",
    tags: ["vMix", "Live Production"],
    link: null,
  },
  {
    id: 5,
    nome: "DaVinci",
    descrizione: "Post produzione video",
    coloreBackground: "#0a0a1a",
    coloreTesto: "#e8e8f0",
    fontFamily: "font-syne",
    logo: null,
    immagineTilt:
      "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=300&q=80",
    tags: ["DaVinci Resolve", "Color Grading", "Video Editing"],
    link: null,
  },
  {
    id: 6,
    nome: "Progetto 6",
    descrizione: "E-commerce",
    coloreBackground: "#0d1f0d",
    coloreTesto: "#e8e8f0",
    fontFamily: "font-jakarta",
    logo: null,
    immagineTilt:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&q=80",
    tags: ["WordPress", "WooCommerce", "CSS"],
    link: "https://esempio.com",
  },
  {
    id: 7,
    nome: "Ottica Ritz",
    descrizione: "Centro ottico",
    coloreBackground: "#6B1010",
    coloreTesto: "#ffffff",
    fontFamily: "font-gothic",
    logo: logo("ottica_ritz.png"),
    immagineTilt: tilt("occhiali_ottica_ritz.png"),
    tags: ["Shopify", "JavaScript", "CSS"],
    link: "https://otticaritz.it/",
  },
];

export default projects;
