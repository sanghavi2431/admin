import { Button, Select } from "components/ui";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import useRazorpay from "react-razorpay";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "services/taskManagement/plansService";
import { MdDelete } from "react-icons/md";
import {
  getdisplay_Addons,
  getdisplay_plans,
  setCardsDetails,
  setAddonOption,
} from "./store/dataSlice";
import { getallSubscribeIot } from "../../subscriptionIOTAddon/subscriptionIOTAddonList/store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store";
import { setPaymentDialog, setSideBarDisabled, setIsPlanExpired } from "store/auth/userSlice";
import { toast, Notification } from "components/ui";
import ReactQuill from "react-quill";
import env from "react-dotenv";

injectReducer("paymentcards", reducer);
export default function Payment_cards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardsDetails = useSelector(
    (state) => state.paymentcards.data.cardsDetails
  );
  const addOnOptions = useSelector(
    (state) => state.paymentcards.data.addOnOptions
  );
  const AddOnAmt = useSelector((state) => state.paymentcards.data.AddOnAmt);
  const isLogin = useSelector((state) => state.paymentcards.data.isLogin);
  const addon_id = useSelector((state) => state.paymentcards.data.addon_id);

  const dialogOpen = useSelector((state) => state.auth.user.paymentPlanDialog);
  const [visibleOption, setVisibleoption] = useState([]);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [defaultQty, setDefaultQty] = useState(0);
  const [qty, setQty] = useState(0);
  const [apiAddOnAmt, setapiAddOnAmt] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [Razorpay] = useRazorpay();
  useEffect(() => {
    dispatch(getdisplay_plans());
  }, []);
  useEffect(() => {
    dispatch(getdisplay_Addons({ id: selectedPlanId }));
  }, [selectedPlanId]);
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
    cardsDetails.map((card) => {
      card?.value && setDefaultQty(card?.qtyOflogin);
      card?.value && setTotalAmt(card?.amt);
      // card?.value && setSelectedPlanId(((card?.id)))
    });
  }, [cardsDetails]);

  useEffect(() => {
    setVisibleoption(
      addOnOptions.filter((day) => {
        if (day?.flag) {
          return day;
        }
      })
    );
  }, [addOnOptions]);

  function handleChangeCard(id) {
    dispatch(
      setCardsDetails(
        cardsDetails?.map((card) => {
          if (card?.id == id) {
            return { ...card, value: true };
          } else {
            return { ...card, value: false };
          }
        })
      )
    );
  }
  const BoldTextRenderer = ({ text }) => {
    const parts = text.split("//");

    const renderedText = parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.substring(2, part.length - 2);
        return <b key={index}>{boldText}</b>;
      }
      return <span key={index}>{part}</span>;
    });
    return <div>{renderedText}</div>;
  };
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
      items: [
        {
          item_type: "plan",
          qty: 1,
        },
      ],
    };
    let obj = {};
    if (qty) {
      obj.item_type = "addon";
      obj.qty = qty;
      obj.item_id = addon_id;
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

    data.items[0].item_id = +cardsDetails.filter((card) => card.value)[0].id;
    // const order = await createOrder(params);
    try {
      data.client_id = loggedInClient.value;
      const response = await createOrder(data);
      const { success, results } = response?.data;
      const { id: orderId } = results;
      if (success) {
        const options = {
          key: env?.RAZORPAY_API_KEY,
          amount: finalAmount * 100,
          currency: "INR",
          name: "Woloo",
          description: "Test Transaction",
          order_id: orderId,
          handler: (res) => {
            dispatch(setPaymentDialog(false));
            dispatch(setSideBarDisabled(false));
            dispatch(setIsPlanExpired(false));
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
      //         let errorMessage = err.response.data.error.message;
      //   toast.push(
      //     <Notification title={"Failed"} type="warning" duration={2500}>
      //       {errorMessage}
      //     </Notification>,
      //     {
      //       placement: "top-center",
      //     }
      //   );
    }
  };

  return (
    <>
      {cardsVisible ? (
        <div className="w-full h-[75vh] overflow-y-auto">
          <div>
            <Button
              size="sm"
              visibility={!dialogOpen}
              variant="solid"
              className=" text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
              color="black"
              onClick={() => navigate("/upgrade")}
            >
              Upgrade Plan
            </Button>
          </div>
          <div className="flex flex-col mt-3 md:mt-0 justify-center items-center w-[100%] gap-2">
            <h6 className="text-xl md:text-2xl">Choose the right Plan</h6>
            {/* <p className="text-lg">Your pro trial has ended, choose your plan</p> */}
            <p className="text-sm text-center">
              Not ready yet? Download our{" "}
              <span className="text-black border-white border-2 ">
                Free Trial plan
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-4">
              {cardsDetails.map((card) => {
                return (
                  <div className="flex flex-col items-center gap-8 ">
                    <div
                      className={
                        card?.value
                          ? `w-8 h-8 border-2 rounded-full border-${card.color} flex justify-center items-center cursor-pointer`
                          : "w-8 h-8 border flex justify-center items-center rounded-full border-slate-400 cursor-pointer"
                      }
                      onClick={() => handleChangeCard(card?.id)}
                    >
                      <div
                        className={
                          card?.value
                            ? `w-5 h-5 border rounded-full border-slate-400  bg-${card.color}`
                            : "w-5 h-5 border rounded-full border-slate-400"
                        }
                        onClick={() => handleChangeCard(card?.id)}
                      ></div>
                    </div>
                    <div
                      className={
                        card?.value
                          ? `border-1  w-full shadow-2xl cursor-pointer`
                          : `border-1  w-full shadow-xl cursor-pointer`
                      }
                      onClick={() => handleChangeCard(card?.id)}
                    >
                      <div className={`h-2 bg-${card.color}`}></div>
                      <div className={`p-8 w-full`}>
                        <p className="text-xl font-semibold  text-black pb-4">
                          {card?.title}
                        </p>
                        {typeof card?.details == "string" ? (
                          <p
                            className={`text-lg font-medium text-${card.color} pb-9`}
                          >
                            {card?.details}
                          </p>
                        ) : (
                          <div className="flex pb-8 items-center gap-1">
                            {card?.details?.map((detail, ind) => {
                              return !ind ? (
                                <p
                                  className={`text-3xl font-medium text-${card.color} `}
                                >
                                  {detail}
                                </p>
                              ) : (
                                <p className={`text-base font-medium  `}>
                                  {detail}
                                </p>
                              );
                            })}
                          </div>
                        )}
                        <div className="border-b-2 mb-2"></div>
                        <p className="text-base font-normal  text-black pb-2">
                          {card?.includes?.heading}
                        </p>
                        {/* <div className="flex font-normal flex-col gap-2 text-black">
                                                    {card?.includes?.points?.map((point) => {
                                                        return <BoldTextRenderer text={point} />;
                                                    })}
                                                </div> */}
                        <ReactQuill
                          className=" paddingGrand [&>div]:!border-none !text-black !text-sm [&>div]:!p-0"
                          theme="snow"
                          readOnly
                          modules={{ toolbar: null }}
                          value={card?.includes?.points}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-end justify-end m-4">
            {cardsDetails.map((card) => {
              return (
                card?.value && (
                  <Button
                    onClick={() => {
                      cardsVisible
                        ? setCardsVisible(false)
                        : setCardsVisible(true);
                      card?.value && setSelectedPlanId(card?.id);
                    }}
                    size="sm"
                    disabled={card?.title?.toLowerCase().includes("free")}
                    variant="solid"
                    className=" text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                    color="black"
                  >
                    Continue
                  </Button>
                )
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <BsChevronLeft
            className="cursor-pointer"
            size={"24"}
            onClick={() =>
              cardsVisible ? setCardsVisible(false) : setCardsVisible(true)
            }
          />

          <div className="w-full h-full flex flex-col justify-center items-center text-black ">
            {cardsDetails.map((card) => {
              return (
                card?.value && (
                  <div className="flex justify-between">
                    <p className="text-2xl">Purchase {card?.title} Plan</p>
                  </div>
                )
              );
            })}
            {cardsDetails.map((card) => {
              return (
                card?.value && (
                  <div
                    className={`mt-4 h-2 bg-${card?.color} w-full rounded-t`}
                  ></div>
                )
              );
            })}

            <div className="w-full flex flex-col gap-4 text-base border-2 p-4  mb-4 ">
              {cardsDetails.map((card) => {
                return (
                  card?.value && (
                    <div className="flex justify-between">
                      <p> {card?.title} Plan</p>
                      <p>₹ {card?.amt?.toFixed(0)} </p>
                    </div>
                  )
                );
              })}
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
                      ₹ {(qty * AddOnAmt)?.toFixed(0)}
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
                            ₹ {(day.qty * day.addOnAmt)?.toFixed(0)}
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
                  {(
                    (+qty * +AddOnAmt + +totalAmt + apiAddOnAmt) *
                    1.18
                  ).toFixed(0)}
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
                    (
                      (+qty * +AddOnAmt + +totalAmt + apiAddOnAmt) *
                      1.18
                    ).toFixed(0)
                  );
                }}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
