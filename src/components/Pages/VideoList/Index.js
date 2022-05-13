import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { statusFetchList } from "../../../constants/otherFuntions";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm, setAlert } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DndEdit } from "../../Modules/DndEdit";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { Image } from "../../Common/Image";
import { OutsideLink } from "../../Common/OutsideLink";
import { VideoListEdit } from "./VideoListEdit";
// api
// import { fetchVideoList, RenderGetDataHook } from "../../Common/fetchData";
import { videoData } from "../../../demoData";

const StyledVideoList = styled.div``;

export const VideoList = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [dndStatus, setDndStatus] = useState(false);
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [videoList, setVideoList] = useState({
    data: [],
    isLoading: true,
  });
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchVideoList,
  //   setData: setVideoList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoList({
        data: videoData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledVideoList>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="影片列表"
          subtitles={["標題", "封面圖片/外部連結", "操作"]}
          Buttons={
            <>
              <Button
                type="subFeature"
                title="變更順序"
                handler={() =>
                  statusFetchList(videoList.data).length > 0 &&
                  setDndStatus(true)
                }
              />
              <Button
                type="feature"
                title="新增影片"
                handler={() => dispatch(setAdd())}
              />
            </>
          }
        />
        <DataLoaded
          isLoading={videoList.isLoading}
          data={videoList.data}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["title"])}</CompFloor2>
              <CompFloor2>
                {getData(v, ["internal"]) ? (
                  <Image src={getData(v, ["pic"])} />
                ) : (
                  <OutsideLink link={getData(v, ["url", "link"])} />
                )}
              </CompFloor2>
              <CompFloor2 className="btns">
                <Button
                  type="copyFeature"
                  title="複製網址"
                  handler={() => {
                    navigator.clipboard.writeText(
                      `${
                        getData(v, ["internal"])
                          ? getData(v, ["url", "domain"])
                          : ""
                      }${getData(v, ["url", "link"])}`
                    );
                    dispatch(
                      setAlert({
                        status: true,
                        content: "複製成功!",
                      })
                    );
                  }}
                />
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
                        type: "videoUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          internal: getData(v, ["internal"]),
                          pic: getData(v, ["pic", "img"]),
                          url: getData(v, ["url", "link"]),
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
                          type: "videoDelete",
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
      </StyledVideoList>
      {edit.status && (
        <VideoListEdit
          data={videoList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
      {dndStatus && (
        <DndEdit
          title="影片列表"
          data={statusFetchList(videoList.data)}
          patchData={statusFetchList(videoList.data, "reverse")}
          dndId="video_list"
          type="videoSort"
          children={(data) => {
            return (
              <>
                <div className="dnd-title">{getData(data, ["title"])}</div>
                {getData(data, ["internal"]) ? (
                  <Image src={getData(data, ["pic"])} />
                ) : (
                  <OutsideLink link={getData(data, ["url", "link"])} />
                )}
              </>
            );
          }}
          closeHandler={() => setDndStatus(false)}
        />
      )}
    </>
  );
};
