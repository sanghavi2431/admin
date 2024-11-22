import React from "react";
import { Button } from "components/ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarDisabled } from "store/auth/userSlice";

const BlockTools = () => {
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);

  const dispatch = useDispatch();
  return (
    <div
      className="md:flex lg:items-center"
      onClick={() => {
        dispatch(setSideBarDisabled(true));
      }}
    >
      <Link to="/block-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="bg-[#00C3DE] hover:bg-[#00c4debd]"
            color="black"
            block
            size="sm"
            variant="solid"
            visibility={rolesAccess["/block-AddNew"]}
          >
            <span className=""> Add New</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default BlockTools;
