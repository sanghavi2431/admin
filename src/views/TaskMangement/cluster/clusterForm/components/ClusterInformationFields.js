import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { getLocation, get_Blocks, get_Clients, setclusterName, setclusterType, setpincode, setSelectedBlock } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const clusterType = [
  { label: "Customer Request", value: 0 },
  { label: "Facility", value: 1 },
];

const ClusterInformationFields = (props) => {
  const { values, touched, errors } = props;
  const dispatch=useDispatch()
  const location = useLocation();
 
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [client_id, setClient_id] = useState(location?.state ?location?.state?.clients?.value :values?.clients?.value);
  const [location_id, setLocation_id] = useState(location?.state?.location?.value);
  const [block_id, setBlock_id] = useState(location?.state?.block?.value);
  const clients = useSelector((state) => state.clusterForm.data.clients);
  const locations = useSelector((state) => state.clusterForm.data.locations);
  const blocks = useSelector((state) => state.clusterForm.data.blocks);
const cluster_Type=useSelector((state)=>state.clusterForm.data.clusterType)

  const loadLocations = async (client_id) => {
    let data = { id: client_id ,status:true};
    dispatch(getLocation(data));
  };

  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id ,status:true};
    dispatch(get_Blocks(data));
  };
  useEffect(() => {
    dispatch(get_Clients())
  }, []);
  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [client_id, location_id]);
  useEffect(()=>{
dispatch(setclusterName(values.cluster_name))
dispatch(setpincode(values.pincode))

  },[values.cluster_name,values.pincode])
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="Cluster Type"
            invalid={errors.cluster_type && touched.cluster_type}
            errorMessage={errors.cluster_type}
          >
            <Field name="cluster_type">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={clusterType}
                  value={values.cluster_type}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        }),
                        dispatch(setclusterType(option.label)),
                        loggedInClient?"":form.setFieldValue("clients",""),
                        loggedInClient?"":form.setFieldValue("location",""),
                        form.setFieldValue("block","")
                        )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
       
        <div className="col-span-1">
          <FormItem
            label="Cluster name"
            invalid={errors.cluster_name && touched.cluster_name}
            errorMessage={errors.cluster_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="cluster_name"
              value={values.cluster_name || ""}
              component={Input}
              placeHolder="Cluster Name"
            />
          </FormItem>
        </div>
        {
          cluster_Type=="Facility" ?
          <>
           <div className="col-span-1">
           <FormItem label="Clients">
                <Field name="clients">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      required
                      options={clients}
                      isDisabled={loggedInClient?true:false}
                      value={values.clients}
                      cacheOptions={false}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setClient_id(option.value),
                            form.setFieldValue("location",""),
                        form.setFieldValue("block","")
                        )
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div className="col-span-1">
              <FormItem label="Location">
                <Field name="location">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      options={locations}
                      value={values.location}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setLocation_id(option.value),
                            form.setFieldValue("block",""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
          <div className="col-span-1">
          <FormItem
            label="Building"
            invalid={errors.block && touched.block}
            errorMessage={errors.block}
          >
            <Field name="block">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={blocks}
                  value={values.block}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        }),
                        dispatch(setSelectedBlock(option.value))                        )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
       
        </>
          :
          <div className="col-span-1">
          <FormItem
            label="Pincode"
            invalid={errors.pincode && touched.pincode}
            errorMessage={errors.pincode}
          >
            <Field
              type="text"
              autoComplete="off"
              name="pincode"
              value={values.pincode || ""}
              component={Input}
              placeHolder="Pincode"
            />
          </FormItem>
        </div>
        }
       
        
      </div>
    </AdaptableCard>
  );
};

export default ClusterInformationFields;
