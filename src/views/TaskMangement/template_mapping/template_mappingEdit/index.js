import { AdaptableCard } from "@/components/shared";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getTemplateMapbyId, update_templateMapped } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import TempMapForm from "../templateMapForm";
import { toggleEditConfirmation } from "../template_mappingList/store/stateSlice";
import { getTemplate } from "../template_mappingList/store/dataSlice";

injectReducer("tempMapEdit", reducer);

const TemplateMapEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const mappedTempData = useSelector((state) => state.tempMapEdit.data.mappedTempData);
  const selectedTemplateMap = useSelector((state) => state.templateMapList.state.selectedTemplateMap);

  const { pageIndex, pageSize, sort, query, total,facility_id } = useSelector(
    (state) => state.templateMapList.data.tableData
  );

  const loading = useSelector((state) => state.tempMapEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getTemplateMapbyId(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    function getFormatedDate(inputDateStr){
      const inputDate = new Date(inputDateStr);
  
  // Format the date into the desired output format
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');
  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');
  const seconds = inputDate.getSeconds().toString().padStart(2, '0');
  
  const outputDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return outputDateStr
  }
  form.append("id", selectedTemplateMap);
  form.append("status", values.status.value);
  form.append("janitor_id", values.janitor.value);
  form.append("task_template_id", values.templates.value);
  form.append("facility_id", values.facility.value);
  form.append("start_time", getFormatedDate(values.start_time));
  form.append("end_time", getFormatedDate(values.end_time));
  
    try {
      const success = await update_templateMapped(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Template Mapping Edited successfully"}
            type="success"
            duration={2500}
          >
            Template Mapping Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        dispatch(toggleEditConfirmation(false))
        dispatch(getTemplate({ pageIndex, pageSize, sort, query ,facility_id }));

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
    navigate("/templateMap");
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: selectedTemplateMap };

    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplateMap]);

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
        {/* <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          /> */}
          {/* <h3 className="">Template Mapping Edit</h3> */}
        </div>
        <Loading loading={loading}>
          {!isEmpty(mappedTempData) && (
            <>
              <TempMapForm
                type="edit"
                initialData={mappedTempData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(mappedTempData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Template Mapping found!"
            />
            <h3 className="mt-8">No Template Mapping found!</h3>
          </div>
        )} 
      </AdaptableCard>
    </>
  );
};

export default TemplateMapEdit;
