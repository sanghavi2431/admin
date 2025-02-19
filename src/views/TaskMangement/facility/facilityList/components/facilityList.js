import { useMemo, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation,setSelectedFacility } from "../store/stateSlice";
import { getFacility,setTableData,setSortedColumn,setClientId } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import FacilityDeleteConfirmation from "./facilityDeleteConfirmation";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import FacilityUploadConfirmation from "./facilityUploadConfirmation";
import FacilityDownloadQRConfirmation from "./facilityDownloadQRConfirmation";

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

  const onEdit = () => {
    navigate(`/facility-Edit/${row.id}`);
    dispatch(setSideBarDisabled(true));
  };
  // const onView = () => {
  //   navigate(`/users-View/${row.id}`);
  // };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedFacility(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/facility-Edit"]?
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

      {
        rolesAccess["/facility-Delete"] ?
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

function FacilityTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total,isAll } = useSelector(
    (state) => state.facilityList.data.tableData
  );
  const loading = useSelector((state) => state.facilityList.data.loading);
  const data = useSelector((state) => state.facilityList.data.facilityList);
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total,isAll }),
    [pageIndex, pageSize, sort, query, total]
  );
  const clientId = useSelector((state) => state.facilityList.data.clientId);


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData,clientId]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getFacility({ pageIndex, pageSize, sort, query,client_id:clientId,isAll }));
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
        Header: "Facility Name",
        accessor: "facility_name",
        Cell: (props) => {
          const { facility_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{facility_name}</div>
          );
        },
      },
      {
        Header: "No. of Booths",
        accessor: "no_of_booths",
        sortable: true,
        Cell: (props) => {
          const { no_of_booths } = props.row.original;
          return (
            <div className="flex w-20  justify-center align-center">{no_of_booths?no_of_booths:0}</div>
          );
        },
      },
      {
        Header: "Floor Number",
        accessor: "floor_number",
        sortable: true,
        Cell: (props) => {
          const { floor_number } = props.row.original;
          return (
            <div className="flex w-20  justify-center align-center">{floor_number}</div>
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
     < FacilityDeleteConfirmation/>
     <FacilityUploadConfirmation/>
     <FacilityDownloadQRConfirmation/>

    </>
  );
}
export default FacilityTable;
