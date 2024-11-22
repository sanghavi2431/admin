import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddConfirmation,delete_supervisor } from "../store/stateSlice";
import ButtonlessDialog from "components/shared/ButtonlessDilog";
import SupervisorAdd from "../../template_mappingAdd";
import { setFacilityMappingData } from "store/auth/userSlice";

const TemplateAddMappingConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.templateMapList.state.addConfirmation
  );
  
  const onDialogClose = () => {
    dispatch(toggleAddConfirmation(false));
  };

  return (
    <ButtonlessDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title=""
      onCancel={onDialogClose}
      onConfirm={onDialogClose}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
      height={550}
      width={600}
    >
      <SupervisorAdd/>
    </ButtonlessDialog>
  );
};

export default TemplateAddMappingConfirmation;
