"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function DeanAwardSearch() {
	const [sem, setSem] = useState<"1" | "2">("1");
	const [matric, setMatric] = useState("");
	const [found, setFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);

	const isMobile = useIsMobile();

	async function handleSearch() {
		setLoading(true);
		setError("");
		setFound(false);

		if (!matric.trim()) {
			setError("Please enter your matric number.");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(
				`/api/dean-award/search?sem=${sem}&id=${encodeURIComponent(matric.trim())}`
			);

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.error || "Failed to fetch data");
			}

			const data = await res.json();

			if (data.data) {
				setFound(true);
				setOpen(true); // open dialog or drawer
			} else {
				setError("Matric number not found.");
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message || "Error fetching data");
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	}

	// Component for content inside Dialog or Drawer
	const SuccessContent = (
		<>
			<DialogHeader>
				<DialogTitle>Congratulations!</DialogTitle>
				<DialogDescription>
					You are eligible to register for the Dean Award ceremony.
				</DialogDescription>
			</DialogHeader>
			<Link
				href="https://forms.gle/your-google-form-link"
				target="_blank"
				passHref
			>
				<Button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
					Register Here
				</Button>
			</Link>
		</>
	);

	return (
		<div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg">
			<h1 className="text-2xl font-bold mb-4">Dean Award Search</h1>

			<Label className="block mb-2 font-semibold" htmlFor="sem-select">
				Semester:
			</Label>
			<Select value={sem} onValueChange={(value) => setSem(value as "1" | "2")}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select semester" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="1">Sem 1</SelectItem>
					<SelectItem value="2">Sem 2</SelectItem>
				</SelectContent>
			</Select>

			<Label className="block mb-4 font-semibold mt-4" htmlFor="matric-input">
				Matric Number:
			</Label>
			<input
				type="text"
				id="matric-input"
				value={matric}
				onChange={(e) => setMatric(e.target.value)}
				className="block w-full p-2 border rounded mt-1"
				placeholder="Enter your matric number"
			/>

			<Button
				onClick={handleSearch}
				disabled={loading}
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
			>
				{loading ? "Searching..." : "Search"}
			</Button>

			{error && <p className="mt-4 text-red-600">{error}</p>}

			{/* Conditionally render Dialog or Drawer on found */}
			{found && (
				<>
					{isMobile ? (
						<Drawer open={open} onOpenChange={setOpen}>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Congratulations!</DrawerTitle>
									<DrawerDescription>
										You are eligible to register for the Dean Award ceremony.
									</DrawerDescription>
								</DrawerHeader>
								<Link
									href="https://forms.gle/your-google-form-link"
									target="_blank"
									passHref
								>
									<Button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
										Register Here
									</Button>
								</Link>
								<DrawerFooter>
									<DrawerClose>
										<Button variant="outline" onClick={() => setOpen(false)}>
											Close
										</Button>
									</DrawerClose>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
					) : (
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogContent>
								{SuccessContent}
								<DialogClose asChild>
									<Button variant="outline" className="mt-4">
										Close
									</Button>
								</DialogClose>
							</DialogContent>
						</Dialog>
					)}
				</>
			)}
		</div>
	);
}
