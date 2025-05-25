"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

const getTimeLeft = (targetDate: Date): TimeLeft => {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();

	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
};

export default function CountdownToJune11() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
		getTimeLeft(new Date(new Date().getFullYear(), 5, 11))
	);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		const targetDate = new Date(new Date().getFullYear(), 5, 11);

		const interval = setInterval(() => {
			const newTimeLeft = getTimeLeft(targetDate);
			setTimeLeft(newTimeLeft);

			if (
				newTimeLeft.days === 0 &&
				newTimeLeft.hours === 0 &&
				newTimeLeft.minutes === 0 &&
				newTimeLeft.seconds === 0
			) {
				setIsComplete(true);
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatLabel = (value: number, unit: string) => {
		return `${unit}${value !== 1 ? "s" : ""}`;
	};

	return (
		<div className="text-center md:my-20">
			<h1 className="z-50 w-fit mx-auto px-8 py-3 text-[#422800] text-2xl md:text-5xl font-bold text-center bg-[#fbeee0] border-[3px] border-[#422800] rounded-xl shadow-[6px_6px_0_0_#422800] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform select-none">
				✨ Counting days ✨
			</h1>
			{isComplete ? (
				<p className="mt-6 text-xl font-semibold text-green-600">
					🎉 The ceremony day is here! 🎉
				</p>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-6 text-lg font-semibold px-2">
					{[
						{ value: timeLeft.days, label: "Day" },
						{ value: timeLeft.hours, label: "Hour" },
						{ value: timeLeft.minutes, label: "Minute" },
						{ value: timeLeft.seconds, label: "Second" },
					].map(({ value, label }, idx) => (
						<div
							key={idx}
							className="p-4 bg-white shadow-md rounded-lg text-gray-800"
						>
							<span className="text-3xl font-bold">{value}</span>
							<span className="block text-sm mt-1">{formatLabel(value, label)}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
