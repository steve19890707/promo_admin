// import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { GrImage } from "react-icons/gr";
import { FaQuestion } from "react-icons/fa";

const StyledImage = styled.div`
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    &.isLoad {
      opacity: 0;
    }
  }
  .img-not-found {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed
      ${({ theme }) => getData(styles, [theme, "image", "color"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "image", "background"])};
    .svgs {
      display: flex;
    }
    .svg-GrImage {
      width: 40px;
      height: 40px;
      path {
        stroke: ${({ theme }) => getData(styles, [theme, "image", "color"])};
      }
    }
    .svg-FaQuestion {
      width: 18px;
      height: 18px;
      fill: ${({ theme }) => getData(styles, [theme, "image", "color"])};
    }
    p {
      color: ${({ theme }) => getData(styles, [theme, "image", "color"])};
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;

export const Image = ({
  classname = "",
  src = {},
  width = 200,
  height = 75,
}) => {
  const props = useSelector((state) => state.props);
  // const [imgError, setImgError] = useState(false);
  // const { url = "", img = "" } = src;
  // useEffect(() => {
  //   setImgError(false);
  // }, [url, img]);
  return (
    <StyledImage
      theme={props.theme}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* {img && !imgError ? (
        <img
          onError={() => setImgError(true)}
          className={classname}
          src={`${url}${img}`}
          alt=""
        />
      ) : (
        <div className="img-not-found">
          <div className="svgs">
            <GrImage className="svg-GrImage" />
            <FaQuestion className="svg-FaQuestion" />
          </div>
          <p>IMAGE NOT FOUND.</p>
        </div>
      )} */}
      <div className="img-not-found">
        <div className="svgs">
          <GrImage className="svg-GrImage" />
          <FaQuestion className="svg-FaQuestion" />
        </div>
        <p>IMAGE NOT FOUND.</p>
      </div>
    </StyledImage>
  );
};
