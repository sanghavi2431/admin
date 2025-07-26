import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import SupervisorInformationFields from "./components/SupervisorInformationFields";
import { injectReducer } from "@/store";
import reducer from "./store"
import { setButtonType } from "../supervisorAdd/store/dataSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

injectReducer("supervisorForm",reducer)
const SupervisorForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { initialData, onFormSubmit, onDiscard, type,id } = props;
  const validationSchemaAdd = Yup.object().shape({
      cluster: Yup.array().min(1)
      .required("cluster is required")
      .typeError("cluster is required"),
    // city: Yup.string()
    // .required("City is required")
    // .typeError("City is required"),
    // email: Yup.string().email()
    // .required("Email is required")
    // .typeError("Email is required"),
    first_name: Yup.string()
      .trim()
      .required("First Name is required")
      .typeError("First Name is required"),
      last_name: Yup.string()
      .trim()
      .required("Last Name is required")
      .typeError("Last Name is required"),
      mobile: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Mobile number is required")
      .min(10, "Must be 10 digits only")
      .max(10, "Must be 10 digits only")
      .typeError("Mobile number is required"),
  
  });
  const validationSchemaEdit = Yup.object().shape({
    cluster: Yup.array().min(1)
    .required("cluster is required")
    .typeError("cluster is required"),
  // city: Yup.string()
  // .required("City is required")
  // .typeError("City is required"),
  // email: Yup.string().email()
    // .required("Email is required")
    // .typeError("Email is required"),
  first_name: Yup.string()
    .trim()
    .required("First Name is required")
    .typeError("First Name is required"),
    last_name: Yup.string()
    .trim()
    .required("Last Name is required")
    .typeError("Last Name is required"),
    mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Mobile number is required"),
    status: Yup.object().required("Status is required").typeError("Status is required"),
  });

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={
          type == "add" ? validationSchemaAdd : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form className="flex flex-col justify-between ">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-3">
                  <SupervisorInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div>
              <div className="flex gap-2">
              <Button
                  size="sm"
                  loading={isSubmitting}
                  className="w-28 "
                  type="button"
                  shape="circle"
                  disabled={location?.state?.hasOwnProperty("template_name")?false:true}
                  onClick={() => {
                    let data=location?.state?{...location?.state,"supervisor":{ "value":id,"page":type}}:{"supervisor":{ "value":id,"page":type}}
                    let template_id=initialData.hasOwnProperty("status")?location?.state?.template_name?.value:initialData?.template_name?.value
                    navigate(`/task_template-Edit/${template_id}`,{ state: data});
                  }}
                >
                  <span className="text-black">Previous</span>
                </Button>
              <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    className="w-28 text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                    color="black"
                    type="submit" 
                    shape="circle"
                    onClick={()=>{
                      dispatch(setButtonType("next"))}}
                  >
                      <span className="text-black">Next</span> 
                  </Button>
                  <Button
                    size="sm"
                    className="w-28"
                    color="black"
                    shape="circle"
                    onClick={() => {
                      let data={"supervisor":"skip",...location?.state}
                      navigate(`/janitor-AddNew`,{state:data})
                    }}
                  >
                      <span className="text-black">Skip</span> 
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
                    onClick={()=>{dispatch(setButtonType("save"))}}
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

SupervisorForm.defaultProps = {
  type: "edit",
  initialData: {
    first_name:"",
    last_name:"",
    // email:"",
    mobile:"",
    city:"",
    cluster:"",
    status:"",
    // client_name:"",
  },
};

export default SupervisorForm;
