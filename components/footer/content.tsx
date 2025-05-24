import React from "react";

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
					<h3 className="mb-2 uppercase text-black">Follow MPP</h3>
					<p>Instagram</p>
					<p>TikTok</p>
					<p>Facebook</p>
					<p>X (Twitter)</p>
				</div>
			</div>

			{/* ITC Section */}
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h3 className="mb-2 uppercase text-black">Follow ITC</h3>
					<p>Instagram</p>
					<p>TikTok</p>
					<p>YouTube</p>
					<p>Facebook</p>
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
