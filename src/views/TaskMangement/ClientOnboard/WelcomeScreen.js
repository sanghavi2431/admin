import React from "react";
import { Button } from "@/components/ui";

const WelcomeScreen = ({openPopup}) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-4/5 flex flex-col-reverse md:flex-row items-center justify-between">
                <div className="max-w-lg">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight font-['Century Gothic']">
                        Welcome to your <br />
                        <span className="text-[#00C3DE]">Smart Hygiene</span> Dashboard
                    </h1>
                    <p className="text-lg sm:text-xl mt-4">
                        You’re there! Just a few more steps to get you started with your Smart Hygiene Journey.
                    </p>
                    <Button
                        color="black"
                        variant="solid"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold py-3 px-6 w-auto md:w-[231px] transition duration-300 mt-6"
                        onClick={() => openPopup()}
                    >
                        Get Started
                    </Button>
                </div>
                <div className="w-1/2 flex justify-end">
                    <img
                        className="h-full"
                        src="/img/others/WelcomeImg.png"
                        alt="Welcome Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
