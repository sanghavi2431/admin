import { AdaptableCard } from "@/components/shared";
import ClusterForm from "../clusterForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getCluster, update_cluster } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setClusterList, setclusterType } from "../clusterForm/store/dataSlice";
import { cloneDeep } from "lodash";

injectReducer("clusterEdit", reducer);

const ClusterEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const clusterData = useSelector(
    (state) => state.clusterEdit?.data?.clusterData
  );
  const data = useSelector((state) => state.clusterForm?.data?.clusterList);

  if (clusterData?.cluster_type?.value === 1)
    dispatch(setclusterType("Facility"));
  useEffect(() => {
    if (clusterData?.facilities?.length) {
      let incomingData = cloneDeep(data);
      let newdata = incomingData?.map((cluster) => {
        return { ...cluster, isSelected: true };
      });
      dispatch(setClusterList(newdata));
    }
  }, [clusterData, data.length]);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.clusterEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getCluster(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.id = Id;
    Data.status = values.status.value;
    Data.client_id = values.client_name.value;
    Data.location_id = values.location_name.value;
    Data.name = values.name;
    Data.min_floor = values.min_floor;
    Data.max_floor = values.max_floor;
    if (values.lat) {
      Data.lat = values.lat;
    }
    if (values.lng) {
      Data.lng = values.lng;
    }

    try {
      const success = await update_cluster(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Cluster Edited successfully"}
            type="success"
            duration={2500}
          >
            Cluster Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/cluster");
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err.response.data.error.message;
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
    navigate("/cluster");
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
          <h3 className="">Cluster Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(clusterData) && (
            <>
              <ClusterForm
                type="edit"
                initialData={clusterData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(clusterData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Cluster found!"
            />
            <h3 className="mt-8">No Cluster found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default ClusterEdit;
