import React from "react";
import { Button } from '@/components/ui';
import { Link } from "react-router-dom";

const PremiumPrompt = () => {
    return (
        <div className="w-full flex items-center justify-center p-8">
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <img src="/img/icons/sad-face.png" />
                <h2 className="text-xl font-bold">Sorry!</h2>
                <p className="text-lg text-black font-bold">
                    Please purchase the premium <br /> version to move ahead.
                </p>
                <Link to={'/subscriptionPlans'}>
                    <Button
                        block
                        variant="solid"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] mt-3"
                        color="black"
                        size="sm"
                    >
                        Buy Premium
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PremiumPrompt;