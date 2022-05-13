import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { getData } from "../../../common-lib/lib";
// reducers
import { setConfirm } from "../../../reducer/props";
// component
import { SettingSquare, EditPopup } from "../../Modules/EditPopup";

const StyledCategoryEdit = styled(EditPopup)``;

export const CategoryEdit = ({
  data = {},
  currentTag = {},
  closeHandler = noop,
}) => {
  const props = useSelector((state) => state.props);
  const edit = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const paramId = edit.type === "add" ? {} : { id: edit.id };
  const currentData = data.find((v) => getData(v, ["id"]) === edit.id);
  const [newTagName, setNewTagName] = useState(
    getData(currentData || "", ["name"])
  );
  const checkValueErrorStatus = (type = "") => {
    const tagNameValueCheck = newTagName.length === 0;
    const totalcheck = !tagNameValueCheck;
    switch (type) {
      case "tagName":
        return tagNameValueCheck;
      default:
        return !totalcheck;
    }
  };
  return (
    <StyledCategoryEdit
      theme={props.theme}
      editedBy={getData(currentData || "", ["edited_by"])}
      title={`${edit.type === "add" ? "新增" : "編輯"}標籤(${currentTag.name})`}
      updateBtn={edit.type === "add" ? "新增" : "更新"}
      checkValueError={checkValueErrorStatus()}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: edit.type === "add" ? "確定新增?" : "確定更新?",
            type: edit.type === "add" ? "categoryCreate" : "categoryUpdate",
            // api create/update data
            param: {
              ...paramId,
              lang: props.language,
              name: newTagName,
              type_id: currentTag.typeId,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <SettingSquare
        title={"標籤名稱"}
        isTip={checkValueErrorStatus("tagName")}
        tipContent={"不可為空"}
        Comp={() => (
          <input
            className="input"
            value={newTagName}
            disabled={props.confirm.status}
            placeholder="請輸入標籤名稱"
            onChange={(e) => setNewTagName(e.target.value)}
          />
        )}
      />
    </StyledCategoryEdit>
  );
};
