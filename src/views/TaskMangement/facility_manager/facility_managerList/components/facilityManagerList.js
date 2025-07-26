import { useMemo, useCallback, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSelectedSupervisor,
} from "../store/stateSlice";
import {
  getFacilityManager,
  setTableData,
  setSortedColumn,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
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
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);
  const roleId = useSelector((state) => state.auth.user.roleId);

  const onEdit = () => {
    navigate(`/facilityManager-Edit/${row.id}`);
    dispatch(setSideBarDisabled(true));
  };
  // const onView = () => {
  //   navigate(`/users-View/${row.id}`);
  // };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedSupervisor(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {rolesAccess["/facilityManager-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme} `}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}

      {/* <span
      className={`cursor-pointer p-2 hover:${textTheme}`}
      onClick={onView}
    >
      <Tooltip title="View">
        <BsEyeFill color="orange" />
      </Tooltip>
    </span> */}
      {rolesAccess["/facilityManager-Delete"] ? (
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
        )
      ) : null}
    </div>
  );
};

function FacilityManagerTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.facility_managerList.data.tableData
  );

  const loading = useSelector(
    (state) => state.facility_managerList.data.loading
  );
  const data = useSelector(
    (state) => state.facility_managerList.data.facility_managerList
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
    dispatch(getFacilityManager({ pageIndex, pageSize, sort, query, total }));
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
        Header: "Mobile No",
        accessor: "mobile",
        sortable: true,
        Cell: (props) => {
          const { mobile } = props.row.original;

          return (
            <div className="flex w-30  justify-start align-end">{mobile}</div>
          );
        },
      },
      {
        Header: "email",
        accessor: "email",
        sortable: true,
        Cell: (props) => {
          const { email } = props.row.original;
          return <div className="flex w-16 ">{email}</div>;
        },
      },
      {
        Header: "City",
        accessor: "city",
        sortable: true,
        Cell: (props) => {
          const { city } = props.row.original;

          return (
            <div className="flex w-30  justify-start align-end">{city}</div>
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
            <div className="flex h-10 items-center gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass}`}
              >
                {statusColor[status].label}
              </span>
            </div>
          );
        },
      },

      // {
      //   Header: "Actions",
      //   accessor: "",
      //   id: "action",
      //   Cell: (props) => <ActionColumn row={props.row.original} />,
      // },
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
      {/* <SupervisiorDeleteConfirmation/> */}
    </>
  );
}
export default FacilityManagerTable;
