import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { getDevicePayload } from "services/taskManagement/iot.service";

export const getIOTData = createAsyncThunk("getIOTData/List", async (data) => {
  const response = await getDevicePayload(data);
  return response.data.results;
});

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};
const dataSlice = createSlice({
  name: "IOTdata/list",
  initialState: {
    loading: false,
    IOTdata: [],
    tableData: initialTableData,
    sortedColumn: () => { },
    type: "today",
    dates: [],
    iotValues: [],
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setSortedColumn: (state, action) => {
      state.sortedColumn = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: {
    [getIOTData.fulfilled]: (state, action) => {
      state.IOTdata = action.payload;
      state.loading = false;
      let newIotData = cloneDeep(action.payload);
      let finalDate = [];
      let iotval = [];
      if (state.type == "week") {
        // 

      }

      if (state.type == "past_week") {
        //past week
        let weekObj = {}

        function getAllDaysOfLastWeek() {
          let today = new Date();  // Get the current date

          let days = [];
          let dayOfWeek = today.getDay();  // Get the day of the week (0-6)
          let diff = today.getDate() - dayOfWeek - 6;  // Calculate the difference to the first day of the last week

          for (let i = 0; i < 7; i++) {
            let currentDay = new Date(today.setDate(diff + i));  // Set the date to the current day of the last week
            days.push(currentDay);
          }

          return days;
        }

        // Usage
        let days = getAllDaysOfLastWeek();

        let last_week = days.map((date) => {
          return (date.getDate() +
            "/" +
            (Number(date.getMonth()) + 1) +
            "/" +
            date.getFullYear())
        }
        )
        last_week = last_week.map((d) => d.split("/").map((a) => { return (a < 10 ? "0" + a : a) }).join("/"))
        newIotData.map((date) => (weekObj[date.day] = date.average_daily));
        last_week.map((date) => {

          if (weekObj[date]) {
            finalDate.push(date);
            iotval.push(Number(weekObj[date]));
          } else {
            finalDate.push(date);
            iotval.push(0);
          }
        });

      }

      if (state.type == "curr_month") {
        // month
        let date = new Date();
        let monthObj = {};
        let lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        let lastMonth = date.getMonth();
        let currentMonth = date.getMonth() + 1;
        let currentyear = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getFullYear();
        let monthDate = [];
        for (let i = 1; i <= new Date().getDate(); i++) {
          monthDate.push(i + "/" + currentMonth + "/" + currentyear);
        }
        monthDate = monthDate.map((d) =>
          d
            .split("/")
            .map((a) => {
              return a < 10 ? "0" + a : a;
            })
            .join("/")
        );
        newIotData.map((date) => (monthObj[date.day] = date.average_daily));
        monthDate.map((date) => {
          if (monthObj[date]) {
            finalDate.push(date);
            iotval.push(Number(monthObj[date]));
          } else {
            finalDate.push(date);
            iotval.push(0);
          }
        });
        //
      }

      if (state.type == "past_month") {
        // lastmonth






        let date = new Date();
        let lastMonth = date.getMonth();
        let lastmonthobj = {};
        let previousMonth = [];
        let currentyear = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getFullYear();

        let d = new Date();
        d.setDate(1);
        d.setHours(-1);
        let lastMonthLastDay = d.getDate();

        for (let i = 1; i <= lastMonthLastDay; i++) {
          previousMonth.push(i + "/" + lastMonth + "/" + currentyear);
        }
        previousMonth = previousMonth.map((d) =>
          d
            .split("/")
            .map((a) => {
              return a < 10 ? "0" + a : a;
            })
            .join("/")
        );
        newIotData.map((date) => (lastmonthobj[date.day] = date.average_daily));
        previousMonth.map((date) => {
          if (lastmonthobj[date]) {
            finalDate.push(date);
            iotval.push(Number(lastmonthobj[date]));
          } else {
            finalDate.push(date);
            iotval.push(0);
          }
        });
      }
      // today
      if (state.type == "today") {
        let time = []
        let dataTime = []
        let todayObj = []
        for (let i = 0; i <= new Date().getHours(); i++) {
          time.push(i)
        }
        newIotData.map((time) => {
          dataTime.push(new Date(time.hour).getHours())
        })
        newIotData.map((time) => (todayObj[new Date(time.hour).getHours()] = time.average_ppm));
        time.map((date) => {
          if (todayObj[date]) {
            finalDate.push(date);
            iotval.push(Number(todayObj[date]));
          } else {
            finalDate.push(date);
            iotval.push(0);
          }
        });
      }
      state.dates = finalDate;
      state.iotValues = iotval;
      //
    },
    [getIOTData.pending]: (state) => {
      state.loading = true;
    },
    [getIOTData.rejected]: (state) => {
      state.loading = false;
      state.IOTdata = [];
    },
  },
});

export const { setTableData, setSortedColumn, setType } = dataSlice.actions;

export default dataSlice.reducer;
