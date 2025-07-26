export default function Amonia_table({ data, selectedHeading, condition }) {
  return (
    <div className="lg:block  mt-4  h-full">
      <h6 className="mb-4">Historical Amonia and People Usage </h6>
      <div className="flex flex-col  h-full">
        <div className="grid grid-cols-3 text-center px-2 py-2 rounded-t font-semibold bg-[#02c3de] text-white">
          <p className="text-xs">{selectedHeading}</p>
          <p className="text-xs">Average {condition}</p>
          <p className="text-xs">Total People Max</p>
        </div>
        <div className="text-black overflow-auto h-[60%] overscroll-contain border-[1px] border-[#02c3de] rounded-b border-t-0">
          {data?.map((item, index) => {
            return (
              <div
                key={item?.index}
                className={`grid grid-cols-3 text-center px-2 py-4 transition-opacity duration-300`}
              >
                <p className="text-xs">{item?.heading}</p>
                <p className="text-xs">{Number(item?.ppm_avg)?.toFixed(2)}</p>
                <p className="text-xs">{Number(item?.pcd_max)?.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
