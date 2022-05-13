import styled from "styled-components";
import { useSelector } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// component
import { PageTag } from "../Common/PageTag";

const StyledCaption = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px 25px 20px 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
  .caption-title {
    margin-bottom: 25px;
    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .caption-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    .tags,
    .btns {
      display: flex;
      align-items: center;
    }
  }
  .subtitle-list {
    display: flex;
    align-items: center;
  }
`;
const StyledSubtitles = styled.div`
  width: ${({ size }) => `${100 / size}%`};
`;
export const Caption = ({
  className = "",
  tag = {},
  subtitles = [],
  title = "標題",
  Buttons = noop,
}) => {
  const props = useSelector((state) => state.props);
  const {
    isOtherList = false,
    OtherList = noop,
    selected = "",
    setSelected = noop,
  } = tag;
  const list = [
    {
      name: "已啟用",
      status: "open",
    },
    { name: "未啟用", status: "close" },
  ];
  const TagList = () => {
    return list.map((v, k) => {
      return (
        <PageTag
          key={k}
          tagName={getData(v, ["name"])}
          isSelected={selected === getData(v, ["status"])}
          handler={() => {
            setSelected(getData(v, ["status"]));
            localStorage.setItem("tagSelected", getData(v, ["status"]));
          }}
        />
      );
    });
  };
  const SubTitles = () => {
    return subtitles.map((v, k) => {
      return (
        <StyledSubtitles size={subtitles.length} key={k}>
          <span>{v}</span>
        </StyledSubtitles>
      );
    });
  };
  return (
    <StyledCaption theme={props.theme} className={className}>
      <div className="caption-title">
        <span>{title}</span>
      </div>
      <div className="caption-list">
        {Object.keys(tag).length !== 0 && (
          <div className="tags">{isOtherList ? OtherList : <TagList />}</div>
        )}
        {Buttons !== noop && <div className="btns">{Buttons}</div>}
      </div>
      <div className="subtitle-list">
        <SubTitles />
      </div>
    </StyledCaption>
  );
};
