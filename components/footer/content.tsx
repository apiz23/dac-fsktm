import Image from "next/image";
import Link from "next/link";
import React from "react";
import itcLogo from "@/public/img/itcLogo.png";
import mppLogo from "@/public/img/mppLogo.png";
import tvLogo from "@/public/img/tvLogo.png";

export default function Content() {
	return (
		<footer className="bg-neutral-200 h-full w-full text-black flex flex-col">
			<div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8">
				<div className="max-w-7xl mx-auto w-full">
					<Section1 />

					<div className="flex flex-col items-center gap-4 mt-8 md:my-12">
						<div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
							<Image
								src={tvLogo}
								alt="Tech Ventura Logo"
								width={1000}
								height={1000}
								className="h-16 sm:h-20 md:h-24 w-auto"
							/>
							<div className="text-center sm:text-left">
								<h3 className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
									Tech Ventura
								</h3>
								<p className="text-xs sm:text-sm text-gray-600 mt-1">
									Technology Partner for FSKTM Dean{"'"}s Award Ceremony
								</p>
							</div>
						</div>

						<div className="text-center text-xs sm:text-sm text-gray-600 space-y-1">
							<p>Developed by MJ195345 | JG160007</p>
							<p>© {new Date().getFullYear()} Tech Ventura. All rights reserved.</p>
						</div>
					</div>
				</div>
			</div>

			<Section2 />
		</footer>
	);
}

const Section1 = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
			{/* MPP Section */}
			<div className="flex flex-col">
				<div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
					<Image
						src={mppLogo}
						alt="MPP Logo"
						width={1000}
						height={1000}
						className="h-8 sm:h-10 md:h-12 w-auto"
					/>
					<h3 className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-600 to-yellow-400 text-xl sm:text-2xl md:text-3xl font-extrabold">
						Follow MPP
					</h3>
				</div>
				<div className="flex flex-col gap-2 sm:gap-3 pl-1 sm:pl-2">
					<SocialLink
						href="https://www.instagram.com/mpputhm_official/?hl=en"
						platform="instagram"
						label="Instagram"
					/>
					<SocialLink
						href="https://www.tiktok.com/@mpputhm?is_from_webapp=1&sender_device=pc"
						platform="tiktok"
						label="TikTok"
					/>
					<SocialLink
						href="https://www.facebook.com/majlisperwakilanpelajaruthm/?locale=ms_MY"
						platform="facebook"
						label="Facebook"
					/>
				</div>
			</div>

			{/* ITC Section */}
			<div className="flex flex-col">
				<div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
					<Image
						src={itcLogo}
						alt="ITC Logo"
						width={1000}
						height={1000}
						className="h-8 sm:h-10 md:h-12 w-auto"
					/>
					<h3 className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-black to-gray-500 text-xl sm:text-2xl md:text-3xl font-extrabold">
						Follow ITC
					</h3>
				</div>
				<div className="flex flex-col gap-2 sm:gap-3 pl-1 sm:pl-2">
					<SocialLink
						href="https://www.instagram.com/itcfsktm/?hl=en"
						platform="instagram"
						label="Instagram"
					/>
					<SocialLink
						href="https://www.tiktok.com/@itclub.uthm"
						platform="tiktok"
						label="TikTok"
					/>
					<SocialLink
						href="https://www.facebook.com/itcUTHM/?locale=ms_MY"
						platform="facebook"
						label="Facebook"
					/>
				</div>
			</div>
		</div>
	);
};

const SocialLink = ({
	href,
	platform,
	label,
}: {
	href: string;
	platform: "instagram" | "tiktok" | "facebook";
	label: string;
}) => {
	const platformClasses = {
		instagram: "hover:text-blue-600",
		tiktok: "hover:text-pink-500",
		facebook: "hover:text-blue-700",
	};

	return (
		<Link
			href={href}
			className={`hover:underline flex items-center gap-2 transition-colors ${platformClasses[platform]}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span
				className={`i-ph-${
					platform === "tiktok" ? "music-notes-simple" : `${platform}-logo`
				}-bold text-lg sm:text-xl`}
			/>
			<span className="text-sm sm:text-base">{label}</span>
		</Link>
	);
};
const Section2 = () => {
	return (
		<div className="py-4 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-gray-300">
			<div className="max-w-7xl mx-auto">
				<p className="text-xs sm:text-sm text-gray-600 text-center">
					© {new Date().getFullYear()} Universiti Tun Hussein Onn Malaysia (UTHM) |
					FSKTM Dean{"'"}s Award Ceremony
				</p>
			</div>
		</div>
	);
};
