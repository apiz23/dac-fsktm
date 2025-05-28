"use client";

import React from "react";
import Lottie from "lottie-react";
import faq from "@/public/anim/faq.json";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";
import Image from "next/image";
import accordion1 from "@/public/img/accordion1.png";

export default function FAQ() {
	const faqItems = [
		{
			question: "Is there a release letter (surat pelepasan kuliah) provided?",
			answer: "Yes, we provide release letters.",
		},
		{
			question:
				"How do the meal options work for those eligible for both Dean's List semesters 23/24?",
			answer:
				"For both semesters 23/24, you have to choose one of the food options. For example, if you only want food in the morning, you can select option 1, if you want food in the evening, select option 2, if you want food in the morning and evening, select option 3",
			img: accordion1,
		},
		{
			question:
				"What are the differences between Session 1 (morning) and Session 2 (evening)?",
			answer:
				"Session 1, which is held in the morning, is for students who received the Dean's Award for Semester 1 of the 2023/2024 session. Session 2, held in the evening, is for those who received the Dean's Award for Semester 2 of the same academic year.",
		},
	];

	return (
		<section className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center space-y-5">
					<h1 className="z-50 w-fit mx-auto px-8 py-3 text-[#422800] text-2xl md:text-5xl font-bold text-center bg-[#fbeee0] border-[3px] border-[#422800] rounded-xl shadow-[6px_6px_0_0_#422800] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform select-none">
						Frequently Asked Questions
					</h1>
					<p className="mt-4 text-xl text-gray-600">
						Find answers to common questions about our service.
					</p>
				</div>

				<div className="flex flex-col lg:flex-row md:gap-12 items-center">
					<div className="w-fit h-full md:w-3/4 md:h-full mx-auto">
						<Lottie animationData={faq} loop={true} />
					</div>

					<div className="w-full lg:w-2/3">
						<Accordion type="single" collapsible className="space-y-4">
							{faqItems.map((item, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="border border-gray-200 rounded-lg overflow-hidden"
								>
									<AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50 bg-gray-50">
										<span className="text-lg font-medium text-gray-900">
											{item.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="px-6 py-4 bg-white text-gray-600 space-y-4">
										<p>{item.answer}</p>
										{item.img && (
											<div className="w-full">
												<Image
													src={item.img}
													alt="Accordion illustration"
													className="rounded-md border"
												/>
											</div>
										)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</section>
	);
}
