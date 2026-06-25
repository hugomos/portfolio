import { Id } from "@/domain/entity/id";
import type { Company } from "./company";
import type { ExperienceHighlight } from "./experience-highlight";

export type WorkMode = "remote" | "hybrid" | "onsite";

interface ConstructorProps {
	id: string;
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate: string | null;
	visible: boolean;
	createdAt: Date;
	updatedAt: Date;
	highlights: ExperienceHighlight[];
	company?: Company;
}

interface CreateProps {
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate?: string | null;
	visible?: boolean;
}

interface RestoreProps {
	id: string;
	companyId: string;
	role: string;
	workMode: WorkMode;
	startDate: string;
	endDate: string | null;
	visible: boolean;
	createdAt: Date;
	updatedAt: Date;
	highlights: ExperienceHighlight[];
	company: Company;
}

export class Experience {
	readonly id: string;
	readonly companyId: string;
	readonly role: string;
	readonly workMode: WorkMode;
	readonly startDate: string;
	readonly endDate: string | null;
	readonly visible: boolean;
	readonly createdAt: Date;
	readonly updatedAt: Date;
	private readonly _highlights: ExperienceHighlight[];
	private readonly _company?: Company;

	private constructor({
		id,
		companyId,
		role,
		workMode,
		startDate,
		endDate,
		visible,
		createdAt,
		updatedAt,
		highlights,
		company,
	}: ConstructorProps) {
		this.id = id;
		this.companyId = companyId;
		this.role = role;
		this.workMode = workMode;
		this.startDate = startDate;
		this.endDate = endDate ?? null;
		this.visible = visible;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this._highlights = highlights;
		this._company = company;
	}

	static create({
		companyId,
		role,
		workMode,
		startDate,
		endDate,
		visible,
	}: CreateProps): Experience {
		const now = new Date();
		return new Experience({
			id: Id.create().value,
			companyId,
			role,
			workMode,
			startDate,
			endDate: endDate ?? null,
			visible: visible ?? false,
			createdAt: now,
			updatedAt: now,
			highlights: [],
		});
	}

	static restore({
		id,
		companyId,
		role,
		workMode,
		startDate,
		endDate,
		visible,
		createdAt,
		updatedAt,
		highlights,
		company,
	}: RestoreProps): Experience {
		return new Experience({
			id,
			companyId,
			role,
			workMode,
			startDate,
			endDate,
			visible,
			createdAt,
			updatedAt,
			highlights,
			company,
		});
	}

	get highlights(): ExperienceHighlight[] {
		return [...this._highlights];
	}

	get company(): Company | undefined {
		return this._company;
	}
}
