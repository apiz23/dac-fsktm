"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogFooter,
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
import { Input } from "./ui/input";
import { LineShadowText } from "./magicui/line-shadow-text";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Lottie from "lottie-react";
import congrats from "@/public/anim/congrats.json";
import confetti from "canvas-confetti";

export default function DeanAwardSearch() {
	const [sem, setSem] = useState<"1" | "2">("1");
	const [matric, setMatric] = useState("");
	const [found, setFound] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);

	const isMobile = useIsMobile();

	const triggerSideCannons = () => {
		const end = Date.now() + 3 * 1000;
		const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

		const frame = () => {
			if (Date.now() > end) return;
			confetti({
				particleCount: 2,
				angle: 60,
				spread: 55,
				startVelocity: 60,
				origin: { x: 0, y: 0.5 },
				colors,
			});
			confetti({
				particleCount: 2,
				angle: 120,
				spread: 55,
				startVelocity: 60,
				origin: { x: 1, y: 0.5 },
				colors,
			});
			requestAnimationFrame(frame);
		};

		frame();
	};

	async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
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
				setOpen(true);
				triggerSideCannons();
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

	return (
		<>
			<div className="mx-auto max-w-5xl text-center mt-20">
				<h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-6xl lg:text-7xl mb-10">
					Search If you are{" "}
					<LineShadowText className="italic" shadowColor={"black"}>
						eligible
					</LineShadowText>
				</h1>
			</div>

			<div className="max-w-2xl mx-auto p-6">
				<form onSubmit={handleSearch}>
					<Label className="block mb-2 font-semibold">Semester:</Label>
					<RadioGroup
						value={sem}
						onValueChange={(value) => setSem(value as "1" | "2")}
						className="flex space-x-6"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="1" id="sem-1" />
							<Label htmlFor="sem-1">Sem 1</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="2" id="sem-2" />
							<Label htmlFor="sem-2">Sem 2</Label>
						</div>
					</RadioGroup>

					<Label className="block mb-4 font-semibold mt-6" htmlFor="matric">
						Matric Number:
					</Label>
					<div className="flex justify-between space-x-5">
						<Input
							type="text"
							id="matric"
							value={matric}
							onChange={(e) => setMatric(e.target.value)}
							className="block w-full p-2 border rounded"
							placeholder="Enter your matric number"
						/>

						<Button
							type="submit"
							disabled={loading}
							className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
						>
							{loading ? "Searching..." : "Search"}
						</Button>
					</div>
					{error && <p className="text-red-500 mt-2">{error}</p>}
				</form>

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
									<div className="w-fit md:w-96 h-3/4 md:h-96 mx-auto">
										<Lottie animationData={congrats} loop={true} />
									</div>
									<DrawerFooter className="flex">
										<Link
											href="https://forms.gle/your-google-form-link"
											target="_blank"
											passHref
										>
											<Button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
												Register Here
											</Button>
										</Link>
										<DrawerClose>
											<Button variant="outline" className="w-full">
												Close
											</Button>
										</DrawerClose>
									</DrawerFooter>
								</DrawerContent>
							</Drawer>
						) : (
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Congratulations!</DialogTitle>
										<DialogDescription>
											You are eligible to register for the Dean Award ceremony.
										</DialogDescription>
									</DialogHeader>
									<div className="w-fit md:w-96 h-3/4 md:h-96 mx-auto">
										<Lottie animationData={congrats} loop={true} />
									</div>
									<DialogFooter>
										<Link
											href="https://forms.gle/your-google-form-link"
											target="_blank"
											passHref
											className="w-full"
										>
											<Button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
												Register Here
											</Button>
										</Link>
										<DialogClose asChild>
											<Button variant="outline" className="mt-4 w-full">
												Close
											</Button>
										</DialogClose>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						)}
					</>
				)}
			</div>
		</>
	);
}
