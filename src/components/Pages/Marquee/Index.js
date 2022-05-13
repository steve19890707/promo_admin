import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import { getData } from "../../../common-lib/lib";
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
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { TipTool } from "../../Common/TipTool";
import { AutoSetEdit } from "./AutoSetEdit";
import { MarqueeEdit } from "./MarqueeEdit";
// api
// import {
//   fetchMarqueeList,
//   fetchMarqueeAutoSet,
//   fetchCategoryList,
//   RenderGetDataHook,
// } from "../../Common/fetchData";

import { marqueeData, categoryData } from "../../../demoData";

const StyledMarquee = styled.div``;

export const Marquee = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [winRateEdit, setWinRateEdit] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [marqueeList, setMarqueeList] = useState({ data: [], isLoading: true });
  const [marqueeAutoSetData, setMarqueeAutoSetData] = useState({
    data: {},
    isLoading: true,
  });
  const [categoryList, setCategoryList] = useState({
    data: {},
    isLoading: true,
  });
  const marqueeCategory = getData(
    categoryList.data,
    ["marquee", "category"],
    []
  );
  const fetchCategory = (cId = 0, checkClass = false) => {
    const categoryId =
      marqueeCategory.find((v) => getData(v, ["id"]) === cId) || {};
    return getData(
      categoryId,
      ["name"],
      `${checkClass ? "delete" : "no data"}`
    );
  };
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchMarqueeList,
  //   setData: setMarqueeList,
  // });
  // RenderGetDataHook({
  //   lang: props.language,
  //   isMap: true,
  //   fetchData: fetchMarqueeAutoSet,
  //   setData: setMarqueeAutoSetData,
  // });
  // RenderGetDataHook({
  //   lang: props.language,
  //   isMap: true,
  //   fetchData: fetchCategoryList,
  //   setData: setCategoryList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMarqueeList({
        data: marqueeData,
        isLoading: false,
      });
      setMarqueeAutoSetData({
        data: {
          win: 50000,
          winrate: 500,
        },
        isLoading: true,
      });
      setCategoryList({
        data: categoryData,
        isLoading: true,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledMarquee theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="跑馬燈列表"
          subtitles={["標題", "啟用區間", "類別", "操作"]}
          Buttons={
            <>
              <Button
                type="threeFeature"
                title="即時大獎倍率"
                handler={() => setWinRateEdit(true)}
              />
              <Button
                type="feature"
                title="新增跑馬燈"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={marqueeList.isLoading}
          data={marqueeList.data}
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
                        type: "marqueeUpdate",
                        param: {
                          category_id: getData(v, ["category_id"]),
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          link_id: getData(v, ["link_id"]),
                          url: getData(v, ["url"]),
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
                          type: "marqueeDelete",
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
      </StyledMarquee>
      {winRateEdit && (
        <AutoSetEdit
          data={marqueeAutoSetData.data}
          closeHandler={() => setWinRateEdit(false)}
        />
      )}
      {edit.status && (
        <MarqueeEdit
          data={marqueeList.data}
          marqueeCategory={marqueeCategory}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
    </>
  );
};
