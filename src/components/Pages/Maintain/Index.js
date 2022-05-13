import { useState, useEffect } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import { GiCheckedShield } from "react-icons/gi";
// reducers
import { setConfirm } from "../../../reducer/props";
// listener
import { Keydown } from "../../../common-lib/hooks";
// component
import { LoaderSpinner } from "../../Common/Loader";
// api
// import { fetchMaintainList, RenderGetDataHook } from "../../Common/fetchData";

const StyledMaintain = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${({ theme }) => getData(styles, [theme, "mainColor"])};
  .maintain-title {
    margin-bottom: 25px;
    span {
      font-size: 22px;
      font-weight: bold;
    }
  }
  .maintain-switch {
    display: flex;
    align-items: center;
  }
  .svg-GiCheckedShield {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .maintain-switch .caption {
    font-size: 18px;
    margin-right: 20px;
  }
  .edited-by {
    margin-left: 20px;
    color: ${getData(styles, ["common", "editedBy"])};
  }
`;

const CreateMaintainSwitch = ({
  title = "",
  isLoading = true,
  status = false,
  param = {},
  editByComp,
}) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  return (
    <div className="maintain-switch">
      <GiCheckedShield className="svg-GiCheckedShield" />
      <div className="caption">{title}</div>
      {isLoading ? (
        <LoaderSpinner width="32" height="32" />
      ) : (
        <Switch
          onColor={getData(styles, [props.theme, "switchStatus"])}
          onChange={() => {
            dispatch(
              setConfirm({
                status: true,
                content: "確定要開啟/關閉維護?",
                type: "promotionMaintain",
                param: { ...param },
              })
            );
          }}
          checked={status}
        />
      )}
      {editByComp()}
    </div>
  );
};
export const Maintain = () => {
  const props = useSelector((state) => state.props);
  const [maintainData, setMaintainData] = useState({
    data: [],
    isLoading: true,
  });
  const [editedByStatus, setEditedByStatus] = useState(false);
  // PromotionMaintain
  const getPromotionMaintain =
    maintainData.data.find(
      (v) => getData(v, ["title"]) === "PromotionMaintain"
    ) || [];
  Keydown((e) => {
    const checkEdited = e.keyCode === 17;
    if (checkEdited) {
      setEditedByStatus((prev) => !prev);
    }
  });
  // RenderGetDataHook({
  //   fetchData: fetchMaintainList,
  //   setData: setMaintainData,
  //   isPermission: true,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMaintainData({
        data: [
          {
            title: "PromotionMaintain",
            status: false,
            edited_by: "Neil",
            updated_at: "2022-01-12T03:47:50-04:00",
          },
        ],
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <StyledMaintain theme={props.theme}>
      <div className="maintain-title">
        <span>維護開關</span>
      </div>
      <CreateMaintainSwitch
        title="前台(promotion)維護"
        isLoading={maintainData.isLoading}
        status={getData(getPromotionMaintain, ["status"])}
        param={{
          status: !getData(getPromotionMaintain, ["status"]),
          title: getData(getPromotionMaintain, ["title"]),
        }}
        editByComp={() => {
          return (
            <>
              {editedByStatus && (
                <div className="edited-by">
                  前次編輯人員:
                  {getData(getPromotionMaintain, ["edited_by"])}
                </div>
              )}
            </>
          );
        }}
      />
    </StyledMaintain>
  );
};
