import { useEffect } from "react";
import styled from "styled-components";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
import { fetchTimeDate, transTimeDate } from "../../../constants/fetchTimeDate";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setTitle, setApiProps } from "../../../reducer/apiProps";
import { setTimes, setTimesDrStatus } from "../../../reducer/times";
import { setLinkSelector } from "../../../reducer/linkSelector";
import { setAgentSite } from "../../../reducer/agentSite";
import { setComboPicture } from "../../../reducer/picture";
// listener
import { Mousedown } from "../../../common-lib/hooks";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";
import { SwitchKit } from "../../Common/Switch";
import {
  DatePickerBtn,
  DatePicker,
  datePickerMouseDownEvent,
} from "../../Common/DatePicker/index";
import {
  LinkSelector,
  linkSelectorMouseDownEvent,
} from "../../Modules/LinkSelector";
import { ImageUpload } from "../../Modules/ImageUpload";
import { AgentSite } from "../../Modules/AgentSite";

const StyledRotateEdit = styled(EditPopup)`
  .date-range {
    position: relative;
  }
  .square-index {
    z-index: 3;
  }
  .link-index {
    z-index: 2;
  }
`;
export const RotateEdit = ({ data = [], closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const edit = useSelector((state) => state.edit);
  const linkSelector = useSelector((state) => state.linkSelector);
  const times = useSelector((state) => state.times);
  const agentSite = useSelector((state) => state.agentSite.list);
  const picture = useSelector((state) => state.picture);
  const dispatch = useDispatch();
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const checkValueErrorStatus = (type = "") => {
    const titleValueCheck = apiProps.title.length === 0;
    const dateStart = moment(times.dateRange.startDate).format(
      `YYYY-MM-DD ${times.timeRange.startTime.hh}:${times.timeRange.startTime.mm}:00`
    );
    const dateEnd = moment(times.dateRange.endDate).format(
      `YYYY-MM-DD ${times.timeRange.endTime.hh}:${times.timeRange.endTime.mm}:00`
    );
    const dateValueCheck = moment(dateStart).isSame(dateEnd)
      ? true
      : moment(dateStart).isBefore(dateEnd);
    const totalcheck =
      !titleValueCheck && dateValueCheck && !linkSelector.isError;
    switch (type) {
      case "title":
        return titleValueCheck;
      case "date":
        return !dateValueCheck;
      default:
        return !totalcheck;
    }
  };
  Mousedown((e) => {
    linkSelectorMouseDownEvent(e, dispatch);
    datePickerMouseDownEvent(e, dispatch);
  });
  // data rest
  useEffect(() => {
    if (edit.type !== "add") {
      dispatch(
        setApiProps({
          title: getData(currentData, ["title"]),
          checked: getData(currentData, ["status"]),
        })
      );
      dispatch(
        setLinkSelector({
          linkId: getData(currentData, ["link_id"]),
          url: getData(currentData, ["url"]),
        })
      );
      dispatch(
        setTimes(
          fetchTimeDate({
            start_time: getData(currentData, ["start_time"]),
            end_time: getData(currentData, ["end_time"]),
          })
        )
      );
      dispatch(setComboPicture(getData(currentData, ["pic"], {})));
      dispatch(setAgentSite(getData(currentData, ["site"], [])));
    }
  }, [edit.type, dispatch, currentData]);
  return (
    <StyledRotateEdit
      editedBy={getData(currentData || "", ["edited_by"])}
      title={edit.type === "add" ? "新增輪播圖" : "編輯輪播圖"}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "rotateCreate" : "rotateUpdate",
            // api create/update data
            param: {
              ...paramId,
              lang: props.language,
              title: apiProps.title,
              status: apiProps.checked,
              link_id: linkSelector.linkId,
              url: linkSelector.url,
              pic: {
                pc: picture.comboPic.pc.img,
                mobile: picture.comboPic.mobile.img,
                tablet: picture.comboPic.tablet.img,
              },
              start_time: getData(transTimeDate(times), ["start_time"]),
              end_time: getData(transTimeDate(times), ["end_time"]),
              site: agentSite,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <SettingSquare title={"狀態"} Comp={() => <SwitchKit />} />
      <SettingSquare
        title={"標題"}
        isTip={checkValueErrorStatus("title")}
        tipContent={"不可為空"}
        Comp={() => (
          <input
            className="input"
            disabled={props.confirm.status}
            value={apiProps.title}
            placeholder="請輸入標題"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        )}
      />
      <SettingSquare
        className={"square-index"}
        title={"啟用區間"}
        isTip={checkValueErrorStatus("date")}
        tipContent={"格式錯誤"}
        Comp={() => (
          <div className="date-range">
            <DatePickerBtn
              handler={() => dispatch(setTimesDrStatus(!times.drStatus))}
            />
            {times.drStatus && (
              <DatePicker style={{ left: "0", top: "calc(100% + 5px)" }} />
            )}
          </div>
        )}
      />
      <LinkSelector className={"link-index"} />
      <ImageUpload type="rotate" title="桌機" id="pc" imgSize={"1920x700"} />
      <ImageUpload type="rotate" title="平板" id="tablet" imgSize={"768x400"} />
      <ImageUpload type="rotate" title="手機" id="mobile" imgSize={"750x400"} />
      <AgentSite />
    </StyledRotateEdit>
  );
};
