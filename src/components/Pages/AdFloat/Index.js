import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import cx from "classnames";
import moment from "moment";
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
import { AdFloatEdit } from "./AdFloatEdit";
// api
// import { fetchAdFloatList, RenderGetDataHook } from "../../Common/fetchData";
import { adfloatData } from "../../../demoData";

const StyledAdFloat = styled.div`
  .isBefore {
    color: ${({ theme }) => getData(styles, [theme, "tip", "otherColor"])};
  }
`;
export const AdFloat = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [dndStatus, setDndStatus] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [adFloatList, setAdFloatList] = useState({
    data: [],
    isLoading: true,
  });
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchAdFloatList,
  //   setData: setAdFloatList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAdFloatList({
        data: adfloatData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledAdFloat theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="浮動廣告"
          subtitles={["標題", "啟用區間", "縮圖", "操作"]}
          Buttons={
            <>
              <Button
                type="subFeature"
                title="變更順序"
                handler={() =>
                  statusFetchList(adFloatList.data).length > 0 &&
                  setDndStatus(true)
                }
              />
              <Button
                type="feature"
                title="新增浮動廣告"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={adFloatList.isLoading}
          data={adFloatList.data}
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
                <Image src={getData(v, ["pic"])} />
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
                        type: "adFloatUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          link_id: getData(v, ["link_id"]),
                          url: getData(v, ["url"]),
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
                          type: "adFloatDelete",
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
      </StyledAdFloat>
      {edit.status && (
        <AdFloatEdit
          data={adFloatList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
      {dndStatus && (
        <DndEdit
          title="浮動廣告"
          data={statusFetchList(adFloatList.data)}
          patchData={statusFetchList(adFloatList.data, "reverse")}
          dndId="adFloat"
          type="adFloatSort"
          children={(data) => {
            return (
              <>
                <div className="dnd-title">{getData(data, ["title"])}</div>
                <div
                  className={cx("dnd-time-range", {
                    isBefore: moment(getData(data, ["end_time"])).isBefore(
                      moment(new Date())
                    ),
                  })}
                >
                  {moment(getData(data, ["start_time"])).format("YYYY/MM/DD")}
                  {" - "}
                  {moment(getData(data, ["end_time"])).format("YYYY/MM/DD")}
                  {moment(getData(data, ["end_time"])).isBefore(
                    moment(new Date())
                  ) && <TipTool className="dnd-tip" content="已過期" />}
                </div>
                <Image src={getData(data, ["pic"])} />
              </>
            );
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </>
  );
};
