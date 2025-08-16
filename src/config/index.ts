import type { SiteConfig, SiteContent } from "../types";
import type { Language } from "../i18n";
import { translations } from "../i18n";

import crmImage from '../images/crm-project.png';
import rentACarImage from '../images/rent-a-car.png';

export const SITE_CONFIG: SiteConfig = {
  title: "Jorge Alvarez - Full Stack Developer",
  author: "Jorge Alvarez",
  description: "Full Stack developer based in Madrid, Spain. I specialize in multiplatform app design and web and development and maintenance.",
  lang: "en",
  siteLogo: "/profilepic.png",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://linkedin.com/in/jorgealvarezpb7/" },
    { text: "Github", href: "https://github.com/jorgealvarezpb7" },
  ],
  socialImage: "/zen-og.png",
  canonicalURL: "https://astro-zen.vercel.app",
};

export function getSiteContent(lang: Language): SiteContent {
  const t = translations[lang];
  
  return {
    hero: {
      name: "Jorge Alvarez",
      specialty: t.hero.specialty,
      email: "jorgealvarezpb7@icloud.com",
      summary: t.hero.summary
    },
    experience: [
      { 
        company: t.experience.melit.company,
        position: t.experience.melit.position,
        startDate: lang === 'es' ? "Marzo 2025" : "March 2025",
        endDate: lang === 'es' ? "Junio 2025" : "June 2025",
        summary: [...t.experience.melit.summary],
      },
    ],
    projects: [
      {
        name: t.projects.crm.name,
        summary: t.projects.crm.summary,
        linkSource: "https://github.com/Jorgealvarezpb7/Client-Rewards",
        image: crmImage.src,
        technologies: ["Java", "JavaFX", "SQLite"]
      },
      {
        name: t.projects.rentacar.name,
        summary: t.projects.rentacar.summary,
        linkSource: "https://github.com/Jorgealvarezpb7/RentACar",
        image: rentACarImage.src,
        technologies: ["JHipster", "Angular", "Spring Boot"]
      },
    ],
    about: {
      description: lang === 'es' ? `
        Hola, soy Jorge Álvarez, un apasionado Desarrollador Full Stack Junior con base en Madrid, España. Me especializo en el diseño de aplicaciones multiplataforma y desarrollo y mantenimiento web.

        Soy entusiasta del diseño y desarrollo de páginas web y software que mejoren la usabilidad del sistema e integren procesos comerciales. Actualmente cursando mis estudios en desarrollo de aplicaciones web (ya tengo un título en desarrollo de aplicaciones multiplataforma) en UNIVERSAE.

        Mi experiencia incluye trabajar con tecnologías como Java, JavaScript/TypeScript, Angular, React, Lit y Spring Boot. Siempre estoy ansioso por aprender nuevas tecnologías y contribuir a proyectos significativos.
      ` : `
        Hi, I'm Jorge Álvarez, a passionate Junior Full Stack Developer based in Madrid, Spain. I specialize in multiplatform app design and web development and maintenance.

        I'm enthusiastic about designing and developing web pages and software that improve system usability and integrate business processes. Currently pursuing my education in web application development (already have a degree in multiplatform application development) at UNIVERSAE.

        My experience includes working with technologies like Java, JavaScript/TypeScript, Angular, React, Lit and Spring Boot. I'm always eager to learn new technologies and contribute to meaningful projects.
      `,
      image: "/profilepic.png",
    },
  };
}

export function getSiteConfig(lang: Language): SiteConfig {
  const t = translations[lang];
  
  return {
    title: t.general.title,
    author: "Jorge Alvarez",
    description: t.general.description,
    lang: lang,
    siteLogo: "/profilepic.png",
    navLinks: [
      { text: t.nav.experience, href: "#experience" },
      { text: t.nav.projects, href: "#projects" },
      { text: t.nav.about, href: "#about" },
    ],
    socialLinks: [
      { text: "LinkedIn", href: "https://linkedin.com/in/jorgealvarezpb7/" },
      { text: "Github", href: "https://github.com/jorgealvarezpb7" },
    ],
    socialImage: "/zen-og.png",
    canonicalURL: "https://astro-zen.vercel.app",
  };
}

export const SITE_CONTENT = getSiteContent('en');