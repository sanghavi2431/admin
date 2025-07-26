import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import { Button, FormContainer, FormItem } from "@/components/ui";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useSelector, useDispatch } from "react-redux";
import { createTaskTemplate } from "@/services/taskManagement/taskTemplateService";
import { setAssignTaskData } from "../store/dataSlice";
import { toast, Notification } from "@/components/ui";

const cleaningOptions = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
  { value: "4", label: "Four" },
];

const frequencyOptions = [
  { value: "15", label: "15 Minutes" },
  { value: "30", label: "30 Minutes" },
  { value: "45", label: "45 Minutes" },
  { value: "60", label: "60 Minutes" },
];

const AssignTaskForm = ({ goToNextStep, goToPreviousStep }) => {
  const dispatch = useDispatch();
  const assignTaskData = useSelector((state) => state?.clientOnboard?.data?.assignTaskData);
  const clientId = useSelector((state) => state?.auth?.user?.clientId?.value);

  const validationSchema = Yup.object().shape({
    numToilets: Yup.number().required("Number of Toilets is required"),
    toiletCleaning: Yup.string().required("Toilet Cleaning selection is required"),
    generalCleaning: Yup.string().required("General Cleaning selection is required"),
    cleaningFrequency: Yup.string().required("Cleaning Frequency is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(setAssignTaskData(values));

      const payload = {
        client_id: clientId,
        numToilets: values.numToilets,
        frequency: values.cleaningFrequency,
        toilet_cleaning: values.toiletCleaning,
        general_cleaning: values.generalCleaning
      }
      await createTaskTemplate(payload);
      goToNextStep();
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.error("Error assigning tasks:", error);
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
            Assign <span className="text-primary">Tasks</span>
          </h2>
        </div>

        <Formik
          initialValues={assignTaskData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting, values, setFieldValue }) => (
            <Form>
              <FormContainer className="flex flex-col gap-6">
                <FormItem
                  // label="No. of Toilets*"
                  invalid={errors.numToilets && touched.numToilets}
                  errorMessage={errors.numToilets}
                >
                  <Field
                    type="number"
                    name="numToilets"
                    component={Input}
                    placeholder="No. of Toilets *"
                    onKeyPress={(e) => {
                      if (new RegExp(/[0-9]/).test(e.key)) {
                      } else e.preventDefault();
                    }}
                    max="5"
                    min="1"
                  />
                </FormItem>

                <FormItem
                  // label="Toilet Cleaning*"
                  invalid={errors.toiletCleaning && touched.toiletCleaning}
                  errorMessage={errors.toiletCleaning}
                >
                  <Field name="toiletCleaning">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Toilet Cleaning *"
                        options={cleaningOptions}
                        value={cleaningOptions.find(option => option.value === values.toiletCleaning) || null}
                        onChange={(option) => setFieldValue("toiletCleaning", option ? option.value : "")}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  // label="General Cleaning*"
                  invalid={errors.generalCleaning && touched.generalCleaning}
                  errorMessage={errors.generalCleaning}
                >
                  <Field name="generalCleaning">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="General Cleaning *"
                        options={cleaningOptions}
                        value={cleaningOptions.find(option => option.value === values.generalCleaning) || null}
                        onChange={(option) => setFieldValue("generalCleaning", option ? option.value : "")}
                      />
                    )}
                  </Field>
                </FormItem>

                <FormItem
                  // label="Frequency of Cleaning*"
                  invalid={errors.cleaningFrequency && touched.cleaningFrequency}
                  errorMessage={errors.cleaningFrequency}
                >
                  <Field name="cleaningFrequency">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Frequency of Cleaning *"
                        options={frequencyOptions}
                        value={frequencyOptions.find(option => option.value === values.cleaningFrequency) || null}
                        onChange={(option) => setFieldValue("cleaningFrequency", option ? option.value : "")}
                      />
                    )}
                  </Field>
                </FormItem>

                <p className="font-bold text-center"> Tasks can only be created between 9 AM and 9 PM. Tasks exceeding this timeframe will be scheduled for the next day.</p>

                <div className="flex justify-center">
                  <Button
                    variant="solid"
                    color="black"
                    shape="round"
                    className="w-1/2 bg-[#00C3DE] hover:bg-[#00c4debd] text-black rounded-full font-semibold"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Submit
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

export default AssignTaskForm;
