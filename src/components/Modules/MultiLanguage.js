import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { AGENT_LIST } from "../../constants/agentList";
import { GrLanguage } from "react-icons/gr";
// reducers
import { setLanguage } from "../../reducer/props";
// component
import { PageTag } from "../Common/PageTag";

const StyledMultiLanguage = styled.div`
  display: inline-flex;
  align-items: center;
  .svg-GrLanguage {
    width: 20px;
    height: 20px;
    margin: 0 15px;
    path {
      stroke: ${({ theme }) => getData(styles, [theme, "feature"])};
    }
  }
`;

export const MultiLanguage = ({
  className = "",
  otherHandlerType = "",
  otherData = {},
  otherHandler = noop,
}) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  const {
    pageRoutes = [],
    setSiteSelected = noop,
    setRouteSelected = noop,
  } = otherData;
  return (
    <StyledMultiLanguage theme={props.theme} className={className}>
      <GrLanguage className="svg-GrLanguage" />
      {props.langList.map((v, k) => {
        return (
          <PageTag
            key={k}
            tagName={getData(v, ["name"])}
            isSelected={props.language === getData(v, ["lang"])}
            handler={() => {
              switch (otherHandlerType) {
                case "html":
                  otherHandler(() => {
                    dispatch(setLanguage(getData(v, ["lang"])));
                    localStorage.setItem(
                      "html-site",
                      getData(
                        AGENT_LIST,
                        [getData(v, ["lang"])],
                        AGENT_LIST.other
                      )[0]
                    );
                    localStorage.setItem("html-route", pageRoutes[0].route);
                    setSiteSelected(
                      getData(
                        AGENT_LIST,
                        [getData(v, ["lang"])],
                        AGENT_LIST.other
                      )[0]
                    );
                    setRouteSelected(pageRoutes[0].route);
                  });
                  break;
                default:
                  dispatch(setLanguage(getData(v, ["lang"])));
                  break;
              }
            }}
          />
        );
      })}
    </StyledMultiLanguage>
  );
};
