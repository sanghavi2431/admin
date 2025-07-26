import React, { useEffect } from "react";
import { setLayout } from "@/store/theme/themeSlice";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HygieneSolutions from "./components/HygieneSolutions";
import TestimonialSection from "./components/TestimonialSection";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";
import { LAYOUT_TYPE_BLANK, LAYOUT_TYPE_AUTH } from "@/constants/theme.constant";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLayout(LAYOUT_TYPE_BLANK));

        return () => {
            dispatch(setLayout(LAYOUT_TYPE_AUTH));
        };
    }, []);

    return (
        <div className="h-screen overflow-auto scroll-smooth bg-white px-4 md:px-6">
            <section className="my-4 sticky top-4">
                <Navbar />
            </section>
            <section className="w-full md:w-4/5 mx-auto my-8 md:my-20">
                <HeroSection />
            </section>
            <section className="w-full md:w-4/5 mx-auto my-8 md:my-20 md:py-4">
                <HygieneSolutions />
            </section>
            <section className="w-full md:w-4/5 mx-auto my-8 md:my-20 md:py-4">
                <TestimonialSection />
            </section>
            <section className="w-full md:w-4/5 mx-auto my-8 md:my-20 md:py-4">
                <CTASection />
            </section>
            <section>
                <FooterSection />
            </section>
        </div>
    );
};

export default Home;
