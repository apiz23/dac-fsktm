import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FSKTM Dean's Award Ceremony 2024 🎓 | UTHM",
	description:
		"🎉 Celebrating academic excellence at Faculty of Computer Science and Information Technology (FSKTM), Universiti Tun Hussein Onn Malaysia. Join us for the prestigious Dean's Award Ceremony! 🏆",
	icons: {
		icon: [
			{
				url: "/icon/favicon.ico",
				href: "/icon/favicon.ico",
			},
		],
	},
	keywords: [
		"FSKTM",
		"Dean Award",
		"UTHM",
		"academic excellence",
		"award ceremony",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				<div className="overflow-y-hidden">
					<Toaster position="top-center" richColors />
					{children}
				</div>
			</body>
		</html>
	);
}
