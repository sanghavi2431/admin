import { AdaptableCard } from "@/components/shared";
import VoucherCreatePoForm from "../voucherPoCreateForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVoucher } from "../voucherList/store/dataSlice";
import { uploadWolooData } from "./store/dataSlice";
import { toggleCreateConfirmation } from "../voucherList/store/dataSlice";
injectReducer("createVoucherPO", reducer);

const WolooBulkUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.voucherList.data.tableData);

  const id = useSelector((state) => state.voucherList.data.selectedVoucher);

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var formData = new FormData();
    formData.append("po_url", values.file[0]);
    formData.append("utr", values.utrNo);
    formData.append("amount", values.amount);
    formData.append("id", id);

    try {
      const success = await uploadWolooData(formData);
      if (success) {
        dispatch(toggleCreateConfirmation(false));
        dispatch(getVoucher(tableData));
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Voucher Activation"}
            type="success"
            duration={2500}
          >
            Voucher Activated successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/voucher");
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err.response.data.error.message;
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  const handleDiscard = () => {
    dispatch(toggleCreateConfirmation(false));
  };

  return (
    <>
      <AdaptableCard>
        <>
          <VoucherCreatePoForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default WolooBulkUpload;
