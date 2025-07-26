import { AdaptableCard } from "@/components/shared";
import JanitorForm from "../janitorForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getJanitor, update_Janitor } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { toggleAddConfirmation } from "@/views/TaskMangement/template_mapping/template_mappingList/store/stateSlice";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../janitorForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../janitorForm/store/dataSlice";

injectReducer("janitorEdit", reducer);

const JanitorEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.janitorAdd?.data?.buttonType);
  const janitorData = useSelector((state) => state.janitorEdit?.data?.janitorData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.janitorEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getJanitor(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let cluster_ids=values.cluster?.map((clu)=>clu.value)
    let form = new FormData();
form.append("id", Id);
form.append("role_id", 1);
form.append("status", values.status.value);
form.append("first_name", values.first_name);
form.append("last_name", values.last_name);
form.append("mobile", values.mobile);
form.append("gender", values.gender.label);
// form.append("email", values.email);
form.append("address", values.address);
form.append("city", values.city);
form.append("cluster_ids", "["+cluster_ids+"]")
form.append("start_time", new Date(values.start_time).getHours()+":"+new Date(values.start_time).getMinutes()+":"+"00");
form.append("end_time", new Date(values.end_time).getHours()+":"+new Date(values.end_time).getMinutes()+":"+"00");
values.aadhar_image[0] && form.append("aadhar_image", values.aadhar_image[0]);
values.pan_image[0] && form.append("pan_image", values.pan_image[0]);
values.wish_certificate_image[0] && form.append("wish_certificate_image", values.wish_certificate_image[0]);

    try {
      const {success,results} = await update_Janitor(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Janitor Edited successfully"}
            type="success"
            duration={2500}
          >
            Janitor Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        // navigate("/janitor");
        buttonType=="save" ? navigate("/janitor"): navigate("/templateMap",{state:results?.data});
        dispatch(toggleAddConfirmation(true));
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(false)) ;

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
    // navigate("/janitor");
    dispatch(toggleExitConfirmation(true))

  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };

    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
          <h3 className="">Janitor Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(janitorData) && (
            <>
              <JanitorForm
              id={Id}
                type="edit"
                initialData={janitorData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
           )}
        </Loading> 
         {!loading && isEmpty(janitorData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Janitor found!"
            />
            <h3 className="mt-8">No Janitor found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default JanitorEdit;
