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
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DndEdit } from "../../Modules/DndEdit";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { TipTool } from "../../Common/TipTool";
import { Image } from "../../Common/Image";
import { RotateEdit } from "./RotateEdit";
// api
// import { fetchRotateList, RenderGetDataHook } from "../../Common/fetchData";
import { rotateData } from "../../../demoData";

const StyledRotateList = styled.div`
  .isBefore {
    color: ${({ theme }) => getData(styles, [theme, "tip", "otherColor"])};
  }
`;
export const RotateList = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [dndStatus, setDndStatus] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [rotateList, setRotateList] = useState({
    data: [],
    isLoading: true,
  });
  const picCaturefetch = (data) => {
    const pc = getData(data, ["pic", "pc", "img"]);
    const tablet = getData(data, ["pic", "tablet", "img"]);
    const mobile = getData(data, ["pic", "mobile", "img"]);
    if (pc) {
      return getData(data, ["pic", "pc"]);
    } else if (tablet) {
      return getData(data, ["pic", "tablet"]);
    } else if (mobile) {
      return getData(data, ["pic", "mobile"]);
    } else return "";
  };
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchRotateList,
  //   setData: setRotateList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotateList({
        data: rotateData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledRotateList theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="輪播圖列表"
          subtitles={["標題", "啟用區間", "縮圖", "操作"]}
          Buttons={
            <>
              <Button
                type="subFeature"
                title="變更順序"
                handler={() =>
                  statusFetchList(rotateList.data).length > 0 &&
                  setDndStatus(true)
                }
              />
              <Button
                type="feature"
                title="新增輪播圖"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={rotateList.isLoading}
          data={rotateList.data}
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
              <CompFloor2>
                <Image src={picCaturefetch(v)} />
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
                        type: "rotateUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          link_id: getData(v, ["link_id"]),
                          url: getData(v, ["url"]),
                          pic: {
                            pc: getData(v, ["pic", "pc", "img"]),
                            mobile: getData(v, ["pic", "mobile", "img"]),
                            tablet: getData(v, ["pic", "tablet", "img"]),
                          },
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
                          type: "rotateDelete",
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
      </StyledRotateList>
      {edit.status && (
        <RotateEdit
          data={rotateList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
      {dndStatus && (
        <DndEdit
          title="輪播圖"
          data={statusFetchList(rotateList.data)}
          patchData={statusFetchList(rotateList.data, "reverse")}
          dndId="rotate"
          type="rotateSort"
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
                <Image src={picCaturefetch(data)} />
              </>
            );
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </>
  );
};
