import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { add_Cluster, toggleNextConfirmation } from "../store/dataSlice";
import { useNavigate } from "react-router-dom";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";

const NextConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogOpen = useSelector(
    (state) => state?.clusterForm?.data?.nextConfirmation
  );
  const pincode = useSelector((state) => state.clusterForm?.data?.pincode);
  const clusterType = useSelector(
    (state) => state.clusterForm?.data?.clusterType
  );
  const buttonType = useSelector((state) => state?.clusterAdd?.data?.buttonType);
  const clusterName = useSelector(
    (state) => state.clusterForm?.data?.clusterName
  );

  const selectedRows = useSelector(
    (state) => state.clusterForm?.state?.selectedRows
  );
  const facility = selectedRows
    ?.map((row) => (row.isSelected ? row.id : ""))
    .filter((row) => row);
  const onDialogClose = () => {
    dispatch(toggleNextConfirmation(false));
  };

  const onNext = async () => {
    let Data = {};
    Data.cluster_name = clusterName;
    if (clusterType == "Facility") {
      Data.facilities = facility;
    } else {
      Data.pincode = pincode;
    }
    try {
      const {success,results} = await add_Cluster(Data);

      if (success) {
        // setSubmitting(true);
        dispatch(setProgressState(results.checkpoint));
        toast.push(
          <Notification
            title={"Cluster Added successfully"}
            type="success"
            duration={2500}
          >
            Cluster Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
         dispatch(toggleNextConfirmation(false))
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;
        let data=results?.data
        buttonType=="save" ? navigate("/cluster"): navigate("/shift-AddNew",{state:data});
      }
    } catch (err) {
      // setSubmitting(false);
      let errorMessage = err.response.data.message;
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
      type="danger"
      title="Client setup completed ! "
      onCancel={onDialogClose}
      onConfirm={onNext}
      confirmButtonColor="red-600"
      confirmText="Yes,Continue !"
    >
      Now we are going to do Task setup.
    </ConfirmDialog>
  );
};

export default NextConfirmation;
