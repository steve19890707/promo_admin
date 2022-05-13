import styled from "styled-components";
import cx from "classnames";
import { useSelector } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";

const StyledPageTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  min-width: 50px;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => `${getData(styles, [theme, "color"])}66`};
  cursor: pointer;
  margin-right: 6px;
  &:last-child {
    margin-right: 0;
  }
  span {
    font-size: 16px;
  }
  &.selected {
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "multiLanguage", "tagBg"])};
    background: ${({ theme }) =>
      getData(styles, [theme, "multiLanguage", "tagBg"])};
    span {
      color: ${({ theme }) =>
        getData(styles, [theme, "multiLanguage", "tagColor"])};
    }
  }
`;
export const PageTag = ({
  tagName = "標籤",
  isSelected = false,
  handler = noop,
}) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledPageTag
      theme={props.theme}
      className={cx({ selected: isSelected })}
      onClick={() => handler()}
    >
      <span>{tagName}</span>
    </StyledPageTag>
  );
};
