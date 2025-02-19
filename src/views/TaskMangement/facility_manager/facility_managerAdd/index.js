import { AdaptableCard } from "@/components/shared";
import SupervisorForm from "../facility_managerForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getRole, insert_facilityManager, toggleExitConfirmation } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "./components/cancelConfirmation";
import { setSideBarDisabled } from "@/store/auth/userSlice";

injectReducer("facilityManagerAdd", reducer);

const SupervisorAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonType = useSelector((state) => state.facilityManagerAdd?.data?.buttonType);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  let roleAccessObj = useSelector(
    (state) => state.facilityManagerAdd.data.roleAccessObj
  );

  const roleData = useSelector((state) => state?.facilityManagerAdd?.data?.roleData);
  let data={
    first_name:"",
    last_name:"",
    email:"",
    mobile:"",
    city:"",
    client:"",
    address:"",
    password:""
  }
  if(loggedInClient ){
    data["client"]=loggedInClient
  }
  useEffect(()=>{
dispatch(getRole({id:3}))
  },[])
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let data = {};
data.name= values.first_name+" "+values.last_name;
data.mobile= values.mobile;
data.city= values.city;
data.address= values.address;
data.password= values.password;
data.email= values.email;
data.rolesaccess=JSON.stringify(roleAccessObj)
data.permissions=roleData?.permissions

// data.client_id= values.client_name.value;
data.client_id= `${values.client.value}` 

    try {
      const {success,results} = await insert_facilityManager(data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Facility Manager Added successfully"}
            type="success"
            duration={2500}
          >
            Facility Manager Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        let data= results?.data
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;
        buttonType=="save" ? navigate("/facilityManager"): navigate("/janitor-AddNew",{state:data});
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
    navigate("/facilityManager");

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
          <h3 className="">Add Facility Manager</h3>
        </div>
        <SupervisorForm
        initialData={data}
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default SupervisorAdd;
