import { AdaptableCard } from "@/components/shared";
import { HiUser } from "react-icons/hi";
import Form from "../role_Form";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, addRole } from "./store/dataSlice";

injectReducer("usersListAdd", reducer);

const UserNew = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let roleAccessObj = useSelector(
    (state) => state.usersListAdd.data.roleAccessObj
  );
  const navigate = useNavigate();
  const fetchData = (data) => {
    dispatch(getUser(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    let permissionObj={}
    permissionObj.showOnChangeModule=values.showOnChangeModule.value
    permissionObj.defaultPageMapping=values.defaultPageMapping;
    permissionObj.isLoodiscovery=values.isLoodiscovery.value;
    permissionObj.selectedModule=values.selectedModule.value

    let data = {};
    data.name = values.name;
    data.display_name = values.display_name;
    data.rolesAccess = JSON.stringify(roleAccessObj);
data.permissions=JSON.stringify(permissionObj)
    setSubmitting(true);
    try {
      const success = await addRole(data);
      setSubmitting(false);
      if (success) {
        toast.push(
          <Notification title={"New User added"} type="success" duration={2500}>
            New User added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/rbac");
      }
    } catch (err) {
      let errorMessage = err.response.data.error.message;
      setSubmitting(false);

      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  const handleDiscard = () => {
    navigate("/rbac");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <h3>Add New Role</h3>
        <>
          <Form
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
            roleAccessObj={roleAccessObj}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default UserNew;
