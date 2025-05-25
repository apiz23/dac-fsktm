"use client";

import { useEffect, useState } from "react";

export default function CountdownToJune11() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const targetDate = new Date(new Date().getFullYear(), 5, 11); // 11 June (month is 0-indexed)

		const updateCountdown = () => {
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();

			if (diff <= 0) {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			setTimeLeft({ days, hours, minutes, seconds });
		};

		const interval = setInterval(updateCountdown, 1000);
		updateCountdown();

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="text-center md:my-20 bg-transparent">
			<h2 className="md:text-5xl text-4xl font-bold">Countdown to Ceremony Day</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-6 text-lg font-semibold px-2">
				<div className="p-4 bg-white shadow-md rounded-lg">
					{timeLeft.days}
					<span className="block text-sm">Days</span>
				</div>
				<div className="p-4 bg-white shadow-md rounded-lg">
					{timeLeft.hours}
					<span className="block text-sm">Hours</span>
				</div>
				<div className="p-4 bg-white shadow-md rounded-lg">
					{timeLeft.minutes}
					<span className="block text-sm">Minutes</span>
				</div>
				<div className="p-4 bg-white shadow-md rounded-lg">
					{timeLeft.seconds}
					<span className="block text-sm">Seconds</span>
				</div>
			</div>
		</div>
	);
}
