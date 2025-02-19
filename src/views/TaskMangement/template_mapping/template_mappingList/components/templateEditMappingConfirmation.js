import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditConfirmation } from "../store/stateSlice";
import ButtonlessDialog from "@/components/shared/ButtonlessDilog";
import TemplateMapEdit from "../../template_mappingEdit";

const TemplateEditMappingConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.templateMapList.state.editConfirmation
  );
  const onDialogClose = () => {
    dispatch(toggleEditConfirmation(false));
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
    >
      <TemplateMapEdit/>
    </ButtonlessDialog>
  );
};

export default TemplateEditMappingConfirmation;
