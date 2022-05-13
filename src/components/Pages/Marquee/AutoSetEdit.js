import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";

const StyledAutoSetEdit = styled(EditPopup)``;

export const AutoSetEdit = ({ data = {}, closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  const [win, setWin] = useState(getData(data, ["win"]));
  const [rate, setRate] = useState(getData(data, ["winrate"]));
  const checkValueErrorStatus = (type = "") => {
    const winValueCheck = win === 0;
    const rateValueCheck = rate === 0;
    const totalcheck = !winValueCheck && !rateValueCheck;
    switch (type) {
      case "win":
        return winValueCheck;
      case "rate":
        return rateValueCheck;
      case "category":
      default:
        return !totalcheck;
    }
  };
  return (
    <StyledAutoSetEdit
      theme={props.theme}
      editedBy={getData(data, ["edited_by"])}
      title={"跑馬燈大獎倍率"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: "確定更新?",
            type: "marqueeAutoSetUpdate",
            param: {
              lang: props.language,
              win: win,
              winrate: rate,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <SettingSquare
        title={"贏分值"}
        isTip={checkValueErrorStatus("win")}
        tipContent={"不可為0"}
        Comp={() => (
          <input
            className="input"
            disabled={props.confirm.status}
            value={win}
            placeholder="請輸入標題"
            onChange={(e) => {
              const update = Number(e.target.value.replace(/^[^1-9]/g, ""));
              !isNaN(update) && setWin(update);
            }}
          />
        )}
      />
      <SettingSquare
        title={"倍率值"}
        isTip={checkValueErrorStatus("rate")}
        tipContent={"不可為0"}
        Comp={() => (
          <input
            className="input"
            disabled={props.confirm.status}
            value={rate}
            placeholder="請輸入標題"
            onChange={(e) => {
              const update = Number(e.target.value.replace(/^[^1-9]/g, ""));
              !isNaN(update) && setRate(update);
            }}
          />
        )}
      />
    </StyledAutoSetEdit>
  );
};
