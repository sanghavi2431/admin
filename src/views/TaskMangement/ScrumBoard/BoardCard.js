// import { forwardRef } from "react";
// import classNames from "classnames";
// import { Card, Tag } from "@/components/ui";
// import UsersAvatarGroup from "@/components/shared/UsersAvatarGroup";
// import IconText from "@/components/shared/IconText";
// import { HiOutlineChatAlt2, HiOutlinePaperClip, HiFlag } from "react-icons/hi";
// import {
//   openDialog,
//   updateDialogView,
//   setSelectedTicketId,
// } from "./store/stateSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { taskLabelColors } from "./utils";
// import dayjs from "dayjs";

// const BoardCard = forwardRef((props, ref) => {
//   const dispatch = useDispatch();

//   const selectedTab = useSelector(
//     (state) => state.scrumBoard.state.selectedTab
//   );

//   const { listId, cardData, data, ...rest } = props;

//   const { id, name, dueDate, labels, address, assignto, assigndate, facility_name, date } = data;

//   const onCardClick = () => {
//     dispatch(openDialog());
//     dispatch(updateDialogView("TICKET"));
//     dispatch(setSelectedTicketId(id));
//   };

//   return (
//     <Card
//       ref={ref}
//       className={classNames(
//         "hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 ",
//         selectedTab !== "All" && !labels.includes(selectedTab)
//           ? "opacity-0 overflow-hidden h-0"
//           : "mb-4"
//       )}
//       bodyClass="p-4"
//       clickable
//       onClick={() => onCardClick()}
//       {...rest}
//     >
//       <div className="flex justify-between align-middle ">
// 		<div>
//         {labels.length > 0 && (
//           <>
//             {labels.map((label, index) => (
//               <Tag
//                 key={label + index}
//                 className="mr-2 rtl:ml-2 mb-2"
//                 prefix
//                 prefixClass={`${taskLabelColors[label]}`}
//               >
//                 {label}
//               </Tag>
//             ))}
//           </>
//         )}

// 		</div>
//         <div className="text-xs">
//           {assigndate && dayjs(assigndate).format("DD MMMM YYYY,hh:mm a")}
//         </div>
//       </div>
//       <h6 className="mb-2">{name}</h6>
      
//       <div className="mb-2">
//         <span className="text-black font-normal">Facility : </span>
//         <span className="mb-2 text-current text-xs">{facility_name}</span>
//       </div>
//       <div className="mb-2">
//         <span className="text-black font-normal">Address : </span>
//         <span className="mb-2 text-current text-xs">{address}</span>
//       </div>
//       <div className="mb-2">
//       <span className="text-black font-normal">Date & Time : </span>
//       <span className="mb-2 text-current text-xs">{date}</span>
//       </div>
//       <hr />
//       <div className="mt-2">
//         <span className="text-black font-normal">Assign To : </span>
//         <span className="mb-2 text-current text-xs">{assignto}</span>
//       </div>
//     </Card>
//   );
// });

// export default BoardCard;
