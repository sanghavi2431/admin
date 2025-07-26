import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { ShoppingCart } from "lucide-react";
import useDynamicBorderRadius from "@/utils/hooks/useDynamicBorderRadius";

const menuItems = [
    // { name: "IoT", path: "/iot" },
    // { name: "SaaS", path: "/saas" },
    // { name: "Services", path: "/services" },
    // { name: "Store", path: "/store" },
    // { name: "Sign up", path: "/sign-up" },
];

const Navbar = () => {
    const { elementRef, borderRadius} = useDynamicBorderRadius();

    return (
        <nav 
        ref={elementRef} 
        className="bg-white px-4 py-1 rounded-custom shadow-custom flex items-center justify-between"
        style={{borderRadius: `${borderRadius}px`}}
        >
            <div className="">
                <Link to="/">
                    <img src="/img/logo/Woloo-SH.png" alt="Woloo Logo" className="h-16" />
                </Link>
            </div>

            <div className="flex items-center justify-between gap-6">
                <ul className="flex justify-between gap-4 text-black font-semibold">
                    {menuItems.map((item, index) => (
                        <li key={index} className="hover:text-gray-500 transition duration-300">
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    <Link to="/sign-in">
                        <Button
                            color="black"
                            variant="solid"
                            shape="round"
                            className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold transition duration-300 w-full md:w-auto"
                        >
                            Log in
                        </Button>
                    </Link>
                    {/* <div className="relative">
                        <ShoppingCart size={26} className="text-black cursor-pointer hover:text-gray-500 transition duration-300" />
                        <span className="absolute -top-2 -right-2 bg-[#00C3DE] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            3
                        </span>
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
