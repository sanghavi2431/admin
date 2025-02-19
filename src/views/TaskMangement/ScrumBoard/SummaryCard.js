// import { Card } from "@/components/ui";
// import { useSelector } from "react-redux";

// export default function SummaryCards() {

//   let totalCount = useSelector((state) => state.scrumBoard.data.totalCount);
//   let pendingCount = useSelector((state) => state.scrumBoard.data.pendingCount);
//   let ongoingCount = useSelector((state) => state.scrumBoard.data.ongoingCount);
//   let completedCount = useSelector((state) => state.scrumBoard.data.completedCount);
//   let acceptedCount = useSelector((state) => state.scrumBoard.data.acceptedCount);


//   return (
//     <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-5 grid-cols-2 items-center justify-center">
//       <div className="">
//         <Card className="hover:shadow-lg transition duration-150 ease-in-out drop-shadow-md">
//           <div className="grid gap-1 place-items-center">
//             <h6>Total</h6>
//             <h3>{totalCount}</h3>
//           </div>
//         </Card>
//       </div>
//       <div className="">
//         <Card className="hover:shadow-lg transition duration-150 ease-in-out drop-shadow-md">
//           <div className="grid gap-1 place-items-center">
//             <h6>Pending</h6>
//             <h3>{pendingCount}</h3>
//           </div>
//         </Card>
//       </div>
//       <div className="">
//         <Card className="hover:shadow-lg transition duration-150 ease-in-out drop-shadow-md">
//           <div className="grid gap-1 place-items-center">
//             <h6>Accepted</h6>
//             <h3>{acceptedCount}</h3>
//           </div>
//         </Card>
//       </div>
//       <div className="">
//         <Card className="hover:shadow-lg transition duration-150 ease-in-out drop-shadow-md">
//           <div className="grid gap-1 place-items-center">
//             <h6>On Going</h6>
//             <h3>{ongoingCount}</h3>
//           </div>
//         </Card>
//       </div>
//       <div className="">
//         <Card className="hover:shadow-lg transition duration-150 ease-in-out drop-shadow-md">
//           <div className="grid gap-1 place-items-center">
//             <h6>Completed</h6>
//             <h3>{completedCount}</h3>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
