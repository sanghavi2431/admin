import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonlessDialog from "@/components/shared/ButtonlessDilog";
import { Button } from "@/components/ui";
import { setFreeTrialInfoDialog } from "@/store/auth/userSlice";

const FreeTrialDialog = () => {
  const dispatch = useDispatch();
  const freeTrialInfoDialog = useSelector((state) => state.auth.user.freeTrialInfoDialog);

  const onDialogClose = () => {
    dispatch(setFreeTrialInfoDialog(false));
  };

  return (
    <ButtonlessDialog
      width={600}
      isOpen={freeTrialInfoDialog}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title=""
      onCancel={onDialogClose}
      onConfirm={onDialogClose}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    >
      <div className="h-[35vh] flex flex-col justify-around gap-4">
        <h2 className="text-[#00C3DE] text-center">Congratulations!</h2>
        <p className="text-black font-semibold text-lg text-center">
          Your free trial is now active! We've set up demo data for you to get
          started. Explore the system with 1 location, 1 facility, 1 building, a
          9 AM - 9 PM shift and task in 1 hour duration starting from 9am to 9
          pm
        </p>
        <div className="mx-auto">
          <Link to="/iotData" onClick={onDialogClose}>
            <Button className="text-black" variant="solid">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </ButtonlessDialog>
  );
};

export default FreeTrialDialog;
