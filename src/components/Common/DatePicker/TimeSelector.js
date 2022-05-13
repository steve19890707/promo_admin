import { useSelector } from "react-redux";
import styled from "styled-components";
import { RiTimerLine } from "react-icons/ri";
import { noop } from "lodash";
import { styles } from "../../../constants/styles";
import { getData } from "../../../common-lib/lib";

const StyledTimeSelectorChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  box-shadow: 0 1px 2px 0 rgb(35 57 66 / 21%);
  border-radius: 4px;
  padding: 6px 0;
  background-color: ${({ theme }) =>
    getData(styles, [theme, "datePicker", "background"])};
  .input-time-selector {
    width: 16px;
    background-color: transparent;
    color: ${({ theme }) => getData(styles, [theme, "timeSelector", "color"])};
    padding: 6px;
    border-radius: 5px;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "timeSelector", "border"])};
    font-size: 14px;
    text-align: center;
  }
  .middle {
    font-size: 16px;
    margin: 0 4px;
    color: ${({ theme }) => getData(styles, [theme, "timeSelector", "color"])};
  }
  .svg-RiTimerLine {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: ${({ theme }) => getData(styles, [theme, "feature"])};
  }
`;
const TimeSelectorChild = ({
  type = "",
  timeRange = {},
  setDateRange = noop,
}) => {
  const { hh = "00", mm = "00" } = timeRange;
  const props = useSelector((state) => state.props);
  const valueFilter = (v, type = "") => {
    const typeNumber = Number(v);
    switch (type) {
      case "hours":
        const checkHours = typeNumber > 23 ? "00" : v;
        return checkHours;
      case "minute":
        const checkMinute = typeNumber > 59 ? "00" : v;
        return checkMinute;
      default:
        break;
    }
  };
  return (
    <StyledTimeSelectorChild theme={props.theme}>
      <RiTimerLine className="svg-RiTimerLine" />
      <input
        className="input-time-selector"
        maxLength="2"
        value={hh}
        onChange={(e) =>
          setDateRange((prev) => {
            const val = e.target.value.replace(/[^0-9,.]+/g, "");
            const update = {
              [type]: {
                hh: valueFilter(val, "hours"),
                mm: prev[type].mm,
              },
            };
            return { ...prev, ...update };
          })
        }
      />
      <div className="middle">:</div>
      <input
        className="input-time-selector"
        maxLength="2"
        value={mm}
        onChange={(e) =>
          setDateRange((prev) => {
            const val = e.target.value.replace(/[^0-9,.]+/g, "");
            const update = {
              [type]: {
                mm: valueFilter(val, "minute"),
                hh: prev[type].hh,
              },
            };
            return { ...prev, ...update };
          })
        }
      />
    </StyledTimeSelectorChild>
  );
};

const StyledTimeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  .times-title {
    display: flex;
    align-items: center;
    width: calc(100% - 355px);
    font-size: 13px;
    box-sizing: border-box;
    padding-left: 20px;
    color: ${({ theme }) =>
      getData(styles, [theme, "datePicker", "background"])};
    border-bottom: 1px solid
      ${({ theme }) => getData(styles, [theme, "timeSelector", "outsideBg"])};
  }
  .times {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 3px 10px;
    box-sizing: border-box;
    width: 353px;
    background-color: ${({ theme }) =>
      getData(styles, [theme, "timeSelector", "outsideBg"])};
  }
`;
export const TimeSelector = ({ times = {}, handler = noop }) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledTimeSelector theme={props.theme}>
      <div className="times-title">Times</div>
      <div className="times">
        <TimeSelectorChild
          type="startTime"
          timeRange={times.startTime}
          setDateRange={handler}
        />
        <TimeSelectorChild
          type="endTime"
          timeRange={times.endTime}
          setDateRange={handler}
        />
      </div>
    </StyledTimeSelector>
  );
};
