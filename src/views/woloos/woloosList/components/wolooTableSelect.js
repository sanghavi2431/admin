const {  Select } = require("@/components/ui");

function WoloosTableSelect(){
    return(
        <div className="flex lg:flex-row lg:items-center w-1/4">
			
        <Select size="sm" className="w-1/2 ">
        </Select>
         <Select size="sm" className="w-1/2">
         </Select>
         </div>
    )
}
export default WoloosTableSelect
