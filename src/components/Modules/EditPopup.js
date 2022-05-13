import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import { noop } from "lodash";
import { getData } from "../../common-lib/lib";
import { FiAlertOctagon } from "react-icons/fi";
// listener
import { Keydown } from "../../common-lib/hooks";
// component
import { Button } from "../Common/Button";
import { TipTool } from "../Common/TipTool";

const StyledSettingSquare = styled.div`
  position: relative;
  width: 100%;
  padding-top: 25px;
  .setting {
    display: flex;
    align-items: center;
  }
  .title-span {
    font-size: 18px;
    margin-right: 25px;
  }
  .input {
    box-sizing: border-box;
    padding: 12px 16px;
    border-radius: 6px;
    width: 250px;
  }
  .tip {
    margin-left: 15px;
    font-size: 14px;
    color: ${({ theme }) => getData(styles, [theme, "alert"])};
  }
`;
export const SettingSquare = ({
  className = "",
  title = "標題",
  isTip = false,
  tipContent = "",
  Comp = noop,
}) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledSettingSquare theme={props.theme} className={className}>
      <div className="setting">
        <span className="title-span">{title}:</span>
        {Comp()}
        {isTip && (
          <div className="tip">
            {title} {tipContent}
          </div>
        )}
      </div>
    </StyledSettingSquare>
  );
};

const StyledEditPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100vh;
  padding: 10vh 0;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.4);
  .edited-by {
    position: absolute;
    z-index: 2;
    bottom: 50px;
    right: 50px;
    color: ${getData(styles, ["common", "editedBy"])};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  .content {
    width: 80%;
    min-width: 600px;
    max-width: 800px;
    height: 80vh;
    margin: auto;
    background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: auto;
    box-sizing: border-box;
    padding: 50px;
    animation: editpopup 0.3s;
  }
  .title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }
  .alert-tip {
    position: relative;
    font-size: 0;
    margin-left: 10px;
    cursor: pointer;
    &:hover .editpopup-tiptool {
      opacity: 1;
    }
  }
  .svg-FiAlertOctagon {
    width: 22px;
    height: 22px;
    color: ${({ theme }) => getData(styles, [theme, "cancel"])};
  }
  .editpopup-tiptool {
    opacity: 0;
    transform: translate(calc(-50% + 11px), calc(-100% - 6px));
  }
  .last-btns {
    margin-top: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const EditPopup = ({
  className = "",
  editedBy = "",
  title = "標題",
  updateBtn = "更新",
  doNotUseEnter = false,
  checkValueError = true,
  updateBtnHandler = noop,
  closeBtnHandler = noop,
  children,
  otherTip = { content: "", minus: 0 },
}) => {
  const props = useSelector((state) => state.props);
  const [editedByStatus, setEditedByStatus] = useState(false);
  const langTextFetch = () => {
    switch (props.language) {
      case "cn":
        return "(简中)";
      case "en":
        return "(English)";
      case "vn":
        return "(Việt nam)";
      case "th":
        return "(ประเทศไทย)";
      default:
        return "";
    }
  };
  Keydown((e) => {
    const checkEdited = e.keyCode === 17;
    if (checkEdited) {
      setEditedByStatus((prev) => !prev);
    }
    const enter = e.keyCode === 13;
    const esc = e.keyCode === 27;
    if (esc && !props.confirm.status) {
      closeBtnHandler();
    } else if (enter && !checkValueError && !doNotUseEnter) {
      updateBtnHandler();
    } else return;
  });
  return (
    <StyledEditPopup theme={props.theme} className={className}>
      {editedByStatus && editedBy && (
        <div className="edited-by">前次編輯人員: {editedBy}</div>
      )}
      <div className="content">
        <div className="title">
          {title} {langTextFetch()}
          {otherTip.content.length > 0 && (
            <div className="alert-tip">
              <FiAlertOctagon className="svg-FiAlertOctagon" />
              <TipTool
                className="editpopup-tiptool"
                content={otherTip.content}
                minusWidth={otherTip.minus}
              />
            </div>
          )}
        </div>
        {children}
        <div className="last-btns">
          <Button
            type={"feature"}
            title={updateBtn}
            disabled={checkValueError}
            handler={() => updateBtnHandler()}
          />
          <Button
            type={"alert"}
            title={"取消"}
            handler={() => closeBtnHandler()}
          />
        </div>
      </div>
    </StyledEditPopup>
  );
};
