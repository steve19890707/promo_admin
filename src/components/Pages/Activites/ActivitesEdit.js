import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setTitle, setApiProps } from "../../../reducer/apiProps";
import { setAgentSite } from "../../../reducer/agentSite";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";
import { SwitchKit } from "../../Common/Switch";
import { AgentSite } from "../../Modules/AgentSite";

const StyledActivitesEdit = styled(EditPopup)``;

export const ActivitesEdit = ({ data = [], closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const edit = useSelector((state) => state.edit);
  const agentSite = useSelector((state) => state.agentSite.list);
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("");
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const checkValueErrorStatus = (type = "") => {
    const titleValueCheck = apiProps.title.length === 0;
    const includeProtocol = /^(https?:\/\/)/.test(activeLink);
    const urlValueCheck = activeLink.length === 0 || includeProtocol;
    const totalcheck = !titleValueCheck && !urlValueCheck;
    switch (type) {
      case "title":
        return titleValueCheck;
      case "url":
        return urlValueCheck;
      default:
        return !totalcheck;
    }
  };
  // data rest
  useEffect(() => {
    if (edit.type !== "add") {
      setActiveLink(getData(currentData, ["url"]));
      dispatch(
        setApiProps({
          title: getData(currentData, ["title"]),
          checked: getData(currentData, ["status"]),
        })
      );
      dispatch(setAgentSite(getData(currentData, ["site"], [])));
    }
  }, [edit.type, dispatch, currentData]);
  return (
    <StyledActivitesEdit
      editedBy={getData(currentData || "", ["edited_by"])}
      title={edit.type === "add" ? "新增活動" : "編輯活動"}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "activeCreate" : "activeUpdate",
            // api create/update data
            param: {
              ...paramId,
              lang: props.language,
              title: apiProps.title,
              status: apiProps.checked,
              url: activeLink,
              site: agentSite,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <SettingSquare title={"狀態"} Comp={() => <SwitchKit />} />
      <SettingSquare
        title={"活動標題"}
        isTip={checkValueErrorStatus("title")}
        tipContent={"不可為空"}
        Comp={() => (
          <input
            className="input"
            value={apiProps.title}
            disabled={props.confirm.status}
            placeholder="請輸入標題"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        )}
      />
      <SettingSquare
        title={"活動頁網址"}
        isTip={checkValueErrorStatus("url")}
        tipContent={
          /^(https?:\/\/)/.test(activeLink)
            ? "開頭不可包含http(s)://"
            : "不可為空"
        }
        Comp={() => (
          <input
            className="input"
            value={activeLink}
            disabled={props.confirm.status}
            placeholder="請輸入網址"
            onChange={(e) => setActiveLink(e.target.value)}
          />
        )}
      />
      <AgentSite limitSelected={true} compareId={edit.id} />
    </StyledActivitesEdit>
  );
};
