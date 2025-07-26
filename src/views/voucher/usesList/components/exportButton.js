import { Button } from "@/components/ui";
import { useDispatch } from "react-redux";
import { toggleExportConfirmation } from "../store/dataSlice";

export function ExportButton() {
  const dispatch = useDispatch();

  const onExport = () => {
    dispatch(toggleExportConfirmation(true));
  };
  return (
    <Button
      size="sm"
      variant="solid"
      className="text-gray-800"
      onClick={onExport}
    >
      Export
    </Button>
  );
}
