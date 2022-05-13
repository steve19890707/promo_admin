import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GoAlert } from "react-icons/go";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// listener
import { Keydown } from "../../common-lib/hooks";
// reducers
import { setConfirm } from "../../reducer/props";
// fetch
// import {
//   fetchLogout,
//   fetchRotateCreate,
//   fetchRotateUpdate,
//   fetchRotateSort,
//   fetchRotateDelete,
//   fetchActiveCreate,
//   fetchActiveUpdate,
//   fetchActiveDelete,
//   fetchSpecialGameCreate,
//   fetchSpecialGameUpdate,
//   fetchSpecialGameSort,
//   fetchSpecialGameDelete,
//   fetchVideoCreate,
//   fetchVideoUpdate,
//   fetchVideoSort,
//   fetchVideoDelete,
//   fetchHtmlUpdate,
//   fetchMaintainUpdate,
//   fetchAdFloatCreate,
//   fetchAdFloatUpdate,
//   fetchAdFloatSort,
//   fetchAdFloatDelete,
//   fetchAdPopupCreate,
//   fetchAdPopupUpdate,
//   fetchAdPopupDelete,
//   fetchAdminUpdate,
//   fetchCategoryCreate,
//   fetchCategoryUpdate,
//   fetchCategoryDelete,
//   fetchMarqueeCreate,
//   fetchMarqueeUpdate,
//   fetchMarqueeDelete,
//   fetchMarqueeAutoSetUpdate,
//   fetchNewsCreate,
//   fetchNewsUpdate,
//   fetchNewsSort,
//   fetchNewsDelete,
// } from "../Common/fetchData";
// component
import { Button } from "./Button";

const StyledConfirm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  .background {
    ${getData(styles, ["common", "popupBg"])}
  }
  .contain {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
    border-radius: 5px;
    box-sizing: border-box;
    padding: 25px;
    min-width: 300px;
    max-width: 500px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    animation: popup 0.3s;
  }
  .content {
    display: flex;
    align-items: center;
    span {
      display: block;
      width: calc(100% - 35px);
    }
    .svg-GoAlert {
      width: 20px;
      height: 20px;
      fill: ${({ theme }) => getData(styles, [theme, "alert"])};
      margin-right: 15px;
    }
  }
  .btn-area {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const Confirm = () => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  const confirmTypeFetch = (type = "") => {
    switch (type) {
      // case "logout":
      //   fetchLogout();
      //   break;
      case "changepassword":
        console.log("change password");
        break;
      // case "rotateCreate":
      //   fetchRotateCreate(props.confirm.param);
      //   break;
      // case "rotateUpdate":
      //   fetchRotateUpdate(props.confirm.param);
      //   break;
      // case "rotateSort":
      //   fetchRotateSort(props.confirm.param);
      //   break;
      // case "rotateDelete":
      //   fetchRotateDelete(props.confirm.param);
      //   break;
      // case "activeCreate":
      //   fetchActiveCreate(props.confirm.param);
      //   break;
      // case "activeUpdate":
      //   fetchActiveUpdate(props.confirm.param);
      //   break;
      // case "activeDelete":
      //   fetchActiveDelete(props.confirm.param);
      //   break;
      // case "specialGameCreate":
      //   fetchSpecialGameCreate(props.confirm.param);
      //   break;
      // case "specialGameUpdate":
      //   fetchSpecialGameUpdate(props.confirm.param);
      //   break;
      // case "specialGameSort":
      //   fetchSpecialGameSort(props.confirm.param);
      //   break;
      // case "specialGameDelete":
      //   fetchSpecialGameDelete(props.confirm.param);
      //   break;
      // case "videoCreate":
      //   fetchVideoCreate(props.confirm.param);
      //   break;
      // case "videoUpdate":
      //   fetchVideoUpdate(props.confirm.param);
      //   break;
      // case "videoSort":
      //   fetchVideoSort(props.confirm.param);
      //   break;
      // case "videoDelete":
      //   fetchVideoDelete(props.confirm.param);
      //   break;
      // case "HtmlUpdate":
      //   fetchHtmlUpdate(props.confirm.param);
      //   break;
      case "HtmlLeaveState":
        props.confirm.param();
        break;
      // case "promotionMaintain":
      //   fetchMaintainUpdate(props.confirm.param);
      //   break;
      // case "adFloatCreate":
      //   fetchAdFloatCreate(props.confirm.param);
      //   break;
      // case "adFloatUpdate":
      //   fetchAdFloatUpdate(props.confirm.param);
      //   break;
      // case "adFloatSort":
      //   fetchAdFloatSort(props.confirm.param);
      //   break;
      // case "adFloatDelete":
      //   fetchAdFloatDelete(props.confirm.param);
      //   break;
      // case "adPopupCreate":
      //   fetchAdPopupCreate(props.confirm.param);
      //   break;
      // case "adPopupUpdate":
      //   fetchAdPopupUpdate(props.confirm.param);
      //   break;
      // case "adPopupDelete":
      //   fetchAdPopupDelete(props.confirm.param);
      //   break;
      // case "userManagementUpdate":
      //   fetchAdminUpdate(props.confirm.param);
      //   break;
      // case "categoryCreate":
      //   fetchCategoryCreate(props.confirm.param);
      //   break;
      // case "categoryUpdate":
      //   fetchCategoryUpdate(props.confirm.param);
      //   break;
      // case "categoryDelete":
      //   fetchCategoryDelete(props.confirm.param);
      //   break;
      // case "marqueeCreate":
      //   fetchMarqueeCreate(props.confirm.param);
      //   break;
      // case "marqueeUpdate":
      //   fetchMarqueeUpdate(props.confirm.param);
      //   break;
      // case "marqueeDelete":
      //   fetchMarqueeDelete(props.confirm.param);
      //   break;
      // case "marqueeAutoSetUpdate":
      //   fetchMarqueeAutoSetUpdate(props.confirm.param);
      //   break;
      // case "newsCreate":
      //   fetchNewsCreate(props.confirm.param);
      //   break;
      // case "newsUpdate":
      //   fetchNewsUpdate(props.confirm.param);
      //   break;
      // case "newsSort":
      //   fetchNewsSort(props.confirm.param);
      //   break;
      // case "newsDelete":
      //   fetchNewsDelete(props.confirm.param);
      //   break;
      case "newsEditClose":
        props.confirm.param();
        break;
      default:
        break;
    }
  };
  Keydown((e) => {
    const enter = e.keyCode === 13;
    const esc = e.keyCode === 27;
    if (enter || esc) {
      enter && confirmTypeFetch(props.confirm.type);
      dispatch(
        setConfirm({
          status: false,
          content: "",
          type: "",
          param: "",
        })
      );
    } else return;
  });
  return (
    <StyledConfirm theme={props.theme}>
      <div className="background" />
      <div className="contain">
        <div className="content">
          <GoAlert className="svg-GoAlert" />
          <span>{props.confirm.content}</span>
        </div>
        <div className="btn-area">
          <Button
            type={"feature"}
            title={"確定"}
            handler={() => {
              confirmTypeFetch(props.confirm.type);
              dispatch(
                setConfirm({
                  status: false,
                  content: "",
                  type: "",
                  param: "",
                })
              );
            }}
          />
          <Button
            type={"alert"}
            title={"取消"}
            handler={() =>
              dispatch(
                setConfirm({
                  status: false,
                  content: "",
                  type: "",
                  param: "",
                })
              )
            }
          />
        </div>
      </div>
    </StyledConfirm>
  );
};
