import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../common-lib/lib";
import { styles } from "../../constants/styles";
import { AGENT_LIST } from "../../constants/agentList";
// reducers
import { setAgentSiteUpdate } from "../../reducer/agentSite";

const StyledAgentSite = styled.div`
  padding-top: 50px;
  .agent-site-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .check-list {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .check-name {
    margin-left: 5px;
  }
  .checked-tip {
    margin-left: 10px;
    color: ${({ theme }) => getData(styles, [theme, "feature"])};
    &.isSelected {
      color: ${({ theme }) => getData(styles, [theme, "alert"])};
    }
  }
`;

export const AgentSite = ({ limitSelected = false, compareId = 0 }) => {
  const props = useSelector((state) => state.props);
  const agentSite = useSelector((state) => state.agentSite.list);
  const siteStatus = useSelector((state) => state.agentSite.siteStatus);
  const dispatch = useDispatch();
  // other check
  const otherChecked = (name = "") => {
    const isStatus = getData(siteStatus, [name, "title"]).length > 0;
    const isChecker = getData(siteStatus, [name, "id"]) === compareId;
    const status = isChecker ? false : isStatus;
    return limitSelected ? status : false;
  };
  const CheckedModule = ({ name = "" }) => {
    const dataChecked = agentSite.find((v) => v === name);
    return (
      <div className="check-list">
        <label>
          <input
            type="checkbox"
            checked={dataChecked}
            disabled={otherChecked(name)}
            onChange={(e) => {
              dispatch(
                setAgentSiteUpdate({
                  status: e.target.checked,
                  data: name,
                })
              );
            }}
          />
          <div className="check-name">{name}</div>
          {otherChecked(name) && (
            <div
              className={cx("checked-tip", { isSelected: otherChecked(name) })}
            >
              『 {getData(siteStatus, [name, "title"])} 』已選取
            </div>
          )}
        </label>
      </div>
    );
  };
  return (
    <StyledAgentSite theme={props.theme}>
      <div className="agent-site-title">代理商：</div>
      {getData(AGENT_LIST, [props.language], AGENT_LIST.other).map((v, k) => (
        <CheckedModule key={k} name={v} />
      ))}
    </StyledAgentSite>
  );
};
