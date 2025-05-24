"use client";

import BlobBackground from "@/components/blob-bg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import CountdownToJune11 from "@/components/countdown";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import stopwatch from "@/public/anim/stopwatch.json";
import graduate from "@/public/anim/graduate.json";

export default function Home() {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();
		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		const raf = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			lenis.destroy();
		};
	}, []);

	const scrollToCountdown = () => {
		const target = document.getElementById("countdown");
		if (target && lenisRef.current) {
			lenisRef.current.scrollTo(target, {
				offset: 0,
				duration: 1.5,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
			});
		}
	};

	return (
		<>
			<Header />
			<div className="relative min-h-screen pt-12">
				<BlobBackground />
				<div className="w-72 h-72 mx-auto col-span-3">
					<Lottie animationData={graduate} loop={true} />
				</div>
				<h1 className="z-10 scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-[8vh] uppercase text-center mb-12">
					2025 Dean award ceremony
				</h1>
				<div className="max-w-3xl mx-auto text-xl">
					<p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
						Celebrating Academic Brilliance at FSKTM.
					</p>
				</div>
				<div className="flex justify-center my-6">
					<div className="flex justify-center my-6">
						<Button
							onClick={scrollToCountdown}
							className="inline-block min-w-[120px] px-6 md:px-8 py-0 h-[50px] text-[#422800] text-[18px] font-semibold text-center bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
						>
							Let{"'"}s Explore
						</Button>
					</div>
				</div>
			</div>
			<div
				className="min-h-screen grid grid-cols-1 md:grid-cols-7 items-center justify-items-center gap-8 px-4 py-10"
				id="countdown"
			>
				<div className="w-96 h-96 mx-auto col-span-3">
					<Lottie animationData={stopwatch} loop={true} />
				</div>

				<div className="w-full max-w-2xl col-span-4">
					<CountdownToJune11 />
				</div>
			</div>

			<Footer />
		</>
	);
}
