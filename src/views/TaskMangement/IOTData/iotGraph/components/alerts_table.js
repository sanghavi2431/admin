export default function Alerts_table({ data, selectedHeading }) {
  const conditionColor = (condition) => {
    switch (condition) {
      case "healthy":
        return "green";
      case "moderate":
        return "yellow";
      case "bad":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <div className="h-full max-h-full flex flex-col">
      <h6 className="mb-4">Alerts and Notification</h6>
      {/* <div
        className="w-full h-[40%] shrink-0 mb-4 rounded-lg bg-cover"
        style={{ backgroundImage: `url('/img/others/Building.png')` }}
      ></div> */}
      <div className="flex flex-col grow max-h-[90%]">
        <div className="grid grid-cols-3 text-center px-2 py-2 rounded-t font-semibold bg-[#02c3de] text-white">
          <p>{selectedHeading}</p>
          <p>Date and Time</p>
          <p>Condition</p>
        </div>
        <div className="grow max-h-full text-black overflow-auto overscroll-contain border-[1px] border-[#02c3de] rounded-b border-t-0">
          {data?.map((item, index) => {
            return (
              <div
                key={item?.index}
                className={`grid grid-cols-3 text-center px-2 py-4 transition-opacity duration-300`}
              >
                <p>{item?.data_unit}</p>
                <p>{item?.ppm_time}</p>
                <p
                  className={`text-${conditionColor(
                    item.condition
                  )}-500 flex items-center justify-center gap-1`}
                >
                  <span
                    className={`inline-block h-3 w-3 border rounded-full bg-${conditionColor(
                      item.condition
                    )}-500`}
                  ></span>{" "}
                  {item?.condition}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
