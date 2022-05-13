import styled from "styled-components";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { FiLink } from "react-icons/fi";

const StyledOutsideLink = styled.div`
  display: flex;
  align-items: center;
  .svg-FiLink {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  span {
    font-size: 14px;
    text-decoration: underline;
    color: ${getData(styles, ["common", "aLink"])};
    cursor: pointer;
  }
`;

export const OutsideLink = ({ link = "", width = 200, height = 75 }) => {
  return (
    <StyledOutsideLink style={{ width: `${width}px`, height: `${height}px` }}>
      <FiLink className="svg-FiLink" />
      <span
        onClick={() => {
          const windowOpen = window.open("about:blank");
          windowOpen.location.href = link;
        }}
      >
        外部連結
      </span>
    </StyledOutsideLink>
  );
};
