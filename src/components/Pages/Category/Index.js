import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
import { setAdd, setEdit, setEditReset } from "../../../reducer/edit";
// component
import { MultiLanguage } from "../../Modules/MultiLanguage";
import { Caption } from "../../Modules/Caption";
import { DataLoaded } from "../../Modules/DataLoaded";
import { CompFloor2 } from "../../Modules/ListComp";
import { PageTag } from "../../Common/PageTag";
import { Button } from "../../Common/Button";
import { CategoryEdit } from "./CategoryEdit";
// api
// import { fetchCategoryList, RenderGetDataHook } from "../../Common/fetchData";
import { categoryData } from "../../../demoData";

const StyledCategory = styled.div``;

export const Category = () => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const tagList = [
    {
      name: "跑馬燈",
      value: "marquee",
      typeId: 1,
    },
    {
      name: "報導",
      value: "news",
      typeId: 2,
    },
  ];
  localStorage.setItem(
    "category",
    localStorage.getItem("category") || tagList[0].value
  );
  const [categoryList, setCategoryList] = useState({
    data: {},
    isLoading: true,
  });
  const [tagSelected, setTagSelected] = useState(
    localStorage.getItem("category")
  );
  const currentTag = tagList.find(
    (v) => v.value === localStorage.getItem("category")
  );
  const currentData = getData(categoryList.data, [tagSelected, "category"], []);

  // RenderGetDataHook({
  //   lang: props.language,
  //   isMap: true,
  //   fetchData: fetchCategoryList,
  //   setData: setCategoryList,
  // });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCategoryList({
        data: categoryData,
        isLoading: false,
      });
      return () => clearTimeout(timeout);
    }, 100);
  }, []);
  return (
    <>
      <MultiLanguage />
      <StyledCategory theme={props.theme}>
        <Caption
          tag={{
            isOtherList: true,
            OtherList: (
              <>
                {tagList.map((v, k) => (
                  <PageTag
                    key={k}
                    tagName={v.name}
                    isSelected={v.value === tagSelected}
                    handler={() => {
                      setTagSelected(v.value);
                      localStorage.setItem("category", v.value);
                    }}
                  />
                ))}
              </>
            ),
          }}
          title="標籤管理"
          subtitles={["標籤名稱", "操作"]}
          Buttons={
            <Button
              type="subFeature"
              title="新增標籤"
              handler={() => dispatch(setAdd())}
            />
          }
        />
        <DataLoaded
          isLoading={categoryList.isLoading}
          statusNone={true}
          data={currentData}
          children={(v) => (
            <>
              <CompFloor2>{getData(v, ["name"])}</CompFloor2>
              <CompFloor2 className="btns">
                <Button
                  type="feature"
                  title="編輯"
                  handler={() => dispatch(setEdit(getData(v, ["id"])))}
                />
                <Button
                  type="alert"
                  title="刪除"
                  handler={() =>
                    dispatch(
                      setConfirm({
                        status: true,
                        content: "確定刪除?",
                        type: "categoryDelete",
                        param: {
                          tag_id: [getData(v, ["id"])],
                        },
                      })
                    )
                  }
                />
              </CompFloor2>
            </>
          )}
        />
      </StyledCategory>
      {edit.status && (
        <CategoryEdit
          data={currentData}
          currentTag={currentTag}
          closeHandler={() => dispatch(setEditReset())}
        />
      )}
    </>
  );
};
