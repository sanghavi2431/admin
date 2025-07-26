import { AdaptableCard } from "@/components/shared";
import SupervisorForm from "../supervisorForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_supervisor } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "../supervisorForm/components/cancelConfirmation";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../supervisorForm/store/dataSlice";

injectReducer("supervisorAdd", reducer);

const SupervisorAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const newData = location?.state && { ...location?.state, first_name: "", last_name: "", mobile: "", city: "", cluster: "" }
  const buttonType = useSelector((state) => state.supervisorAdd?.data?.buttonType);
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let cluster_ids = values.cluster?.map((clu) => clu.value)
    let form = new FormData();
    form.append("role_id", 2);
    form.append("first_name", values.first_name);
    form.append("last_name", values.last_name);
    form.append("mobile", values.mobile);
    form.append("city", values.city);
    // form.append("email", values.email);
    // form.append("client_id", values.client_name.value);
    form.append("cluster_ids", "[" + cluster_ids + "]")
    try {
      const { success, results } = await insert_supervisor(form);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint) {
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Supervisor Added successfully"}
            type="success"
            duration={2500}
          >
            Supervisor Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        let data = results?.data;
        data = { "supervisor": data, ...location?.state }
        buttonType === "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(true));
        buttonType === "save" ? navigate("/supervisor") : navigate("/janitor-AddNew", { state: data });
      }
    } catch (err) {
      setSubmitting(false);
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

  const handleDiscard = () => {
    dispatch(toggleExitConfirmation(true))
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="">Add Supervisor</h3>
        </div>
        {
          newData ? <SupervisorForm
            initialData={newData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          /> : <SupervisorForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        }
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default SupervisorAdd;
