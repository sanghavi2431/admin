import { AdaptableCard } from "@/components/shared";
import VoucherForm from "../voucherAddNewForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newVoucher, setResultmessage, setFormData } from "./store/dataSlice";
import { GiTicket } from "react-icons/gi";
import dayjs from "dayjs";
import { toggleForceApplyConfirmation } from "./store/stateSlice";
import VoucherForceApplyUploadConfirmation from "./components/voucherForceApplyUploadConfirmation";

injectReducer("voucherAdd", reducer);

const VoucherNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    let Expiry = dayjs(values.expiry).format("YYYY-MM-DD");

    setSubmitting(true);
    var formData = new FormData();

    formData.append("corporate_id", values.corporate.value);
    formData.append("expiry", Expiry);
    formData.append("lifetime_free", values.lifetime_free.value);

    formData.append("number_of_uses", values.number_of_uses);
    formData.append("subscriptions_id", values.subscription.value);
    formData.append("forceApply", 0);
    if (values.file != "") {
      formData.append("mobileNumbers", values.file[0]);
    }

    if (values.value == "") {
      formData.append("value", 0);
    } else {
      formData.append("value", values.value);
    }

    if (values.payment_mode == "") {
      formData.append("discount_percentage", 0);
      formData.append("payment_mode", 2);
    } else {
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("payment_mode", values.payment_mode.value);
    }
    if (values.lifetime_free.value == 1) {
      formData.append("type_of_voucher", 0);
    } else {
      formData.append("type_of_voucher", values.type_of_voucher.label);
    }
    formData.append("isEmail", values.is_email);
    dispatch(setFormData(formData));

    try {
      let { success, results } = await newVoucher(formData);
      if (success) {
        if (results.hasOwnProperty("isApplied")) {
          if (results.isApplied) {
            let { downloadLink } = results;

            setSubmitting(true);

            toast.push(
              <Notification
                title={results.message}
                type="success"
                duration={2500}
              >
                {results.message}
              </Notification>,
              {
                placement: "top-center",
              }
            );
            navigate("/voucher");

            if (results.hasOwnProperty("downloadLink")) {
              const link = document.createElement("a");
              link.href = downloadLink;
              link.setAttribute("download", "Voucher_Links.xlsx");

              // Append to html link element page
              document.body.appendChild(link);
              // Start download
              link.click();

              // Clean up and remove the link
              //link.parentNode.removeChild(link);
            }
          } else {
            setSubmitting(false);
            dispatch(setResultmessage(results.message));
            dispatch(toggleForceApplyConfirmation(true));
          }
        } else {
          setSubmitting(true);
          let { downloadLink } = results;

          toast.push(
            <Notification
              title={results.message}
              type="success"
              duration={2500}
            >
              {results.message}
            </Notification>,
            {
              placement: "top-center",
            }
          );
          navigate("/voucher");
          if (results.hasOwnProperty("downloadLink")) {
            const link = document.createElement("a");
            link.href = downloadLink;
            link.setAttribute("download", "Voucher_Links.xlsx");

            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();

            // Clean up and remove the link
            //link.parentNode.removeChild(link);
          }
        }
      }
    } catch (err) {
      let errorMessage = err.response.data.error.message;
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
      setSubmitting(false);
    }
  };
  const handleDiscard = () => {
    navigate("/voucher");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center ">
          <GiTicket size={"30"} />
          <h3 className="ml-5"> Voucher Add</h3>
        </div>
        <>
          <VoucherForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
      <VoucherForceApplyUploadConfirmation />
    </>
  );
};

export default VoucherNew;
