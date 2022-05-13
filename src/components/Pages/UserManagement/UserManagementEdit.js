import { useState } from "react";
import cx from "classnames";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { mouseDownEvent } from "../../../constants/otherFuntions";
import { RiArrowDownSFill } from "react-icons/ri";
// reducers
import { setConfirm } from "../../../reducer/props";
// listener
import { Mousedown } from "../../../common-lib/hooks";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";

const StyledUserManagementEdit = styled(EditPopup)`
  .account {
    font-weight: bold;
  }
  .selector {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    padding: 10px 14px;
    min-width: 150px;
    cursor: pointer;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
  }
  .svg-um-RiArrowDownSFill {
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => getData(styles, [theme, "color"])};
  }
  .dr-selecter {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
  }
  .dr-selecter li {
    padding: 10px 0;
    text-align: center;
    &.selected,
    &:hover {
      color: ${({ theme }) =>
        getData(styles, [theme, "linkSelector", "hoverColor"])};
      background-color: ${({ theme }) =>
        getData(styles, [theme, "linkSelector", "hover"])};
    }
  }
`;

export const UserManagementEdit = ({ data = [], closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const dispatch = useDispatch();
  const [newLevel, setNewLevel] = useState(
    getData(currentData || "", ["level"], 0)
  );
  const [drStatus, setTimesDrStatus] = useState(false);
  const showLevel = (level = Number()) => {
    switch (level) {
      case 0:
        return "一般權限";
      case 1:
        return "進階權限";
      case 2:
        return "最高權限";
      default:
        return "一般權限";
    }
  };
  const drList = [
    { value: 0, name: "一般權限" },
    { value: 1, name: "進階權限" },
    { value: 2, name: "最高權限" },
  ];
  Mousedown((e) => {
    mouseDownEvent(e, "level-selector", () => setTimesDrStatus(false));
  });
  return (
    <StyledUserManagementEdit
      theme={props.theme}
      editedBy={getData(currentData || "", ["edited_by"])}
      title={"使用者編輯"}
      closeBtnHandler={closeHandler}
      checkValueError={false}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: "確定更新使用者?",
            type: "userManagementUpdate",
            // api update data
            param: {
              id: getData(currentData, ["id"]),
              level: newLevel,
            },
          })
        )
      }
    >
      <SettingSquare
        title={"帳號"}
        Comp={() => (
          <div className="account">{getData(currentData, ["account"])}</div>
        )}
      />
      <SettingSquare
        title={"權限"}
        Comp={() => (
          <div
            id="level-selector"
            className="selector"
            onClick={() => setTimesDrStatus((prev) => !prev)}
          >
            <span>{showLevel(newLevel)}</span>
            <RiArrowDownSFill className="svg-um-RiArrowDownSFill" />
            {drStatus && (
              <ul className="dr-selecter">
                {drList.map((v, k) => (
                  <li
                    key={k}
                    className={cx({ selected: v.value === newLevel })}
                    onClick={() => setNewLevel(v.value)}
                  >
                    {v.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
    </StyledUserManagementEdit>
  );
};
