import type { Messages } from './es';

const en: Messages = {
	meta: {
		title: 'Jorge Álvarez — Full Stack Developer',
		description:
			"Full stack developer. I build software people understand at first glance: tools that connect a company's processes and make everyday work easier, not harder.",
		jobTitle: 'Full Stack Developer',
		ogImageAlt: 'Jorge Álvarez — Full Stack Developer in Madrid, Spain'
	},
	common: {
		location: 'Madrid, Spain',
		goHome: 'Go to home page',
		view: 'View',
		technologies: 'Technologies',
		language: 'Language'
	},
	sections: {
		hero: 'Home',
		about: 'About',
		projects: 'Projects',
		experience: 'Experience',
		formation: 'Education',
		contact: 'Contact'
	},
	header: {
		sectionsNav: 'Sections',
		prevSection: 'Previous section',
		nextSection: 'Next section',
		openMenu: 'Open menu',
		closeMenu: 'Close menu'
	},
	hero: {
		available: 'Available for new projects',
		greeting: "Hi, I'm",
		role: 'Full Stack Developer',
		photoAlt: 'Photo of Jorge Alvarez',
		explore: 'Scroll to explore'
	},
	about: {
		introBefore: "I'm a ",
		introHighlight: 'full stack',
		introAfter:
			" developer who likes building software people understand at first glance: tools that connect a company's processes and make everyday work easier, not harder."
	},
	projects: {
		heading: 'Latest projects',
		viewDetail: 'View details',
		viewOnGitHub: 'View on GitHub'
	},
	experience: {
		currentWork: '11/2025 – present',
		project: 'Project',
		personalProject: 'Personal project',
		entries: {
			whizzes: {
				role: 'Full Stack',
				description:
					'Building and customizing Shopify stores for thebalancelab.es: theme adaptation, store setup and sales-focused integrations.'
			},
			melit: {
				role: 'Junior Full Stack · Internship',
				description:
					'JHipster training (Spring Boot and Angular). A car rental app with vehicle and user management, and the front end of a real estate portal.'
			},
			sendInvoice: {
				title: 'Send Invoice',
				description: 'Web app to create, manage and issue digital PDF invoices.'
			},
			clientRewards: {
				title: 'Points & Discounts CRM',
				description:
					'Loyalty management: businesses track customer points and turn them into discounts. Customer, inventory and sales modules.'
			},
			rentACar: {
				title: 'Rent A Car',
				description:
					'Vehicle rental with filters by category and features, online booking and secure payment.'
			}
		}
	},
	formation: {
		degrees: 'Degrees',
		readings: 'Reading',
		webDegree: ['Higher Vocational Degree in', 'Web Application Development'],
		multiplatformDegree: ['Higher Vocational Degree in', 'Cross-Platform App Development'],
		headFirstJavaMeta: "3rd edition · Kathy Sierra, Bert Bates and Trisha Gee · O'Reilly"
	},
	contact: {
		titleLine1: 'Send a message',
		titleLine2: 'or follow me',
		backToTop: 'Back to top ←'
	},
	project: {
		back: 'Back',
		titleSuffix: "Jorge Álvarez's project",
		story: 'The story',
		whatIDid: 'What I did',
		repository: 'Repository',
		visitSite: 'Visit site',
		backToProjects: 'Back to projects ←',
		notFound: 'Project not found'
	},
	error: {
		notFoundTitle: 'Page not found',
		notFoundText:
			"The page you're looking for doesn't exist or has moved. Check the URL or go back to the home page.",
		genericTitle: 'Something went wrong',
		genericText: 'An unexpected error occurred. Try again or go back to the home page.'
	},
	projectContent: {
		notely: {
			category: 'Open source project',
			role: 'Creator and developer',
			period: 'Sep 2026 – present',
			summary:
				'Native sticky notes app for macOS, with checklists, Markdown descriptions and GitHub issue sync.',
			story:
				'It was a really fun and rewarding project to build: it started as a tool for my own Mac and became my lab for learning native development.',
			highlights: [
				'I built it with Spec-Driven Development using OpenSpec: every feature starts as a spec, and the code and tests come from it.',
				'I designed a modular Swift Package Manager architecture, splitting domain, persistence, integrations and UI into separate targets.',
				'I built floating windows with AppKit and SwiftUI that remember text, size and position across sessions, with text formatting, per-note colors and animations.',
				'Persistence was migrated to SQLite with a custom migration system and its own test suite.',
				'I integrated the GitHub API to sync notes with issues, storing the token securely in the macOS Keychain.',
				'I added link detection with preview cards and a hand-written Markdown parser.'
			]
		},
		suni: {
			category: 'Volunteering platform',
			role: 'Full-stack developer',
			period: 'Jun 2026 – present',
			summary: 'A platform that connects volunteers with NGO missions.',
			story:
				'It has a public website, a volunteer app and an admin panel. I worked on all of them as part of a small team.',
			highlights: [
				'I built the missions experience: public listing, cards, countdown, Editor.js content rendering and a confirmation step to cancel participation.',
				'I implemented a public global-counters endpoint end to end, from the Rust domain service to the landing page metrics.',
				'I added filters to the admin panel’s volunteer list, from the SQL layer to the API, with e2e tests against a real PostgreSQL database.',
				'I created each volunteer’s overview page, including their skills, by extending the admin API.',
				'I built skills management with Spec-Driven Development: a collapsible tree, create and edit modals, and a data-loss warning on cascading deletes.',
				'I made the first volunteer screens: navigation, country and phone pickers, error messages and the privacy policy.',
				'I refreshed the landing page with a new palette, typography and redesigned sections.'
			]
		}
	}
};

export default en;
