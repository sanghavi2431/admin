import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortedColumn,
  setTableData,
  getFranchise,
  setSelectedFranchise,
  toggleDeleteConfirmation,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { DataTable } from "@/components/shared";
import { Tooltip } from "@/components/ui";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill, BsCartPlusFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FranchiseDeleteConfirmation from "./franchiseDeleteConfirmation";

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
    navigate(`/franchise-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/franchise-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedFranchise(row.id));
  };

  return (
    <div className="flex justify-end text-lg">
      {rolesAccess["/franchise-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/franchise-View"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/franchise-Delete"] ? (
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
function UsersTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.franchiseList.data.tableData
  );
  const loading = useSelector((state) => state.franchiseList.data.loading);
  const data = useSelector((state) => state.franchiseList.data.franchiseList);

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
    dispatch(getFranchise({ pageIndex, pageSize, sort, query }));
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
        Header: "Woloo Code",
        accessor: "code",
        sortable: true,
        Cell: (props) => {
          const { code } = props.row.original;
          return <div className="flex w-6 ">{code}</div>;
        },
      },

      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        Cell: (props) => {
          const { name } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">{name}</div>
          );
        },
      },
      {
        Header: "title",
        accessor: "title",
        sortable: true,
        Cell: (props) => {
          const { title } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">{title}</div>
          );
        },
      },
      {
        Header: "address",
        accessor: "address",
        sortable: true,
        Cell: (props) => {
          const { address } = props.row.original;
          return <div className="flex w-36 justify-start">{address}</div>;
        },
      },
      {
        Header: "pincode",
        accessor: "pincode",
        sortable: true,
        Cell: (props) => {
          const { pincode } = props.row.original;
          return <div className="flex w-16  justify-start">{pincode}</div>;
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
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
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
        onSort={onSort}
      />
      <FranchiseDeleteConfirmation />
    </>
  );
}
export default UsersTable;
