import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
import { reduxDataReset } from "../../Common/reduxDataReset";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { Button } from "../../Common/Button";
import { Image } from "../../Common/Image";
import { AdPopupEdit } from "./AdPopupEdit";
// api
// import { fetchAdPopupList, RenderGetDataHook } from "../../Common/fetchData";
import { adpopData } from "../../../demoData";

const StyledAdPopup = styled.div`
  .isBefore {
    color: ${({ theme }) => getData(styles, [theme, "tip", "otherColor"])};
  }
`;
export const AdPopup = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("tagSelected")
  );
  const [adPopupList, setAdPopupList] = useState({
    data: [],
    isLoading: true,
  });
  // RenderGetDataHook({
  //   lang: props.language,
  //   fetchData: fetchAdPopupList,
  //   setData: setAdPopupList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAdPopupList({
        data: adpopData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledAdPopup theme={props.theme}>
        <Caption
          tag={{
            selected: tagSelected,
            setSelected: setTagSelected,
          }}
          title="彈窗廣告"
          subtitles={["標題", "縮圖", "操作"]}
          Buttons={
            <Button
              type="feature"
              title="新增彈窗廣告"
              handler={() => dispatch(setAdd())}
            />
          }
        />
        <DataLoaded
          isLoading={adPopupList.isLoading}
          data={adPopupList.data}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["title"])}</CompFloor2>
              <CompFloor2>
                <Image src={getData(v, ["pic"])} />
              </CompFloor2>
              <CompFloor2 className="btns">
                <Button
                  type="feature"
                  title="編輯"
                  handler={() => dispatch(setEdit(getData(v, ["id"])))}
                />
                <Button
                  type="subFeature"
                  title={getData(v, ["status"]) ? "停用" : "啟用"}
                  handler={() =>
                    dispatch(
                      setConfirm({
                        status: true,
                        content: getData(v, ["status"])
                          ? "確定停用?"
                          : "確定啟用?",
                        type: "adPopupUpdate",
                        param: {
                          status: !getData(v, ["status"]),
                          id: getData(v, ["id"]),
                          lang: props.language,
                          title: getData(v, ["title"]),
                          link_id: getData(v, ["link_id"]),
                          url: getData(v, ["url"]),
                          pic: getData(v, ["pic", "img"]),
                          site: getData(v, ["site"]),
                        },
                      })
                    )
                  }
                />
                {!getData(v, ["status"]) && (
                  <Button
                    type="alert"
                    title="刪除"
                    handler={() => {
                      dispatch(
                        setConfirm({
                          status: true,
                          content: "確定刪除?",
                          type: "adPopupDelete",
                          param: {
                            id: [getData(v, ["id"])],
                          },
                        })
                      );
                    }}
                  />
                )}
              </CompFloor2>
            </>
          )}
        />
      </StyledAdPopup>
      {edit.status && (
        <AdPopupEdit
          data={adPopupList.data}
          closeHandler={() => {
            reduxDataReset(dispatch);
            dispatch(setEditReset());
          }}
        />
      )}
    </>
  );
};
