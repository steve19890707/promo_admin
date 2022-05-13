import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import { hiddenUrls } from "../../../constants/hiddenUrls";
import { RiUserSearchFill } from "react-icons/ri";
// reducers
import { setEdit } from "../../../reducer/edit";
import { setEditReset } from "../../../reducer/edit";
// component
import { Caption } from "../../Modules/Caption";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { UserManagementEdit } from "./UserManagementEdit";
// api
// import { fetchAdminList, RenderGetDataHook } from "../../Common/fetchData";

const StyledUserManagement = styled.div`
  .user-management-caption .caption-list {
    justify-content: flex-end;
  }
  .account-search {
    display: flex;
    align-items: center;
    .svg-RiUserSearchFill {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
    input {
      width: 165px;
      box-sizing: border-box;
      padding: 10px 12px;
      border-radius: 6px;
    }
  }
`;

export const UserManagement = () => {
  const props = useSelector((state) => state.props);
  const userInfo = useSelector((state) => state.userInfo);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [adminList, setAdminList] = useState({
    data: [],
    isLoading: true,
  });
  const [renderData, setRenderData] = useState([]);
  const filterAccountSearch = (value = "") => {
    const update = adminList.data.filter(
      (v) =>
        !!~getData(v, ["account"]).toLowerCase().indexOf(value.toLowerCase())
    );
    const isEmpty = value.length === 0;
    setRenderData(isEmpty ? adminList.data : update);
  };
  // RenderGetDataHook({
  //   fetchData: fetchAdminList,
  //   setData: setAdminList,
  //   isNeedReRender: true,
  //   setReRenderData: setRenderData,
  //   isPermission: true,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAdminList({
        data: [
          {
            id: 1,
            account: "steve1",
            dept: "develop",
            avatar_url: "https://+/yuueXm2U.gif",
            level: 2,
            edited_by: "system",
          },
          {
            id: 2,
            account: "steve2",
            dept: "develop",
            avatar_url: "https://+/yuueXm2U.gif",
            level: 2,
            edited_by: "system",
          },
        ],
        isLoading: false,
      });
      setRenderData([
        {
          id: 1,
          account: "steve1",
          dept: "develop",
          avatar_url: "https://+/yuueXm2U.gif",
          level: 2,
          edited_by: "system",
        },
        {
          id: 2,
          account: "steve2",
          dept: "develop",
          avatar_url: "https://+/yuueXm2U.gif",
          level: 2,
          edited_by: "system",
        },
      ]);
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  const showLevel = (level = Number()) => {
    switch (level) {
      case 0:
        return "一般權限";
      case 1:
        return "進階權限";
      case 2:
        return "最高權限";
      default:
        return "一般權限";
    }
  };
  return (
    <StyledUserManagement theme={props.theme}>
      <Caption
        className="user-management-caption"
        title="使用者管理"
        Buttons={
          <label className="account-search">
            <RiUserSearchFill className="svg-RiUserSearchFill" />
            <span>帳號搜尋：</span>
            <input
              placeholder="請輸入搜尋帳號"
              onChange={(e) => {
                const value = e.target.value;
                filterAccountSearch(value);
                userInfo.department === "RD3" && hiddenUrls(value, dispatch);
              }}
            />
          </label>
        }
        subtitles={["帳號", "部門", "權限", "操作"]}
      />
      <DataLoaded
        isLoading={adminList.isLoading}
        statusNone={true}
        data={renderData}
        children={(v) => (
          <>
            <CompFloor2>{getData(v, ["account"])}</CompFloor2>
            <CompFloor2>{getData(v, ["dept"])}</CompFloor2>
            <CompFloor2>{showLevel(getData(v, ["level"]))}</CompFloor2>
            <CompFloor2 className="btns">
              <Button
                type="feature"
                title="編輯"
                handler={() => dispatch(setEdit(getData(v, ["id"])))}
              />
            </CompFloor2>
          </>
        )}
      />
      {edit.status && (
        <UserManagementEdit
          data={renderData}
          closeHandler={() => dispatch(setEditReset())}
        />
      )}
    </StyledUserManagement>
  );
};
