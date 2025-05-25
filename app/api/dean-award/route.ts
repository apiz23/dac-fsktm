import { NextRequest, NextResponse } from "next/server";

const GID_MAP: Record<"1" | "2", string> = {
	"2": "1928515229",
	"1": "203206997",
};

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const sem = searchParams.get("sem") as "1" | "2" | null;

	if (!sem || !(sem in GID_MAP)) {
		return NextResponse.json(
			{ error: "Invalid or missing sem param" },
			{ status: 400 }
		);
	}

	const gid = GID_MAP[sem];

	const publicSheetUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQOLfSHGlBn4EnkR0WvlZVpTy1UWF16md_2KveQ4p_GcqzXbit5k4rp3ysjd1uluw/pub?gid=${gid}&single=true&output=csv`;

	try {
		const res = await fetch(publicSheetUrl);
		if (!res.ok) throw new Error("Failed to fetch sheet data");

		const csvText = await res.text();

		const rows = csvText
			.split("\n")
			.map((row) => row.split(",").map((cell) => cell.trim()));

		const header = rows[0];

		const data = rows.slice(1).map((row) => {
			const obj: Record<string, string> = {};
			header.forEach((key, index) => {
				obj[key] = row[index] || "";
			});
			return obj;
		});

		return NextResponse.json({ data });
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
