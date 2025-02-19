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
  getSubscription,
  setSelectedSubscription,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { TextEllipsis } from "@/components/shared";
import SubscriptionDeleteConfirmation from "./subscriptionDeleteConfirmation";
import {
  addRowItem,
  removeRowItem,
  setSelectedRows,
} from "../store/stateSlice";
import RowSelection from "@/components/shared/RowSelection";
import SubscriptionBulkDeleteConfirmation from "./subscriptionBulkDeleteConfirmation";
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
    navigate(`/subscription-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/subscription-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedSubscription(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {rolesAccess["/subscription-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/subscription-View"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/subscription-Delete"] ? (
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

function SubscriptionTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.subscriptionList.data.tableData
  );
  const loading = useSelector((state) => state.subscriptionList.data.loading);
  const data = useSelector(
    (state) => state.subscriptionList.data.subscriptionList
  );
  const selectedRows = useSelector(
    (state) => state.subscriptionList.state.selectedRows
  );

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
    dispatch(getSubscription({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-16 ">{id}</div>;
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
        Header: "Days",
        accessor: "days",
        sortable: true,
        Cell: (props) => {
          const { days } = props.row.original;
          return (
            <div>
              <TextEllipsis text={days} maxTextCount={10} />
            </div>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: true,
        Cell: (props) => {
          const { description } = props.row.original;
          return <TextEllipsis text={description} maxTextCount={30} />;
        },
      },
      {
        Header: "Price With GST",
        accessor: "price_with_gst",
        sortable: true,
        Cell: (props) => {
          const { price_with_gst } = props.row.original;
          return (
            <div className="flex w-16  justify-start">{price_with_gst}</div>
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
            <div className="flex items-center gap-2">
              <span
                className={`capitalize font-semibold ${
                  statusColor[status.value].textClass
                }`}
              >
                {statusColor[status.value].label}
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
  const onRowSelect = (checked, row) => {
    if (checked) {
      dispatch(addRowItem([{ ...row, isSelected: 1 }]));
    } else {
      dispatch(removeRowItem([{ ...row, isSelected: 0 }]));
    }
  };

  const onAllRowSelect = useCallback(
    (checked, rows) => {
      if (checked) {
        const originalRows = rows.map((row) => {
          return { ...row.original, isSelected: 1 };
        });
        dispatch(setSelectedRows(originalRows));
      } else {
        const originalRows = rows.map((row) => {
          return { ...row.original, isSelected: 0 };
        });
        dispatch(setSelectedRows(originalRows));
      }
    },
    [dispatch]
  );
  return (
    <>
      <RowSelection
        columns={columns}
        data={data}
        skeletonAvatarColumns={[0]}
        skeletonAvatarProps={{ className: "rounded-md" }}
        loading={loading}
        pagingData={tableData}
        onPaginationChange={onPaginationChange}
        onSelectChange={onSelectChange}
        onSort={onSort}
        selectable
        onCheckBoxChange={onRowSelect}
        defaultSelected={selectedRows}
        onIndeterminateCheckBoxChange={onAllRowSelect}
      />
      <SubscriptionDeleteConfirmation />
      <SubscriptionBulkDeleteConfirmation />
    </>
  );
}
export default SubscriptionTable;
