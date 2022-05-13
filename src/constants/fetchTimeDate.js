import moment from "moment-timezone";
import { getData } from "../common-lib/lib";
export const fetchTimeDate = (date = {}) => {
  const { start_time, end_time } = date;
  const getDateRange = (time, type = "") => {
    const separate = time.split("T")[1].split("-04:00")[0];
    switch (type) {
      case "hh":
        return separate.split(":")[0];
      case "mm":
        return separate.split(":")[1];
      default:
        return separate.split(":")[0];
    }
  };
  const update = {
    dateRange: {
      startDate: new Date(moment(start_time).add(-12, "hours")),
      endDate: new Date(moment(end_time).add(-12, "hours")),
      key: "selection",
    },
    timeRange: {
      startTime: {
        hh: getDateRange(start_time, "hh"),
        mm: getDateRange(start_time, "mm"),
      },
      endTime: {
        hh: getDateRange(end_time, "hh"),
        mm: getDateRange(end_time, "mm"),
      },
    },
  };
  return update;
};

export const transTimeDate = (date = {}) => {
  const { dateRange = {}, timeRange = {} } = date;
  const transDateRange = (time = new Date()) => {
    return moment(time).format(`YYYY-MM-DD`);
  };
  const start_time = `${transDateRange(
    getData(dateRange, ["startDate"], new Date())
  )} ${getData(timeRange, ["startTime", "hh"], "00")}:${getData(
    timeRange,
    ["startTime", "mm"],
    "00"
  )}:00`;
  const end_time = `${transDateRange(
    getData(dateRange, ["endDate"], new Date())
  )} ${getData(timeRange, ["endTime", "hh"], "00")}:${getData(
    timeRange,
    ["endTime", "mm"],
    "00"
  )}:00`;
  const trans = { start_time, end_time };
  return trans;
};

export const transTimeDateSingle = (time = "") => {
  const pureTime = time.split("T");
  const updateTime = `${pureTime[0]} ${pureTime[1].split("-")[0]}`;
  return updateTime;
};

export const transTimeToEUS = (time = new Date()) => {
  return moment(time).add(-12, "hours");
};
