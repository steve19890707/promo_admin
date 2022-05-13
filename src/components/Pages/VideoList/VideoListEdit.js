import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../../constants/styles";
import { getData } from "../../../common-lib/lib";
import { IoMdAlert } from "react-icons/io";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setTitle, setApiProps } from "../../../reducer/apiProps";
import { setAgentSite } from "../../../reducer/agentSite";
import { setPicture } from "../../../reducer/picture";
import {
  setVideo,
  setVideoInternal,
  setVideoUrl,
} from "../../../reducer/video";
// component
import { PageTag } from "../../Common/PageTag";
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";
import { SwitchKit } from "../../Common/Switch";
import { ImageUpload } from "../../Modules/ImageUpload";
import { VideoUpload } from "../../Modules/VideoUpload";
import { AgentSite } from "../../Modules/AgentSite";

const StyledVideoListEdit = styled(EditPopup)`
  .internal-status {
    margin-top: 65px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
  }
  .margin-remove {
    margin: 0;
  }
  .upload-tip {
    display: inline-flex;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
    color: ${({ theme }) => getData(styles, [theme, "alert"])};
    .svg-IoMdAlert {
      width: 20px;
      height: 20px;
      margin: 0 6px;
    }
  }
  .preview-btn {
    padding: 10px 14px;
    border-radius: 5px;
    margin-left: 15px;
    cursor: pointer;
    color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
    background-color: ${({ theme }) => getData(styles, [theme, "subFeature"])};
  }
  .video-link-iframe {
    position: relative;
    width: 450px;
    height: 300px;
    margin-top: 30px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) =>
      getData(styles, [theme, "videoListEdit", "ifram", "bg"])};
    iframe {
      width: 100%;
      height: 100%;
    }
    .iframe-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${({ theme }) =>
        getData(styles, [theme, "videoListEdit", "ifram", "color"])};
    }
  }
`;

export const VideoListEdit = ({ data = [], closeHandler = noop }) => {
  const props = useSelector((state) => state.props);
  const apiProps = useSelector((state) => state.apiProps);
  const edit = useSelector((state) => state.edit);
  const agentSite = useSelector((state) => state.agentSite.list);
  const picture = useSelector((state) => state.picture);
  const video = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const [otherLinkPreview, setOtherLinkPreview] = useState(false);
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const checkValueErrorStatus = (type = "") => {
    const titleValueCheck = apiProps.title.length === 0;
    const videoImgValueCheck = !video.internal
      ? false
      : picture.pic.img.length === 0;
    const isNeedIncludeProtocol = video.internal
      ? false
      : !/^(https?:\/\/)/.test(video.url.link);
    const videoValueCheck =
      video.url.link.length === 0 || isNeedIncludeProtocol;
    const totalcheck =
      !titleValueCheck && !videoImgValueCheck && !videoValueCheck;
    switch (type) {
      case "title":
        return titleValueCheck;
      case "video_img":
        return videoImgValueCheck;
      case "video":
        return videoValueCheck;
      default:
        return !totalcheck;
    }
  };
  useEffect(() => {
    if (edit.type !== "add") {
      dispatch(
        setApiProps({
          title: getData(currentData, ["title"]),
          checked: getData(currentData, ["status"]),
        })
      );
      dispatch(setPicture(getData(currentData, ["pic"], {})));
      dispatch(setAgentSite(getData(currentData, ["site"], [])));
      dispatch(
        setVideo({
          internal: getData(currentData, ["internal"]),
          url: {
            domain: getData(currentData, ["url", "domain"]),
            link: getData(currentData, ["url", "link"]),
          },
        })
      );
      setOtherLinkPreview(!getData(currentData, ["internal"]));
    }
  }, [edit.type, dispatch, currentData]);
  const fetchLinkPreview = (preview = "") => {
    const isYoutube = !!~preview.indexOf("https://www.youtube.com/");
    if (isYoutube) {
      const linkSplit = preview.split("https://www.youtube.com/");
      const isEmbed = !!~preview.indexOf("/embed/");
      return isEmbed
        ? preview
        : `https://www.youtube.com/embed/${linkSplit[1].split("watch?v=")[1]}`;
    }
  };
  return (
    <StyledVideoListEdit
      theme={props.theme}
      editedBy={getData(currentData || "", ["edited_by"])}
      title={edit.type === "add" ? "新增影片" : "編輯影片"}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "videoCreate" : "videoUpdate",
            // api create/update data
            param: {
              ...paramId,
              lang: props.language,
              title: apiProps.title,
              status: apiProps.checked,
              internal: video.internal,
              pic: video.internal ? picture.pic.img : "none",
              url: video.url.link,
              site: agentSite,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <SettingSquare title={"狀態"} Comp={() => <SwitchKit />} />
      <SettingSquare
        title={"標題"}
        isTip={checkValueErrorStatus("title")}
        tipContent={"不可為空"}
        Comp={() => (
          <input
            className="input"
            value={apiProps.title}
            disabled={props.confirm.status}
            placeholder="請輸入標題"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        )}
      />
      <div className="internal-status">
        <div className="caption">使用：</div>
        <PageTag
          tagName="上傳影片"
          isSelected={video.internal}
          handler={() => {
            dispatch(setVideoUrl({}));
            dispatch(setPicture({}));
            dispatch(setVideoInternal(true));
            setOtherLinkPreview(false);
          }}
        />
        <PageTag
          tagName="其他影片連結"
          isSelected={!video.internal}
          handler={() => {
            dispatch(setVideoUrl({}));
            dispatch(setPicture({}));
            dispatch(setVideoInternal(false));
            setOtherLinkPreview(false);
          }}
        />
      </div>
      {video.internal ? (
        <>
          <VideoUpload className="margin-remove" id={edit.id} />
          {checkValueErrorStatus("video") && (
            <div className="upload-tip">
              <IoMdAlert className="svg-IoMdAlert" />
              <span>影片 不可為空</span>
            </div>
          )}
        </>
      ) : (
        <>
          <SettingSquare
            title={"其他影片連結"}
            isTip={checkValueErrorStatus("video")}
            tipContent={
              !/^(https?:\/\/)/.test(video.url.link) &&
              video.url.link.length > 0
                ? "開頭需為http(s)://"
                : "不可為空"
            }
            Comp={() => (
              <>
                <input
                  className="input"
                  value={video.url.link}
                  disabled={props.confirm.status}
                  placeholder="請輸入連結"
                  onChange={(e) => {
                    setOtherLinkPreview(false);
                    dispatch(
                      setVideoUrl({
                        domain: "",
                        link: e.target.value,
                      })
                    );
                  }}
                />
                {!checkValueErrorStatus("video") && (
                  <button
                    className="preview-btn"
                    onClick={() => setOtherLinkPreview(true)}
                  >
                    連結預覽
                  </button>
                )}
              </>
            )}
          />
          <div className="video-link-iframe">
            {otherLinkPreview ? (
              <iframe
                src={fetchLinkPreview(video.url.link)}
                title="video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="iframe-title">其他影片連結 預覽</div>
            )}
          </div>
        </>
      )}
      {video.internal && (
        <>
          <ImageUpload
            singleImg={true}
            type="video_img"
            title="影片封面圖片"
            id="flag"
          />
          {checkValueErrorStatus("video_img") && (
            <div className="upload-tip">
              <IoMdAlert className="svg-IoMdAlert" />
              <span>影片封面圖片 不可為空</span>
            </div>
          )}
        </>
      )}
      <AgentSite />
    </StyledVideoListEdit>
  );
};
