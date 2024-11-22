import React from "react";
import { Button } from "components/ui";
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

const BlogCategoryTools = () => {
  const dispatch = useDispatch();
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);

  return (
    <div className="md:flex lg:items-center w-full">
      <Link to="/blogCategory-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="text-gray-800"
            block
            size="sm"
            variant="solid"
            icon={<HiPlusCircle />}
            visibility={rolesAccess["/blogCategory-AddNew"]}
          >
            Add New
          </Button>
        </div>
      </Link>
      {/* <div className=" mb-1 md:mb-0 ">
        <Button
          className=" text-gray-800"
          block
          size="sm"
          disabled={bulkDeleteButton}
          onClick={onDelete}
          variant="solid"
          icon={<MdDelete />}
        >
          Bulk Delete
        </Button>
      </div> */}
    </div>
  );
};

export default BlogCategoryTools;
