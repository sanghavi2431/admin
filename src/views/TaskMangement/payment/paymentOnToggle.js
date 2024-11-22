import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import ButtonlessDialog from "components/shared/ButtonlessDilog";
import { setPaymentDialog } from "store/auth/userSlice";
import Payment_cards from "./newPlan";

const PaymentPlansConfirmation = () => {
  const dispatch = useDispatch();
  const isPlanExpired = useSelector((state) => state.auth.user.isPlanExpired);
  const dialogOpen = useSelector((state) => state.auth.user.paymentPlanDialog);
  const onDialogClose = () => {
    if (isPlanExpired) {
      toast.push(
        <Notification
          title={"Purchase a plan to continue"}
          type="danger"
          duration={2500}
        ></Notification>,
        {
          placement: "top-center",
        }
      );
    } else {
      dispatch(setPaymentDialog(false));
    }
  };

  return (
    <ButtonlessDialog
      width={2000}
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title=""
      onCancel={onDialogClose}
      onConfirm={onDialogClose}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    >
      <Payment_cards />
    </ButtonlessDialog>
  );
};

export default PaymentPlansConfirmation;
