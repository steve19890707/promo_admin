import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { AGENT_STATUS_LIST } from "../../../constants/agentList";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
import { setSiteStatus } from "../../../reducer/agentSite";
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { ActivitesEdit } from "./ActivitesEdit";
// api
// import { fetchActiveList, RenderGetDataHook } from "../../Common/fetchData";
import { activeData } from "../../../demoData";

const StyledActivites = styled.div`
  a {
    color: ${getData(styles, ["common", "aLink"])};
    text-decoration: underline;
  }
  .status-fetch {
    display: flex;
    align-items: center;
    color: ${({ theme }) => getData(styles, [theme, "subFeature"])};
    font-size: 13px;
  }
  .string {
    &-true {
      color: ${({ theme }) => getData(styles, [theme, "switchStatus"])};
    }
    &-false {
      color: ${({ theme }) => getData(styles, [theme, "placeholder"])};
    }
  }
`;

export const Activites = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [activeList, setActiveList] = useState({ data: [], isLoading: true });
  const [siteSituation, setSiteSituation] = useState({});
  const fetchSiteTitle = (data) => {
    return getData(siteSituation, [getData(data, ["title"])], []);
  };
  useEffect(() => {
    const siteStatus = getData(
      AGENT_STATUS_LIST,
      [props.language],
      AGENT_STATUS_LIST.other
    );
    if (activeList.data.length > 0) {
      let updateMap = {};
      let updateStatusMap = siteStatus;
      activeList.data.map((v) => {
        let siteMap = {};
        if (getData(v, ["site"], []).length > 0) {
          getData(v, ["site"], []).map((iv) => {
            return (siteMap = {
              ...siteMap,
              [iv]: {
                title: getData(v, ["title"]),
                id: getData(v, ["id"]),
              },
            });
          });
        }
        return (
          (updateStatusMap = {
            ...updateStatusMap,
            ...siteMap,
          }),
          (updateMap = {
            ...updateMap,
            [getData(v, ["title"])]: getData(v, ["site"]),
          })
        );
      });
      dispatch(setSiteStatus(updateStatusMap));
      setSiteSituation(updateMap);
    } else {
      dispatch(setSiteStatus(siteStatus));
    }
  }, [activeList.data, dispatch, props.language]);
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchActiveList,
  //   setData: setActiveList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveList({
        data: activeData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledActivites theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="活動列表"
          subtitles={["標題", "活動頁網址", "已選取代理", "操作"]}
          Buttons={
            <Button
              type="feature"
              title="新增活動"
              handler={() => dispatch(setAdd())}
            />
          }
        />
        <DataLoaded
          isLoading={activeList.isLoading}
          data={activeList.data}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["title"])}</CompFloor2>
              <CompFloor2>
                <a
                  href={`https://${getData(v, ["url"])}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getData(v, ["url"])}
                </a>
              </CompFloor2>
              <CompFloor2 className="status-fetch">
                [
                {fetchSiteTitle(v).length !== 0 &&
                  fetchSiteTitle(v).map((iv, ik) => {
                    const last = fetchSiteTitle(v).length === ik + 1;
                    return last ? iv : `${iv}, `;
                  })}
                ]
              </CompFloor2>
              <CompFloor2 className="btns">
                <Button
                  type="feature"
                  title="編輯"
                  handler={() => dispatch(setEdit(getData(v, ["id"])))}
                />
                <Button
                  type="subFeature"
                  title={getData(v, ["status"]) ? "停用" : "啟用"}
                  handler={() =>
                    dispatch(
                      setConfirm({
                        status: true,
                        content: getData(v, ["status"])
                          ? "確定停用?"
                          : "確定啟用?",
                        type: "activeUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          url: getData(v, ["url"]),
                          site: getData(v, ["site"]),
                        },
                      })
                    )
                  }
                />
                {!getData(v, ["status"]) && (
                  <Button
                    type="alert"
                    title="刪除"
                    handler={() => {
                      dispatch(
                        setConfirm({
                          status: true,
                          content: "確定刪除?",
                          type: "activeDelete",
                          param: {
                            id: [getData(v, ["id"])],
                          },
                        })
                      );
                    }}
                  />
                )}
              </CompFloor2>
            </>
          )}
        />
      </StyledActivites>
      {edit.status && (
        <ActivitesEdit
          data={activeList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
    </>
  );
};
