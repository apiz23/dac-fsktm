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
import Lottie from "lottie-react";
import congrats from "@/public/anim/congrats.json";
import confetti from "canvas-confetti";
import search from "@/public/anim/search.json";
import { Loader2 } from "lucide-react";
import { LineShadowText } from "./magicui/line-shadow-text";

export default function DeanAwardSearch() {
	const [matric, setMatric] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
	const [openResult, setOpenResult] = useState(false);
	const [eligibilityResult, setEligibilityResult] = useState<{
		eligible: boolean;
		eligibleSemesters: string[];
	} | null>(null);

	const isMobile = useIsMobile();

	const triggerConfetti = () => {
		const end = Date.now() + 3 * 1000;
		const colors = ["#ff0000", "#0066cc"];

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
		setEligibilityResult(null);

		if (!matric.trim()) {
			setError("Please enter your matriculation number");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(
				`/api/dean-award/search?id=${encodeURIComponent(matric.trim())}`
			);

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.error || "Failed to verify eligibility");
			}

			const data = await res.json();
			setEligibilityResult(data);

			if (data.eligible) {
				setOpenSearch(false);
				setOpenResult(true);
				triggerConfetti();
			} else {
				setError("No eligible record found for either semester");
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message || "Error verifying eligibility");
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="h-screen py-20 bg-white">
			<div className="mx-auto max-w-5xl text-center px-4">
				<header className="mb-16">
					<div className="w-full md:w-96 h-64 mx-auto">
						<Lottie animationData={search} loop={true} />
					</div>

					<h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl mb-6">
						<span className="bg-gradient-to-r from-[#dac8b4] to-[#422800] bg-clip-text text-transparent">
							Dean{"'"}s List Award
						</span>
						<span className="block mt-4">
							Eligibility <LineShadowText>Check</LineShadowText>
						</span>
					</h1>

					<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
						Verify your qualification for this prestigious academic honor recognizing
						exceptional performance and scholarly achievement
					</p>
				</header>

				<Button
					onClick={() => setOpenSearch(true)}
					className="inline-block z-50 w-fit md:px-8 py-0 h-[50px] text-[#422800] text-[18px] font-semibold text-center bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
				>
					Check Your Eligibility
				</Button>

				{isMobile ? (
					<Drawer open={openSearch} onOpenChange={setOpenSearch}>
						<DrawerContent className="h-fit">
							<DrawerHeader>
								<DrawerTitle className="text-2xl">Check Eligibility</DrawerTitle>
								<DrawerDescription>
									Enter your matriculation number to verify your qualification
								</DrawerDescription>
							</DrawerHeader>
							<div className="p-6 overflow-y-auto">
								<form onSubmit={handleSearch} className="space-y-6">
									<div>
										<Label
											htmlFor="matric"
											className="block mb-3 font-medium text-gray-700"
										>
											Matriculation Number
										</Label>
										<Input
											type="text"
											id="matric"
											value={matric}
											onChange={(e) => setMatric(e.target.value)}
											className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											placeholder="e.g. ABC12345"
											aria-describedby="matric-help"
										/>
										<p id="matric-help" className="mt-2 text-sm text-gray-500">
											Enter your university matriculation number
										</p>
									</div>

									{error && (
										<div className="p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>
									)}
									<Button
										type="submit"
										disabled={loading}
										className="inline-flex items-center justify-center w-full min-w-[140px] sm:min-w-[160px] px-4 sm:px-6 md:px-8 py-2 h-12 sm:h-14 text-base sm:text-lg md:text-xl font-semibold text-[#422800] bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white transition-all active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
									>
										{loading ? (
											<span className="flex items-center justify-center gap-2">
												<Loader2 className="h-4 w-4 animate-spin" />
												Verifying...
											</span>
										) : (
											"Check Eligibility"
										)}
									</Button>
								</form>
							</div>
						</DrawerContent>
					</Drawer>
				) : (
					<Dialog open={openSearch} onOpenChange={setOpenSearch}>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle>Check Eligibility</DialogTitle>
								<DialogDescription>
									Enter your matriculation number to verify your qualification
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<form onSubmit={handleSearch} className="space-y-6">
									<div>
										<Label
											htmlFor="matric"
											className="block mb-3 font-medium text-gray-700"
										>
											Matriculation Number
										</Label>
										<Input
											type="text"
											id="matric"
											value={matric}
											onChange={(e) => setMatric(e.target.value)}
											className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
											placeholder="e.g. ABC12345"
											aria-describedby="matric-help"
										/>
										<p id="matric-help" className="mt-2 text-sm text-gray-500">
											Enter your university matriculation number
										</p>
									</div>

									{error && (
										<div className="p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>
									)}

									<DialogFooter>
										<Button
											type="submit"
											disabled={loading}
											className="inline-flex items-center justify-center w-full min-w-[140px] sm:min-w-[160px] px-4 sm:px-6 md:px-8 py-2 h-12 sm:h-14 text-base sm:text-lg md:text-xl font-semibold text-[#422800] bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white transition-all active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
										>
											{loading ? (
												<span className="flex items-center justify-center gap-2">
													<Loader2 className="h-4 w-4 animate-spin" />
													Verifying...
												</span>
											) : (
												"Check Eligibility"
											)}
										</Button>
									</DialogFooter>
								</form>
							</div>
						</DialogContent>
					</Dialog>
				)}

				{isMobile ? (
					<Drawer open={openResult} onOpenChange={setOpenResult}>
						<DrawerContent className="h-[80vh]">
							<DrawerHeader>
								<DrawerTitle className="text-2xl text-green-600">
									{eligibilityResult?.eligibleSemesters.length === 2
										? "Congratulations!"
										: "Well Done!"}
								</DrawerTitle>
								<DrawerDescription>
									{eligibilityResult?.eligibleSemesters.length === 2
										? "You've qualified for both semesters!"
										: `You've qualified for Semester ${eligibilityResult?.eligibleSemesters[0]}!`}
								</DrawerDescription>
							</DrawerHeader>
							<div className="p-6 overflow-y-auto">
								<div className="w-full h-72 mx-auto">
									<Lottie animationData={congrats} loop={false} />
								</div>
								<div className="mt-4 text-center">
									{eligibilityResult?.eligibleSemesters.map((sem) => (
										<div key={sem} className="mb-2 text-lg font-medium">
											✅ Eligible for Semester {sem} 23/24
										</div>
									))}
								</div>
							</div>
							<p className="text-center text-gray-600 mt-4">
								You{"'"}re invited to attend the award ceremony
							</p>
							<DrawerFooter className="gap-3">
								<Link href="/dean-award/register" passHref>
									<Button className="w-full bg-green-600 hover:bg-green-700">
										Register Here
									</Button>
								</Link>
								<DrawerClose asChild>
									<Button variant="outline" className="w-full">
										Close
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				) : (
					<Dialog open={openResult} onOpenChange={setOpenResult}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-green-600">
									{eligibilityResult?.eligibleSemesters.length === 2
										? "Double Congratulations!"
										: "Congratulations!"}
								</DialogTitle>
								<DialogDescription>
									{eligibilityResult?.eligibleSemesters.length === 2
										? "You've made the Dean's List for both semesters!"
										: `You've made the Dean's List for Semester ${eligibilityResult?.eligibleSemesters[0]}!`}
								</DialogDescription>
							</DialogHeader>
							<div className="w-fit md:w-96 h-3/4 md:h-96 mx-auto">
								<Lottie animationData={congrats} loop={true} />
							</div>
							<div className="text-center space-y-2">
								{eligibilityResult?.eligibleSemesters.map((sem) => (
									<div key={sem} className="text-lg font-medium">
										🎉 Eligible for Semester {sem} 23/24
									</div>
								))}
							</div>
							<DialogFooter>
								<Link href="/dean-award/register" passHref className="w-full">
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
			</div>
		</section>
	);
}
