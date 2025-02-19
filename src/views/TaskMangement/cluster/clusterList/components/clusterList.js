import { useMemo, useCallback, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSelectedCluster,
} from "../store/stateSlice";
import { getCluster, setTableData, setSortedColumn ,setClientId} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import ClusterDeleteConfirmation from "./clusterDeleteConfirmation";

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
    navigate(`/cluster-Edit/${row.id}`);
  };
  // const onView = () => {
  //   navigate(`/users-View/${row.id}`);
  // };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedCluster(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {/* {cta[roleId].Cluster.edit ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme} `}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null} */}

      {/* <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onView}
      >
        <Tooltip title="View">
          <BsEyeFill color="orange" />
        </Tooltip>
      </span> */}
      {rolesAccess["/cluster-Delete"] ? (
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
      ) : null}
    </div>
  );
};

function ClusterTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.clusterList.data.tableData
  );
  const loading = useSelector((state) => state.clusterList.data.loading);
  const data = useSelector((state) => state.clusterList.data.clusterList);
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );
  const clientId = useSelector((state) => state.clusterList.data.clientId);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData,clientId]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getCluster({ pageIndex, pageSize, sort, query,client_id:clientId }));
  };
  useEffect(()=>{
    return (()=>{
      dispatch(setClientId(""))
    }) 
  },[])
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{id}</div>
          );
        },
      },
      {
        Header: "Cluster Type",
        accessor: "",
        // sortable: true,
        Cell: (props) => {
          const { pincode } = props.row.original;
        
          return pincode?<div className="flex w-16 ">{"Customer Request"}</div>:<div className="flex w-16 ">{"Facility"}</div>;
        },
      },
      {
        Header: "Cluster Name",
        accessor: "cluster_name",
        sortable: true,
        Cell: (props) => {
          const { cluster_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {cluster_name}
            </div>
          );
        },
      },
      {
        Header: "Pincode",
        accessor: "pincode",
        sortable: true,
        Cell: (props) => {
          const { pincode } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{pincode}</div>
          );
        },
      },

      {
        Header: "No of Facilities",
        accessor: "facilities",
        sortable: true,
        Cell: (props) => {
          const { facilities } = props.row.original;
          return facilities ? (
            <div className="flex w-30  justify-start align-end">
              {facilities.length}
            </div>
          ) : (
            <div></div>
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
      <ClusterDeleteConfirmation />
    </>
  );
}
export default ClusterTable;
