import { useState, useEffect } from "react";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { AGENT_LIST } from "../../../constants/agentList";
import { ImCheckboxChecked } from "react-icons/im";
import { SiSitepoint } from "react-icons/si";
// loader
import { CompsLoader } from "../../Modules/CompsLoader";
// listener
import { Keydown } from "../../../common-lib/hooks";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setChecked } from "../../../reducer/apiProps";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { PageTag } from "../../Common/PageTag";
import { Button } from "../../Common/Button";
import { SwitchKit } from "../../Common/Switch";
import { EditContent } from "./EditContent";
// api
// import { fetchHtmlList, RenderGetDataHook } from "../../Common/fetchData";
import { htmlData } from "../../../demoData";
import { noop } from "lodash";
const StyledSiteTagList = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
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
  .tag-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 25px;
    }
  }
  .child-tag {
    border-radius: 50px;
    color: ${({ theme }) => getData(styles, [theme, "codeEdit", "tagColor"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "codeEdit", "tagBg"])};
    padding: 10px 16px;
    margin: 5px;
    cursor: pointer;
    &.isSelected {
      color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
      background-color: ${({ theme }) => getData(styles, [theme, "feature"])};
    }
  }
`;
const StyledCodeEdit = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
  .opreation-content {
    display: inline-flex;
    align-items: center;
  }
  .opreation-content .status {
    display: inline-flex;
    align-items: center;
    margin-right: 25px;
    .text {
      font-weight: bold;
    }
    .on {
      color: ${({ theme }) => getData(styles, [theme, "switchStatus"])};
    }
    .svg-ImCheckboxChecked {
      width: 20px;
      height: 20px;
      margin: 0 6px;
      fill: ${({ theme }) => getData(styles, [theme, "switchStatus"])};
    }
  }
  .opreation-content .edited-by {
    margin-left: 10px;
    color: ${getData(styles, ["common", "editedBy"])};
  }
  .html-subtitle {
    margin-top: 25px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    .svg-SiSitepoint {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
  .previwe-data {
    margin-top: 30px;
    padding: 15px;
    border-radius: 5px;
    min-height: 350px;
    color: ${({ theme }) =>
      getData(styles, [theme, "codeEdit", "previewColor"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "codeEdit", "editContentBg"])};
  }
  .code-edit-loader {
    box-shadow: unset;
    .comps-loader {
      padding: 0 0 5px 0;
    }
  }
`;

export const CodeEdit = () => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const dispatch = useDispatch();
  const siteLangList = getData(AGENT_LIST, [props.language], AGENT_LIST.other);
  const pageRoutes = [
    { name: "全域", route: "all" },
    { name: "跑馬燈", route: "announcement" },
    { name: "活動", route: "activities" },
    { name: "首頁", route: "home" },
    { name: "熱門影音", route: "video" },
    { name: "遊戲試玩", route: "games" },
    { name: "遊戲攻略", route: "guides" },
    { name: "熱門排行", route: "game_rank" },
    { name: "玩家排行", route: "player_rank" },
    { name: "派彩指數", route: "payout_rank" },
    { name: "品牌介紹", route: "introduction" },
    { name: "菠菜新知", route: "article" },
  ];
  localStorage.setItem(
    "html-site",
    localStorage.getItem("html-site") || siteLangList[0]
  );
  localStorage.setItem(
    "html-route",
    localStorage.getItem("html-route") || pageRoutes[0].route
  );
  const [codeEditList, setCodeEditList] = useState({
    data: [],
    isLoading: true,
  });
  const [editedByStatus, setEditedByStatus] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [domContent, setDomContent] = useState("");
  const [siteSelected, setSiteSelected] = useState(
    localStorage.getItem("html-site")
  );
  const [routeSelected, setRouteSelected] = useState(
    localStorage.getItem("html-route")
  );
  const currentSiteData =
    codeEditList.data.find((v) => getData(v, ["site"]) === siteSelected) || {};
  const StatusText = () => {
    const status = getData(currentSiteData, ["status", routeSelected], false);
    const text = status ? "啟用" : "停用";
    return (
      <>
        {status && <ImCheckboxChecked className="svg-ImCheckboxChecked" />}
        <span className={status ? "on" : ""}>{text}</span>
      </>
    );
  };
  const leaveStateCheck = (setStatus = noop, type = "unsaved") => {
    if (isEdit) {
      dispatch(
        setConfirm({
          status: true,
          content: type === "unsaved" ? "資料尚未儲存 確定離開?" : "確定取消?",
          type: "HtmlLeaveState",
          param: () => {
            setStatus();
            setIsEdit(false);
          },
        })
      );
    } else setStatus();
  };
  Keydown((e) => {
    const checkEdited = e.keyCode === 17;
    if (checkEdited) {
      setEditedByStatus((prev) => !prev);
    }
  });
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchHtmlList,
  //   setData: setCodeEditList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCodeEditList({
        data: htmlData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage
        otherHandlerType="html"
        otherData={{ pageRoutes, setSiteSelected, setRouteSelected }}
        otherHandler={(e) => leaveStateCheck(e)}
      />
      <StyledSiteTagList theme={props.theme}>
        <div className="caption-title">
          <span>程式碼編輯</span>
        </div>
        <div className="tag-list">
          {siteLangList.map((v, k) => {
            return (
              <PageTag
                key={k}
                tagName={v}
                isSelected={v === siteSelected}
                handler={() =>
                  leaveStateCheck(() => {
                    setSiteSelected(v);
                    localStorage.setItem("html-site", v);
                  })
                }
              />
            );
          })}
        </div>
        <div className="tag-list">
          {pageRoutes.map((v, k) => {
            return (
              <div
                key={k}
                className={cx("child-tag", {
                  isSelected: v.route === routeSelected,
                })}
                onClick={() =>
                  leaveStateCheck(() => {
                    setRouteSelected(v.route);
                    localStorage.setItem("html-route", v.route);
                  })
                }
              >
                {v.name}
              </div>
            );
          })}
        </div>
      </StyledSiteTagList>
      <StyledCodeEdit theme={props.theme}>
        {codeEditList.isLoading ? (
          <CompsLoader className="code-edit-loader" />
        ) : (
          <>
            <div className="opreation-content">
              <div className="status">
                <span className="text">原始碼狀態：</span>
                {isEdit ? <SwitchKit /> : <StatusText />}
              </div>
              {isEdit ? (
                <>
                  <Button
                    type="threeFeature"
                    title="儲存"
                    handler={() =>
                      dispatch(
                        setConfirm({
                          status: true,
                          content: "確定儲存更新?",
                          type: "HtmlUpdate",
                          param: {
                            html: {
                              ...getData(currentSiteData, ["html"], {}),
                              [routeSelected]: {
                                script: codeContent,
                                dom: domContent,
                              },
                            },
                            lang: props.language,
                            site: siteSelected,
                            status: {
                              ...getData(currentSiteData, ["status"], {}),
                              [routeSelected]: apiProps.checked,
                            },
                          },
                        })
                      )
                    }
                  />
                  <Button
                    type="cancel"
                    title="取消"
                    handler={() => leaveStateCheck(() => noop, "cancel")}
                  />
                </>
              ) : (
                <Button
                  type="subFeature"
                  title="開啟編輯"
                  handler={() => {
                    dispatch(
                      setChecked(
                        getData(
                          currentSiteData,
                          ["status", routeSelected],
                          false
                        )
                      )
                    );
                    setCodeContent(
                      getData(
                        currentSiteData,
                        ["html", routeSelected, "script"],
                        "no data"
                      )
                    );
                    setDomContent(
                      getData(
                        currentSiteData,
                        ["html", routeSelected, "dom"],
                        "no data"
                      )
                    );
                    setIsEdit(true);
                  }}
                />
              )}
              {editedByStatus && (
                <div className="edited-by">
                  前次編輯人員: {getData(currentSiteData, ["edited_by"])}
                </div>
              )}
            </div>
            <div className="html-subtitle">
              <SiSitepoint className="svg-SiSitepoint" />
              head原始碼
            </div>
            {isEdit ? (
              <EditContent value={codeContent} handler={setCodeContent} />
            ) : (
              <div className="previwe-data">
                {getData(
                  currentSiteData,
                  ["html", routeSelected, "script"],
                  "no data"
                )}
              </div>
            )}
            <div className="html-subtitle">
              <SiSitepoint className="svg-SiSitepoint" />
              DOM標籤
            </div>
            {isEdit ? (
              <EditContent value={domContent} handler={setDomContent} />
            ) : (
              <div className="previwe-data">
                {getData(
                  currentSiteData,
                  ["html", routeSelected, "dom"],
                  "no data"
                )}
              </div>
            )}
          </>
        )}
      </StyledCodeEdit>
    </>
  );
};
