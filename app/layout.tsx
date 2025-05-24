import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: "500",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FSKTM Ascend",
	description: "FSKTM Dean Award Ceremony",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
