"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { background, fadeTransform } from "./anim";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Nav from "./nav";
import Image from "next/image";
import uthmLogo from "@/public/img/logoUthm.png";

export default function Index() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="fixed w-screen box-border p-2 md:px-10 z-40 border-b-2 border-black bg-white">
			<div className="flex justify-between items-center text-[25px] sm:text-[30px] font-normal relative z-50">
				{/* Left side: logo (hidden on mobile) */}
				<div className="hidden sm:flex items-center md:px-5">
					<Image
						src={uthmLogo}
						alt="fsktmLogo"
						width={1000}
						height={1000}
						className="h-10 w-fit"
					/>
				</div>

				{/* Left side mobile: Title on small screens only */}
				<Link href="/" className="sm:hidden text-black no-underline font-semibold">
					DAC FSKTM
				</Link>

				{/* Center title for larger screens only */}
				<Link
					href="/"
					className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 text-black no-underline font-semibold"
				>
					DAC FSKTM
				</Link>

				{/* Right side: Menu button */}
				<div className="flex items-center justify-center gap-2 cursor-pointer">
					<div
						onClick={() => setIsActive(!isActive)}
						className="flex items-end justify-end gap-2 cursor-pointer relative"
					>
						<motion.div
							variants={background}
							initial="initial"
							animate={isActive ? "open" : "closed"}
							className="bg-black opacity-50 fixed inset-0 z-30"
						/>

						<AnimatePresence mode="wait">
							<Button
								className="inline-block z-50 w-fit md:px-8 py-0 h-[50px] text-[#422800] text-[18px] font-semibold text-center bg-[#fbeee0] border-2 border-[#422800] rounded-[30px] shadow-[4px_4px_0_0_#422800] hover:bg-white active:shadow-[2px_2px_0_0_#422800] active:translate-x-[2px] active:translate-y-[2px] select-none"
								role="button"
							>
								<motion.div
									key={isActive ? "x-icon" : "menu-icon"}
									variants={fadeTransform}
									initial="initial"
									animate="open"
									exit="closed"
								>
									{isActive ? (
										<X size={20} className="text-black" />
									) : (
										<Menu size={20} className="text-black" />
									)}
								</motion.div>
							</Button>
							{isActive && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className="fixed top-0 left-0 w-full h-full z-40"
								>
									<Nav />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}
