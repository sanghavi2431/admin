import { AdaptableCard } from "@/components/shared";
import BlockForm from "../clusterForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Cluster } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { add_Cluster, getClusterFacility, setclusterType, toggleExitConfirmation } from "../clusterForm/store/dataSlice";
import CancelConfirmation from "../clusterForm/components/cancelConfirmation";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import NextConfirmation from "../clusterForm/components/nextConfirmation";
import { setSelectedRows } from "../clusterForm/store/stateSlice";

injectReducer("clusterAdd", reducer);

const ClusterAdd = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const location = useLocation();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.clusterForm?.data?.tableData
  );
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const buttonType = useSelector((state) => state?.clusterAdd?.data?.buttonType);
  const clusterName = useSelector(
    (state) => state.clusterForm?.data?.clusterName
  );
  const pincode = useSelector((state) => state.clusterForm?.data?.pincode);
  const clusterType = useSelector(
    (state) => state.clusterForm?.data?.clusterType
  );
  const selectedRows = useSelector(
    (state) => state.clusterForm?.state?.selectedRows
  );
  let initialClusterData=location?.state ? location?.state : {}
  if(initialClusterData){
    initialClusterData.cluster_type=location?.state ? { label: "Facility", value: 1 }:{ label: "Customer Request", value: 0 } 
    initialClusterData.cluster_name="cluster1"


  }
  if(loggedInClient && loggedInClient.label){
    initialClusterData.clients=loggedInClient
  }
  useEffect(()=>{
    location?.state?.facility_name && dispatch(setclusterType("Facility"))
  return(()=>{dispatch(setclusterType(""))})
  },[])
  const facility = selectedRows
    ?.map((row) => (row.isSelected ? row.id : ""))
    .filter((row) => row);
  const handleFormSubmit = async (values, setSubmitting,resetForm) => {
    setSubmitting(true);
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
        setSubmitting(true);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
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
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;
        let data=results?.data
        if(buttonType == "save"){
          navigate("/cluster")
        }
        else if(buttonType == "add_more"){
          setSubmitting(false);
          dispatch(
            getClusterFacility({ pageIndex, pageSize, sort, query })
          );
          dispatch(setSelectedRows([]))
          resetForm()
        }
        else{
          navigate("/shift-AddNew", { state: data})
        }
        // buttonType=="save" ? navigate("/cluster"): navigate("/shift-AddNew",{state:data});
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
          <h3 className="ml-3">Add Cluster</h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">
          Facilities can be classify in different cluster based on availability of Supervisor / Janitor.
          </div>
        </div>
        {initialClusterData ? (
          <BlockForm
            initialData={initialClusterData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <BlockForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        )}
      </AdaptableCard>
      <CancelConfirmation/>
      <NextConfirmation/>
    </>
  );
};

export default ClusterAdd;
