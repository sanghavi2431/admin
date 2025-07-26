import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/dataSlice";
import {
  getAllCategories,
  deletedBlogCategory,
  setTableData,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";

const BlogCategoryDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.blogCategory.data.deleteConfirmation
  );
  const selectedCorporate = useSelector(
    (state) => state.blogCategory.data.selectedCorporate
  );
  const tableData = useSelector((state) => state.blogCategory.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };
  const onDelete = async () => {
    const newTableData = cloneDeep(tableData);
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedCorporate;

    try {
      const success = await deletedBlogCategory(data);
      if (success) {
        dispatch(setTableData(newTableData));
        dispatch(getAllCategories(newTableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Blog Category deleted successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
      }
    } catch (err) {
      let errorMessage = err.response.data.error.message;
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Are you sure you want to delete this Blog Category? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default BlogCategoryDeleteConfirmation;
