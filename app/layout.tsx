import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
				<Toaster richColors />
				<div className="overflow-y-hidden">{children}</div>
			</body>
		</html>
	);
}
