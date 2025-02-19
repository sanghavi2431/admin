import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  toggleBulkDeleteConfirmation,
  setBulkDeleteButton,
} from "../store/dataSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const SubscriptionTools = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector(
    (state) => state.subscriptionList.state.selectedRows
  );
  const bulkDeleteButton = useSelector(
    (state) => state.subscriptionList.data.bulkDeleteButton
  );
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);
  

  useEffect(() => {
    for (let row of selectedRows) {
      if (row.isSelected == 1) {
        dispatch(setBulkDeleteButton(false));
        break;
      } else {
        dispatch(setBulkDeleteButton(true));
      }
    }
  }, [selectedRows]);

  const onDelete = () => {
    dispatch(toggleBulkDeleteConfirmation(true));
  };

  return (
    <div className="md:flex lg:items-center">
      <Link to="/subscription-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="text-gray-800"
            block
            size="sm"
            variant="solid"
            icon={<HiPlusCircle />}
            visibility={rolesAccess["/subscription-AddNew"]}
          >
            Add New
          </Button>
        </div>
      </Link>
      <div className="mb-1 md:mb-0 ">
        <Button
          className="text-gray-800"
          block
          size="sm"
          disabled={bulkDeleteButton}
          onClick={onDelete}
          variant="solid"
          icon={<MdDelete />}
          visibility={rolesAccess["/subscription-BulkDelete"]}
          >
          Bulk Delete
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionTools;
