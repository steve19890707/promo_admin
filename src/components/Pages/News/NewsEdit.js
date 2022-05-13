import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
import { fetchTimeDate, transTimeDate } from "../../../constants/fetchTimeDate";
// listener
import { Mousedown } from "../../../common-lib/hooks";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setTitle, setApiProps } from "../../../reducer/apiProps";
import { setTimes, setTimesDrStatus } from "../../../reducer/times";
import { setAgentSite } from "../../../reducer/agentSite";
import { setPicture } from "../../../reducer/picture";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";
import { SwitchKit } from "../../Common/Switch";
import { Quill } from "../../Common/Quill";
import {
  DatePickerBtn,
  DatePicker,
  datePickerMouseDownEvent,
} from "../../Common/DatePicker/index";
import {
  CategorySelector,
  categorySelectorMouseDown,
} from "../../Modules/CategorySelector";
import { ImageUpload } from "../../Modules/ImageUpload";
import { AgentSite } from "../../Modules/AgentSite";

const StyledNewsEdit = styled(EditPopup)`
  .content {
    max-width: 1200px;
  }
  .news-ss {
    &-title {
      padding-top: 50px;
    }
    .title-span {
      width: 70px;
      margin-right: 0;
    }
    input {
      width: calc(100% - 200px);
    }
  }
  .news-imgUpload {
    margin-top: 25px;
  }
  .square-index {
    z-index: 4;
  }
  .category-index {
    z-index: 3;
  }
`;
export const NewsEdit = ({
  data = [],
  newsCategory = [],
  closeHandler = noop,
}) => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const edit = useSelector((state) => state.edit);
  const times = useSelector((state) => state.times);
  const category = useSelector((state) => state.category);
  const picture = useSelector((state) => state.picture);
  const agentSite = useSelector((state) => state.agentSite.list);
  const dispatch = useDispatch();
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const [description, setDescription] = useState(
    getData(currentData || {}, ["description"])
  );
  const [content, setContent] = useState(
    getData(currentData || {}, ["content"])
  );
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
    const categoryValueCheck = category.id !== "none";
    const totalcheck = !titleValueCheck && dateValueCheck && categoryValueCheck;
    switch (type) {
      case "title":
        return titleValueCheck;
      case "date":
        return !dateValueCheck;
      case "category":
        return !categoryValueCheck;
      default:
        return !totalcheck;
    }
  };
  const contentTrans = (content = "") => {
    return content
      .replaceAll("<p>&lt;%", '<p class="m3u8Video">&lt;%')
      .replaceAll('">&lt;%', ' m3u8Video">&lt;%');
  };
  Mousedown((e) => {
    categorySelectorMouseDown(e, dispatch);
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
        setTimes(
          fetchTimeDate({
            start_time: getData(currentData, ["start_time"]),
            end_time: getData(currentData, ["end_time"]),
          })
        )
      );
      dispatch(setPicture(getData(currentData, ["pic"], {})));
      dispatch(setAgentSite(getData(currentData, ["site"], [])));
    }
  }, [edit.type, dispatch, currentData]);
  return (
    <StyledNewsEdit
      editedBy={getData(currentData || "", ["edited_by"])}
      title={edit.type === "add" ? "新增報導" : "編輯報導"}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      doNotUseEnter={true}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "newsCreate" : "newsUpdate",
            // api create/update data
            param: {
              ...paramId,
              category_id: category.id,
              lang: props.language,
              title: apiProps.title,
              status: apiProps.checked,
              description: description,
              content: contentTrans(content),
              pic: picture.pic.img,
              start_time: getData(transTimeDate(times), ["start_time"]),
              end_time: getData(transTimeDate(times), ["end_time"]),
              site: agentSite,
            },
          })
        )
      }
      closeBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: "確定取消編輯?",
            type: "newsEditClose",
            param: () => closeHandler(),
          })
        )
      }
      otherTip={{ content: "不支援使用 ENTRE鍵 開啟更新彈窗。", minus: 35 }}
    >
      <SettingSquare title={"狀態"} Comp={() => <SwitchKit />} />
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
      <CategorySelector className={"category-index"} data={newsCategory} />
      <SettingSquare
        className="news-ss news-ss-title"
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
        className="news-ss"
        title={"敘述"}
        Comp={() => (
          <input
            className="input"
            disabled={props.confirm.status}
            value={description}
            placeholder="請輸入敘述"
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      />
      <ImageUpload
        singleImg={true}
        className="news-imgUpload"
        type="news"
        title="報導封面圖"
        id="news"
        imgSize={"345x140"}
      />
      <Quill
        content={getData(currentData || {}, ["content"])}
        setContent={setContent}
      />
      <AgentSite />
    </StyledNewsEdit>
  );
};
