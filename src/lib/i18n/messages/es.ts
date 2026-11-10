/**
 * Spanish copy: the source dictionary. Its shape is the `Messages` type, so every other
 * locale fails type-checking until it has the same keys.
 */
const es = {
	meta: {
		title: 'Jorge Álvarez — Desarrollador Full Stack',
		description:
			'Desarrollador full stack. Construyo software que la gente entiende a la primera: herramientas que conectan los procesos de una empresa y simplifican el día a día.',
		jobTitle: 'Desarrollador Full Stack',
		ogImageAlt: 'Jorge Álvarez — Desarrollador Full Stack en Madrid, España'
	},
	common: {
		location: 'Madrid, España',
		goHome: 'Ir al inicio',
		view: 'Ver',
		technologies: 'Tecnologías',
		language: 'Idioma'
	},
	sections: {
		hero: 'Inicio',
		about: 'Sobre mí',
		projects: 'Proyectos',
		experience: 'Experiencia',
		formation: 'Formación',
		contact: 'Contacto'
	},
	header: {
		sectionsNav: 'Secciones',
		prevSection: 'Sección anterior',
		nextSection: 'Sección siguiente',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú'
	},
	hero: {
		available: 'Disponible para nuevos proyectos',
		greeting: 'Hola, soy',
		role: 'Full Stack Developer',
		photoAlt: 'Foto de Jorge Alvarez',
		explore: 'Desliza para explorar'
	},
	about: {
		introBefore: 'Soy desarrollador ',
		introHighlight: 'full stack',
		introAfter:
			' y me gusta construir software que la gente entienda a la primera: herramientas que conecten los procesos de una empresa y hagan el día a día más fácil, no más complicado.'
	},
	projects: {
		heading: 'Últimos proyectos',
		viewProject: (name: string) => `Ver proyecto ${name}`,
		viewOnGitHub: 'Ver en GitHub'
	},
	experience: {
		currentWork: '11/2025 – actualidad',
		project: 'Proyecto',
		personalProject: 'Proyecto personal',
		entries: {
			whizzes: {
				role: 'Full Stack',
				description:
					'Desarrollo y personalización de tiendas Shopify para thebalancelab.es: adaptación de temas, configuración de la tienda e integraciones orientadas a ventas.'
			},
			melit: {
				role: 'Junior Full Stack · Prácticas',
				description:
					'Formación en JHipster (Spring Boot y Angular). App de alquiler de coches con gestión de vehículos y usuarios, y front-end de un portal inmobiliario.'
			},
			sendInvoice: {
				title: 'Send Invoice',
				description: 'App web para crear, gestionar y emitir facturas digitales en PDF.'
			},
			clientRewards: {
				title: 'CRM Puntos y Descuentos',
				description:
					'Gestión de fidelización: las empresas administran puntos de clientes y los convierten en descuentos. Módulos de clientes, inventario y ventas.'
			},
			rentACar: {
				title: 'Rent A Car',
				description:
					'Alquiler de vehículos con filtros por categoría y características, reservas online y pago seguro.'
			}
		}
	},
	formation: {
		degrees: 'Títulos',
		readings: 'Lecturas',
		webDegree: ['Grado Superior en Desarrollo', 'de Aplicaciones Web'],
		multiplatformDegree: ['Grado Superior en Desarrollo', 'de Aplicaciones Multiplataforma'],
		headFirstJavaMeta: "3.ª edición · Kathy Sierra, Bert Bates y Trisha Gee · O'Reilly"
	},
	contact: {
		titleLine1: 'Escríbeme',
		titleLine2: 'o sigue mis redes',
		backToTop: 'Volver al inicio ←'
	},
	project: {
		back: 'Volver',
		/** Appended to the project name in <title>: `Notely — Proyecto de Jorge Álvarez`. */
		titleSuffix: 'Proyecto de Jorge Álvarez',
		story: 'La historia',
		whatIDid: 'Lo que hice',
		repository: 'Repositorio',
		visitSite: 'Visitar sitio',
		backToProjects: 'Volver a proyectos ←',
		notFound: 'Proyecto no encontrado'
	},
	error: {
		notFoundTitle: 'Página no encontrada',
		notFoundText:
			'La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.',
		genericTitle: 'Algo salió mal',
		genericText: 'Ocurrió un error inesperado. Intenta de nuevo o regresa al inicio.'
	},
	projectContent: {
		notely: {
			category: 'Proyecto open source',
			role: 'Creador y desarrollador',
			period: 'sept. 2026 – actualidad',
			summary:
				'App nativa de notas adhesivas para macOS, con checklists, descripciones en Markdown y sincronización con issues de GitHub.',
			story:
				'Fue un proyecto muy bonito y divertido de construir: nació como una herramienta para mi propio Mac y terminó convirtiéndose en mi laboratorio para aprender desarrollo nativo.',
			highlights: [
				'Lo desarrollé siguiendo Spec-Driven Development con OpenSpec: cada feature empieza como una especificación y de ahí sale el código y los tests.',
				'Diseñé una arquitectura modular en Swift Package Manager, separando dominio, persistencia, integraciones y UI en targets independientes.',
				'Construí ventanas flotantes con AppKit y SwiftUI que recuerdan texto, tamaño y posición entre sesiones, con formato de texto, colores por nota y animaciones.',
				'Se migró la persistencia a SQLite con un sistema de migraciones propio y su batería de tests.',
				'Integré la API de GitHub para sincronizar notas con issues, guardando el token de forma segura en el Llavero de macOS.',
				'Añadí detección de enlaces con tarjetas de vista previa y un parser de Markdown hecho a mano.'
			]
		},
		suni: {
			category: 'Plataforma de voluntariado',
			role: 'Desarrollador full-stack',
			period: 'jun. 2026 – actualidad',
			summary: 'Plataforma que conecta a personas voluntarias con misiones de ONG.',
			story:
				'Tiene un sitio público, una app para voluntarios y un panel de administración. Trabajé en todas estas partes dentro de un equipo pequeño.',
			highlights: [
				'Desarrollé la experiencia de misiones: listado público, tarjetas, cuenta atrás, render de contenido de Editor.js y confirmación para cancelar la participación.',
				'Implementé de punta a punta un endpoint público de contadores globales, desde el servicio de dominio en Rust hasta las métricas de la landing.',
				'Añadí filtros a la lista de voluntarios del panel de administración, de la capa SQL a la API, con tests e2e sobre PostgreSQL real.',
				'Creé la página de resumen de cada voluntario, con sus habilidades, ampliando la API de administración.',
				'Construí la gestión de habilidades siguiendo Spec-Driven Development: árbol plegable, modales de creación y edición, y aviso de pérdida de datos al borrar en cascada.',
				'Hice las primeras pantallas para voluntarios: navegación, selector de país y teléfono, mensajes de error y política de privacidad.',
				'Renové la landing con nueva paleta, tipografía y secciones rediseñadas.'
			]
		}
	}
};

export type Messages = typeof es;
export default es;
