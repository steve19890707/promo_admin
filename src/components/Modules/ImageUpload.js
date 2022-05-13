import { useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { BiImageAdd } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
// reducers
import { setPicture, setComboOneTypePicture } from "../../reducer/picture";
// component
import { LoaderSpinner } from "../Common/Loader";
// api
// import { fetchUpload } from "../Common/fetchData";

const StyledImageUpload = styled.div`
  width: 100%;
  margin-top: 65px;
  .container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }
  .uploade-loder {
    position: relative;
    width: 320px;
    height: 200px;
    border-radius: 5px;
    border: 1px dashed
      ${({ theme }) => getData(styles, [theme, "imageUpload", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "background"])};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .type {
    display: inline-block;
    padding: 12px 16px;
    border-radius: 5px 5px 0 0;
    background-color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "typeBoard"])};
  }
  label {
    position: relative;
    width: 320px;
    height: 200px;
    display: block;
    border-radius: 5px;
    border: 1px dashed
      ${({ theme }) => getData(styles, [theme, "imageUpload", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "background"])};
    z-index: 1;
    overflow: scroll;
    &:hover,
    &.isDrag {
      background-color: ${({ theme }) =>
        getData(styles, [theme, "imageUpload", "hoverBg"])};
      .re-update-title {
        opacity: 1;
      }
    }
  }
  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    cursor: pointer;
  }
  .current-img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 85%;
    transform: translate(-50%, -50%);
  }
  .re-update-title {
    opacity: 0;
    position: sticky;
    top: 155px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    z-index: 2;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 13px;
    color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "updateTip", "color"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "updateTip", "bg"])};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    &.isDrag {
      opacity: 1;
    }
  }
  .svg-BiImageAdd {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 95px;
    height: 95px;
    transform: translate(-50%, -50%);
    fill: ${({ theme }) => getData(styles, [theme, "imageUpload", "fill"])};
  }
  .update-title {
    position: absolute;
    width: 100%;
    text-align: center;
    color: ${({ theme }) => getData(styles, [theme, "imageUpload", "color"])};
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .operation {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 340px);
    box-sizing: border-box;
    padding-top: 20px;
  }
  .svg-FiAlertTriangle {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
  .operation .tips li {
    display: flex;
    font-size: 14px;
    margin-bottom: 10px;
    color: ${({ theme }) => getData(styles, [theme, "alert"])};
  }
  .operation button {
    padding: 10px 0;
    border-radius: 5px;
    max-width: 70px;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "imageUpload", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "imageUpload", "btnBg"])};
    cursor: pointer;
  }
`;
export const ImageUpload = ({
  className = "",
  singleImg = false,
  type = "",
  title = "",
  id = "",
  imgSize = "",
}) => {
  const props = useSelector((state) => state.props);
  // const picture = useSelector((state) => state.picture);
  const dispatch = useDispatch();
  const [isDrag, setIsDrag] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [imgError, setImgError] = useState(false);
  return (
    <StyledImageUpload theme={props.theme} className={className}>
      {title && <div className="type">{title}</div>}
      <div className="container">
        {isUploading ? (
          <div className="uploade-loder">
            <LoaderSpinner width={80} height={80} />
          </div>
        ) : (
          <label
            className={cx({ isDrag: isDrag })}
            htmlFor={`file-upload-${id}`}
            onDragOver={() => !isDrag && setIsDrag(true)}
            onDrop={() => setIsDrag(false)}
            onDragLeave={() => setIsDrag(false)}
          >
            {/* {getData(
              picture,
              singleImg ? ["pic", "img"] : ["comboPic", id, "img"]
            ) && !imgError ? (
              <>
                <img
                  onError={() => setImgError(true)}
                  className="current-img"
                  src={`${getData(
                    picture,
                    singleImg ? ["pic", "url"] : ["comboPic", id, "url"]
                  )}${getData(
                    picture,
                    singleImg ? ["pic", "img"] : ["comboPic", id, "img"]
                  )}`}
                  alt=""
                />
                <div className="re-update-title">點擊 或 拖曳更換檔案</div>
              </>
            ) : (
              <>
                <BiImageAdd className="svg-BiImageAdd" />
                <div className="update-title">點擊 或 將檔案拖曳到此處上傳</div>
              </>
            )} */}
            <>
              <BiImageAdd className="svg-BiImageAdd" />
              <div className="update-title">點擊 或 將檔案拖曳到此處上傳</div>
            </>
            <input
              id={`file-upload-${id}`}
              type="file"
              onChange={(e) => {
                setIsUploading(true);
                const imageData = new FormData();
                imageData.append("file", e.target.files[0]);
                imageData.append("type", type);
                // img upload
                // fetchUpload(imageData, (data = {}) => {
                //   setIsUploading(false);
                //   singleImg
                //     ? dispatch(
                //         setPicture({
                //           url: getData(data, ["url"]),
                //           img: getData(data, ["file_name"]),
                //         })
                //       )
                //     : dispatch(
                //         setComboOneTypePicture({
                //           url: getData(data, ["url"]),
                //           img: getData(data, ["file_name"]),
                //           type: id,
                //         })
                //       );
                // });
              }}
            />
          </label>
        )}
        <div className="operation">
          <ul className="tips">
            <li>
              <FiAlertTriangle className="svg-FiAlertTriangle" />
              <span>檔案大小不可超過1MB</span>
            </li>
            <li>
              <FiAlertTriangle className="svg-FiAlertTriangle" />
              <span>檔案格式限制為 .jpg .jpeg .png .gif</span>
            </li>
            {imgSize.length > 0 && (
              <li>
                <FiAlertTriangle className="svg-FiAlertTriangle" />
                <span>建議圖片尺寸:{imgSize}</span>
              </li>
            )}
          </ul>
          <button
            onClick={() =>
              singleImg
                ? dispatch(setPicture({}))
                : dispatch(
                    setComboOneTypePicture({
                      url: "",
                      img: "",
                      type: id,
                    })
                  )
            }
          >
            清除
          </button>
        </div>
      </div>
    </StyledImageUpload>
  );
};
