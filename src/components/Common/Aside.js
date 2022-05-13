import { useEffect, useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { RiFocus3Line } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
// reducers
import { setLanguage } from "../../reducer/props";
// api
// import { fetchMenuList } from "../Common/fetchData";
import { menu } from "../../demoData";

const StyledAside = styled.div`
  position: fixed;
  top: 82px;
  left: 0;
  z-index: 2;
  width: 250px;
  height: calc(100vh - 82px);
  background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow: auto;
  .aside-contain {
    min-height: 600px;
  }
  .route-style {
    display: flex;
    align-items: center;
    padding: 24px 24px 24px 30px;
    box-sizing: border-box;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 1px;
    .svg-RiFocus3Line {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      fill: ${({ theme }) => getData(styles, [theme, "btnColor"])};
    }
    .svg-MdManageAccounts {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }
    &.is-route {
      color: ${({ theme }) => getData(styles, [theme, "btnColor"])};
      background-color: ${({ theme }) => getData(styles, [theme, "feature"])};
      pointer-events: none;
      .svg-MdManageAccounts {
        fill: ${({ theme }) => getData(styles, [theme, "btnColor"])};
      }
    }
  }
`;

export const Aside = ({ pathname }) => {
  const props = useSelector((state) => state.props);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [asideList, setData] = useState({
    isLoading: true,
    data: {},
  });
  useEffect(() => {
    // fetchMenuList((data = {}) =>
    //   setData({
    //     isLoading: false,
    //     data: data,
    //   })
    // );
    const timeout = setTimeout(() => {
      setData({
        data: menu,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  const RouteList = ({ data, isManagement = false }) => {
    return data.map((v, k) => {
      const isRoute = pathname === `/${getData(v, ["route"])}`;
      return (
        <Link
          className={cx("route-style", {
            "is-route": isRoute,
          })}
          to={getData(v, ["route"])}
          onClick={() => {
            dispatch(setLanguage("cn"));
            localStorage.setItem("tagSelected", "open");
          }}
          key={k}
        >
          {isRoute && <RiFocus3Line className="svg-RiFocus3Line" />}
          <span>{getData(v, ["name"])}</span>
          {isManagement && (
            <MdManageAccounts className="svg-MdManageAccounts" />
          )}
        </Link>
      );
    });
  };

  return (
    <StyledAside theme={props.theme}>
      <div className="aside-contain">
        {!asideList.isLoading && (
          <RouteList data={getData(asideList.data, ["editor"], [])} />
        )}
        {!asideList.isLoading && userInfo.level === 2 && (
          <RouteList
            data={getData(asideList.data, ["management"], [])}
            isManagement={true}
          />
        )}
      </div>
    </StyledAside>
  );
};
