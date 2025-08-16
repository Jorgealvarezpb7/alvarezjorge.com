
export const languages = {
  en: 'English',
  es: 'Español'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Navigation
    nav: {
      experience: "Experience",
      projects: "Projects",
      about: "About",
    },
    // Hero section
    hero: {
      specialty: "Full Stack Developer",
      summary: "Enthusiastic about web page design and development and software that improves system usability and integrates business processes."
    },
    // Experience section
    experience: {
      title: "Experience",
      melit: {
        company: "MELIT",
        position: "Full Stack Developer",
        summary: [
          "During my business internship, I received training in JHipster, a tool that combines Spring Boot and Angular for full-stack web application development.",
          "Participated in the development of a car rental application, focused on vehicle and user management.",
          "Subsequently integrated into a CRM project to capture and sell real estate properties."
        ]
      }
    },
    // Projects section
    projects: {
      title: "Featured Projects",
      crm: {
        name: "CRM Points & Discounts",
        summary: "Loyalty management application that allows companies to manage customer points and convert them into discounts. Includes customer, inventory and sales modules, with an intuitive interface."
      },
      rentacar: {
        name: "Rent A Car",
        summary: "Vehicle rental web application that allows customers to search for cars by categories and specific characteristics through advanced filters. Includes online reservation system and secure payment processing."
      },
      links: {
        source: "Source",
        preview: "Preview"
      }
    },
    // About section
    about: {
      title: "About",
      description: `Hi, I'm Jorge Álvarez, a passionate Junior Full Stack Developer based in Madrid, Spain. I specialize in multiplatform app design and web development and maintenance.

I'm enthusiastic about designing and developing web pages and software that improve system usability and integrate business processes. Currently pursuing my education in web application development and multiplatform application development at UNIVERSAE.

        My experience includes working with technologies like Java, JavaScript/TypeScript, Angular, React, Lit and Spring Boot. I'm always eager to learn new technologies and contribute to meaningful projects.`
    },
    // General
    general: {
      title: "Jorge Alvarez - Full Stack Developer",
      description: "Full Stack developer based in Madrid, Spain. I specialize in multiplatform app design and web and development and maintenance."
    }
  },
  es: {
    // Navigation
    nav: {
      experience: "Experiencia",
      projects: "Proyectos",
      about: "Sobre mí",
    },
    // Hero section
    hero: {
      specialty: "Desarrollador Full Stack",
      summary: "Entusiasta del diseño y desarrollo de páginas web y software que mejore la usabilidad del sistema e integre procesos comerciales."
    },
    // Experience section
    experience: {
      title: "Experiencia",
      melit: {
        company: "MELIT",
        position: "Desarrollador Full Stack",
        summary: [
          "Durante mis prácticas empresariales, recibí formación en JHipster, una herramienta que combina Spring Boot y Angular para el desarrollo de aplicaciones web full-stack.",
          "Participé en el desarrollo de una aplicación de alquiler de coches, enfocada en la gestión de vehículos y usuarios.",
          "Posteriormente me integré en un proyecto CRM para captar y vender propiedades inmobiliarias."
        ]
      }
    },
    // Projects section
    projects: {
      title: "Proyectos Destacados",
      crm: {
        name: "CRM Puntos y Descuentos",
        summary: "Aplicación de gestión de fidelidad que permite a las empresas gestionar puntos de clientes y convertirlos en descuentos. Incluye módulos de clientes, inventario y ventas, con una interfaz intuitiva."
      },
      rentacar: {
        name: "Alquiler de Coches",
        summary: "Aplicación web de alquiler de vehículos que permite a los clientes buscar coches por categorías y características específicas a través de filtros avanzados. Incluye sistema de reservas online y procesamiento seguro de pagos."
      },
      links: {
        source: "Código",
        preview: "Vista previa"
      }
    },
    // About section
    about: {
      title: "Sobre mí",
      description: `Hola, soy Jorge Álvarez, un apasionado Desarrollador Full Stack Junior con base en Madrid, España. Me especializo en el diseño de aplicaciones multiplataforma y desarrollo y mantenimiento web.

Soy entusiasta del diseño y desarrollo de páginas web y software que mejoren la usabilidad del sistema e integren procesos comerciales. Actualmente cursando mis estudios en desarrollo de aplicaciones web y desarrollo de aplicaciones multiplataforma en UNIVERSAE.

        Mi experiencia incluye trabajar con tecnologías como Java, JavaScript/TypeScript, Angular, React, Lit y Spring Boot. Siempre estoy ansioso por aprender nuevas tecnologías y contribuir a proyectos significativos.`
    },
    // General
    general: {
      title: "Jorge Alvarez - Desarrollador Full Stack",
      description: "Desarrollador Full Stack con base en Madrid, España. Me especializo en el diseño de aplicaciones multiplataforma y desarrollo y mantenimiento web."
    }
  }
} as const;

export function getTranslation(lang: Language, key: string) {
  return key.split('.').reduce((obj: any, k) => obj?.[k], translations[lang]);
}

export function getLanguageFromUrl(url: URL): Language {
  const pathname = url.pathname;
  if (pathname.startsWith('/es')) return 'es';
  return 'en';
}