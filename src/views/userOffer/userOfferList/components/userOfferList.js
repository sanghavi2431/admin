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
  getUserOffer,
  setSelectedUserOffer,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable, TextEllipsis } from "@/components/shared";
import UserOfferDeleteConfirmation from "./userOfferDeleteConfirmation";
import UserOfferBulkDeleteConfirmation from "./userOfferBulkDeleteConfirmation";
import { Tooltip } from "@/components/ui";
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
    navigate(`/userOffer-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/userOffer-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedUserOffer(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
     {rolesAccess["/userOffer-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/userOffer-View"]? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/userOffer-Delete"] ? (
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
    (state) => state.userOfferList.data.tableData
  );
  const loading = useSelector((state) => state.userOfferList.data.loading);
  const data = useSelector((state) => state.userOfferList.data.userOfferList);
  const selectedRows = useSelector(
    (state) => state.userOfferList.state.selectedRows
  );

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getUserOffer({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "User Mobile",
        accessor: "mobile",
        sortable: true,
        Cell: (props) => {
          const { mobile } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">{mobile}</div>
          );
        },
      },
      {
        Header: "Offer",
        accessor: "title",
        sortable: true,
        Cell: (props) => {
          const { title } = props.row.original;
          return (
            <div className="flex w-50  justify-start align-end">
              {title}
            </div>
          );
        },
      },
      {
        Header: "Expiry Date",
        accessor: "expiry_date",
        sortable: true,
        Cell: (props) => {
          const { expiry_date } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {expiry_date}
            </div>
          );
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
  // const onRowSelect = (checked, row) => {
  //   if (checked) {
  //     dispatch(addRowItem([{ ...row, isSelected: 1 }]));
  //   } else {
  //     dispatch(removeRowItem([{ ...row, isSelected: 0 }]));
  //   }
  // };

  // const onAllRowSelect = useCallback(
  //   (checked, rows) => {
  //     if (checked) {
  //       const originalRows = rows.map((row) => {
  //         return { ...row.original, isSelected: 1 };
  //       });
  //       dispatch(setSelectedRows(originalRows));
  //     } else {
  //       const originalRows = rows.map((row) => {
  //         return { ...row.original, isSelected: 0 };
  //       });
  //       dispatch(setSelectedRows(originalRows));
  //     }
  //   },
  //   [dispatch]
  // );
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
        // selectable
        // onCheckBoxChange={onRowSelect}
        // defaultSelected={selectedRows}
        // onIndeterminateCheckBoxChange={onAllRowSelect}
      />
      <UserOfferDeleteConfirmation />
      <UserOfferBulkDeleteConfirmation />
    </>
  );
}
export default UsersTable;
