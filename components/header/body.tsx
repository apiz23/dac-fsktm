"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { blur } from "./anim";

interface LinkItem {
	title: string;
	href: string;
	src: string;
}

interface SelectedLink {
	isActive: boolean;
	index: number;
}

interface BodyProps {
	links: LinkItem[];
	selectedLink: SelectedLink;
	setSelectedLink: Dispatch<SetStateAction<SelectedLink>>;
}

export default function Body({
	links,
	selectedLink,
	setSelectedLink,
}: BodyProps) {
	return (
		<div className="flex flex-wrap mt-10 lg:mt-20 max-w-full lg:max-w-[1200px]">
			{links.map((link, index) => {
				const { title, href } = link;
				return (
					<Link
						key={`l_${index}`}
						href={href}
						className="no-underline uppercase text-black"
					>
						<motion.p
							onMouseOver={() => setSelectedLink({ isActive: true, index })}
							onMouseLeave={() => setSelectedLink({ isActive: false, index })}
							variants={blur}
							animate={
								selectedLink.isActive && selectedLink.index !== index
									? "open"
									: "closed"
							}
							className="m-0 whitespace-normal text-[32px] pr-[30px] pt-[10px] font-light lg:text-[5vw] lg:pr-[2vw] tracking-wide"
						>
							{title}
						</motion.p>
					</Link>
				);
			})}
		</div>
	);
}
