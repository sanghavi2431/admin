import React, { forwardRef, useEffect } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import ClusterInformationFields from "./components/ClusterInformationFields";
import ClusterTable from "./components/clusterList";
import reducer from "./store";
import reducerEdit from "../clusterEdit/store";
import { injectReducer } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";
import { toast, Notification } from "@/components/ui";
import { add_Cluster, toggleNextConfirmation } from "./store/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setSelectedRows } from "./store/stateSlice";
import { setButtonType } from "../clusterAdd/store/dataSlice";

injectReducer("clusterForm", reducer);

const ClusterForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard, type="add" } = props;
  const dispatch=useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const validationSchemaAddPincode = Yup.object().shape({
    cluster_type:Yup.object()
    .required("Client Type is required")
    .typeError("Client Type is required"),
    cluster_name: Yup.string()
      .required("Cluster Name is required")
      .typeError("Cluster Name is required"),
      pincode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Pincode is required")
    .min(6, "Must be 6 digits only")
    .max(6, "Must be 6 digits only")
    .typeError("Pincode is required")
  });
  const validationSchemaAddBlock = Yup.object().shape({
    cluster_type:Yup.object()
    .required("Client Type is required")
    .typeError("Client Type is required"),
    cluster_name: Yup.string()
      .required("Cluster Name is required")
      .typeError("Cluster Name is required")
  });
  const validationSchemaEdit = Yup.object().shape({});
  
  const clusterType = useSelector((state) => state.clusterForm.data.clusterType);
  const selectedIds=useSelector((state)=>state.clusterForm.data.selectedIds)
  const selectedRows = useSelector(
    (state) => state.clusterForm.state.selectedRows
  );
  let isSelected=selectedRows?.map((row)=>row.isSelected).includes(1)
  useEffect(()=>{
    dispatch(setSelectedRows([]))
  },[clusterType])

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={
          type == "add" ? (clusterType=="Facility"? validationSchemaAddBlock: validationSchemaAddPincode) : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting,resetForm }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting,resetForm);
        }}
      >
        {({ values, touched, errors, isSubmitting,setSubmitting }) => (
          <Form className=" flex flex-col justify-between">
            <FormContainer className="h-screen overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                  <div className="lg:col-span-3">
                    <ClusterInformationFields
                      touched={touched}
                      errors={errors}
                      values={values}
                      type={type}
                    />
                  </div>
                </div>
                <div>
                 {clusterType=="Facility"?<ClusterTable />:null } 
                </div>
            <div className="flex gap-2">
            <Button
                  size="sm"
                  loading={isSubmitting}
                  className="w-28 "
                  type="button"
                  shape="circle"
                  disabled={location?.state?false:true}
                  onClick={() => {
                    navigate(`/facility-Edit/${initialData?.facility_name?.value}`,{ state: {"cluster":{ "id":"id","page":type}} });
                  }}
                >
                  <span className="text-black">Previous</span>
                </Button>
                {type=="add" && <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-28 text-white bg-black"
                  color="black"
                  type="submit"
                  shape="circle"
                  onClick={() => {
                    dispatch(setButtonType("add_more"));
                  }}
                >
                  <span className="text-white">Add More</span>
                </Button>}
            <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    className="w-28 text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                    color="black"
                    type="button" 
                    shape="circle"
                    disabled={!isSelected && clusterType=="Facility"}
                    // onClick={()=>{dispatch(setButtonType("next"))}}
                    onClick={()=>{dispatch(toggleNextConfirmation(true));dispatch(setButtonType("next"));}}
                  >
                      <span className="text-black">Next</span> 
                  </Button>
                  </div>
            </FormContainer>

              <StickyFooter
                className="-mx-8 px-8 flex items-end justify-end py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div>
                <div className="md:flex items-end justify-end">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3 w-28 "
                    onClick={() => onDiscard?.()}
                    type="button"
                    shape="circle"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    // icon={<AiOutlineSave />}
                    className="w-28 text-white bg-black"
                    color="black"
                    type="submit"
                    shape="circle"
                    disabled={!isSelected && clusterType=="Facility"}
                    onClick={()=>{dispatch(setButtonType("save"))}}
                    // onClick={() => saveCluster?.(setSubmitting)}
                  >
                    <span className="text-white">Save & Exit</span>
                  </Button>
                </div>
                </div>
              </StickyFooter>
          </Form>
        )}
      </Formik>
    </>
  );
});

ClusterForm.defaultProps = {
  type: "edit",
  initialData: {
    pincode: "",
    cluster_type:{ label: "Customer Request", value: 0 },
    cluster_name: "",
    block: "",
  },
};

export default ClusterForm;
