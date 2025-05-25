import React from "react";
import Content from "./content";

export default function Footer() {
	return (
		<div
			className="relative h-[70vh] md:h-[70vh]"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="fixed bottom-0 h-[70vh] md:h-[70vh] w-full">
				<Content />
			</div>
		</div>
	);
}
