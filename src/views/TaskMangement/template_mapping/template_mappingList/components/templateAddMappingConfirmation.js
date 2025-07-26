import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddConfirmation } from "../store/stateSlice";
import ButtonlessDialog from "@/components/shared/ButtonlessDilog";
import SupervisorAdd from "../../template_mappingAdd";

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
