import styled from "styled-components";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { RiAlertFill } from "react-icons/ri";

const StyledTipTool = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 5px;
  transform: translate(-50%, -70%);
  color: ${({ theme }) => getData(styles, [theme, "tip", "color"])};
  background-color: ${({ theme }) =>
    getData(styles, [theme, "tip", "background"])};
  pointer-events: none;
  .svg-RiAlertFill {
    margin-right: 4px;
    width: 14px;
    height: 14px;
    color: ${({ theme }) => getData(styles, [theme, "tip", "svgColor"])};
  }
  &::after {
    content: "";
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid;
    border-color: transparent;
    border-top-color: ${({ theme }) =>
      getData(styles, [theme, "tip", "background"])};
  }
  span {
    font-size: 13px;
    text-align: center;
  }
`;

export const TipTool = ({ content = "", className = "", minusWidth = 0 }) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledTipTool className={className} theme={props.theme}>
      <RiAlertFill className="svg-RiAlertFill" />
      <span style={{ width: `${content.length * 14 - minusWidth}px` }}>
        {content}
      </span>
    </StyledTipTool>
  );
};
