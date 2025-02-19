import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogTools = () => {
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)

  return (
    <div className="">
      <Link to="/activeBlogs-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="text-gray-800"
            block
            size="sm"
            variant="solid"
            icon={<HiPlusCircle />}
            visibility={rolesAccess["/activeBlogs-AddNew"]}
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

export default BlogTools;
