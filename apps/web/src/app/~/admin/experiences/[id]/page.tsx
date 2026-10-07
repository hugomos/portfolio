import { EditExperience } from "@/presentation/app/(admin)/experiences/$id";

export default async function EditExperiencePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <EditExperience id={id} />;
}
