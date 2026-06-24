import { relations } from "drizzle-orm";
import { company } from "./company";
import { experience } from "./experience";
import { experienceHighlight } from "./experience-highlight";
import { hero } from "./hero";
import { project } from "./project";
import { projectHighlight } from "./project-highlight";
import { projectTech } from "./project-tech";
import { skill } from "./skill";

export const heroRelations = relations(hero, ({ many }) => ({
	skills: many(skill),
}));

export const skillRelations = relations(skill, ({ one }) => ({
	hero: one(hero, { fields: [skill.heroId], references: [hero.id] }),
}));

export const companyRelations = relations(company, ({ many }) => ({
	experiences: many(experience),
}));

export const experienceRelations = relations(experience, ({ one, many }) => ({
	company: one(company, {
		fields: [experience.companyId],
		references: [company.id],
	}),
	highlights: many(experienceHighlight),
}));

export const experienceHighlightRelations = relations(
	experienceHighlight,
	({ one }) => ({
		experience: one(experience, {
			fields: [experienceHighlight.experienceId],
			references: [experience.id],
		}),
	}),
);

export const projectRelations = relations(project, ({ many }) => ({
	tech: many(projectTech),
	highlights: many(projectHighlight),
}));

export const projectTechRelations = relations(projectTech, ({ one }) => ({
	project: one(project, {
		fields: [projectTech.projectId],
		references: [project.id],
	}),
}));

export const projectHighlightRelations = relations(
	projectHighlight,
	({ one }) => ({
		project: one(project, {
			fields: [projectHighlight.projectId],
			references: [project.id],
		}),
	}),
);
