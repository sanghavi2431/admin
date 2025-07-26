import React from "react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CongratulationScreen = () => {
    const janitorName = useSelector(state => state.clientOnboard?.data?.addJanitorData?.full_name)

    return (
        <div className="w-full max-w-lg mx-auto p-6 md:p-8">
            <img
                className="w-56 h-56 mx-auto"
                src="/img/others/celebration.png"
                alt="Task Image"
            />
            <div className="mt-8 text-center text-black font-semibold text-lg md:text-xl">
                <p className="mb-3">Congratulations!</p>
                <p>
                    You have assigned {""}
                    <span className="text-primary">Cleaning</span> to {""} <br />
                    <span className="text-primary">{janitorName || "John Doe"}</span>
                </p>
            </div>
            <div className="mt-4 flex justify-center items-center">
                <Link to="/iotData">
                    <Button
                        variant="solid"
                        color="black"
                        shape="round"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] text-black font-semibold"
                    >
                        Check Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default CongratulationScreen;
