import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import Hls from "hls.js";
import { LoaderSpinner } from "../Common/Loader";

const StyledHLSVideo = styled.video``;

const StyledFatalErrorTip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "videoTipColor"])};
    margin-right: 10px;
  }
`;
export const HLSVideo = ({ id, src, isControls = false, className }) => {
  const props = useSelector((state) => state.props);
  const videoRef = useRef();
  const [videoFatalError, setVideoFatalError] = useState(false);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (Hls.isSupported() && src && !videoFatalError) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setVideoFatalError(true);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              // cannot recover
              hls.destroy();
              break;
          }
        }
      });
    }
  }, [src, videoFatalError]);
  useEffect(() => {
    if (videoFatalError) {
      const timeout = setTimeout(() => {
        setVideoFatalError(false);
        return () => clearTimeout(timeout);
      }, 8000);
    }
  }, [videoFatalError]);
  // for un supported
  const VideoComp = useCallback(() => {
    return src ? (
      Hls.isSupported() ? (
        <StyledHLSVideo
          id={`video-${id}`}
          className={className}
          ref={videoRef}
          controls={isControls}
          crossOrigin="anonymous"
          alt=""
        />
      ) : (
        <StyledHLSVideo
          id={`video-${id}`}
          src={src}
          controls={isControls}
          crossOrigin="anonymous"
          alt=""
        />
      )
    ) : (
      <></>
    );
  }, [id, className, src, isControls]);
  const FatalErrorTip = () => {
    return (
      <StyledFatalErrorTip theme={props.theme}>
        <span>影片編碼中... 請稍候</span>
        <LoaderSpinner type="Puff" width={40} height={40} />
      </StyledFatalErrorTip>
    );
  };
  return videoFatalError ? <FatalErrorTip /> : <VideoComp />;
};
