import { useMemo, useCallback, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation, setSelectedPlan } from "../store/stateSlice";
import { getallPlans, setTableData, setSortedColumn } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import PlanDeleteConfirmation from "./planDeleteConfirmation";
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
    dispatch(setSelectedPlan(row.plan_id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/woloos-AddNew"] ?
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

function PlanTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.planList.data.tableData
  );
  const loading = useSelector((state) => state.planList.data.loading);
  const data = useSelector((state) => state.planList.data.planList);
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
    dispatch(getallPlans({ pageIndex, pageSize, sort, query }));
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
        Header: "No. of Logins",
        accessor: "no_of_logins",
        sortable: true,
        Cell: (props) => {
          const { no_of_logins } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{no_of_logins}</div>
          );
        },
      },
      {
        Header: "No. of Facilities",
        accessor: "no_of_facilities",
        sortable: true,
        Cell: (props) => {
          const { no_of_facilities } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{no_of_facilities}</div>
          );
        },
      },
      {
        Header: "No. of Locations",
        accessor: "no_of_locations",
        sortable: true,
        Cell: (props) => {
          const { no_of_locations } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{no_of_locations}</div>
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
      < PlanDeleteConfirmation />

    </>
  );
}
export default PlanTable;
