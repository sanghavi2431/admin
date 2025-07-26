import { useState, useMemo } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useThemeClass from "@/utils/hooks/useThemeClass";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteConfirmation,
  setSortedColumn,
  setTableData,
  getActiveBlogs,
  setSelectedActiveBlog,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { DataTable } from "@/components/shared";
import { Tooltip } from "@/components/ui";
import ActiveBlogsDeleteConfirmation from "./activeBlogsDeleteConfirmation";

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

const FILE_DISPLAY_LIMIT = 2; // Max number of files to show before "Show More"

const MediaRenderer = ({ files }) => {
  const [expanded, setExpanded] = useState(false);

  if (!Array.isArray(files)) files = [files]; // Ensure files is always an array

  const displayedFiles = expanded ? files : files.slice(0, FILE_DISPLAY_LIMIT);

  return (
    <div className="flex gap-2 flex-wrap">
      {displayedFiles.map((file, index) => {
        const isVideo = file.match(/\.(mp4|webm|ogg)$/i);

        return isVideo ? (
          <video key={index} src={file} className="w-16 h-16 rounded" controls />
        ) : (
          <img key={index} src={file} className="w-16 h-16 object-cover rounded" alt="Media" />
        );
      })}

      {files.length > FILE_DISPLAY_LIMIT && !expanded && (
        <button
          className="text-primary underline text-xs"
          onClick={() => setExpanded(true)}
        >
          Show More
        </button>
      )}
    </div>
  );
};

const ActionColumn = ({ row }) => {
  const dispatch = useDispatch();
  const { textTheme } = useThemeClass();
  const navigate = useNavigate();
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId);
  const onEdit = () => {
    navigate(`/activeBlogs-Edit/${row.id}`);
  };
  const onView = () => {
    navigate(`/activeBlogs-View/${row.id}`);
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedActiveBlog(row.id));
  };

  return (
    <div className="flex justify-start text-lg">
      {
        rolesAccess["/activeBlogs-Edit"] ?
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <MdModeEdit color="skyblue" />
            </Tooltip>
          </span>
          : null
      }
      {/* {
        cta[roleId]["Active Blogs"].view ?
          <span
            className={`cursor-pointer p-2 hover:${textTheme}`}
            onClick={onView}
          >
            <Tooltip title="View">
              <BsEyeFill color="orange" />
            </Tooltip>
          </span> :
          null
      } */}
      {
        rolesAccess["/activeBlogs-Delete"] ?
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
          ) : null}
    </div>
  );
};

function ActiveBlogsTable() {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.activeBlogsList.data.tableData
  );
  const loading = useSelector((state) => state.activeBlogsList.data.loading);
  const data = useSelector((state) => state.activeBlogsList.data.activeBlogsList);

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
    dispatch(getActiveBlogs({ pageIndex, pageSize, sort, query }));
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortable: true,
        Cell: (props) => {
          const { id } = props.row.original;
          return <div className="flex w-6 ">{id}</div>;
        },
      },
      {
        Header: "Category",
        accessor: "categories",
        sortable: true,
        Cell: (props) => {
          const { categories } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">{categories}</div>
          );
        },
      },
      {
        Header: "SubCategory",
        accessor: "sub_categories",
        sortable: true,
        Cell: (props) => {
          const { sub_categories } = props.row.original;
          return (
            <div className="flex w-30  justify-start align-end">
              {sub_categories}
            </div>
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: true,
        Cell: (props) => {
          const { title } = props.row.original;
          return (
            <div className="flex w-36 justify-start">
              {title}
              {/* <TextEllipsis text={title} maxTextCount={10} /> */}
            </div>
          );
        },
      },
      {
        Header: "Main Media",
        accessor: "main_image",
        sortable: false,
        Cell: ({ row }) => <MediaRenderer files={row.original.main_image} />,
      },
      {
        Header: "Like Counts",
        accessor: "like_counts",
        sortable: true,
        Cell: (props) => {
          const { like_counts } = props.row.original;
          return <div className="flex w-16  justify-start">{like_counts}</div>;
        },
      },
      {
        Header: "Favourite Counts",
        accessor: "favourite_counts",
        sortable: true,
        Cell: (props) => {
          const { favourite_counts } = props.row.original;
          return <div className="flex w-10  justify-start">{favourite_counts}</div>;
        },
      },
      {
        Header: "Creation Date",
        accessor: "created_at",
        sortable: true,
        Cell: (props) => {
          const { created_at } = props.row.original;
          if (created_at != null) {
            let datetime = created_at
              .split("T")
              .join(" ")
              .split(".")
              .splice(0, 1);
            return <div className="flex w-36 ">{datetime}</div>
          };
          return <div className="flex w-36  justify-start">{created_at}</div>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        sortable: true,
        Cell: (props) => {
          const { status } = props.row.original;

          return (
            <div className="flex h-16 items-center gap-2">
              <span
                className={`capitalize font-semibold ${
                  statusColor?.[status]?.textClass
                }`}
              >
                {statusColor?.[status]?.label}
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
<ActiveBlogsDeleteConfirmation/>
    </>
  );
}
export default ActiveBlogsTable;
