import { AdaptableCard } from "@/components/shared";
import SupervisorForm from "../facility_managerForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getSupervisor, update_supervisor } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { toggleExitConfirmation } from "../facility_managerAdd/store/dataSlice";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../facility_managerAdd/components/cancelConfirmation";

injectReducer("supervisorEdit", reducer);

const SupervisorEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.supervisorAdd?.data?.buttonType);
  const supervisorData = useSelector((state) => state.supervisorEdit?.data?.supervisorData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.supervisorEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getSupervisor(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let cluster_ids=values.cluster?.map((clu)=>clu.value)
    let form = new FormData();
form.append("role_id", 2);
form.append("id", Id);
form.append("status", values.status.value);
form.append("first_name", values.first_name);
form.append("last_name", values.last_name);
form.append("mobile", values.mobile);
form.append("city", values.city);
form.append("email", values.email);
// form.append("client_id", values.client_name.value);
form.append("cluster_ids", "["+cluster_ids+"]")

    try {
      const success = await update_supervisor(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Supervisor Edited successfully"}
            type="success"
            duration={2500}
          >
            Supervisor Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        if( buttonType=="save"){
          navigate("/supervisor")
        }
        else{
          if(location?.state?.janitor?.page=="edit"){
            let isEdit=location?.state?.janitor?.id
            navigate(`/janitor-Edit/${isEdit}`,{state:location?.state})
          }
          else{
            let data={...location?.state,label:values?.first_name,value:Id}
            navigate("/janitor-AddNew",{state:data})
          }
        }
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;

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
    // navigate("/supervisor");
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
          <h3 className="">Supervisor Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(supervisorData) && (
            <>
              <SupervisorForm
              id={Id}
                type="edit"
                initialData={supervisorData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(supervisorData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Supervisor found!"
            />
            <h3 className="mt-8">No Supervisor found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default SupervisorEdit;
