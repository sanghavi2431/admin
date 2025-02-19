import { AdaptableCard } from "@/components/shared";
import RoleForm from "../role_Form";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getRole, updateRole } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";

injectReducer("roleEdit", reducer);

const RoleEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let roleAccessObj = useSelector(
    (state) => state.roleEdit.data.roleAccessObj
  );

  const roleData = useSelector((state) => state?.roleEdit?.data?.roleData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state?.roleEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getRole(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
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
    data.id=Id
    try {
      const {success,results} = await updateRole(data);
      if (success) {
        setSubmitting(false);

        toast.push(
          <Notification
            title={"Role Edited successfully"}
            type="success"
            duration={2500}
          >
            Role Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/rbac")
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err.response.data.error.message;
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
    navigate("/rbac")
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };

    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
        <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="">Edit Role</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(roleData) && (
            <>
              <RoleForm
                type="edit"
                initialData={roleData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
                roleAccessObj={roleAccessObj}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(roleData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Role found!"
            />
            <h3 className="mt-8">No Role found!</h3>
          </div>
        )} 
      </AdaptableCard>
    </>
  );
};

export default RoleEdit;
