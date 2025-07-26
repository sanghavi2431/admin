import React, { useEffect, useState } from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select, Button } from "@/components/ui";
import { Field } from "formik";
import { Upload } from "@/components/ui";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toggleDeleteConfirmation,setSelectedSetting } from "../store/dataSlice";
import { useDispatch } from "react-redux";
import "../adminForm.css";
import { toast, Notification } from '@/components/ui'

const AdminInformationFields = (props) => {
  const { values, touched, errors, data } = props;
  const dispatch = useDispatch()
  const onSetFormFile = (form, field, file) => form.setFieldValue(field.name, (file))
  const onRemoveFile = (form, field, file) => {
    form.setFieldValue(field.name, "")
  }
  let [fieldDisable, setFieldDisabled] = useState({})
  useEffect(() => {
    for (let field of data) {
      setFieldDisabled(prevState => ({ ...prevState, [field.id]: true }))
    }
  }, [data])
  function enableButton(id) {
    if (fieldDisable[id]) {
      setFieldDisabled(prevState => ({ ...prevState, [id]: false }))
    }
    else {
      setFieldDisabled(prevState => ({ ...prevState, [id]: true }))
    }
  }
  function deleteButton(id) {
    dispatch(setSelectedSetting(id))
    dispatch(toggleDeleteConfirmation(true))
  }
  const beforeUpload = (file, files) => {
    let valid = true
    const allowedFileType = ['image/jpeg', 'image/png']
    const maxFileSize = 2097152
    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = 'Please upload a .jpeg or .png file!'
      }
      if (f.size >= maxFileSize) {
        valid = 'Upload image cannot more then 2 MB!'
      }
    }
    return valid
  }
  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">

        {data && data.length > 0
          ? data.map((item, index) => {
            return (
              <div key={index} className="col-span-2">
                {item.type == "text" ?
                  <FormItem asterisk label={item.display_name} invalid={errors[item.id] && touched[item.id]} errorMessage={errors[item.id]} inline={true}  >

                    <Field
                      type="text"
                      autoComplete="off"
                      value={values[item.id]}
                      name={`${item.id}`}
                      component={Input}
                      placeholder={item.display_name}
                      disabled={fieldDisable[item.id]}
                    />
                    <Button
                      shape="circle"
                      size="sm"
                      icon={<MdModeEdit />}
                      onClick={() => enableButton(item.id)}
                      type="button"
                      color="blue-600"
                      variant="twoTone"
                      className="mr-4 ml-4"

                    />
                    <Button
                      shape="circle"
                      size="sm"
                      icon={<MdDelete />}
                      onClick={() => deleteButton(item.id)}
                      type="button"
                      color="red-600"
                      variant="twoTone"
                    />


                  </FormItem> : <div></div>}
                {item.type == "image" ?
                  <FormItem asterisk label={item.display_name} invalid={errors[item.id] && touched[item.id]} errorMessage={errors[item.id]} inline={true}>
                    <Field name={`${item.id}`}>
                      {({ field, form }) => {
                        return (
                          <>
                            <div >
                              {values[item.id]?.length > 0 && typeof values[item.id] === "string" ? <img className="rounded m-2 max-h-[200px] max-w-[200px]" src={item.base_url + values[item.id]} /> : <div></div>}
                              <Button
                                shape="circle"
                                size="sm"
                                icon={<MdDelete />}
                                onClick={() => deleteButton(item.id)}
                                type="button"
                                color="red-600"
                                variant="twoTone"
                              />
                              <Upload
                                onChange={files => onSetFormFile(form, field, files)}
                                uploadLimit={1}
                                beforeUpload={beforeUpload}
                                // disabled={fieldDisable[item.id]}
                                className="ml-2"
                                onFileRemove={files => onRemoveFile(form, field, files)}
                                showList={typeof values[item.id] === "object"}
                              >

                              </Upload>


                            </div>
                            <div>

                            </div>
                          </>
                        )
                      }}
                    </Field>
                  </FormItem> : <div></div>}
                {item.type == "file" ?
                  <FormItem asterisk label={item.display_name} invalid={errors[item.id] && touched[item.id]} errorMessage={errors[item.id]}>
                    <Field name={`${item.id}`}>
                      {({ field, form }) => {
                        return (
                          <Upload
                            onChange={files => onSetFormFile(form, field, files)}
                            uploadLimit={1}
                          >
                          </Upload>
                        )
                      }}
                    </Field>
                  </FormItem> : <div></div>}
                {item.type == "textArea" ?
                  <FormItem asterisk label={item.display_name} invalid={errors[item.id] && touched[item.id]} errorMessage={errors[item.id]}>
                    <Field
                      type="text"
                      autoComplete="off"
                      value={values[item.id]}
                      name={`${item.id}`}
                      textArea
                      component={Input}
                      placeholder={item.display_name}
                    />
                  </FormItem> : <div></div>}
              </div>
            );
          })
          : null}

      </div>
    </AdaptableCard>
  );
};

export default AdminInformationFields;
