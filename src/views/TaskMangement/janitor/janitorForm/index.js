import React, { forwardRef }  from "react";
import {useRef} from "react"
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import JanitorInformationFields from "./components/janitorInformationFields";
import { injectReducer } from "@/store";
import reducer from "./store"
import UsersImages from "./components/janitorImage";
import { setButtonType } from "../janitorAdd/store/dataSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

injectReducer("janitorForm",reducer)
const JanitorForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const myRef = useRef(false);
  const { initialData, onFormSubmit, onDiscard, type ,id} = props;
  const validationSchemaAdd = Yup.object().shape({
    gender: Yup.object()
      .required("Gender is required")
      .typeError("Gender is required"),
      // city: Yup.string()
      // .required("City is required")
      // .typeError("City is required"),
      cluster: Yup.array().min(1)
      .required("cluster is required")
      .typeError("cluster is required"),
      start_time: Yup.string()
      .required("Start time is required")
      .typeError("Start time is required"),
      // email: Yup.string().email()
      // .required("Email is required")
      // .typeError("Email is required"),
      end_time: Yup.string()
      .required("End time is required")
      .typeError("End time is required"),
      first_name: Yup.string()
      .trim()
      .required("First Name is required")
      .typeError("First Name is required"),
      last_name: Yup.string()
      .trim()
      .required("Last Name is required")
      .typeError("Last Name is required"),
      // address: Yup.string()
      // .trim()
      // .required("Address is required")
      // .typeError("Address is required"),
      mobile: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Mobile number is required")
      .min(10, "Must be 10 digits only")
      .max(10, "Must be 10 digits only")
      .typeError("Mobile number is required"),
  });
  const validationSchemaEdit = Yup.object().shape({
    gender: Yup.object()
      .required("Gender is required")
      .typeError("Gender is required"),
      // city: Yup.string()
      // .required("City is required")
      // .typeError("City is required"),
      cluster: Yup.array().min(1)
      .required("cluster is required")
      .typeError("cluster is required"),
      start_time: Yup.string()
      .required("Start time is required")
      .typeError("Start time is required"),
      // email: Yup.string().email()
      // .required("Email is required")
      // .typeError("Email is required"),
      end_time: Yup.string()
      .required("End time is required")
      .typeError("End time is required"),
      first_name: Yup.string()
      .trim()
      .required("First Name is required")
      .typeError("First Name is required"),
      last_name: Yup.string()
      .trim()
      .required("Last Name is required")
      .typeError("Last Name is required"),
      // address: Yup.string()
      // .trim()
      // .required("Address is required")
      // .typeError("Address is required"),
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
        onSubmit={(values, { setSubmitting,resetForm }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting,resetForm);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form className="flex flex-col justify-between">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-3">
                  <JanitorInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div>
              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-3">
                  <UsersImages
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div> */}
              <div className="flex gap-2">
              <Button
                  size="sm"
                  loading={isSubmitting}
                  className="w-28 "
                  type="button"
                  shape="circle"
                  ref={myRef}
                  disabled={location?.state?(location?.state?.hasOwnProperty("template_name")||location?.state?.supervisor!="skip"?false:true):true}
                  onClick={() => {
                    if(location?.state?.supervisor=="skip" && location?.state?.hasOwnProperty("template_name") ){
                      let data=location?.state?{...location?.state,"janitor":{ "id":id,"page":type}}:{"janitor":{ "id":id,"page":type}}
                      let template_page=+location?.state?.template_name?.value
                      navigate(`/task_template-Edit/${template_page}`,{ state: data });

                    }
                    else if(location?.state?.supervisor=="skip"){
                    }
                    else{
                      let data=location?.state?{...location?.state,"janitor":{ "id":id,"page":type}}:{"janitor":{ "id":id,"page":type}}
                      navigate(`/supervisor-Edit/${location?.state?.supervisor?.value}`,{ state: data });
                    }
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
                    type="submit" 
                    shape="circle"
                    onClick={()=>{dispatch(setButtonType("next"))}}
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

JanitorForm.defaultProps = {
  type: "edit",
  initialData: {
    first_name:"",
    last_name:"",
    mobile:"",
    gender:"",
    address:"",
    city:"",
    cluster:"",
    start_time:"",
    end_time:"",
    status:"",
    aadhar_image:"",
    pan_image:"",
    wish_certificate_image:"",
    // email:""
  },
};

export default JanitorForm;
