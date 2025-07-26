import { useState } from "react";

const FooterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Email submitted:", email);
      setEmail(""); 
    }
  };

  return (
    <div className="bg-white py-6 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center mt-4 gap-6 md:gap-0">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mb-4 md:mb-0">
          <img
            src="/img/logo/Woloo-SH.png"
            alt="Logo"
            className="h-16 md:h-20"
          />
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-gray-800 font-semibold text-xs md:text-sm mt-2">
            <span>© Woloo {new Date().getFullYear()}</span>
            <a href="/privacy-policy" className="hover:text-gray-500">
              Privacy Policy
            </a>
            <a href="/cookies-policy" className="hover:text-gray-500">
              Cookies Policy
            </a>
            <a href="/terms-of-use" className="hover:text-gray-500">
              Terms of Use
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-2 md:mt-0 flex flex-col items-center md:items-end">
          <p className="text-gray-800 font-medium text-base md:text-lg">
            Updates right to your Inbox
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="md:col-span-2 px-4 py-2 md:py-3 rounded-lg text-white focus:outline-none text-sm md:text-base"
              style={{ backgroundColor: "#333333" }}
              required
            />
            <button
              type="submit"
              className="py-2 md:py-3 rounded-lg hover:bg-gray-700 font-semibold transition text-sm md:text-base"
              style={{ backgroundColor: "#8D8D8D", color: "#333333" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
