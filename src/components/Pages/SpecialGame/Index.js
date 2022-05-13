import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { statusFetchList } from "../../../constants/otherFuntions";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
import { setLinkSelector } from "../../../reducer/linkSelector";
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DndEdit } from "../../Modules/DndEdit";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { Image } from "../../Common/Image";
import { SpecialGameEdit } from "./SpecialGameEdit";
// api
// import {
//   fetchSpecialGameList,
//   RenderGetDataHook,
// } from "../../Common/fetchData";
import { specialGameData } from "../../../demoData";

const StyledSpecialGame = styled.div``;

export const SpecialGame = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [dndStatus, setDndStatus] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [specialGameList, setSpecialGameList] = useState({
    data: [],
    isLoading: true,
  });
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchSpecialGameList,
  //   setData: setSpecialGameList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSpecialGameList({
        data: specialGameData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  // link reset (fetch selector list type)
  useEffect(() => {
    dispatch(setLinkSelector({}));
  }, [dispatch]);
  return (
    <>
      <MultiLanguage />
      <StyledSpecialGame>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="爆款遊戲"
          subtitles={["標題", "橫幅圖", "操作"]}
          Buttons={
            <>
              <Button
                type="subFeature"
                title="變更順序"
                handler={() =>
                  statusFetchList(specialGameList.data).length > 0 &&
                  setDndStatus(true)
                }
              />
              <Button
                type="feature"
                title="新增活動"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={specialGameList.isLoading}
          data={specialGameList.data}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["title"])}</CompFloor2>
              <CompFloor2>
                <Image src={getData(v, ["pic", "flag"])} />
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
                        type: "specialGameUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          link_id: getData(v, ["link_id"]),
                          url: getData(v, ["url"]),
                          pic: {
                            flag: getData(v, ["pic", "flag", "img"]),
                            pc: getData(v, ["pic", "pc", "img"]),
                            mobile: getData(v, ["pic", "mobile", "img"]),
                            tablet: getData(v, ["pic", "tablet", "img"]),
                          },
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
                    handler={() =>
                      dispatch(
                        setConfirm({
                          status: true,
                          content: "確定刪除?",
                          type: "specialGameDelete",
                          param: {
                            id: [getData(v, ["id"])],
                          },
                        })
                      )
                    }
                  />
                )}
              </CompFloor2>
            </>
          )}
        />
      </StyledSpecialGame>
      {edit.status && (
        <SpecialGameEdit
          data={specialGameList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
      {dndStatus && (
        <DndEdit
          title="爆款遊戲"
          data={statusFetchList(specialGameList.data)}
          patchData={statusFetchList(specialGameList.data, "reverse")}
          dndId="special_game"
          type="specialGameSort"
          children={(data) => {
            return (
              <>
                <div className="dnd-title">{getData(data, ["title"])}</div>
                <Image src={getData(data, ["pic", "flag"])} />
              </>
            );
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </>
  );
};
