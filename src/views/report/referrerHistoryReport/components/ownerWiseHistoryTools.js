import React, { useState, useRef, useEffect } from "react";
import { Button, Input, FormItem, FormContainer, Select } from "@/components/ui";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import { getOwnerWiseHistory, setTableData } from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const OwnerWiseHistoryTools = () => {
  const dispatch = useDispatch();
  let tableData = useSelector(
    (state) => state.ownerWiseHistoryList.data.tableData
  );
  return (
    <Formik
      initialValues={{
        pincode: "",
        mobile: "",
        ref_code: "",
      }}
      onSubmit={async (values) => {
        let filterData = [];
        let pageIndex = 1;
        let pageSize = 10;
        let newTableData = cloneDeep(tableData);

        let pincodeObject = {
          type: "string",
          column: "pincode",
          value: "",
        };
        let mobileObject = {
          type: "string",
          column: "mobile",
          value: "",
        };
        let ref_codeObject = {
          type: "string",
          column: "ref_code",
          value: "",
        };
        let owner_idObject = {
          type: "string",
          column: "sponsor_id",
          value: "",
        };

        pincodeObject.value = values.pincode;
        mobileObject.value = values.mobile;
        ref_codeObject.value = values.ref_code;
        owner_idObject.value = values.owner_id;

        if (values.pincode) {
          filterData.push(pincodeObject);
        }
        if (values.mobile) {
          filterData.push(mobileObject);
        }
        if (values.ref_code) {
          filterData.push(ref_codeObject);
        }
        if (values.owner_id) {
          filterData.push(owner_idObject);
        }

        newTableData.pageIndex = pageIndex;
        newTableData.pageSize = pageSize;
        newTableData.filterType = filterData;
        dispatch(setTableData(newTableData));
        dispatch(getOwnerWiseHistory(newTableData));
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 md:items-end gap-3 my-10">
            <div className="">
              <FormItem label="Pincode">
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
              <FormItem label="Mobile">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="mobile"
                  value={values.mobile || ""}
                  component={Input}
                  placeholder="Mobile"
                />
              </FormItem>
            </div>
            <div className="">
              <FormItem label="Referral code">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="ref_code"
                  value={values.ref_code || ""}
                  component={Input}
                  placeholder="Referral code"
                />
              </FormItem>
            </div>
            <div className="">
              <FormItem label="Owner Id">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="owner_id"
                  value={values.owner_id || ""}
                  component={Input}
                  placeholder="Owner Id"
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
              <Button size="sm" className="text-gray-800" type="reset">
                Reset
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default OwnerWiseHistoryTools;
