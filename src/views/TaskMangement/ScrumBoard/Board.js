// import React, { useEffect, lazy, Suspense } from "react";
// import { Dialog } from "@/components/ui";
// import { Droppable, DragDropContext } from "react-beautiful-dnd";
// import { getBoards } from "./store/dataSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { updateColumns, updateOrdered } from "./store/dataSlice";
// import { closeDialog } from "./store/stateSlice";
// import { reorder, reorderQuoteMap } from "./utils";
// import BoardColumn from "./BoardColumn";
// import BoardTitle from "./BoardTitle";

// const TicketContent = lazy(() => import("./TicketContent"));
// const AddNewTicketContent = lazy(() => import("./AddNewTicketContent"));
// const AddNewColumnContent = lazy(() => import("./AddNewColumnContent"));
// const AddNewMemberContent = lazy(() => import("./AddNewMemberContent"));

// const Board = (props) => {
//   const { containerHeight, useClone, isCombineEnabled, withScrollableColumns } =
//     props;

//   const dispatch = useDispatch();

//   const columns = useSelector((state) => state.scrumBoard.data.columns);
//   const ordered = useSelector((state) => state.scrumBoard.data.ordered);
//   const dialogOpen = useSelector((state) => state.scrumBoard.state.dialogOpen);
//   const dialogView = useSelector((state) => state.scrumBoard.state.dialogView);
//   const payload = useSelector((state) => state.scrumBoard.data.payload);
//   const width = document.getElementById("columnref")?.scrollWidth;

//   const onDialogClose = () => {
//     dispatch(closeDialog());
//   };
//   useEffect(() => {
//     payload && dispatch(getBoards(payload));
//   }, [dispatch, payload]);

//   const onDragEnd = (result) => {
//     if (result.combine) {
//       if (result.type === "COLUMN") {
//         const shallow = [...ordered];
//         shallow.splice(result.source.index, 1);
//         dispatch(updateOrdered(shallow));
//         return;
//       }

//       const column = columns[result.source.droppableId];
//       const withQuoteRemoved = [...column];
//       withQuoteRemoved.splice(result.source.index, 1);
//       const newColumns = {
//         ...columns,
//         [result.source.droppableId]: withQuoteRemoved,
//       };
//       dispatch(updateColumns(newColumns));
//       return;
//     }

//     if (!result.destination) {
//       return;
//     }

//     const source = result.source;
//     const destination = result.destination;

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     if (result.type === "COLUMN") {
//       const newOrdered = reorder(ordered, source.index, destination.index);
//       dispatch(updateOrdered(newOrdered));
//       return;
//     }

//     const data = reorderQuoteMap({
//       quoteMap: columns,
//       source,
//       destination,
//     });

//     dispatch(updateColumns(data.quoteMap));
//   };

//   return (
//     <>
//       <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
//         <Droppable
//           droppableId="board"
//           type="COLUMN"
//           direction="horizontal"
//           ignoreContainerClipping={containerHeight}
//           isCombineEnabled={isCombineEnabled}
//         >
//           {(provided) => (
//             <div
//               className="scrumboard flex flex-col flex-auto w-full h-full mb-2"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               <div className="scrumboard-body flex  max-w-full mt-4 ">
//                 <div className="h-96  overflow-auto w-full">
//                   <div
//                     style={{ width: `${width}px` }}
//                     className={`flex justify-between sticky top-0 bg-white z-10`}
//                   >
//                     {ordered.map((key, index) => (
//                       <BoardTitle
//                         title={key?.split("_")?.join(" ")}
//                         dragHandleProps={provided.dragHandleProps}
//                       />
//                     ))}
//                   </div>
//                   <div className="flex " id="columnref">
//                     {ordered.map((key, index) => (
//                       <>
//                         <BoardColumn
//                           key={key}
//                           index={index}
//                           title={key}
//                           contents={columns[key]}
//                           isScrollable={withScrollableColumns}
//                           isCombineEnabled={isCombineEnabled}
//                           useClone={useClone}
//                         />
//                       </>
//                     ))}
//                   </div>
//                 </div>
//                 {provided.placeholder}
//               </div>
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       {/* <Dialog
// 				isOpen={dialogOpen}
// 				onClose={onDialogClose}
// 				onRequestClose={onDialogClose}
// 				width={dialogView !== 'TICKET' ? 520 : 800}
// 				closable={dialogView !== 'TICKET'}
// 			>
// 				<Suspense fallback={<></>}>
// 					{ dialogView === 'TICKET' && <TicketContent onTicketClose={onDialogClose} /> }
// 					{ dialogView === 'NEW_TICKET' && <AddNewTicketContent /> }
// 					{ dialogView === 'NEW_COLUMN' && <AddNewColumnContent />}
// 					{ dialogView === 'ADD_MEMBER' && <AddNewMemberContent />}
// 				</Suspense>
// 			</Dialog> */}
//     </>
//   );
// };

// export default Board;
