import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/dataSlice";
import {
  getblogSubCategory,
  delete_Subcategory,
  setTableData,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";

const BlogSubCategoryDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.blogSubCategoryList.data.deleteConfirmation
  );
  const selectedCategory = useSelector(
    (state) => state.blogSubCategoryList.data.selectedCategory
  );
  const tableData = useSelector((state) => state.blogSubCategoryList.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };
  const onDelete = async () => {
    const newTableData = cloneDeep(tableData);
    let index = newTableData.pageIndex;
    let total = newTableData.total;
    let size = newTableData.pageSize;
    let newPageIndex = Math.ceil(total / size);
    if (newPageIndex == index) {
      if (total % size == 1) {
        newTableData.pageIndex = index - 1;
      }
    }
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedCategory;

    try {
      const success = await delete_Subcategory(data);
      if (success) {
        dispatch(setTableData(newTableData));
        dispatch(getblogSubCategory(newTableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Sub Category deleted successfully
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
      title="Are you sure you want to delete this Sub Category? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default BlogSubCategoryDeleteConfirmation;
