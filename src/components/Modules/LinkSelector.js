import { useState, useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { noop } from "@babel/types";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowDownSFill } from "react-icons/ri";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// loader
import { LoaderSpinner } from "../Common/Loader";
// reducers
import {
  setLink,
  setLinkSelector,
  setLinkStatus,
  setLinkSelectorOnly,
  setLinkTip,
  setLinkTypeDropStatus,
  setLinkChildDropStatus,
} from "../../reducer/linkSelector";
// api
// import {
//   fetchNewsList,
//   fetchGuidList,
//   fetchSpecialGameList,
// } from "../Common/fetchData";

import { newsListData, guideListData, specialGameData } from "../../demoData";

const StyledLinkSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 25px;
  .link-selector-title {
    margin-right: 20px;
  }
  .drop-selector-type {
    position: relative;
    font-size: 14px;
    min-width: 100px;
    padding: 0px 12px;
    height: 38px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
    cursor: pointer;
    &.isChild {
      margin-left: 10px;
    }
    .child-caption {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 460px;
      white-space: nowrap;
    }
  }
  .svg-ls-RiArrowDownSFill {
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => getData(styles, [theme, "color"])};
  }
  .drop-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
    border-radius: 0 0 5px 5px;
    .list-content {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      &:hover,
      &.selected {
        color: ${({ theme }) =>
          getData(styles, [theme, "linkSelector", "hoverColor"])};
        background-color: ${({ theme }) =>
          getData(styles, [theme, "linkSelector", "hover"])};
      }
    }
  }
  .ct-tips {
    font-size: 15px;
    margin-left: 10px;
    color: ${({ theme }) => getData(styles, [theme, "alert"])};
  }
  .type-input {
    margin-left: 10px;
    padding: 0px 12px;
    height: 38px;
    border-radius: 5px;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
  }
  .type-input::placeholder {
    color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "placeholder"])};
  }
`;

export const linkSelectorMouseDownEvent = (e, dispatch = noop) => {
  const lsFirstType = document.getElementById("ls-first-type");
  const lsChildDrop = document.getElementById("ls-child-drop");
  if (lsFirstType && !lsFirstType.contains(e.target)) {
    dispatch(setLinkTypeDropStatus(false));
  }
  if (lsChildDrop && lsChildDrop.contains(e.target)) {
    dispatch(setLinkChildDropStatus(true));
  }
  if (lsChildDrop && !lsChildDrop.contains(e.target)) {
    dispatch(setLinkChildDropStatus(false));
  }
};

export const LinkSelector = ({ className = "", isSpecialGame = false }) => {
  const props = useSelector((state) => state.props);
  const linkSelector = useSelector((state) => state.linkSelector);
  const dispatch = useDispatch();
  // list state
  const [childDataList, setChildDataList] = useState({
    data: [],
    isLoading: true,
  });
  const selectorTypeList = isSpecialGame
    ? [
        { key: 1, type: "報導" },
        { key: 2, type: "活動" },
        { key: 3, type: "攻略" },
        { key: 4, type: "派彩指數" },
        { key: 6, type: "熱門影音" },
        { key: 7, type: "站外網址" },
      ]
    : [
        { key: 1, type: "報導" },
        { key: 2, type: "活動" },
        { key: 3, type: "攻略" },
        { key: 4, type: "派彩指數" },
        { key: 5, type: "爆款遊戲" },
        { key: 6, type: "熱門影音" },
        { key: 7, type: "站外網址" },
      ];
  const currentKey =
    selectorTypeList.find((v) => getData(v, ["key"]) === linkSelector.linkId) ||
    [];
  const statusFetch = (linkId) => {
    switch (linkId) {
      case 2:
      case 4:
      case 6:
        return false;
      default:
        return true;
    }
  };
  const selectorRenderFetch = () => {
    switch (linkSelector.linkId) {
      case 1:
      case 3:
      case 5:
        return true;
      default:
        return false;
    }
  };
  // child title
  const titleFetch = () => {
    switch (linkSelector.linkId) {
      case 1:
        const findData1 = childDataList.data.find(
          (v) => getData(v, ["id"]).toString() === linkSelector.url
        );
        return findData1 ? getData(findData1, ["title"]) : "";
      case 3:
        const findData3 = childDataList.data.find(
          (v) => getData(v, ["game_id"]).toString() === linkSelector.url
        );
        const toLobby = "guide_lobby" === linkSelector.url;
        const unknowName = getData(findData3 || {}, ["name", props.language])
          ? getData(findData3 || {}, ["name", props.language])
          : `id: ${getData(findData3 || {}, ["game_id"])}`;
        return findData3 ? unknowName : toLobby ? "遊戲攻略大廳" : "";
      case 5:
        const findData5 = childDataList.data.find(
          (v) => getData(v, ["id"]).toString() === linkSelector.url
        );
        return findData5 ? getData(findData5, ["title"]) : "";
      default:
        return "";
    }
  };
  const CommonDropSelector = ({
    id = "",
    dataisLoading = false,
    dropStatus = false,
    dropList = [],
    handler = noop,
  }) => {
    if (dataisLoading || dropList.length === 0) {
      return (
        <div className={`drop-selector-type isChild`}>
          <span>{dropList.length === 0 ? "no data" : "loading..."}</span>
          {dataisLoading && <LoaderSpinner width={24} height={24} />}
        </div>
      );
    } else
      return (
        <div
          id={id}
          className={`drop-selector-type isChild`}
          onClick={() => handler()}
        >
          <span className="child-caption">{titleFetch()}</span>
          <RiArrowDownSFill className="svg-ls-RiArrowDownSFill" />
          {dropStatus && <CreateSelectorDrop list={dropList} isChild={true} />}
        </div>
      );
  };
  const CreateSelectorDrop = ({ list = [], isChild = false }) => {
    if (isChild) {
      if (linkSelector.linkId === 1) {
        const filterList = list.filter((v) => getData(v, ["status"])) || [];
        return (
          <div className="drop-list">
            {filterList.map((v, k) => {
              return (
                <div
                  key={k}
                  className={cx("list-content", {
                    selected:
                      getData(v, ["id"]).toString() === linkSelector.url,
                  })}
                  onClick={() =>
                    dispatch(setLinkSelectorOnly(getData(v, ["id"])))
                  }
                >
                  {getData(v, ["title"])}
                </div>
              );
            })}
          </div>
        );
      } else if (linkSelector.linkId === 3) {
        return (
          <div className="drop-list">
            <div
              className={cx("list-content", {
                selected: "guide_lobby" === linkSelector.url,
              })}
              onClick={() => dispatch(setLinkSelectorOnly("guide_lobby"))}
            >
              遊戲攻略大廳
            </div>
            {list.map((v, k) => {
              const unknowName = getData(v, ["name", props.language])
                ? getData(v, ["name", props.language])
                : `id: ${getData(v, ["game_id"])}`;
              return (
                <div
                  key={k}
                  className={cx("list-content", {
                    selected:
                      getData(v, ["game_id"]).toString() === linkSelector.url,
                  })}
                  onClick={() =>
                    dispatch(setLinkSelectorOnly(getData(v, ["game_id"])))
                  }
                >
                  {unknowName}
                </div>
              );
            })}
          </div>
        );
      } else if (linkSelector.linkId === 5) {
        return (
          <div className="drop-list">
            {list.map((v, k) => {
              return (
                <div
                  key={k}
                  className={cx("list-content", {
                    selected:
                      getData(v, ["id"]).toString() === linkSelector.url,
                  })}
                  onClick={() =>
                    dispatch(setLinkSelectorOnly(getData(v, ["id"])))
                  }
                >
                  {getData(v, ["title"])}
                </div>
              );
            })}
          </div>
        );
      } else return <></>;
    } else
      return (
        <div className="drop-list">
          {list.map((v, k) => {
            return (
              <div
                key={k}
                className={cx("list-content", {
                  selected: getData(v, ["key"]) === linkSelector.linkId,
                })}
                onClick={() => {
                  if (getData(v, ["key"]) === linkSelector.linkId) {
                    return;
                  }
                  setChildDataList({
                    data: [],
                    isLoading: true,
                  });
                  dispatch(
                    setLinkSelector({
                      linkId: getData(v, ["key"]),
                      url: "",
                      isError: statusFetch(getData(v, ["key"])),
                    })
                  );
                }}
              >
                {getData(v, ["type"])}
              </div>
            );
          })}
        </div>
      );
  };
  useEffect(() => {
    if (linkSelector.linkId === 1) {
      // fetchNewsList({
      //   lang: props.language,
      //   handler: (data = []) => {
      //     setChildDataList({
      //       data: data,
      //       isLoading: false,
      //     });
      //   },
      // });
      setChildDataList({
        data: newsListData,
        isLoading: false,
      });
    }
    if (linkSelector.linkId === 3) {
      // fetchGuidList({
      //   lang: props.language,
      //   handler: (data = []) => {
      //     setChildDataList({
      //       data: data,
      //       isLoading: false,
      //     });
      //   },
      // });
      setChildDataList({
        data: guideListData,
        isLoading: false,
      });
    }
    if (linkSelector.linkId === 5) {
      // fetchSpecialGameList({
      //   lang: props.language,
      //   status: true,
      //   handler: (data = []) => {
      //     setChildDataList({
      //       data: data,
      //       isLoading: false,
      //     });
      //   },
      // });
      setChildDataList({
        data: specialGameData,
        isLoading: false,
      });
    }
  }, [linkSelector.linkId, props.language]);
  useEffect(() => {
    const childrenCheck = () => {
      switch (linkSelector.linkId) {
        case 1:
          const findData1 = childDataList.data.find(
            (v) => getData(v, ["id"]).toString() === linkSelector.url
          );
          return findData1 ? false : true;
        case 3:
          const findData3 = childDataList.data.find(
            (v) => getData(v, ["game_id"]).toString() === linkSelector.url
          );
          const toLobby = "guide_lobby" === linkSelector.url;
          return findData3 || toLobby ? false : true;
        case 5:
          const findData5 = childDataList.data.find(
            (v) => getData(v, ["id"]).toString() === linkSelector.url
          );
          return findData5 ? false : true;
        default:
          return false;
      }
    };
    const errorFetch = (type = "") => {
      const passLinkId =
        linkSelector.linkId === 2 ||
        linkSelector.linkId === 4 ||
        linkSelector.linkId === 6;
      const isNeedIncludeProtocol = linkSelector.linkId === 6;
      if (passLinkId) {
        return false;
      } else if (isNeedIncludeProtocol) {
        if (!/^(https?:\/\/)/.test(linkSelector.url)) {
          return type === "string" ? "網址開頭需為http(s)://" : true;
        }
      } else {
        if (/^(https?:\/\/)/.test(linkSelector.url)) {
          return type === "string" ? "網址開頭不可包含http(s)://" : true;
        } else if (linkSelector.url.length === 0 || childrenCheck()) {
          return type === "string" ? "連結 不可為空" : true;
        }
      }
    };
    dispatch(setLinkTip(errorFetch("string")));
    dispatch(setLinkStatus(errorFetch() || false));
  }, [linkSelector, dispatch, childDataList]);
  return (
    <StyledLinkSelector theme={props.theme} className={className}>
      <div className="link-selector-title">連結:</div>
      <div
        id={"ls-first-type"}
        className={`drop-selector-type`}
        onClick={() =>
          dispatch(setLinkTypeDropStatus(!linkSelector.typeDropStatus))
        }
      >
        <span>{getData(currentKey, ["type"])}</span>
        <RiArrowDownSFill className="svg-ls-RiArrowDownSFill" />
        {linkSelector.typeDropStatus && (
          <CreateSelectorDrop list={selectorTypeList} />
        )}
      </div>
      {linkSelector.linkId === 7 && (
        <input
          className="type-input"
          placeholder="請輸入網址"
          disabled={props.confirm.status}
          value={linkSelector.url}
          onChange={(e) => {
            dispatch(setLink(e.target.value));
          }}
        />
      )}
      {selectorRenderFetch() && (
        <CommonDropSelector
          id={"ls-child-drop"}
          dataisLoading={childDataList.isLoading}
          dropStatus={linkSelector.childDropStatus}
          dropList={childDataList.data}
          handler={() =>
            dispatch(setLinkChildDropStatus(!linkSelector.childDropStatus))
          }
        />
      )}
      {linkSelector.isError && (
        <div className="ct-tips">{linkSelector.tip}</div>
      )}
    </StyledLinkSelector>
  );
};
