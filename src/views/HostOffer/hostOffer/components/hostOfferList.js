import { useMemo, useCallback, useEffect  } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { setSelectedHostOffer,toggleDeleteConfirmation,getHostOffers,setTableData,setSortedColumn } from "../store/dataSlice";
import HostOfferDeleteConfirmation from "./hostOfferDeleteConfirmation";
import { Tooltip } from "@/components/ui";
import { DataTable, TextEllipsis } from "@/components/shared";

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
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)

  const onEdit = () => {
    navigate(`/hostOffer-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/hostOffer-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedHostOffer(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
     {rolesAccess["/hostOffer-Edit"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onEdit}
        >
          <Tooltip title="Edit">
            <MdModeEdit color="skyblue" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/hostOffer-View"] ? (
        <span
          className={`cursor-pointer p-2 hover:${textTheme}`}
          onClick={onView}
        >
          <Tooltip title="View">
            <BsEyeFill color="orange" />
          </Tooltip>
        </span>
      ) : null}
      {rolesAccess["/hostOffer-delete"] ? (
        row.status.value == "0" ? (
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

function HostOfferTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.hostOfferList.data.tableData
  );

  const loading = useSelector((state) => state.hostOfferList.data.loading);
  const data = useSelector((state) => state.hostOfferList.data.hostOfferList);

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
    dispatch(getHostOffers({ pageIndex, pageSize, sort, query }));
  };

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
        Header: "Title",
        accessor: "title",
        sortable: true,
        Cell: (props) => {
          const { title } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">{title}</div>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: true,
        Cell: (props) => {
          const { description } = props.row.original;
          return (
            <div className="flex w-32  justify-start align-end">
              <TextEllipsis text={description} maxTextCount={32} />
            </div>
          );
        },
      },
      {
        Header: "Expiry",
        accessor: "end_date",
        sortable: true,
        Cell: (props) => {
          const { end_date } = props.row.original;
          return (
            <div className="flex w-16  justify-start align-end">
              <TextEllipsis text={end_date} maxTextCount={13} />
            </div>
          );
        },
      },
      {
        Header: "Main Image",
        accessor: "image",
        sortable: true,
        Cell: (props) => {
          const { image,base_url } = props.row.original;
          return <div className=" w-36 "><img src={base_url+image}></img></div>;
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
                  statusColor[status.value].textClass
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
        onSort={onSort}
      />
      <HostOfferDeleteConfirmation />
    </>
  );
}
export default HostOfferTable;
