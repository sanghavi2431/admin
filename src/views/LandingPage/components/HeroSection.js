import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const HeroSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-4 md:px-10 py-8 md:py-16 items-center">
            <div className="flex flex-col justify-center gap-4 md:gap-6">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black leading-tight">
                    Smart Hygiene Solutions <br /> for your Business!
                </h1>
                <p className="text-gray-500 text-base sm:text-lg font-semibold">
                    Take your hygiene game to the next level with Woloo's Smart Hygiene solutions for businesses.
                    Monitor, Manage & Monetize now!
                </p>
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
            <div className="mt-6 md:mt-0 flex justify-center">
                <img
                    src="/img/others/HeroImg.png"
                    alt="Dashboard Preview"
                    className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
                />
            </div>
        </div>
    );
};

export default HeroSection;
