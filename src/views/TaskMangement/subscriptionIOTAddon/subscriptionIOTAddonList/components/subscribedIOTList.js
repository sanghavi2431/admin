import { useMemo, useCallback, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation, setSelectedSubscribedIOT } from "../store/stateSlice";
import { getallSubscribeIot, setTableData, setSortedColumn } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import SubscribedIOTDelete from "./subscribedIOTDeleteConfirmation";
import { setSideBarDisabled } from "@/store/auth/userSlice";

const statusColor = {
  true: {
    label: "ACTIVE",
    dotClass: "bg-emerald-500",
    textClass: "text-emerald-500",
  },
  false: {
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

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedSubscribedIOT(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/addon-Delete"] ?
          row.status == false ? (
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
          ) : null}
    </div>
  );
};

function SubscribedIOTTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.subscribedIOTList.data.tableData
  );
  const loading = useSelector((state) => state.subscribedIOTList.data.loading);
  const data = useSelector((state) => state.subscribedIOTList.data.subscribedIOTList);
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
    dispatch(getallSubscribeIot({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        Cell: (props) => {
          const { name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{name}</div>
          );
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        sortable: true,
        Cell: (props) => {
          const { amount } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{amount}</div>
          );
        },
      },
      {
        Header: "Plan Name",
        accessor: "plan_name",
        sortable: true,
        Cell: (props) => {
          const { plan_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{plan_name}</div>
          );
        },
      },
      {
        Header: "",
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
      < SubscribedIOTDelete />

    </>
  );
}
export default SubscribedIOTTable;
