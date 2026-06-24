import type { ExperienceDTO } from "@/modules/experience/dto";

export const mock: ExperienceDTO[] = [
	{
		id: "1",
		company: {
			name: "Company 1",
			website: "https://company1.com",
		},
		role: "Role 1",
		workMode: "remote",
		startDate: "2023-01-01",
		endDate: "2023-02-01",
		highlights: [
			{
				id: "1",
				content: "Highlight 1",
				sortOrder: 1,
			},
		],
		visible: true,
		createdAt: "2023-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
	{
		id: "2",
		company: {
			name: "Company 2",
			website: "https://company2.com",
		},
		role: "Role 2",
		workMode: "onsite",
		startDate: "2023-03-01",
		endDate: "2023-04-01",
		highlights: [
			{
				id: "2",
				content: "Highlight 2",
				sortOrder: 2,
			},
		],
		visible: false,
		createdAt: "2023-01-01T00:00:00Z",
		updatedAt: "2023-01-01T00:00:00Z",
	},
];
