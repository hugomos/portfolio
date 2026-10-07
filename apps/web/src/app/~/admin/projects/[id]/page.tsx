import { EditProject } from "@/presentation/app/(admin)/projects/$id";

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <EditProject id={id} />;
}
