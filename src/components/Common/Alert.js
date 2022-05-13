import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { GoAlert } from "react-icons/go";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// listener
import { Keydown } from "../../common-lib/hooks";
// reducers
import { setAlert } from "../../reducer/props";
// component
import { Button } from "./Button";

const StyledAlert = styled.div`
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
  .btns {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const Alert = () => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  Keydown((e) => {
    if (e.keyCode === 13) {
      dispatch(
        setAlert({
          status: false,
          content: "",
        })
      );
    } else return;
  });
  return (
    <StyledAlert theme={props.theme}>
      <div className="background" />
      <div className="contain">
        <div className="content">
          <GoAlert className="svg-GoAlert" />
          <span>{props.alert.content}</span>
        </div>
        <div className="btns">
          <Button
            type={"feature"}
            title={"確定"}
            handler={() =>
              dispatch(
                setAlert({
                  status: false,
                  content: "",
                })
              )
            }
          />
        </div>
      </div>
    </StyledAlert>
  );
};
