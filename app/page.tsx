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
import DeanAwardSearch from "@/components/dean-award-search";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

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
		const target = document.getElementById("eligible");
		if (target && lenisRef.current) {
			lenisRef.current.scrollTo(target, {
				offset: 0,
				duration: 1.5,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			});
		}
	};

	return (
		<>
			<Header />
			<div className="relative min-h-screen pt-32 md:pt-10 border-b-4 border-black">
				<BlobBackground />
				<div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center h-full">
					<div className="w-56 h-56 sm:w-80 sm:h-80 mx-auto">
						<Lottie animationData={graduate} loop={true} />
					</div>

					<h1 className="z-10 scroll-m-20 max-w-4xl mx-auto px-4 text-3xl sm:text-4xl md:text-5xl lg:text-[6vh] xl:text-[8vh] font-extrabold tracking-wide uppercase text-center mb-6 md:mb-10 lg:mb-12">
						<span className="text-black">2023/2024 Dean Award </span>
						<LineShadowText>Ceremony</LineShadowText>
					</h1>
					<div className="max-w-3xl mx-auto px-4 text-lg sm:text-xl md:text-2xl">
						<p className="leading-7 sm:leading-8 text-center">
							Celebrating Academic Brilliance at FSKTM
						</p>
					</div>

					<div className="flex justify-center my-6 md:my-8 lg:my-10 w-full px-4">
						<Button
							onClick={scrollToCountdown}
							className="inline-flex items-center justify-center min-w-[140px] sm:min-w-[160px] px-4 sm:px-6 md:px-8 py-2 h-12 sm:h-14 text-base sm:text-lg md:text-xl font-semibold text-[#422800] bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white transition-all active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
						>
							Let{"'"}s Explore
						</Button>
					</div>
				</div>
			</div>
			<div className="min-h-[70vh] border-b-4 border-black" id="eligible">
				<DeanAwardSearch />
			</div>
			<div
				className="border-b-4 border-black min-h-screen grid grid-cols-1 md:grid-cols-7 items-center justify-items-center md:gap-8 px-4 py-10 pb-20 bg-gradient-to-b from-white to-neutral-200"
				id="countdown"
			>
				<div className="w-fit md:w-96 h-3/4 md:h-96 mx-auto col-span-3">
					<Lottie animationData={stopwatch} loop={true} />
				</div>

				<div className="w-full max-w-2xl col-span-4 ">
					<CountdownToJune11 />
				</div>
			</div>

			<Footer />
		</>
	);
}
