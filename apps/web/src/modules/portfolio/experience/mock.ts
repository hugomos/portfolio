import type { ExperienceDTO } from "@/modules/portfolio/experience/dto";

export const mock: ExperienceDTO[] = [
	{
		id: "2c0d9ef1-5e7c-45f6-a7ea-8b92f6e4b101",
		company: {
			name: "Athenas Agrícola",
			website: "https://athenasagricola.com.br",
		},
		role: "Software Developer",
		workMode: "onsite",
		startDate: "2024-08-01",
		endDate: undefined,
		highlights: [
			{
				id: "h1",
				content:
					"Refactored and continuously improved the company's primary QGIS plugin, delivering enhancements driven by feedback from consultants and end users.",
				sortOrder: 1,
			},
			{
				id: "h2",
				content:
					"Developed a satellite imagery feature for the QGIS plugin using geometry bounding boxes, enabling True Color and NDVI visualization for crop monitoring and field decision support.",
				sortOrder: 2,
			},
			{
				id: "h3",
				content:
					"Built automated reports with Power Query, eliminating script dependencies and simplifying data analysis workflows for business users.",
				sortOrder: 3,
			},
		],
		visible: true,
		createdAt: "2024-08-01T08:00:00Z",
		updatedAt: "2026-05-18T14:32:00Z",
	},
	{
		id: "8d16b57e-6cbb-4b1c-9f8f-3ef4a73f2102",
		company: {
			name: "Athenas Agrícola",
			website: "https://athenasagricola.com.br",
		},
		role: "IT Trainee",
		workMode: "onsite",
		startDate: "2022-08-01",
		endDate: "2024-08-01",
		highlights: [
			{
				id: "h6",
				content:
					"Designed and developed the first version of the company's QGIS plugin, including data visualization, sample collection task creation, and route generation for the field mobile application.",
				sortOrder: 1,
			},
			{
				id: "h8",
				content:
					"Implemented automatic upload and synchronization of georeferenced geometries to the mobile field application used by consulting teams.",
				sortOrder: 3,
			},
		],
		visible: true,
		createdAt: "2022-08-01T08:00:00Z",
		updatedAt: "2024-08-01T08:00:00Z",
	},
	{
		id: "f3f7a4c0-44d9-4971-b8fb-77e1bb9f2103",
		company: {
			name: "Athenas Agrícola",
			website: "https://athenasagricola.com.br",
		},
		role: "Computer Operator",
		workMode: "onsite",
		startDate: "2021-02-01",
		endDate: "2022-08-01",
		highlights: [
			{
				id: "h10",
				content:
					"Developed a Django-based internal hub to centralize technical documentation, operational procedures, and automation tools.",
				sortOrder: 1,
			},
			{
				id: "h13",
				content:
					"Gained practical experience in precision agriculture, soil analysis, and the operational workflows supporting agricultural consulting services.",
				sortOrder: 4,
			},
		],
		visible: true,
		createdAt: "2021-02-01T08:00:00Z",
		updatedAt: "2022-08-01T08:00:00Z",
	},
];
