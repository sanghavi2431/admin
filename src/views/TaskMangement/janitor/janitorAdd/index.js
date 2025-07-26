import { AdaptableCard } from "@/components/shared";
import JanitorForm from "../janitorForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_janitor } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { toggleAddConfirmation } from "@/views/TaskMangement/template_mapping/template_mappingList/store/stateSlice";
import CancelConfirmation from "../janitorForm/components/cancelConfirmation";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../janitorForm/store/dataSlice";

injectReducer("janitorAdd", reducer);

const JanitorAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newData = location?.state && { ...location?.state, first_name: "", last_name: "", mobile: "", gender: "", address: "", city: "", cluster: "", start_time: "", end_time: "", status: "", aadhar_image: "", pan_image: "", wish_certificate_image: "" }
  const buttonType = useSelector((state) => state.janitorAdd?.data?.buttonType);
  const handleFormSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);

    let cluster_ids = values.cluster?.map((clu) => clu.value)
    let form = new FormData();
    form.append("role_id", 1);
    form.append("first_name", values.first_name);
    form.append("last_name", values.last_name);
    form.append("mobile", values.mobile);
    // form.append("email", values.email);
    form.append("gender", values.gender.label);
    form.append("address", values.address);
    form.append("city", values.city);
    form.append("cluster_ids", "[" + cluster_ids + "]")
    form.append("start_time", new Date(values.start_time).getHours() + ":" + new Date(values.start_time).getMinutes() + ":" + "00");
    form.append("end_time", new Date(values.end_time).getHours() + ":" + new Date(values.end_time).getMinutes() + ":" + "00");

    values?.aadhar_image?.[0] && form.append("aadhar_image", values?.aadhar_image[0]);
    values?.pan_image?.[0] && form.append("pan_image", values?.pan_image[0]);
    values?.wish_certificate_image?.[0] && form.append("wish_certificate_image", values?.wish_certificate_image[0]);

    try {
      const { success, results } = await insert_janitor(form);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint) {
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Janitor Added successfully"}
            type="success"
            duration={2500}
          >
            Janitor Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(false));
        if (buttonType === "save") {
          navigate("/janitor")
        }
        else if (buttonType == "add_more") {
          setSubmitting(false);
          resetForm()
        }
        else {
          navigate("/templateMap-AddNew", { state: results?.data })
          dispatch(toggleAddConfirmation(true));
        }
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
          <h3 className="">Add Janitor</h3>
        </div>
        {
          newData ? <JanitorForm
            initialData={newData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          /> : <JanitorForm
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

export default JanitorAdd;
