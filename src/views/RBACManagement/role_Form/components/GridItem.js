import { Checkbox } from "@/components/ui";
import { useDispatch } from "react-redux";
import { setRoleAccessObj } from "@/views/RBACManagement/roleAddNew/store/dataSlice";
import { setRoleAccessObjEdit } from "@/views/RBACManagement/roleEdit/store/dataSlice";

export default function GridItem({ roleAccessObj, type }) {
  const dispatch = useDispatch();
  const excludePaths = ["/route", "/accessDenied", "/dashboard"];

  // Grouping permissions by route prefix
  const groupedPermissions = Object.entries(roleAccessObj).reduce((acc, [permission, value]) => {
    const [category] = permission.split("-");
    if (!excludePaths.includes(category)) {
      acc[category] = { ...acc[category], [permission]: value };
    }
    return acc;
  }, {});

  // Toggle permission state
  const handlePermissionToggle = (permission) => {
    dispatch(
      type === "edit"
        ? setRoleAccessObjEdit({ ...roleAccessObj, [permission]: !roleAccessObj[permission] })
        : setRoleAccessObj({ ...roleAccessObj, [permission]: !roleAccessObj[permission] })
    );
  };

  return (
    <div className="w-full flex flex-wrap gap-4">
      {Object.entries(groupedPermissions).map(([category, permissions]) => (
        <div
          key={category}
          className="flex flex-col gap-2 h-96 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h6>{category.replace("/", "").toUpperCase()}</h6>
          <div className="flex flex-col gap-2">
            {Object.entries(permissions).map(([permission, value]) => (
              <Checkbox key={permission} checked={value} onChange={() => handlePermissionToggle(permission)}>
                {permission}
              </Checkbox>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
