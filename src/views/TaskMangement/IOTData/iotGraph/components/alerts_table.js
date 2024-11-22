export default function Alerts_table({data,selectedHeading}){
    return (
        <div className='lg:block mt-4  h-full'>
            <h6 className="mb-4">Alerts and Notification</h6>
              <div className='flex flex-col  h-full'>
                <div className='grid grid-cols-3 text-center px-2 py-2 rounded-t font-semibold bg-[#02c3de] text-white'>
                  <p>{selectedHeading}</p>
                  <p>Date and Time</p>
                  <p>Condition</p>
                </div>
                <div className='text-black overflow-auto h-[60%] overscroll-contain border-[1px] border-[#02c3de] rounded-b border-t-0'>
                  {data?.map((item, index) => {
                    return (
                      <div key={item?.index} className={`grid grid-cols-3 text-center px-2 py-4 transition-opacity duration-300`}>
                        <p>{item?.data_unit}</p>
                        <p>{item?.ppm_time}</p>
                        <p>{item?.condition}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
    )
}