import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { statusFetchList } from "../../../constants/otherFuntions";
import {
  transTimeDateSingle,
  transTimeToEUS,
} from "../../../constants/fetchTimeDate";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
import { setCategoryIdName } from "../../../reducer/category";
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DndEdit } from "../../Modules/DndEdit";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { TipTool } from "../../Common/TipTool";
import { NewsEdit } from "./NewsEdit";
// api
// import {
//   fetchNewsList,
//   fetchCategoryList,
//   RenderGetDataHook,
// } from "../../Common/fetchData";
import { newsListData, categoryData } from "../../../demoData";

const StyledNews = styled.div`
  .isBefore {
    color: ${({ theme }) => getData(styles, [theme, "tip", "otherColor"])};
  }
`;
export const News = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [dndStatus, setDndStatus] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [newsList, setNewsList] = useState({
    data: [],
    isLoading: true,
  });
  const [categoryList, setCategoryList] = useState({
    data: {},
    isLoading: true,
  });
  const newsCategory = getData(categoryList.data, ["news", "category"], []);
  const fetchCategory = (cId = 0, checkClass = false) => {
    const categoryId =
      newsCategory.find((v) => getData(v, ["id"]) === cId) || {};
    return getData(
      categoryId,
      ["name"],
      `${checkClass ? "delete" : "no data"}`
    );
  };
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchNewsList,
  //   setData: setNewsList,
  // });
  // RenderGetDataHook({
  //   lang: props.language,
  //   isMap: true,
  //   fetchData: fetchCategoryList,
  //   setData: setCategoryList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNewsList({
        data: newsListData,
        isLoading: false,
      });
      setCategoryList({
        data: categoryData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledNews theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="最新報導"
          subtitles={["標題", "啟用區間", "類別", "代理商", "操作"]}
          Buttons={
            <>
              <Button
                type="subFeature"
                title="變更順序"
                handler={() =>
                  statusFetchList(newsList.data).length > 0 &&
                  setDndStatus(true)
                }
              />
              <Button
                type="feature"
                title="新增報導"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={newsList.isLoading}
          data={newsList.data}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["title"])}</CompFloor2>
              <CompFloor2
                className={cx("unhidden", {
                  isBefore: transTimeToEUS(getData(v, ["end_time"])).isBefore(
                    transTimeToEUS(new Date())
                  ),
                })}
              >
                {transTimeToEUS(getData(v, ["start_time"])).format(
                  "YYYY/MM/DD"
                )}
                {" - "}
                {transTimeToEUS(getData(v, ["end_time"])).format("YYYY/MM/DD")}
                {transTimeToEUS(getData(v, ["end_time"])).isBefore(
                  transTimeToEUS(new Date())
                ) && <TipTool content="已過期" />}
                {transTimeToEUS(getData(v, ["start_time"])).isAfter(
                  transTimeToEUS(new Date())
                ) && <TipTool content="未開始" />}
              </CompFloor2>
              <CompFloor2
                className={`${fetchCategory(
                  getData(v, ["category_id"]),
                  true
                )}`}
              >
                {categoryList.isLoading
                  ? "no data"
                  : fetchCategory(getData(v, ["category_id"]))}
              </CompFloor2>
              <CompFloor2>
                [
                {getData(v, ["site"], []).map((iv, ik) => {
                  const last = getData(v, ["site"]).length === ik + 1;
                  return last ? iv : `${iv}, `;
                })}
                ]
              </CompFloor2>
              <CompFloor2 className="btns">
                <Button
                  type="feature"
                  title="編輯"
                  handler={() => {
                    dispatch(
                      setCategoryIdName({
                        id: getData(v, ["category_id"]),
                        name: fetchCategory(getData(v, ["category_id"])),
                      })
                    );
                    dispatch(setEdit(getData(v, ["id"])));
                  }}
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
                        type: "newsUpdate",
                        param: {
                          category_id: getData(v, ["category_id"]),
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          description: getData(v, ["description"]),
                          content: getData(v, ["content"]),
                          pic: getData(v, ["pic", "img"]),
                          start_time: transTimeDateSingle(
                            getData(v, ["start_time"])
                          ),
                          end_time: transTimeDateSingle(
                            getData(v, ["end_time"])
                          ),
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
                          type: "newsDelete",
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
      </StyledNews>
      {edit.status && (
        <NewsEdit
          data={newsList.data}
          newsCategory={newsCategory}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
      {dndStatus && (
        <DndEdit
          title="報導"
          data={statusFetchList(newsList.data)}
          patchData={statusFetchList(newsList.data, "reverse")}
          dndId="news"
          type="newsSort"
          children={(data) => {
            return (
              <>
                <div className="dnd-title">{getData(data, ["title"])}</div>
                <div
                  className={cx("dnd-time-range", {
                    isBefore: transTimeToEUS(
                      getData(data, ["end_time"])
                    ).isBefore(transTimeToEUS(new Date())),
                  })}
                >
                  {transTimeToEUS(getData(data, ["start_time"])).format(
                    "YYYY/MM/DD"
                  )}
                  {" - "}
                  {transTimeToEUS(getData(data, ["end_time"])).format(
                    "YYYY/MM/DD"
                  )}
                  {transTimeToEUS(getData(data, ["end_time"])).isBefore(
                    transTimeToEUS(new Date())
                  ) && <TipTool className="dnd-tip" content="已過期" />}
                </div>
              </>
            );
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </>
  );
};
