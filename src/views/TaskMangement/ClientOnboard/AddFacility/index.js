import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, FormContainer } from "@/components/ui";
import { Input, FormItem } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUpClientFacility } from "@/services/taskManagement/clientService";
import { setAddFacilityData } from "@/views/TaskMangement/ClientOnboard/store/dataSlice";
import { getCluster } from "@/views/TaskMangement/ClientOnboard/store/dataSlice";
import { toast, Notification } from "@/components/ui";

const AddFacilityForm = ({ goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch();
  const addFacilityData = useSelector((state) => state?.clientOnboard?.data?.addFacilityData);
  const clientId = useSelector((state) => state.auth?.user?.clientId?.value);

  const validationSchema = Yup.object().shape({
    organization_name: Yup.string().trim().required("Organization name is required"),
    unit_no: Yup.string().trim().required("Unit No. is required"),
    locality: Yup.string().trim().required("Locality is required"),
    building: Yup.string().trim().required("Building is required"),
    floor: Yup.string().trim().required("Floor is required"),
    landmark: Yup.string().trim().required("Landmark is required"),
    pin_code: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .typeError("Must be only digits"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        org_name: values.organization_name,
        unit_no: values.unit_no,
        locality: values.locality,
        building: values.building,
        floor: values.floor,
        landmark: values.landmark,
        pincode: values.pin_code,
        client_id: String(clientId) ?? "",
        location_id: String(addFacilityData?.location_id) ?? "",
        cluster_id: String(addFacilityData?.cluster_id) ?? "",
      };
      const response = await setUpClientFacility(payload);
      const { location_id, cluster_id } = response?.data?.results?.data;
      dispatch(setAddFacilityData({ ...values, location_id: location_id, cluster_id: cluster_id }));
      goToNextStep();
    } catch (error) {
      console.error("Error setting up client facility:", error);
      const errorMessage = error?.response?.data?.message;
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage || "Facing Internal Server Error!"}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    } finally {
      const data = { status: true }
      dispatch(getCluster(data));
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-full">
        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="bg-yellow-300 p-2 rounded-lg" onClick={goToPreviousStep}>
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h2 className="text-2xl font-bold text-black text-center">
            List your <span className="text-primary">Facility</span>
          </h2>
        </div>

        <Formik
          initialValues={addFacilityData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form >
              <FormContainer className="flex flex-col gap-6">
                <FormItem
                  // label="Organization Name*"
                  invalid={errors.organization_name && touched.organization_name}
                  errorMessage={errors.organization_name}
                >
                  <Field
                    type="text"
                    name="organization_name"
                    component={Input}
                    placeholder="Name of your Organization *"
                  />
                </FormItem>

                <div className="grid grid-cols-3 gap-3">
                  <FormItem
                    // label="Unit No.*"
                    invalid={errors.unit_no && touched.unit_no}
                    errorMessage={errors.unit_no}
                  >
                    <Field type="text" name="unit_no" component={Input} placeholder="Unit No. *" />
                  </FormItem>

                  <FormItem
                    // label="Locality*"
                    invalid={errors.locality && touched.locality}
                    errorMessage={errors.locality}
                  >
                    <Field type="text" name="locality" component={Input} placeholder="Locality *" />
                  </FormItem>

                  <FormItem
                    // label="Building*"
                    invalid={errors.building && touched.building}
                    errorMessage={errors.building}
                  >
                    <Field type="text" name="building" component={Input} placeholder="Building *" />
                  </FormItem>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <FormItem
                    // label="Floor*"
                    invalid={errors.floor && touched.floor}
                    errorMessage={errors.floor}
                  >
                    <Field type="text" name="floor" component={Input} placeholder="Floor *" />
                  </FormItem>

                  <FormItem
                    // label="Landmark*"
                    invalid={errors.landmark && touched.landmark}
                    errorMessage={errors.landmark}
                  >
                    <Field type="text" name="landmark" component={Input} placeholder="Landmark *" />
                  </FormItem>

                  <FormItem
                    // label="Pin Code*"
                    invalid={errors.pin_code && touched.pin_code}
                    errorMessage={errors.pin_code}
                  >
                    <Field type="text" name="pin_code" component={Input} placeholder="Pin Code *"
                      onKeyPress={(e) => {
                        if (new RegExp(/[0-9]/).test(e.key)) {
                        } else e.preventDefault();
                      }}
                      maxlength="6"
                    />
                  </FormItem>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="solid"
                    color="black"
                    shape="round"
                    className="w-1/3 bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold"
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

export default AddFacilityForm;
