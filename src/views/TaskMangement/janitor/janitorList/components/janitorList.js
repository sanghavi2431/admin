import { useMemo, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation, setSelectedJanitor } from "../store/stateSlice";
import { getJanitor, setTableData, setSortedColumn, setClientId } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import JanitorDeleteConfirmation from "./janitorDeleteConfirmation";
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
  const onEdit = () => {
    navigate(`/janitor-Edit/${row.id}`);
    dispatch(setSideBarDisabled(true));
  };
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedJanitor(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/janitor-Edit"] ?
          <span
            className={`cursor-pointer p-2 hover:${textTheme} `}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit color="skyblue" />
            </Tooltip>
          </span>
          : null
      }


      {/* <span
className={`cursor-pointer p-2 hover:${textTheme}`}
onClick={onView}
>
<Tooltip title="View">
  <BsEyeFill color="orange" />
</Tooltip>
</span> */}
      {
        rolesAccess["/janitor-Delete"] ?
          row.status == false ? (
            <span
              className={`cursor-not-allowed icon-disabled p-2 hover:${textTheme}`}
            >
              <Tooltip title="Delete">
                <HiOutlineTrash className="text-[#00C3DE]" />
              </Tooltip>
            </span>
          ) : (
            <span
              className={`cursor-pointer p-2 hover:${textTheme}`}
              onClick={onDelete}
            >
              <Tooltip title="Delete">
                <HiOutlineTrash className="text-[#00C3DE]" />
              </Tooltip>
            </span>
          )
          : null}
    </div>
  );
};

function JanitorTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, role_id } = useSelector(
    (state) => state.janitorList.data.tableData
  );
  const loading = useSelector((state) => state.janitorList.data.loading);
  const data = useSelector((state) => state.janitorList.data.janitorList);
  // const facility_id = useSelector((state) => state.janitorList.data.facility_id);

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, role_id }),
    [pageIndex, pageSize, sort, query, total, role_id]
  );
  const clientId = useSelector((state) => state.janitorList.data.clientId);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData, role_id, clientId]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getJanitor({ pageIndex, pageSize, sort, query, total, role_id, client_id: clientId }));
  };
  useEffect(() => {
    return (() => {
      dispatch(setClientId(""))
    })
  }, [])
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
      // {
      //   Header: "email",
      //   accessor: "email",
      //   sortable: true,
      //   Cell: (props) => {
      //     const { email } = props.row.original;
      //     return <div className="flex w-30 ">{email}</div>;
      //   },
      // },
      // {
      //   Header: "City",
      //   accessor: "city",
      //   sortable: true,
      //   Cell: (props) => {
      //     const { city } = props.row.original;

      //     return (
      //       <div className="flex w-30  justify-start align-end">{city}</div>
      //     );
      //   },
      // },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex h-10 items-center gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status].textClass
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
      <JanitorDeleteConfirmation />

    </>
  );
}
export default JanitorTable;
