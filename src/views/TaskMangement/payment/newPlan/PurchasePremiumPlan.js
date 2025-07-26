import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Button, Select } from "@/components/ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import {
    setPaymentDialog,
    setSideBarDisabled,
    setIsPlanExpired,
    setIsFreeTrial 
} from "@/store/auth/userSlice";
import useRazorpay from "react-razorpay";
import { createOrder } from "@/services/taskManagement/plansService";

const PurchasePremiumPlan = () => {
    const [Razorpay] = useRazorpay();
    const [loginsQty, setLoginsQty] = useState(0);
    const [loginsAmt, setLoginsAmt] = useState(0);
    const [planAmt, setPlanAmt] = useState();
    const [finalAmount, setFinalAmount] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInClient = useSelector((state) => state.auth.user.clientId);
    const selectedPlan = useSelector((state) => state.paymentcards.data.selectedPlan);
    const addOnOptions = useSelector((state) => state.paymentcards.data.addOnOptions);
    const visibleOptions = addOnOptions?.filter((addon) => addon.flag);

    useEffect(() => {
        setPlanAmt(selectedPlan.amt ?? 499);
        setLoginsQty(selectedPlan.qtyOflogin ?? 5);    
    }, [selectedPlan]);

    useEffect(() => {
        updateFinalAmount();
    }, [planAmt, loginsQty, selectedAddons]);

    const handleLoginChange = (type) => {
        const newLogins = type === "increment" ? loginsQty + 1 : Math.max(selectedPlan.qtyOflogin, loginsQty - 1);
        setLoginsQty(newLogins);
        setLoginsAmt(Math.abs(newLogins - selectedPlan.qtyOflogin) * 199);
    };

    const updateFinalAmount = () => {
        const addOnTotal = selectedAddons.reduce((total, item) => total + item.qty * item.addOnAmt, 0);
        setFinalAmount(((planAmt + loginsAmt + addOnTotal) * 1.18).toFixed(0));
    };

    const handleAddOnSelect = (selectedValue) => {
        if (!selectedValue) return;
        const newAddOn = addOnOptions.find((addon) => addon.value === selectedValue);
        if (newAddOn && !selectedAddons.find((addon) => addon.value === selectedValue)) {
            setSelectedAddons([...selectedAddons, { ...newAddOn, qty: 1 }]);
        }
    };

    const increaseQty = (addon) => {
        setSelectedAddons((prev) =>
            prev.map((item) =>
                item.value === addon.value ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decreaseQty = (addon) => {
        setSelectedAddons((prev) =>
            prev
                .map((item) =>
                    item.value === addon.value ? { ...item, qty: Math.max(0, item.qty - 1) } : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const deleteOnHandler = (addon) => {
        setSelectedAddons((prev) => prev.filter((item) => item.value !== addon.value));
    };

    const paymentHandler = async () => {
        const data = {
            items: [
                { item_type: "plan", qty: 1, item_id: selectedPlan?.id },
                ...selectedAddons.map((addon) => ({ 
                    item_type: "addon",
                    qty: addon.qty,
                    item_id: addon.value,
                })),
            ],
            client_id: loggedInClient.value,
        };

        try {
            const response = await createOrder(data);
            const { success, results } = response?.data;
            if (success) {
                const { id: orderId } = results;
                const options = {
                    key: env?.RAZORPAY_API_KEY,
                    amount: finalAmount * 100,
                    currency: "INR",
                    name: "Woloo",
                    description: "Test Transaction",
                    order_id: orderId,
                    handler: (res) => {
                        // console.log(res, " --payment success resp");
                        dispatch(setPaymentDialog(false));
                        dispatch(setSideBarDisabled(false));
                        dispatch(setIsPlanExpired(false));
                        dispatch(setIsFreeTrial(false));
                        navigate("/orders");
                    },
                    prefill: { name: "Woloo", email: "youremail@example.com", contact: "9999999999" },
                    notes: { address: "Woloo Office" },
                    theme: { color: "#3399cc" },
                };
                new Razorpay(options).open();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-2/5 p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Purchase Premium Plan</h2>
                <div className="bg-white rounded-custom shadow-custom p-6 space-y-4">
                    <div className="flex justify-between font-semibold">
                        <span>{selectedPlan.title} Plan</span>
                        <span>₹ {planAmt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>No. of Logins</span>
                        <div className="flex items-center bg-[#00C3DE] text-white rounded-full shadow-custom px-3 py-1 space-x-2">
                            <FaMinus className="cursor-pointer" onClick={() => handleLoginChange("decrement")} />
                            <span className="font-semibold">{loginsQty}</span>
                            <FaPlus className="cursor-pointer" onClick={() => handleLoginChange("increment")} />
                        </div>
                        <span className="font-semibold">₹ {loginsAmt}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Add on</span>
                        <Select
                            value={selectedAddons}
                            onChange={(selectedItem) => handleAddOnSelect(selectedItem.value)}
                            options={visibleOptions}
                        />
                    </div>
                    {selectedAddons?.map((addon) => (
                        <div key={addon.value} className="flex justify-between bg-[#F9F9F9] p-2 rounded">
                            <p>{addon.label}</p>
                            <div className="flex gap-2">
                                <button type="button" className="border-2 w-6 bg-slate-100 rounded" onClick={() => decreaseQty(addon)}>
                                    -
                                </button>
                                <p>{addon.qty}</p>
                                <button type="button" className="border-2 w-6 bg-slate-100 rounded" onClick={() => increaseQty(addon)}>
                                    +
                                </button>
                                <p className="w-20 flex items-end justify-end">₹ {(addon.qty * addon.addOnAmt).toFixed(0)}</p>
                                <button type="button" onClick={() => deleteOnHandler(addon)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between font-semibold">
                        <span>SGST</span>
                        <span>9.00%</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>CGST</span>
                        <span>9.00%</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹ {finalAmount}</span>
                    </div>
                    <div className="flex justify-center">
                        <Button className="text-black" variant="solid" onClick={paymentHandler}>
                            Proceed to Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePremiumPlan;