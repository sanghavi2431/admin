import React,{useEffect} from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import AsyncSelect from "react-select/async";
import { getPlans } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";


const IOTaddOnFields = (props) => {
  const dispatch = useDispatch();
  const { values, touched, errors,type } = props;
  const plans = useSelector((state) => state.subscribeIOTdevices.data.plans);

  useEffect(() => {
    dispatch(getPlans())
  }, []);

  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Plan*"
            invalid={errors.plan_id && touched.plan_id}
            errorMessage={errors.plan_id}
          >
             <Field name="plan_id">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={plans}
                  // loadOptions={loadCategory}
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.plan_id}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        })
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Name*"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values.name || ""}
              component={Input}
              placeHolder="Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Amount*"
            invalid={errors.amount && touched.amount}
            errorMessage={errors.amount}
          >
            <Field
              type="text"
              autoComplete="off"
              name="amount"
              value={values.amount || ""}
              component={Input}
              placeHolder="Amount"
            />
          </FormItem>
        </div>

       
      </div>
    </AdaptableCard>
  );
};

export default IOTaddOnFields;
