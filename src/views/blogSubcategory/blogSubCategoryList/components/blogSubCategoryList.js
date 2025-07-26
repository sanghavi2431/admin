import { useMemo, useCallback } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSortedColumn,
  setTableData,
  getblogSubCategory,
  setSelectedCategory,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable, TextEllipsis } from "@/components/shared";
import { Tooltip } from "@/components/ui";
import BlogSubCategoryDeleteConfirmation from "./blogSubCategoryDeleteConfirmation";

const statusColor = {
  1: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  0: {
    label: "INACTIVE",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};
const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);
  const onEdit = () => {
    navigate(`/blogSubCategory-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/blogSubCategory-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedCategory(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
    {rolesAccess["/blogSubCategory-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {/* {cta[roleId]["Blog Sub-Category"].view ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null} */}
      {rolesAccess["/blogSubCategory-Delete"] ? (
        row.status.value == "0" ? (
          <span
            className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
          >
            <Tooltip title="Delete">
              <HiOutlineTrash color="grey" />
            </Tooltip>
          </span>
        ) : (
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onDelete}
          >
            <Tooltip title="Delete">
              <HiOutlineTrash color="red" />
            </Tooltip>
          </span>
        )
      ) : null}
    </div>
  );
};

function BlogSubCategoryTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.blogSubCategoryList.data.tableData
  );
  const loading = useSelector((state) => state.blogSubCategoryList.data.loading);
  const data = useSelector((state) => state.blogSubCategoryList.data.blogSubCategoryList);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, query]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getblogSubCategory({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-6 ">{id}</div>;
        },
      },
      {
        Header: "Category Name",
        accessor: "category_name",
        sortable: true,
        Cell: (props) => {
          const { category_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{category_name}</div>
          );
        },
      },
      {
        Header: "SubCategory",
        accessor: "sub_category",
        sortable: true,
        Cell: (props) => {
          const { sub_category } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {sub_category}
            </div>
          );
        },
      },
      {
        Header: "Icon",
        accessor: "icon",
        sortable: true,
        Cell: (props) => {
          const { icon } = props.row.original;
          return <div className=" w-20 "><img   src={icon}></img></div>;
        },
      },
      {
        Header: "Creation Date",
        accessor: "created_at",
        sortable: true,
        Cell: (props) => {
          const { created_at } = props.row.original;
          if (created_at != null) {
            let datetime = created_at
              .split("T")
              .join(" ")
              .split(".")
              .splice(0, 1);
            return <div className="flex w-36 ">{datetime}</div>
          };
          return <div className="flex w-36  justify-start">{created_at}</div>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex h-16 items-center gap-2">
              <span
                className={`capitalize font-semibold ${
                  statusColor[status].textClass
                }`}
              >
                {statusColor[status].label}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "",
        id: "action",
        Cell: (props) => <ActionColumn row={props.row.original} />,
      },
    ],
    []
  );
  const onPaginationChange = (page) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    dispatch(setTableData(newTableData));
  };

  const onSelectChange = (value) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageSize = Number(value);
    newTableData.pageIndex = 1;
    dispatch(setTableData(newTableData));
  };

  const onSort = (sort, sortingColumn) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
    dispatch(setTableData(newTableData));
    dispatch(setSortedColumn(sortingColumn));
  };
 
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
      />
<BlogSubCategoryDeleteConfirmation/>
    </>
  );
}
export default BlogSubCategoryTable;
