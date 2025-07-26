import { useMemo, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSelectedTemplateMap,
  toggleEditConfirmation,
} from "../store/stateSlice";
import { setTableData, setSortedColumn, getTemplate } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { Tooltip } from "@/components/ui";
import { DataTable } from "@/components/shared";
import TemplateAddMappingConfirmation from "./templateAddMappingConfirmation";
import TemplateMapDeleteConfirmation from "./templateDeleteConfirmation";
import TemplateEditMappingConfirmation from "./templateEditMappingConfirmation";
import TemplateUploadConfirmation from "./templateUploadConfirmation";

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
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);

  const onEdit = () => {
    dispatch(toggleEditConfirmation(true));
    dispatch(setSelectedTemplateMap(row.id));
  };
  // const onView = () => {
  //   navigate(`/users-View/${row.id}`);
  // };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedTemplateMap(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {rolesAccess["/templateMap-Edit"] ? (
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
      {rolesAccess["/templateMap-Delete"] ? (
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

function TemplateMapTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, facility_id } = useSelector(
    (state) => state.templateMapList.data.tableData
  );

  const loading = useSelector((state) => state.templateMapList.data.loading);
  const data = useSelector(
    (state) => state.templateMapList.data.templateMapList
  );

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total, facility_id }),
    [pageIndex, pageSize, sort, query, total, facility_id]
  );

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sort, tableData, facility_id]);

  const fetchData = () => {
    if (loading) return;
    dispatch(getTemplate({ pageIndex, pageSize, sort, query, facility_id }));
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
        Header: "Facility Name",
        accessor: "facility_name",
        sortable: true,
        Cell: (props) => {
          const { facility_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {facility_name}
            </div>
          );
        },
      },
      {
        Header: "Template Name",
        accessor: "template_name",
        sortable: true,
        Cell: (props) => {
          const { template_name } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {template_name}
            </div>
          );
        },
      },
      {
        Header: "Slot Time",
        accessor: "start_time",
        sortable: true,
        Cell: (props) => {
          const { start_time, end_time } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {start_time + "-" + end_time}
            </div>
          );
        },
      },
      {
        Header: "Janitor Name",
        accessor: "janitor_name",
        sortable: true,
        Cell: (props) => {
          const { janitor_name } = props.row.original;

          return (
            <div className="flex w-30  justify-start align-end">
              {janitor_name}
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
            <div className="flex h-10 items-center gap-2">
              {status < 2 && (
                <span
                  className={`capitalize font-semibold ${statusColor[status]?.textClass}`}
                >
                  {statusColor[status].label}
                </span>
              )}
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
      <TemplateAddMappingConfirmation />
      <TemplateMapDeleteConfirmation />
      <TemplateEditMappingConfirmation />
      <TemplateUploadConfirmation />
    </>
  );
}
export default TemplateMapTable;
