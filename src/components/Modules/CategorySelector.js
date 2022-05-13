import { useEffect } from "react";
import styled from "styled-components";
import cx from "classnames";
import { noop } from "@babel/types";
import { useSelector, useDispatch } from "react-redux";
import { RiArrowDownSFill } from "react-icons/ri";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
// reducers
import {
  setCategory,
  setCategoryIdName,
  setCategoryDrStatus,
} from "../../reducer/category";

const StyledCategorySelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 25px;
  .category-selector-title {
    margin-right: 20px;
  }
  .drop-category-selector {
    position: relative;
    font-size: 14px;
    min-width: 100px;
    padding: 0px 12px;
    height: 38px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
    cursor: pointer;
    &.isChild {
      margin-left: 10px;
    }
  }
  .svg-cs-RiArrowDownSFill {
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => getData(styles, [theme, "color"])};
  }
  .drop-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    background-color: ${({ theme }) =>
      getData(styles, [theme, "linkSelector", "backround"])};
    border-radius: 0 0 5px 5px;
    .list-content {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      &:hover,
      &.selected {
        color: ${({ theme }) =>
          getData(styles, [theme, "linkSelector", "hoverColor"])};
        background-color: ${({ theme }) =>
          getData(styles, [theme, "linkSelector", "hover"])};
      }
    }
  }
  .ct-tips {
    font-size: 15px;
    margin-left: 10px;
    color: ${({ theme }) => getData(styles, [theme, "alert"])};
  }
`;
export const categorySelectorMouseDown = (e, dispatch = noop) => {
  const categorySelector = document.getElementById("category-selector");
  if (categorySelector && !categorySelector.contains(e.target)) {
    dispatch(setCategoryDrStatus(false));
  }
};
export const CategorySelector = ({ className = "", data = [] }) => {
  const props = useSelector((state) => state.props);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const noData = data.length === 0;
  const currentKey = data.find((v) => getData(v, ["id"]) === category.id);
  useEffect(() => {
    if (!currentKey) {
      dispatch(setCategory({}));
    }
  }, [currentKey, dispatch]);
  return (
    <StyledCategorySelector theme={props.theme} className={className}>
      <div className="category-selector-title">標籤類型:</div>
      <div
        id={"category-selector"}
        className={`drop-category-selector`}
        onClick={() =>
          !noData && dispatch(setCategoryDrStatus(!category.dropStatus))
        }
      >
        {noData ? (
          <span>no data</span>
        ) : (
          <>
            <span>{category.name}</span>
            <RiArrowDownSFill className="svg-cs-RiArrowDownSFill" />
          </>
        )}
        {category.dropStatus && (
          <div className="drop-list">
            {data.map((v, k) => (
              <div
                key={k}
                className={cx("list-content", {
                  selected: getData(v, ["id"]) === category.id,
                })}
                onClick={() =>
                  dispatch(
                    setCategoryIdName({
                      id: getData(v, ["id"]),
                      name: getData(v, ["name"]),
                    })
                  )
                }
              >
                {getData(v, ["name"])}
              </div>
            ))}
          </div>
        )}
      </div>
      {category.isError && <div className="ct-tips">標籤類型 不可為空</div>}
    </StyledCategorySelector>
  );
};
