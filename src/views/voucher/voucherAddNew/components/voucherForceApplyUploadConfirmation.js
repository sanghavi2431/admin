import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleForceApplyConfirmation } from "../store/stateSlice";
import { newVoucher } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";

const VoucherForceApplyUploadConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.voucherAdd.state.forceApplyConfirmation
  );
  const message = useSelector((state) => state.voucherAdd.data.resultMessage);
  const formData = useSelector((state) => state.voucherAdd.data.formData);
  const navigate = useNavigate();
  const onDialogClose = () => {
    dispatch(toggleForceApplyConfirmation(false));
  };
  const onApply = async () => {
    formData.append("forceApply", 1);
    try {
      const success = await newVoucher(formData);
      if (success) {
        dispatch(toggleForceApplyConfirmation(false));
        toast.push(
          <Notification
            title={"Successfully Created"}
            type="success"
            duration={2500}
          >
            Voucher Created successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/voucher");
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
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="warning"
      title={"Alert!"}
      children={message}
      onCancel={onDialogClose}
      onConfirm={onApply}
      confirmButtonColor="red-600"
      confirmText="Yes,Apply it!"
    ></ConfirmDialog>
  );
};

export default VoucherForceApplyUploadConfirmation;
