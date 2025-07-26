import { DataTable } from "@/components/shared";
import { useMemo } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit, MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import WoloosDeleteConfirmation from "./woloosDeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteConfirmation } from "../store/stateSlice";
import { getWoloos } from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { setTableData } from "../store/dataSlice";
import { setSortedColumn } from "../store/stateSlice";
import { useEffect } from "react";
import { setSelectedWoloo } from "../store/stateSlice";
import { TextEllipsis } from "@/components/shared";
import BulkUploadConfirmation from "./bulkUploadConfirmation";
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
  "-1": {
    label: "ACTIVE",
    dotClass: "bg-red-500",
    textClass: "text-red-500",
  },
};
const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)

  const onEdit = () => {
    navigate(`/woloos-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/woloos-View/${row.id}`);
  };
  const onPrint = () => {
    window.open(`/woloos-QRCode/${row.id}`, { target: "_blank" });
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedWoloo(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {rolesAccess["/woloos-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/woloos-View"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/woloos-Delete"] ? (
        row.status.value === "0" ? (
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
      <span
        className={`cursor-pointer p-2 hover:${textTheme}`}
        onClick={onPrint}
        visibility={rolesAccess["/woloos-QRCode"]}
        >
        <Tooltip title="Print">
          <MdOutlineFileDownload color="grey" />
        </Tooltip>
    </span>
    </div>
  );
};

function WoloosTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.woloosList.data.tableData
  );
  const loading = useSelector((state) => state.woloosList.data.loading);
  const data = useSelector((state) => state.woloosList.data.woloosList);
  localStorage.setItem('woloosList', JSON.stringify(data));

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
    dispatch(getWoloos({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-8 ">{id}</div>;
        },
      },
      {
        Header: "Code",
        accessor: "code",
        sortable: true,
        Cell: (props) => {
          const { code } = props.row.original;
          return <div className="flex w-32 ">{code}</div>;
        },
      },
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        Cell: (props) => {
          const { name } = props.row.original;
          return <div className="flex w-48 ">{name}</div>;
        },
      },

      {
        Header: "Address",
        accessor: "address",
        sortable: true,
        Cell: (props) => {
          const { address } = props.row.original;
          return (
            <div className="flex w-32 justify-start">
              <TextEllipsis text={address} maxTextCount={40} />
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
          return <div className="flex w-24 justify-start">{pincode}</div>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;
          if (status === "null") {
          }
          return (
            <div className="flex items-center  h-16 gap-2">
              <span
                className={`capitalize font-semibold ${statusColor[status.value].textClass
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
      <WoloosDeleteConfirmation />
      <BulkUploadConfirmation />
    </>
  );
}
export default WoloosTable;
