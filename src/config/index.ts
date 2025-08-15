import type { SiteConfig, SiteContent } from "../types";

import crmImage from '../images/crm-project.png';
import rentACarImage from '../images/rent-a-car.png';

export const SITE_CONFIG: SiteConfig = {
  title: "Jorge Alvarez - Full Stack Developer",
  author: "Jorge Alvarez",
  description:
    "Full Stack developer based in Madrid, Spain. I specialize in multiplatform app design and web and development and maintenance.",
  lang: "en",
  siteLogo: "/concho.png",
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

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Jorge Alvarez",
    specialty: "Full Stack Developer",
    email:"jorgealvarezpb7@icloud.com",
    summary:
      "Enthusiastic about web page design and development and software that improves system usability and integrates business processes."
  },
  experience: [
    { 
      company: "MELIT",
      position: "Full Stack Developer",
      startDate: "March 2025",
      endDate: "June 2025",
      summary: [
        "During my business internship, i received training in JHipster, a tool that combines Spring Boot and Angular for full-stack web application development.",
        "Participated in the development of a car rental application, focused on vehicle and user management.",
        "Subsequently integrated into a CRM project to capture and sell real estate properties."
      ],
    },
  ],
  projects: [
    {
      name: "CRM Puntos y Descuentos",
      summary: "Loyalty management application that allows companies to manage customer points and convert them into discounts. Includes customer, inventory and sales modules, with an intuitive interface.",
      linkPreview: "/",
      linkSource: "https://github.com/Jorgealvarezpb7/Client-Rewards",
      image: crmImage.src,
      technologies: ["Java", "JavaFX", "SQLite"]
    },
    {
      name: "Rent A Car",
      summary: "Vehicle rental web application that allows customers to search for cars by categories and specific characteristics through advanced filters. Includes online reservation system and secure payment processing.",
      linkPreview: "/",
      linkSource: "https://github.com/Jorgealvarezpb7/RentACar",
      image: rentACarImage.src,
      technologies: ["JHipster", "Angular", "Spring Boot"]
    },
  ],
  about: {
    description: `
      Hi, I'm Jorge Álvarez, a passionate Junior Full Stack Developer based in Madrid, Spain. I specialize in multiplatform app design and web development and maintenance.

      I'm enthusiastic about designing and developing web pages and software that improve system usability and integrate business processes. Currently pursuing my education in web application development and multiplatform application development at UNIVERSAE.

      My experience includes working with technologies like Java, JavaScript/TypeScript, Angular, and Spring Boot. I'm always eager to learn new technologies and contribute to meaningful projects.
    `,
    image: "/concho.png",
  },
};
