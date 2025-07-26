import { AdaptableCard } from "@/components/shared";
import BlockForm from "../blockForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlock, update_Block } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../blockForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../blockForm/store/dataSlice";

injectReducer("blockEdit", reducer);

const BlockEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.blockAdd?.data?.buttonType);
  const blockData = useSelector((state) => state.blockEdit?.data?.blockData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.blockEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getBlock(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.id = Id;
    Data.status = values.status.value;
    Data.client_id = values.client_name.value;
    Data.location_id = values.location_name.value;
    Data.name = values.name;
    if (values.min_floor) {
      Data.min_floor = values.min_floor;
    }
    if (values.max_floor) {
      Data.max_floor = values.max_floor;
    }
    if (values.lat) {
      Data.lat = values.lat;
    }
    if (values.lng) {
      Data.lng = values.lng;
    }

    try {
      const success = await update_Block(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Building Edited successfully"}
            type="success"
            duration={2500}
          >
            Building Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        if (buttonType == "save") {
          navigate("/block");
        } else {
          if (location?.state?.facility?.page == "edit") {
            let isEdit = location?.state?.facility?.id;
            navigate(`/facility-Edit/${isEdit}`, { state: location?.state });
          } else {
            let data = {
              client_name: values?.client_name,
              location_name: values?.location_name,
              block_name: { label: values?.name, value: Id },
            };
            navigate("/facility-AddNew", { state: data });
          }
        }
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
    dispatch(toggleExitConfirmation(true));
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
          <h3 className="">Building Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(blockData) && (
            <>
              <BlockForm
                id={Id}
                type="edit"
                initialData={blockData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(blockData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Building found!"
            />
            <h3 className="mt-8">No Building found!</h3>
          </div>
        )}
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default BlockEdit;
