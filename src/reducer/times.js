import { createSlice } from "@reduxjs/toolkit";
const times = createSlice({
  name: "times",
  initialState: {
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
    timeRange: {
      startTime: { hh: "00", mm: "00" },
      endTime: { hh: "00", mm: "00" },
    },
    drStatus: false,
  },
  reducers: {
    setTimes: (state, actions) => {
      const {
        dateRange = {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
        timeRange = {
          startTime: { hh: "00", mm: "00" },
          endTime: { hh: "00", mm: "00" },
        },
      } = actions.payload;
      state.dateRange = dateRange;
      state.timeRange = timeRange;
      state.drStatus = false;
    },
    setDateRange: (state, actions) => {
      state.dateRange = actions.payload;
    },
    setTimeRange: (state, actions) => {
      const { startTime, endTime } = actions.payload;
      state.timeRange = {
        startTime: startTime,
        endTime: endTime,
      };
    },
    setTimesDrStatus: (state, actions) => {
      state.drStatus = actions.payload;
    },
  },
});
export default times.reducer;
export const { setTimes, setDateRange, setTimeRange, setTimesDrStatus } =
  times.actions;
