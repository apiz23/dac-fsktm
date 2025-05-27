import Lottie from "lottie-react";
import React from "react";
import pinpoint from "@/public/anim/pinpoint.json";
import { Calendar, Landmark, Shirt } from "lucide-react";

export default function Inform() {
	return (
		<div className="relative min-h-fit py-32 flex flex-col md:flex-row items-center justify-center p-4 bg-gradient-to-b from-neutral-200 to-white">
			{/* Animation container - positioned to the left on larger screens */}
			<div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
				<div className="w-fit h-full md:w-full md:h-full mx-auto">
					<Lottie animationData={pinpoint} loop={true} />
				</div>
			</div>

			<div className="relative z-10 p-4 w-full md:w-2/3 max-w-2xl">
				<h1 className="mb-10 z-50 w-fit mx-auto px-8 py-3 text-[#422800] text-2xl md:text-4xl font-bold text-center bg-[#fbeee0] border-[3px] border-[#422800] rounded-xl shadow-[6px_6px_0_0_#422800] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform select-none">
					Details Information
				</h1>

				<div className="space-y-6 text-gray-700">
					<div className="flex items-start">
						<div className="flex-shrink-0">
							<Calendar className="h-8 w-8" />
						</div>
						<div className="ml-3">
							<h2 className="text-lg font-semibold text-gray-800">Date</h2>
							<p className="mt-1">11 June 2025 (Wednesday)</p>
						</div>
					</div>

					<div className="flex items-start">
						<div className="flex-shrink-0">
							<Landmark className="h-8 w-8" />
						</div>
						<div className="ml-3">
							<h2 className="text-lg font-semibold text-gray-800">Venue</h2>
							<p className="mt-1">Lecture Hall A, G3</p>
						</div>
					</div>

					<div className="flex items-start">
						<div className="flex-shrink-0">
							<Shirt className="h-8 w-8" />
						</div>
						<div className="ml-3">
							<h2 className="text-lg font-semibold text-gray-800">Dress Code</h2>
							<p className="mt-1">Formal Attire</p>
						</div>
					</div>

					<div className="pt-4 border-t border-gray-200">
						<p className="text-sm text-gray-500 italic">
							Kindly note that details may be subject to change. We look forward to
							celebrating your achievements!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
