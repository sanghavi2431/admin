export default function MessageComponent({children,condition}){
 return (
    <div>
        {
            condition ? children : <div className=" w-full gap-32  flex justify-center items-center h-full" ><h6>No data Found!</h6></div>
        }
    </div>
 )
}