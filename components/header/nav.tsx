"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "./anim";
import Body from "./body";

const links = [
	{ title: "Home", href: "/", src: "home.png" },
	{ title: "Shop", href: "/shop", src: "shop.png" },
	{ title: "About Us", href: "/about", src: "home.png" },
	{ title: "Lookbook", href: "/lookbook", src: "lookbook.png" },
	{ title: "Contact", href: "/contact", src: "contact.png" },
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
			<div className="flex flex-col gap-[50px] mb-20 lg:flex-row lg:justify-between lg:mb-0 bg-neutral-200">
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
