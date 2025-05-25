"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "./anim";
import Body from "./body";

const links = [
	{ title: "Home", href: "/", src: "home.png" },
	{ title: "CheckEligable", href: "#eligible", src: "shop.png" },
	{ title: "Countdown", href: "#countdown", src: "home.png" },
	{
		title: "TechVentura",
		href: "https://tech-ventura.vercel.app/",
		src: "home.png",
	},
];

export default function Nav() {
	const [selectedLink, setSelectedLink] = useState({
		isActive: false,
		index: 0,
	});

	return (
		<motion.div
			variants={height}
			initial="initial"
			animate="enter"
			exit="exit"
			className="overflow-hidden"
		>
			<div className="flex flex-col gap-[50px] mb-20 lg:flex-row lg:justify-between lg:mb-0 bg-neutral-200 p-4 md:p-10">
				<div className="flex flex-col justify-between">
					<Body
						links={links}
						selectedLink={selectedLink}
						setSelectedLink={setSelectedLink}
					/>
				</div>
			</div>
		</motion.div>
	);
}
