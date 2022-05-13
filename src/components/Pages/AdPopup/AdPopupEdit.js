import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setTitle, setApiProps } from "../../../reducer/apiProps";
import { setLinkSelector } from "../../../reducer/linkSelector";
import { setAgentSite } from "../../../reducer/agentSite";
import { setPicture } from "../../../reducer/picture";
// listener
import { Mousedown } from "../../../common-lib/hooks";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";
import { SwitchKit } from "../../Common/Switch";
import {
  LinkSelector,
  linkSelectorMouseDownEvent,
} from "../../Modules/LinkSelector";
import { ImageUpload } from "../../Modules/ImageUpload";
import { AgentSite } from "../../Modules/AgentSite";

const StyledAdPopupEdit = styled(EditPopup)`
  .square-index {
    z-index: 3;
  }
  .link-index {
    z-index: 2;
  }
`;

export const AdPopupEdit = ({ data = [], closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const edit = useSelector((state) => state.edit);
  const linkSelector = useSelector((state) => state.linkSelector);
  const agentSite = useSelector((state) => state.agentSite.list);
  const picture = useSelector((state) => state.picture);
  const dispatch = useDispatch();
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const checkValueErrorStatus = (type = "") => {
    const titleValueCheck = apiProps.title.length === 0;
    const totalcheck = !titleValueCheck && !linkSelector.isError;
    switch (type) {
      case "title":
        return titleValueCheck;
      default:
        return !totalcheck;
    }
  };
  Mousedown((e) => {
    linkSelectorMouseDownEvent(e, dispatch);
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
      dispatch(setPicture(getData(currentData, ["pic"], {})));
      dispatch(setAgentSite(getData(currentData, ["site"], [])));
    }
  }, [edit.type, dispatch, currentData]);
  return (
    <StyledAdPopupEdit
      editedBy={getData(currentData || "", ["edited_by"])}
      title={edit.type === "add" ? "新增彈窗廣告" : "編輯彈窗廣告"}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "adPopupCreate" : "adPopupUpdate",
            // api create/update data
            param: {
              ...paramId,
              lang: props.language,
              title: apiProps.title,
              status: apiProps.checked,
              link_id: linkSelector.linkId,
              url: linkSelector.url,
              pic: picture.pic.img,
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
      <LinkSelector className={"link-index"} />
      <ImageUpload
        singleImg={true}
        type="ad_popup"
        title="彈窗廣告"
        id="adPopup"
      />
      <AgentSite />
    </StyledAdPopupEdit>
  );
};
