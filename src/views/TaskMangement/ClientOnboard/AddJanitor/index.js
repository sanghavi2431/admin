import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import { Button, FormContainer, FormItem } from "@/components/ui";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { addJanitor } from "@/services/taskManagement/janitorService";
import { getCluster } from "../store/dataSlice";
import { setAddJanitorData } from "../store/dataSlice";
import { toast, Notification } from "@/components/ui";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const AddJanitorForm = ({ goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch();
  const addJanitorData = useSelector((state) => state?.clientOnboard?.data?.addJanitorData);
  const clusterOptions = useSelector((state) => state?.clientOnboard?.data?.clusterList);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().trim().required("Full Name is required"),
    number: Yup.string().trim().required("Number is required"),
    gender: Yup.string().required("Gender is required"),
    // cluster: Yup.array().min(1)
    //   .required("cluster is required")
    //   .typeError("cluster is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const clusterId = clusterOptions[0]?.value;
      const payload = new FormData();
      payload.append("role_id", 1);
      payload.append("first_name", values.full_name);
      payload.append("last_name", "");
      payload.append("mobile", values.number);
      payload.append("gender", values.gender);
      payload.append("cluster_ids", "[" + clusterId + "]")
      payload.append("user_id", addJanitorData?.user_id);
      const response = await addJanitor(payload);
      console.log(response?.data?.results?.data);
      const user = response?.data?.results?.data;
      dispatch(setAddJanitorData({ ...values, user_id: user?.value }));
      goToNextStep();
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.error("Error setting up janitor:", error);
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage || "Facing Internal Server Error!"}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <div className="flex justify-center items-center gap-4 mb-10">
          <button className="bg-yellow-300 p-2 rounded-lg" onClick={goToPreviousStep}>
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h2 className="text-2xl font-bold text-black text-center">
            Assign <span className="text-primary">Janitor</span>
          </h2>
        </div>

        <Formik
          initialValues={addJanitorData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting, values, setFieldValue }) => (
            <Form>
              <FormContainer className="flex flex-col gap-6">
                <FormItem
                  // label="Full Name*" 
                  invalid={errors.full_name && touched.full_name}
                  errorMessage={errors.full_name}
                >
                  <Field type="text" name="full_name" component={Input} placeholder="Full Name *" />
                </FormItem>

                <FormItem
                  // label="Number*" 
                  invalid={errors.number && touched.number}
                  errorMessage={errors.number}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="number"
                    placeholder="Number *"
                    component={Input}
                    onKeyPress={(e) => {
                      if (new RegExp(/[0-9]/).test(e.key)) {
                      } else e.preventDefault();
                    }}
                    maxlength="10"
                  />
                </FormItem>

                <FormItem
                  // label="Gender*"
                  invalid={errors.gender && touched.gender}
                  errorMessage={errors.gender}
                >
                  <Field name="gender">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Gender *"
                        options={genderOptions}
                        value={genderOptions.find(option => option.value === values.gender) || null}
                        onChange={(option) => setFieldValue("gender", option ? option.value : "")}
                      />
                    )}
                  </Field>
                </FormItem>

                {/* <FormItem label="Cluster*" invalid={errors.cluster && touched.cluster} errorMessage={errors.cluster}>
                  <Field name="cluster">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Cluster *"
                        options={clusterOptions}
                        isMulti
                        isSearchable={true}
                        value={values.cluster}
                        onChange={(option) => setFieldValue("cluster", option ? option : "")}
                      />
                    )}
                  </Field>
                </FormItem> */}

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="solid"
                    color="black"
                    shape="round"
                    className="w-1/2 bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Next
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddJanitorForm;
