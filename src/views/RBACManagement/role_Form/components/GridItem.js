import { useState } from "react";
import { Checkbox } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { setRoleAccessObj } from "views/RBACManagement/roleAddNew/store/dataSlice";
import { setRoleAccessObjEdit } from "views/RBACManagement/roleEdit/store/dataSlice";

export default function GridItem({ roleAccessObj: input ,type}) {
  const dispatch = useDispatch();
  const excludePath=["/route","/accessDenied","/dashboard"]
  let obj = {};
  for (let i in input) {
    let splitName = i.split("-");
    if(!excludePath.includes(splitName[0])){
      if (obj[splitName[0]]) {
        obj[splitName[0]] = { ...obj[splitName[0]], [i]: input[i] };
      } else {
        obj[i] = { [i]: input[i] };
      }
    }
  
  }
  function changeHandler(selectedName) {
    if (input[selectedName]) {
      type=="edit"?dispatch(setRoleAccessObjEdit({ ...input, [selectedName]: false }))
      :dispatch(setRoleAccessObj({ ...input, [selectedName]: false }));
    } else {
      type=="edit"?dispatch(setRoleAccessObjEdit({ ...input, [selectedName]: true }))
      :dispatch(setRoleAccessObj({ ...input, [selectedName]: true }));
    }
  }
  return (
    <div>
    <div className="w-full flex flex-wrap gap-4">
      {Object.keys(obj).map((objName) => {
        return (
          <div className="flex flex-col gap-2 h-96 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h6>{objName.substring(1).toLocaleUpperCase()}</h6>
            <div className="flex flex-col gap-2">
              {Object.keys(obj[objName]).map((objN) => (
                <Checkbox
                  checked={input[`${objN}`]}
                  onChange={() => changeHandler(`${objN}`)}
                >
                  {objN}
                </Checkbox>
              ))}
            </div>
          </div>
        );
      })}
    </div>
    <div>
      
    </div>
    </div>
  );
}
