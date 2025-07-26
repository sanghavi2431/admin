import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@/components/ui';

const CTASection = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Get Started?</h2>
                <p className="text-base md:text-lg mb-6 md:mb-8">Start your free trial today to get one step closer to Smart-Hygiene.</p>
                <div>
                    <Link to="/sign-up">
                        <Button
                            color="black"
                            variant="solid"
                            shape="round"
                            className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black font-semibold"
                        >
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center">
                <img src="/img/logo/Woloo-SH.png" alt="Woloo Logo" className="w-40 md:w-[300px]" />
            </div>
        </div>
    );
};

export default CTASection;