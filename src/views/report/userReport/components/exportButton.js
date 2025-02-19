import { Button } from "@/components/ui";
import { useDispatch,useSelector } from "react-redux";
import { toggleExportConfirmation } from "../store/dataSlice";

export function ExportButton() {
  const dispatch = useDispatch();
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);  

  const onExport = () => {
    dispatch(toggleExportConfirmation(true));
  };
  return (
    <Button
      size="sm"
      variant="solid"
      className="text-gray-800"
      onClick={onExport}
      visibility={rolesAccess["/userReport-Export"]
    }
    >
      Export
    </Button>
  );
}
