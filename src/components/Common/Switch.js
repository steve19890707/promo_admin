import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// reducers
import { setChecked } from "../../reducer/apiProps";

const StyledSwitchKit = styled.div`
  display: flex;
  align-items: center;
  .switch-span {
    margin-left: 8px;
    &.checked {
      color: ${({ theme }) => getData(styles, [theme, "switchStatus"])};
    }
  }
`;

export const SwitchKit = () => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const dispatch = useDispatch();
  return (
    <StyledSwitchKit theme={props.theme}>
      <Switch
        onColor={getData(styles, [props.theme, "switchStatus"])}
        onChange={() => dispatch(setChecked(!apiProps.checked))}
        checked={apiProps.checked}
      />
      <span className={cx("switch-span", { checked: apiProps.checked })}>
        {apiProps.checked ? "啟用" : "停用"}
      </span>
    </StyledSwitchKit>
  );
};
