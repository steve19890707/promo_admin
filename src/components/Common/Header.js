import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { RiCollageFill } from "react-icons/ri";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// reducers
import { setTheme, setChangePwd, setConfirm } from "../../reducer/props";
// component
import { Button } from "./Button";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 800px;
  height: 80px;
  background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px;
  z-index: 2;
  .area {
    display: flex;
    align-items: center;
  }
  .theme {
    margin-left: 15px;
    display: flex;
    align-items: center;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    span {
      display: block;
      height: 100%;
      width: 50%;
      font-size: 13px;
      padding: 8px 12px;
      background-color: ${({ theme }) => getData(styles, [theme, "bodyColor"])};
      &.selected {
        color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
        background-color: ${({ theme }) => getData(styles, [theme, "feature"])};
      }
      cursor: pointer;
    }
  }
  .user {
    margin-right: 15px;
  }
  .user-avatar {
    width: 32px;
    height: 32px;
    margin-right: 15px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => getData(styles, [theme, "feature"])};
  }
  .svg-RiCollageFill {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => getData(styles, [theme, "feature"])};
    margin-right: 12px;
  }
`;
export const Header = () => {
  const props = useSelector((state) => state.props);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  return (
    <>
      <StyledHeader theme={props.theme}>
        <div className="area">
          <RiCollageFill className="svg-RiCollageFill" />
          <div className="text-style">推廣網後台管理</div>
          <div className="theme">
            <span
              className={cx({ selected: props.theme === "light" })}
              onClick={() => dispatch(setTheme("light"))}
            >
              LIGHT
            </span>
            <span
              className={cx({ selected: props.theme === "dark" })}
              onClick={() => dispatch(setTheme("dark"))}
            >
              DARK
            </span>
          </div>
        </div>
        <div className="area">
          <div className="user">Welcome, {userInfo.account}</div>
          {userInfo.avatar_url && (
            <img className="user-avatar" alt="" src={userInfo.avatar_url} />
          )}
          <Button
            type={"feature"}
            title={"修改密碼"}
            handler={() => dispatch(setChangePwd(true))}
          />
          <Button
            type={"alert"}
            title={"登出"}
            handler={() =>
              dispatch(
                setConfirm({
                  status: true,
                  content: "確定登出?",
                  type: "logout",
                  param: "",
                })
              )
            }
          />
        </div>
      </StyledHeader>
    </>
  );
};
