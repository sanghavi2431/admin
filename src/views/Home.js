import React, { useEffect } from "react";
import { setLayout } from "@/store/theme/themeSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LAYOUT_TYPE_AUTH, LAYOUT_TYPE_BLANK } from "@/constants/theme.constant";

const services = [
  { id: 1, name: "Cleaning Services", image: "/img/services/cleaning.jpg" },
  {
    id: 2,
    name: "Exclusive Wet Sofa Cleaning",
    image: "/img/services/wet-sofa.jpg",
  },
  {
    id: 3,
    name: "Exclusive Kitchen Chimney Cleaning",
    image: "/img/services/kitchen-chimney.jpg",
  },
  {
    id: 4,
    name: "Mandatory Housekeeping Hygiene Services",
    image: "/img/services/housekeeping.jpg",
  },
  { id: 5, name: "Pest Control", image: "/img/services/pest-control.jpg" },
  { id: 6, name: "Appliance Care", image: "/img/services/appliance-care.jpg" },
  { id: 7, name: "Health Checkup", image: "/img/services/health-checkup.jpg" },
  {
    id: 8,
    name: "Certified Electrical Audit",
    image: "/img/services/electrical-audit.jpg",
  },
];

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLayout(LAYOUT_TYPE_BLANK));

    return () => {
      dispatch(setLayout(LAYOUT_TYPE_AUTH));
    };
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="">
          <div className="flex justify-between items-center py-3 space-x-4">
            {/* Logo and Icon */}
            <div className="bg-[#FFEB00] rounded-2xl shadow-lg p-3">
              <a href="#">
                <img
                  src="/img/logo/Woloo-SH.png"
                  alt="WHMS Logo"
                  className="h-8 w-auto sm:h-10"
                />
              </a>
            </div>

            {/* Primary Navigation */}
            <div className="grow bg-[#FFEB00] rounded-2xl shadow-lg flex justify-between items-center space-x-4 px-5 py-3">
              <div className="hidden md:flex space-x-7">
                <a
                  href="#"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  Resources
                </a>
                <Link
                  to="/sign-in"
                  className="text-base font-semibold text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
              </div>

              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button className="bg-[#00C3DE] hover:bg-[#00c4deb5] text-black whitespace-nowrap font-bold py-3 px-5 rounded-2xl shadow-lg">
                  Get Free Trial
                </button>
              </div>
            </div>
          </div>
        </nav>
      </section>
      <section className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-relaxed">
            Indian Sanitation is{" "}
            <span className="text-[#00C3DE] text-5xl"> Complex </span> <br />
            Managing that can be{" "}
            <span className="text-[#00C3DE] text-5xl"> Easy </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Woloo’s Smart Hygiene software is poised to transform the Indian
            sanitation industry. By reimagining and setting new standards for
            enterprise sanitation management systems, we have simplified the
            process significantly.
          </p>
          <button className="bg-[#00C3DE] hover:bg-[#00c4deb5] text-black font-bold py-3 px-8 rounded-2xl shadow-lg">
            Get Free Trial
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <img
          src={"/img/others/dashboard-ss.png"}
          alt="Dashboard Screenshot"
          className="mx-auto"
        />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h2 className="text-center font-bold text-2xl mb-4">
          Brands that have Trusted Us
        </h2>
        <div className="container mx-auto px-4 bg-[#00C3DE] rounded-xl shadow-lg">
          <div className="flex justify-center items-center space-x-8 overflow-x-auto">
            <div className="flex-shrink-0">
              <img src="path/to/logo1.png" alt="Modern Home" className="h-12" />
            </div>
            <div className="flex-shrink-0">
              <img
                src="path/to/logo2.png"
                alt="Style Vintage"
                className="h-12"
              />
            </div>
            <div className="flex-shrink-0">
              <img src="path/to/logo3.png" alt="Brand" className="h-12" />
            </div>
            <div className="flex-shrink-0">
              <img src="path/to/logo4.png" alt="Nature Home" className="h-12" />
            </div>
            <div className="flex-shrink-0">
              <img
                src="path/to/logo5.png"
                alt="Classic Design Studio"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="max-w-5xl mx-auto flex flex-col space-y-10">
          {/* Usage Report Section */}
          <div className="flex items-center">
            <div>
              <img src="/img/others/Usage-Report-SS.png" alt="Usage Report" />
            </div>
            <p className="text-gray-700 text-3xl text-right font-bold leading-10">
              <span className="text-[#00C3DE] font-semibold">
                Usage Reports
              </span>{" "}
              that you understand like a{" "}
              <span className="text-[#00C3DE] font-semibold">PRO</span>
            </p>
          </div>

          {/* Facility Performance Section */}
          <div className="flex justify-between items-center text-left">
            <p className="text-gray-700 text-3xl text-left font-bold leading-10">
              Monitor your{" "}
              <span className="text-[#00C3DE] font-semibold">Facilities</span>{" "}
              like never before!
            </p>
            <div>
              <img
                src="/img/others/Facility-Performance-SS.png"
                alt="Facility Performance"
              />
            </div>
          </div>

          {/* Air Quality vs Usage */}
          <div className="flex flex-col items-center space-y-4">
            <p className="w-3/5 text-gray-700 text-3xl text-center font-bold leading-10">
              Differentiate between your{" "}
              <span className="text-[#00C3DE] font-semibold">Air Quality</span>{" "}
              and <span className="text-[#00C3DE] font-semibold">Usage</span>
              ... Because some things do{" "}
              <span className="text-[#00C3DE] font-semibold">Matter</span>!
            </p>
            <div>
              <img
                src="/img/others/AirQualityVSUsage-SS.png"
                alt="Facility Performance"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="relative w-full h-64 md:h-96 bg-gray-800">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/img/others/facility-management-bg.png')",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <div className="relative flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-2xl text-white font-bold">
                Explore <br /> Facility Management
              </h2>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center text-center"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-48 w-full object-cover rounded-md"
                />
                <div className="w-full flex justify-between items-center space-x-4 text-black">
                  <p className="text-left text-base font-semibold">
                    {service.name}
                  </p>
                  <button className="px-6 py-2 bg-[#FFEB00] font-bold rounded-full hover:bg-[#ffea008f]">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="my-10 border-black" />
      <section className="max-w-7xl mx-auto p-10 flex justify-between items-center">
        <p className="w-1/2 text-black text-2xl font-bold">
          Start your
          <span className="text-[#00C3DE] font-semibold"> Free Trial </span>
          today And Experience the world of
          <span className="text-[#00C3DE] font-semibold"> Smart Hygiene </span>
          Technology!
        </p>
        <button className="bg-[#00C3DE] hover:bg-[#00c4deb5] text-black font-bold py-3 px-8 rounded-2xl shadow-lg">
          Get Free Trial
        </button>
      </section>
    </div>
  );
};

export default Home;
