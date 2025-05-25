import { NextRequest, NextResponse } from "next/server";

const GID_MAP: Record<"1" | "2", string> = {
	"1": "203206997",
	"2": "1928515229",
};

async function fetchSheetData(sem: "1" | "2") {
	const gid = GID_MAP[sem];

	const publicSheetUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQOLfSHGlBn4EnkR0WvlZVpTy1UWF16md_2KveQ4p_GcqzXbit5k4rp3ysjd1uluw/pub?gid=${gid}&single=true&output=csv`;

	const res = await fetch(publicSheetUrl);
	if (!res.ok) throw new Error("Failed to fetch sheet data");

	const csvText = await res.text();

	// Split CSV into rows and cells, trim whitespace
	const rows = csvText
		.split("\n")
		.map((row) => row.split(",").map((cell) => cell.trim()));

	return rows;
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);

		const sem = searchParams.get("sem") as "1" | "2" | null;
		const id = searchParams.get("id");

		if (!sem || !(sem in GID_MAP)) {
			return NextResponse.json(
				{ error: "Invalid or missing sem param" },
				{ status: 400 }
			);
		}

		if (!id) {
			return NextResponse.json(
				{ error: "Missing matric number id param" },
				{ status: 400 }
			);
		}

		const data = await fetchSheetData(sem);

		const matric = id.trim().toLowerCase().replace(/\s/g, "");

		// Find row where column B (index 1) matches matric number ignoring spaces and case
		const matched = data.find(
			(row) => row[1]?.toLowerCase().replace(/\s/g, "") === matric
		);

		if (!matched) {
			return NextResponse.json(
				{ error: "Matric number not found" },
				{ status: 404 }
			);
		}

		// Return the matched row (array)
		return NextResponse.json({ data: matched });
	} catch (err) {
		if (err instanceof Error) {
			return NextResponse.json({ error: err.message }, { status: 500 });
		}
		return NextResponse.json(
			{ error: "Unknown error occurred" },
			{ status: 500 }
		);
	}
}
