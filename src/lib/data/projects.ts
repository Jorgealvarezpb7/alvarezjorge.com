import notelyIcon from '$lib/assets/icon notely 2.png';
import suniLogo from '$lib/assets/suni-logo.svg';

export type Project = {
	slug: string;
	icon?: string;
	title: string;
	category: string;
	/** Category pill style: lime highlight or neutral paper. */
	badge: 'highlight' | 'neutral';
	role: string;
	period: string;
	summary: string;
	story: string;
	highlights: string[];
	tags: string[];
	repo?: string;
	link?: string;
	background?: string;
};

export const projects: Project[] = [
	{
		slug: 'notely',
		icon: notelyIcon,
		title: 'Notely',
		category: 'Proyecto open source',
		badge: 'highlight',
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
		],
		tags: ['Swift', 'SwiftUI', 'AppKit', 'SQLite', 'GitHub API', 'OpenSpec'],
		repo: 'https://github.com/Jorgealvarezpb7/Notely'
	},
	{
		slug: 'suni',
		icon: suniLogo,
		title: 'Suni',
		category: 'Plataforma de voluntariado',
		badge: 'neutral',
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
		],
		tags: ['SvelteKit', 'TypeScript', 'Rust', 'Axum', 'PostgreSQL', 'Tailwind CSS'],
		repo: 'https://github.com/whizzes/suniglobal.org',
		link: 'https://suniglobal.org/',
		background: '#F77C2C'
	}
];

export function findProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
