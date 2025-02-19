import { Button, Select } from "@/components/ui";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/services/taskManagement/plansService";
import { MdDelete } from "react-icons/md";
import {
  getdisplay_Addons,
  setCardsDetails,
  setAddonOption,
  getpurchasedPlanIdby_ClientId,
} from "./store/dataSlice";
import { getallSubscribeIot } from "../../subscriptionIOTAddon/subscriptionIOTAddonList/store/dataSlice";
import reducer from "./store";
import { injectReducer } from "@/store";

injectReducer("UpgradePlan", reducer);
export default function UpgradePlan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addOnOptions = useSelector(
    (state) => state.UpgradePlan.data.addOnOptions
  );
  const AddOnAmt = useSelector((state) => state.UpgradePlan.data.AddOnAmt);
  const isLogin = useSelector((state) => state.UpgradePlan.data.isLogin);
  const purchasedPlanId = useSelector(
    (state) => state.UpgradePlan.data.purchasedPlan
  );

  const [visibleOption, setVisibleoption] = useState([]);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [defaultQty, setDefaultQty] = useState(0);
  const [qty, setQty] = useState(0);
  // const [AddOnAmt, setAddOnAmt] = useState(100)
  const [apiAddOnAmt, setapiAddOnAmt] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [Razorpay] = useRazorpay();
  useEffect(() => {
    dispatch(getpurchasedPlanIdby_ClientId({ id: loggedInClient?.value }));
  }, []);
  useEffect(() => {
    dispatch(getdisplay_Addons({ id: purchasedPlanId }));
  }, [purchasedPlanId]);
  useEffect(() => {
    setapiAddOnAmt(0);
    addOnOptions.map((day) => {
      if (!day?.flag && day?.total) setapiAddOnAmt((amt) => amt + day?.total);
      else {
        if (day?.total && !day?.flag) setapiAddOnAmt((amt) => amt - day?.total);
      }
    });
  }, [addOnOptions]);

  useEffect(() => {
    setVisibleoption(
      addOnOptions.filter((day) => {
        if (day?.flag) {
          return day;
        }
      })
    );
  }, [addOnOptions]);

  function addOnHandler(selectedItem) {
    dispatch(
      setAddonOption(
        addOnOptions?.map((day) => {
          if (day?.value == selectedItem.value) {
            return { ...day, flag: false };
          } else {
            return day;
          }
        })
      )
    );
  }
  function deleteOnHandler(selectedItem) {
    dispatch(
      setAddonOption(
        addOnOptions?.map((day) => {
          if (day?.value == selectedItem.value) {
            return { ...day, flag: true };
          } else {
            return day;
          }
        })
      )
    );
  }
  function decreaseQty(selectedItem) {
    dispatch(
      setAddonOption(
        addOnOptions?.map((day) => {
          if (day?.value == selectedItem.value) {
            let newQty = day.qty ? day.qty - 1 : 0;
            return { ...day, qty: newQty, total: newQty * day.addOnAmt };
          } else {
            return day;
          }
        })
      )
    );
  }
  function increaseQty(selectedItem) {
    dispatch(
      setAddonOption(
        addOnOptions?.map((day) => {
          if (day?.value == selectedItem.value) {
            let newQty = day.qty + 1;
            return { ...day, qty: newQty, total: newQty * day.addOnAmt };
          } else {
            return day;
          }
        })
      )
    );
  }
  const paymentHandler = async (finalAmount) => {
    const data = {
      items: [],
    };
    let obj = {};
    if (qty) {
      obj.item_type = "addon";
      obj.qty = qty;
      obj.item_id = 5;
      data.items.push(obj);
    }
    let addOnreq = addOnOptions.filter((option) => !option.flag && option.qty);
    addOnreq.map((option) => {
      let obj = {};
      obj.item_type = "addon";
      obj.qty = option.qty;
      obj.item_id = option.value;
      data.items.push(obj);
    });

    // const order = await createOrder(params);
    try {
      data.client_id = loggedInClient.value;
      const response = await createOrder(data);
      const { success, results } = response?.data;
      const { id: orderId } = results;
      if (success) {
        const options = {
          key: process?.env?.RAZORPAY_API_KEY,
          amount: finalAmount * 100,
          currency: "INR",
          name: "Woloo",
          description: "Test Transaction",
          order_id: orderId,
          handler: (res) => {
            navigate("/orders");
          },
          prefill: {
            name: "Woloo",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Woloo Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <BsChevronLeft
          className="cursor-pointer"
          size={"24"}
          onClick={() => navigate("/subscriptionPlans")}
        />

        <div className="w-full h-full flex flex-col justify-center items-center text-black ">
          <p className="text-2xl">Upgrade Plan</p>
          <div className={`mt-4 h-2 bg-red-500 w-full rounded-t`}></div>

          <div className="w-full flex flex-col gap-4 text-base border-2 p-4  mb-4 ">
            {isLogin && (
              <div className="flex justify-between ">
                <p>No. of logins</p>
                <div className="flex">
                  <div className="flex gap-2">
                    {/* <button type="button" className="border-2 w-6 bg-slate-100 rounded" onClick={() => { setQty(qty ? qty - 1 : qty); }}> - </button> */}
                    <button
                      type="button"
                      className="border-2 w-6 bg-slate-100 rounded"
                      onClick={() => {
                        setQty(qty ? qty - 1 : qty);
                      }}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <p>{defaultQty + qty}</p>
                    <button
                      type="button"
                      className="border-2 w-6 bg-slate-100 rounded"
                      onClick={() => {
                        setQty(qty + 1);
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <p className="w-20 flex items-end justify-end">
                    ₹ {(qty * AddOnAmt)?.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <p>Add on</p>
              <Select
                value=""
                size="xs"
                options={visibleOption}
                className="w-40"
                onChange={(val) => {
                  addOnHandler(val);
                }}
              />
            </div>
            {addOnOptions.map((day) => {
              if (!day?.flag) {
                return (
                  <div className="flex justify-between bg-[#F9F9F9] p-2">
                    <p>{day.label}</p>
                    <div>
                      <div className="flex gap-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="border-2 w-6 bg-slate-100 rounded"
                            onClick={() => {
                              decreaseQty(day);
                            }}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <p>{day.qty}</p>
                          <button
                            type="button"
                            className="border-2 w-6 bg-slate-100 rounded"
                            onClick={() => {
                              increaseQty(day);
                            }}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </div>
                        <p className="w-20 flex items-end justify-end">
                          ₹ {(day.qty * day.addOnAmt)?.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            deleteOnHandler(day);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <div className="flex justify-between">
              <p>SGST</p>
              <p>9.00 %</p>
            </div>
            <div className="flex justify-between">
              <p>CGST</p>
              <p>9.00 %</p>
            </div>
            <div className="border-b-2 mb-2 border-black"></div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>
                ₹
                {((+qty * +AddOnAmt + +totalAmt + apiAddOnAmt) * 1.18).toFixed(
                  2
                )}
              </p>
            </div>
          </div>
          <div className="w-full flex items-end justify-end gap-2">
            <Button
              size="sm"
              variant="solid"
              className=" text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
              color="black"
              onClick={() => {
                paymentHandler(
                  ((+qty * +AddOnAmt + +totalAmt + apiAddOnAmt) * 1.18).toFixed(
                    2
                  )
                );
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
