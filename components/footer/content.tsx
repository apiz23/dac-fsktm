import Image from "next/image";
import Link from "next/link";
import React from "react";
import itcLogo from "@/public/img/itcLogo.png";
import mppLogo from "@/public/img/mppLogo.png";

export default function Content() {
	return (
		<div className="bg-neutral-100 py-8 px-12 h-full w-full flex flex-col justify-between text-black">
			<Section1 />
			<Section2 />
		</div>
	);
}

const Section1 = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
			{/* MPP Section */}
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<div className="flex gap-4">
						<Image
							src={mppLogo}
							alt="logo"
							width={1000}
							height={1000}
							className="h-10 w-fit"
						/>
						<h3 className="mb-2 uppercase inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-600 to-yellow-400 text-3xl font-extrabold">
							Follow MPP
						</h3>
					</div>
					<Link
						className="hover:underline"
						href="https://www.instagram.com/mpputhm_official/?hl=en"
					>
						Instagram
					</Link>
					<Link
						className="hover:underline"
						href="https://www.tiktok.com/@mpputhm?is_from_webapp=1&sender_device=pc"
					>
						TikTok
					</Link>
					<Link
						className="hover:underline"
						href="https://www.facebook.com/majlisperwakilanpelajaruthm/?locale=ms_MY"
					>
						Facebook
					</Link>
				</div>
			</div>

			{/* ITC Section */}
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<div className="flex gap-4">
						<Image
							src={itcLogo}
							alt="logo"
							width={1000}
							height={1000}
							className="h-10 w-fit"
						/>
						<h3 className="mb-2 uppercase inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-black to-gray-500 text-3xl font-extrabold">
							Follow ITC
						</h3>
					</div>
					<Link
						className="hover:underline"
						href="https://www.instagram.com/itcfsktm/?hl=en"
					>
						Instagram
					</Link>
					<Link
						className="hover:underline"
						href="https://www.tiktok.com/@itclub.uthm"
					>
						TikTok
					</Link>
					<Link
						className="hover:underline"
						href="https://www.facebook.com/itcUTHM/?locale=ms_MY"
					>
						Facebook
					</Link>
				</div>
			</div>
		</div>
	);
};

const Section2 = () => {
	return (
		<div className="flex justify-between items-end mt-12 text-sm">
			<p>
				© {new Date().getFullYear()} FSKTM Dean’s Award Ceremony. All rights
				reserved.
			</p>
			<p>Universiti Tun Hussein Onn Malaysia (UTHM)</p>
		</div>
	);
};
