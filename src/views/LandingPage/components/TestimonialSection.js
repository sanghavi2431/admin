import React from 'react';
import { Star } from 'lucide-react';
import useDynamicBorderRadius from "@/utils/hooks/useDynamicBorderRadius";

const TestimonialSection = () => {
    const { elementRef, borderRadius } = useDynamicBorderRadius();

    return (
        <div
            ref={elementRef}
            className="bg-[#00C3DE] shadow-custom rounded-custom p-8 md:p-10"
            style={{ borderRadius: `${borderRadius}px` }}
        >
            <p className="text-white text-base md:text-lg font-semibold italic mb-4 md:mb-6">
                "Woloo Smart Hygiene has transformed my business hygiene for the better! I keep using their services and earn reward points to then purchase hygiene products from them at a discounted rate. Highly recommended to anyone who is serious about their business."
            </p>
            <div className="flex items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold overflow-hidden">
                    <img
                        src="/img/others/Jojo.png"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="ml-2 sm:ml-4">
                    <p className="text-base md:text-lg text-gray-500">Johnny Owens</p>
                    <div className='flex space-x-1 md:space-x-2'>
                        <Star size={16} className='text-[#FFEB00]' fill='#FFEB00' />
                        <Star size={16} className='text-[#FFEB00]' fill='#FFEB00' />
                        <Star size={16} className='text-[#FFEB00]' fill='#FFEB00' />
                        <Star size={16} className='text-[#FFEB00]' fill='#FFEB00' />
                        <Star size={16} className='text-[#FFEB00]' fill='#FFEB00' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;