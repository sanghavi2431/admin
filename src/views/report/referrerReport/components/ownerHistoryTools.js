import React, { useState, useRef, useEffect } from "react";
import { Button, Input, FormItem, FormContainer } from "@/components/ui";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import { getOwnerHistory, setTableData } from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const OwnerHistoryTools = () => {
  const dispatch = useDispatch()
  let tableData = useSelector((state) => state.ownerHistoryList.data.tableData) 
  return (
    <Formik
      initialValues={{
        city:"",
        pincode:"",
        refercode: ""
      }}
      onSubmit={async (values) => {
        let filterData = []
        let pageIndex = 1
        let pageSize = 10
        let newTableData = cloneDeep(tableData)
       
        let cityObject = {
          type: "string",
          column: "city",
          value: ""
        }
        let pincodeObject = {
          type: "string",
          column: "pincode",
          value: ""
        }
        let ref_codeObject = {
          type: "string",
          column: "ref_code",
          value: ""
        }

        cityObject.value = values.city
        pincodeObject.value = values.pincode
        ref_codeObject.value = values.refercode

        if (values.city) {
          filterData.push(cityObject)
        }
        if (values.pincode) {
          filterData.push(pincodeObject)
        }
        if (values.refercode) {
          filterData.push(ref_codeObject)
        }
        newTableData.pageIndex = pageIndex
        newTableData.pageSize = pageSize
        newTableData.filterType = filterData
        dispatch(setTableData(newTableData))
        dispatch(getOwnerHistory(newTableData))
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form >
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 md:items-end gap-3 my-10">
          <div className="">

          <FormItem
              label="City">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="city"
                  value={values.city || ""}
                  component={Input}
                  placeholder="City"
                />
            </FormItem>
            </div>
            <div className="">

            <FormItem
              label="Pincode">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="pincode"
                  value={values.pincode || ""}
                  component={Input}
                  placeholder="Pincode"
                />
            </FormItem>
            </div>
            <div className="">

            <FormItem
              label="Reference Referral Code">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="refercode"
                  value={values.refercode || ""}
                  component={Input}
                  placeholder="Reference Referral Code"
                />
            </FormItem>
            </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  size="sm"
                  variant="solid"
                  icon={<AiOutlineSearch />}
                  className="text-gray-800"
                  type="submit"
                >
                  Search
                </Button>
                <Button
                  size="sm"
                  className="text-gray-800"
                  type="reset"
                >
                  Reset
                </Button>
              </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default OwnerHistoryTools;
