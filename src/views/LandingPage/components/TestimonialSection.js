import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
    return (
        <div className="">
            <div className="bg-[#00C3DE] shadow-custom rounded-custom p-10">
                <p className="text-white text-lg font-semibold italic mb-6">
                    "Woloo Smart Hygiene has transformed my business hygiene for the better! I keep using their services and earn reward points to then purchase hygiene products from them at a discounted rate. Highly recommended to anyone who is serious about their business."
                </p>
                <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        <img
                            src="/img/others/Jojo.png"
                        />
                    </div>
                    <div className="ml-4">
                        <p className="text-lg text-gray-500">Johnny Owens</p>
                        {/* <p className="text-gray-500">Happy Customer</p> */}
                        <div className='flex space-x-2'>
                            <Star size={18} fill='#FFEB00' className='text-[#FFEB00]' />
                            <Star size={18} fill='#FFEB00' className='text-[#FFEB00]' />
                            <Star size={18} fill='#FFEB00' className='text-[#FFEB00]' />
                            <Star size={18} fill='#FFEB00' className='text-[#FFEB00]' />
                            <Star size={18} fill='#FFEB00' className='text-[#FFEB00]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;