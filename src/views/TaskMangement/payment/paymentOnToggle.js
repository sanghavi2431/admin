import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, Notification } from "@/components/ui";
import ButtonlessDialog from "@/components/shared/ButtonlessDilog";
import Payment_cards from "./newPlan";
import { setFreeTrialInfoDialog, setPaymentDialog } from "@/store/auth/userSlice";

const PaymentPlansConfirmation = () => {
  const dispatch = useDispatch();
  const isFirstTime = useSelector((state) => state.auth.user.isFirstTime);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);
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
      if (isFirstTime && isFreeTrial) {
        dispatch(setFreeTrialInfoDialog(true));
      }
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
