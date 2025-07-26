export default function Historical_amonia_table({data,selectedHeading,condition}){
    return (
        <div className='lg:block  h-full'>
           <h6 className="mb-4">Historical Amonia and People Usage (Based on Time period)</h6>
              <div className='flex flex-col h-full'>
                <div className='grid grid-cols-5 text-center px-2 py-2 rounded-t font-semibold bg-[#02c3de] text-white'>
                  <p className="text-xs">{selectedHeading}</p>
                  <p className="text-xs">Average {condition}</p>
                  <p className="text-xs">Maximum {condition}</p>
                  <p className="text-xs">Total People Max (by day)</p>
                  <p className="text-xs">Total People Max (by hour)</p>

                </div>
                <div className='text-black overflow-auto h-[60%] overscroll-contain border-[1px] border-[#02c3de] rounded-b'>
                  {data?.map((item, index) => {
                    return (
                      <div key={item?.index} className={`grid grid-cols-5 text-center px-2 py-4 transition-opacity duration-300 text-sm`}>
                        <p className="text-xs">{item?.time}</p>
                        <p className="text-xs">{Number(item?.avg_ppm_avg)?.toFixed(2)}</p>
                        <p className="text-xs">{Number(item?.avg_ppm_max)?.toFixed(2)}</p>
                        <p className="text-xs">{Number(item?.avg_pcd_max)?.toFixed(2)}</p>
                        <p className="text-xs">{Number(item?.avg_pch_max)?.toFixed(2)}</p>

                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
    )
}