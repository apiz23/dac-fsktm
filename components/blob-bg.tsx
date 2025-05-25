"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

export default function BlobBackground() {
	const isMobile = useIsMobile();

	return (
		<div className="absolute inset-0 overflow-hidden -z-10">
			{/* Blue Blob */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="absolute w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-blue-200 rounded-full opacity-80 animate-blob border-4 border-blue-400 shadow-lg"
				style={{
					top: isMobile ? "100px" : "0px",
					left: "-100px",
				}}
			/>

			{/* Red Blob */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="absolute w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-red-400 rounded-full opacity-80 animate-blob border-4 border-red-500 shadow-lg"
				style={{
					top: isMobile ? "300px" : "200px",
					right: "-130px",
				}}
			/>
		</div>
	);
}
