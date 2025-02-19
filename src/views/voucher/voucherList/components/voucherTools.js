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
const VoucherTools = () => {
  const dispatch = useDispatch();
  const selectedRows = useSelector(
    (state) => state.voucherList.state.selectedRows
  );
  const bulkDeleteButton = useSelector(
    (state) => state.voucherList.data.bulkDeleteButton
  );
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)

  useEffect(() => {
    for (let row of selectedRows) {
      if (row.isSelected === 1) {
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
    <div className="flex flex-col md:flex-row gap-3">
      <Link to="/voucher-AddNew">
        <div className="">
          <Button
            className=" text-gray-800"
            block
            size="sm"
            variant="solid"
            icon={<HiPlusCircle />}
            visibility={rolesAccess["/voucher-AddNew"]}
          >
            Add New
          </Button>
        </div>
      </Link>
      <div className="">
        <Button
          className=" text-gray-800"
          block
          size="sm"
          disabled={bulkDeleteButton}
          onClick={onDelete}
          variant="solid"
          icon={<MdDelete />}
          visibility={rolesAccess["/voucher-BulkDelete"]}

        >
          Bulk Delete
        </Button>
      </div>
    </div>
  );
};

export default VoucherTools;
