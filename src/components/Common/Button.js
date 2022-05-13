import styled from "styled-components";
import { useSelector } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";

const StyledButton = styled.div`
  border: 0;
  font-size: 14px;
  padding: 10px 14px;
  border-radius: 5px;
  margin-right: 12px;
  color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
  background-color: ${({ theme, type }) => getData(styles, [theme, type])};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export const Button = ({
  classname = "",
  type = "",
  title = "",
  disabled = false,
  handler = noop,
}) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledButton
      className={classname}
      theme={props.theme}
      type={type}
      onClick={() => !disabled && handler()}
    >
      {title}
    </StyledButton>
  );
};
