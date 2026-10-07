import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	const secret = process.env.REVALIDATION_SECRET;

	if (!secret || authHeader !== `Bearer ${secret}`) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	revalidateTag("portfolio");
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
