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
	return csvText
		.split("\n")
		.map((row) => row.split(",").map((cell) => cell.trim()));
}

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Missing matric number id param" },
				{ status: 400 }
			);
		}

		const matric = id.trim().toLowerCase().replace(/\s/g, "");
		const results: Record<string, boolean> = {};

		// Check both semesters
		for (const sem of ["1", "2"] as const) {
			try {
				const data = await fetchSheetData(sem);
				const found = data.some(
					(row) => row[1]?.toLowerCase().replace(/\s/g, "") === matric
				);
				results[`semester_${sem}`] = found;
			} catch (err) {
				console.error(`Error checking semester ${sem}:`, err);
				results[`semester_${sem}`] = false;
			}
		}

		// Determine which semesters the student is eligible for
		const eligibleSemesters = Object.entries(results)
			.filter(([found]) => found)
			.map(([sem]) => sem.replace("semester_", ""));

		return NextResponse.json({
			eligible: eligibleSemesters.length > 0,
			eligibleSemesters,
			results, // includes both semesters' results
		});
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
