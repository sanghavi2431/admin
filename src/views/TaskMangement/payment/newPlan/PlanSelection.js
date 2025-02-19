import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const PlanSelection = ({ handlePlanSelect }) => {
    const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
    const plans = useSelector((state) => state.paymentcards.data.cardsDetails);

    return (
        <div className="flex justify-center items-center">
            <div className="w-3/4">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Choose a <span className="text-[#00C3DE]">Plan</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`border-4 border-[#00C3DE] rounded-xl overflow-hidden shadow-custom bg-white p-6 m-4 flex flex-col items-center gap-5`}>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {plan.title}
                                </h2>
                                <p className="text-lg font-semibold text-[#6A6767]">
                                    {plan.includes.heading}
                                </p>
                            </div>
                            <ul className="list-none text-gray-700 space-y-3">
                                {
                                    plan.includes.points.split(',').map((point) =>
                                        <li className="flex items-center space-x-2">
                                            <FaCircleCheck className="text-green-500 w-4 h-4" />
                                            <span>{parse(point)}</span>
                                        </li>
                                    )
                                }
                            </ul>
                            {plan.value ? (
                                <Link to="/iotData">
                                    <Button
                                        disabled={isFreeTrial}
                                        className="bg-[#00C3DE] hover:bg-[#00c4debd]"
                                        variant="solid"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            ) : (
                                <div onClick={() => handlePlanSelect(plan)}>
                                    <Button className="text-black" variant="solid">
                                        Get Started
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-lg text-gray-700 text-center mt-6 font-semibold">
                    Please Note: If you purchase the Premium Plan, Rs. 499 + Taxes shall be charged
                    for additional login and Rs. 10,000 + Taxes shall be charged for an IoT Device
                </p>
                <p className="text-xs text-gray-500 text-center">IoT Sold separately</p>
            </div>
        </div>
    );
};

export default PlanSelection;
