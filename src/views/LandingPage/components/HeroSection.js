import { Button } from "@/components/ui";

const HeroSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-10 py-16">
            <div className="flex flex-col justify-center gap-6">
                <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                    Smart Hygiene Solutions <br /> for your Business!
                </h1>
                <p className="text-gray-500 text-lg font-semibold">
                    Take your hygiene game to the next level with Woloo’s Smart Hygiene solutions for businesses.
                    Monitor, Manage & Monetize now!
                </p>
                <div>
                    <Button
                        color="black"
                        variant="solid"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black font-semibold"
                    >
                        Get started
                    </Button>
                </div>
            </div>
            <div className=" mt-10 lg:mt-0">
                <img
                    src="/img/others/HeroImg.png"
                    alt="Dashboard Preview"
                    className="w-full max-w-lg lg:max-w-2xl"
                />
            </div>
        </div>
    );
};

export default HeroSection;
