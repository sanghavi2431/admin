import React from 'react';
import { Button } from '@/components/ui';

const CTASection = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-lg mb-8">Start your free trial today to get one step closer to Smart-Hygiene.</p>
                <div>
                    <Button
                        color="black"
                        variant="solid"
                        shape="round"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black font-semibold"
                    >
                        Get started
                    </Button>
                </div>
            </div>
            <div>
                <img src="/img/logo/Woloo-SH.png" alt="Woloo Logo" className="w-[300px]" />
            </div>
        </div>
    );
};

export default CTASection;