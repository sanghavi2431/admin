import { useMemo, useCallback,useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation,setSelectedIOTDevice } from "../store/stateSlice";
import { getIOTDevice,setTableData,setSortedColumn, setClientId } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import BlockDeleteConfirmation from "./IOTDeviceDeleteConfirmation";
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
  const roleId = useSelector((state) => state.auth.user.roleId);

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedIOTDevice(row.device_id));
  };
  const onEdit = () => {
    navigate(`/iotDevice-Edit/${row.device_id}`);
    dispatch(setSideBarDisabled(true))
  };

  return (
    <div className="flex justify-start text-lg">

      {
        rolesAccess["/iotDevice-Delete"] ?
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
           {/* {
        rolesAccess["/iotDevice-Edit"] ?
          <span
            className={`cursor-pointer p-2 hover:${textTheme} `}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit color="skyblue" />
            </Tooltip>
          </span>
          : null
      } */}
    </div>
  );
};

function IotDeviceTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.IotDeviceList.data.tableData
  );
  const loading = useSelector((state) => state.IotDeviceList.data.loading);
  const data = useSelector((state) => state.IotDeviceList.data.IOTDeviceList);
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );
  const clientId = useSelector((state) => state.IotDeviceList.data.clientId);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData,clientId]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getIOTDevice({ pageIndex, pageSize, sort, query,client_id:clientId }));
  };
  useEffect(()=>{
    return (()=>{
      dispatch(setClientId(""))
    }) 
  },[])
  const columns = useMemo(
    () => [
      // {
      //   Header: "ID",
      //   accessor: "id",
      //   sortable: true,
      //   Cell: (props) => {
      //     const { id } = props.row.original;
      //     return <div className="flex w-16 ">{id}</div>;
      //   },
      // },
      {
        Header: "Client Name",
        accessor: "client_name",
        sortable: true,
        Cell: (props) => {
          const { client_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{client_name}</div>
          );
        },
      },
      {
        Header: "Device Type",
        accessor: "device_type",
        sortable: true,
        Cell: (props) => {
          const { device_type } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{device_type}</div>
          );
        },
      },
      {
        Header: "device_id",
        accessor: "device_id",
        sortable: true,
        Cell: (props) => {
          const { device_id } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{device_id}</div>
          );
        },
      },
     
      
      {
        Header: "Facility Name",
        accessor: "facility_name",
        sortable: true,
        Cell: (props) => {
          const { facility_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{facility_name ?  facility_name : "-"}</div>
          );
        },
      },

      {
        Header: "Booth Name",
        accessor: "booth_name",
        sortable: true,
        Cell: (props) => {
          const { booth_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{booth_name ? booth_name : "-"}</div>
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
     < BlockDeleteConfirmation/>

    </>
  );
}
export default IotDeviceTable;
