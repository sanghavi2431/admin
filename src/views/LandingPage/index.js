import React, { useEffect } from "react";
import { setLayout } from "@/store/theme/themeSlice";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection";
import HygieneSolutions from "./components/HygieneSolutions";
import TestimonialSection from "./components/TestimonialSection";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLayout("blank"));

        return () => {
            dispatch(setLayout(""));
        };
    }, []);

    return (
        <div className="h-screen overflow-auto scroll-smooth bg-white p-6">
            <section>
                <Navbar />
            </section>
            <section className="w-4/5 mx-auto my-16">
                <HeroSection />
            </section>
            <section className="w-4/5 mx-auto my-16">
                <HygieneSolutions />
            </section>
            <section className="w-4/5 mx-auto my-16">
                <TestimonialSection />
            </section>
            <section className="w-4/5 mx-auto my-16">
                <CTASection />
            </section>
            <section>
                <FooterSection />
            </section>
        </div>
    )
}

export default Home;