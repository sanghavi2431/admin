export default function IotParameter(props) {

    return (
        <div className="mb-8">
            <div className="flex justify-center ">
                <div className="flex flex-col justify-center items-center text-black rounded md:font-semibold h-12 w-32 bg-green-500 m-2 md:text-base text-xs">
                    <div>Healthy</div>
                    <div>{`( ${props?.data?.healthy?.min ? props?.data?.healthy?.min : "0.00" }  - ${props?.data?.healthy?.max? props?.data?.healthy?.max: "0.50"} )`}</div>
                </div>
                <div className="flex flex-col justify-center items-center text-black rounded md:font-semibold h-12 w-32 bg-yellow-300 m-2 md:text-base text-xs">
                    <div> Moderate</div>
                    <div>{`( ${props?.data?.moderate?.min ? props?.data?.moderate?.min : "0.50"} - ${props?.data?.moderate?.max ? props?.data?.moderate?.max : "1.00"} )`}</div>
                </div>
                <div className="flex flex-col justify-center items-center text-black rounded md:font-semibold h-12 w-32 bg-red-500 m-2 md:text-base text-xs">
                    <div> Unhealthy</div>
                    <div>{`( ${props?.data?.unhealthy?.min ? props?.data?.unhealthy?.min : "1.00"} - above )`}</div>
                </div>
            </div>
            {/* <div className="text-black text-lg ml-2">Usage Monitor - NO DATA</div> */}
            {/* <div className="text-black text-lg ml-2">Feedback Monitor - NO DATA</div> */}
        </div>
    )
}