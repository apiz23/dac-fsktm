"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animation1 from "@/public/anim/student.json";
import animation2 from "@/public/anim/book.json";

export default function BlobBackground() {
	const isMobile = useIsMobile();

	return (
		<div className="absolute inset-0 overflow-hidden -z-10  bg-gradient-to-b from-white to-neutral-200">
			{/* Blue Blob with Lottie */}
			<div
				className="absolute"
				style={{
					top: isMobile ? "100px" : "0px",
					left: isMobile ? "-50px" : "-100px",
				}}
			>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: 1,
						y: [0, -10, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-blue-200 rounded-full opacity-80 border-4 border-blue-400 shadow-lg"
				/>
				<div
					className="hidden md:block relative"
					style={{
						top: isMobile ? "170px" : "-90px",
						left: isMobile ? "30px" : "50px",
						width: isMobile ? "200px" : "350px",
						height: isMobile ? "400px" : "550px",
					}}
				>
					<Lottie animationData={animation1} loop={true} />
				</div>
			</div>

			<div
				className="absolute"
				style={{
					top: isMobile ? "250px" : "200px",
					right: isMobile ? "-70px" : "-130px",
				}}
			>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: 1,
						y: [0, -15, 0],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 0.5,
					}}
					className="w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-red-400 rounded-full opacity-80 border-4 border-red-500 shadow-lg"
				/>
				<div
					className="hidden md:block relative"
					style={{
						top: isMobile ? "150px" : "-150px",
						right: isMobile ? "30px" : "-100px",
						width: isMobile ? "250px" : "260px",
						height: isMobile ? "500px" : "720px",
					}}
				>
					<Lottie animationData={animation2} loop={true} />
				</div>
			</div>
		</div>
	);
}
