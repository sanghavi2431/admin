import { useMemo, useCallback,useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation,setSelectedTask } from "../store/stateSlice";
import { get_taskchecklist,setTableData,setSortedColumn, setClientId } from "../store/dataSlice";
import { cloneDeep } from "lodash";
// import UsersDeleteConfirmation from "./usersDeleteConfirmation";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import TaskDeleteConfirmation from "./task_checklistDeleteConfirmation";
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
  const onEdit = () => {
    navigate(`/task_checklist-Edit/${row.id}`);
    dispatch(setSideBarDisabled(true));

  };
  // const onView = () => {
  //   navigate(`/users-View/${row.id}`);
  // };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedTask(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/task_checklist-Edit"] ?
          <span
            className={`cursor-pointer p-2 hover:${textTheme} `}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit className="text-[#00C3DE]" />
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
        rolesAccess["/task_checklist-Delete"] ?
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

function TaskChecklistTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.taskchecklist.data.tableData
  );
  const loading = useSelector((state) => state.taskchecklist.data.loading);
  const data = useSelector((state) => state.taskchecklist.data.taskchecklist);
  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total }),
    [pageIndex, pageSize, sort, query, total]
  );
  const clientId = useSelector((state) => state.taskchecklist.data.clientId);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData,clientId]);

  const fetchData = () => {
    if (loading) return;
    dispatch(get_taskchecklist({ pageIndex, pageSize, sort, query,client_id:clientId }));
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
        Header: "Task Name",
        accessor: "task_name",
        sortable: true,
        Cell: (props) => {
          const { task_name } = props.row.original;
          return (
            <div className="flex w-28 justify-start align-end">{task_name}</div>
          );
        },
      },
      {
        Header: "Image",
        accessor: "image_url",
        sortable: true,
        Cell: (props) => {
          
          const { image_url,base_url } = props.row.original;
          //  base_url+="/"
          return (image_url ?<img className="w-18 h-14" src={base_url+"/"+image_url} ></img>:null);
        }
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
     < TaskDeleteConfirmation/>

    </>
  );
}
export default TaskChecklistTable;
