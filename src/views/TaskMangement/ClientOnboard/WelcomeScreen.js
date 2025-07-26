import React from "react";
import { Button } from "@/components/ui";

const WelcomeScreen = ({ openPopup }) => {
    return (
        <div className="w-full h-full flex justify-center items-center px-4 py-8">
            <div className="max-w-6xl md:w-4/5 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-tight">
                        Welcome to your <br />
                        <span className="text-[#00C3DE]">Smart Hygiene</span> Dashboard
                    </h1>
                    <p className="text-lg sm:text-xl mt-4 text-gray-700">
                        You’re there! Just a few more steps to get you started with your Smart Hygiene Journey.
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <Button
                            color="black"
                            variant="solid"
                            shape="round"
                            className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold py-3 px-6 w-auto md:w-[231px] transition duration-300 mt-6"
                            onClick={() => openPopup()}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <img
                        className="w-3/5 md:w-3/4 max-w-md"
                        src="/img/others/SH_Welcome.png"
                        alt="Welcome Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
