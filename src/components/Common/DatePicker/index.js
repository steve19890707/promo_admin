import { useState } from "react";
import styled from "styled-components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { noop } from "lodash";
import moment from "moment";
import { styles } from "../../../constants/styles";
import { RiArrowDownSFill } from "react-icons/ri";
import { getData } from "../../../common-lib/lib";
// reducers
import {
  setDateRange,
  setTimeRange,
  setTimesDrStatus,
} from "../../../reducer/times";
// component
import { Button } from "../Button";
import { TimeSelector } from "./TimeSelector";

const StyledDatePickerBtn = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 12px 16px;
  border-radius: 5px;
  background: ${({ theme }) => getData(styles, [theme, "feature"])};
  color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .middle {
    padding: 0 8px;
  }
  .svg-dp-RiArrowDownSFill {
    width: 22px;
    height: 22px;
    margin-left: 8px;
  }
`;

export const DatePickerBtn = ({
  id = "date-range-btn",
  className = "",
  handler = noop,
}) => {
  const props = useSelector((state) => state.props);
  const times = useSelector((state) => state.times);
  return (
    <StyledDatePickerBtn
      id={id}
      className={className}
      theme={props.theme}
      onClick={() => handler()}
    >
      <div>
        {moment(times.dateRange.startDate).format(
          `YYYY/MM/DD ${times.timeRange.startTime.hh}:${times.timeRange.startTime.mm}`
        )}
      </div>
      <div className="middle">-</div>
      <div>
        {moment(times.dateRange.endDate).format(
          `YYYY/MM/DD ${times.timeRange.endTime.hh}:${times.timeRange.endTime.mm}`
        )}
      </div>
      <RiArrowDownSFill className="svg-dp-RiArrowDownSFill" />
    </StyledDatePickerBtn>
  );
};

const StyledDatePicker = styled.div`
  position: absolute;
  min-width: 350px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  background: ${({ theme }) =>
    getData(styles, [theme, "datePicker", "background"])};
  z-index: 2;
  .date-range-picker {
    input {
      background-color: unset;
    }
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
export const datePickerMouseDownEvent = (e, dispatch = noop) => {
  const target = document.getElementById("date-picker");
  const btn = document.getElementById("date-range-btn");
  if (target && !target.contains(e.target) && btn && !btn.contains(e.target)) {
    dispatch(setTimesDrStatus(false));
  } else return;
};

export const DatePicker = ({ className = "", style = {} }) => {
  const props = useSelector((state) => state.props);
  const times = useSelector((state) => state.times);
  const dispatch = useDispatch();
  const [cacheDate, setCacheDate] = useState(times.dateRange);
  const [catchTime, setCatchTime] = useState(times.timeRange);
  const updateCheck = (val) => {
    const { hh = "", mm = "" } = val;
    const vfilter = (v = "") => {
      if (v === "") {
        return "00";
      } else if (v.length === 1) {
        return `0${v}`;
      } else return v;
    };
    return { hh: vfilter(hh), mm: vfilter(mm) };
  };
  return (
    <StyledDatePicker
      id="date-picker"
      theme={props.theme}
      className={className}
      style={{ ...style }}
    >
      <TimeSelector times={catchTime} handler={setCatchTime} />
      <DateRangePicker
        className="date-range-picker"
        ranges={[cacheDate]}
        rangeColors={[getData(styles, [props.theme, "feature"])]}
        onChange={(e) => {
          const updateStart = e.selection.startDate;
          const updateEnd = e.selection.endDate;
          setCacheDate({
            startDate: updateStart,
            endDate: updateEnd,
            key: "selection",
          });
        }}
      />
      <div className="btns">
        <Button
          title="確定"
          type="feature"
          handler={() => {
            dispatch(setDateRange(cacheDate));
            dispatch(
              setTimeRange({
                startTime: updateCheck(catchTime.startTime),
                endTime: updateCheck(catchTime.endTime),
              })
            );
            dispatch(setTimesDrStatus(false));
          }}
        />
        <Button
          title="取消"
          type="alert"
          handler={() => dispatch(setTimesDrStatus(false))}
        />
      </div>
    </StyledDatePicker>
  );
};
