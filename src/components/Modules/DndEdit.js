import { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { noop } from "lodash";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiOutlineFieldNumber } from "react-icons/ai";
// reducers
import { setConfirm } from "../../reducer/props";
// component
import { EditPopup } from "../Modules/EditPopup";

const StyledDndEdit = styled(EditPopup)`
  .drop-area {
    position: relative;
  }
`;
const StyledDataList = styled.div`
  width: 100%;
  padding: 16px 24px;
  border-radius: 5px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) =>
    getData(styles, [theme, "dnd", "backround"])};
  &:last-child {
    margin-bottom: 0;
  }
  .oder {
    display: flex;
    align-items: center;
  }
  .svg-AiOutlineFieldNumber {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => getData(styles, [theme, "dnd", "svg"])};
  }
  /* speical dnd part class */
  .dnd-title {
    width: 150px;
  }
  .dnd-time-range {
    &.isBefore {
      position: relative;
      padding-top: 20px;
      color: ${({ theme }) => getData(styles, [theme, "tip", "otherColor"])};
    }
  }
  .dnd-tip {
    transform: translate(0%, -70%);
  }
`;

export const DndEdit = ({
  title = "",
  data = [],
  patchData = [],
  dndId = "",
  type = "",
  className = "",
  children = noop,
  closeHandler = noop,
}) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  const [updateList, setUpdateList] = useState([]);
  const [catchData, setCatchData] = useState(data);
  const updateIdList = (list = []) => {
    const idList = [];
    list.map((v) => idList.push(getData(v, ["id"])));
    return idList;
  };
  const CreateDnDList = () => {
    return (
      <DragDropContext
        onDragEnd={(res) => {
          const { source, destination } = res;
          if (!destination) {
            return;
          }
          let update = data;
          const [remove] = update.splice(source.index, 1);
          update.splice(destination.index, 0, remove);
          setCatchData(update);
          setUpdateList([...updateIdList(update), ...updateIdList(patchData)]);
        }}
      >
        <Droppable droppableId={`${dndId}-dnd`}>
          {(provided) => (
            <div
              className="drop-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {catchData.map((v, k) => (
                <Draggable draggableId={`${dndId}-dnd-${k}`} index={k} key={k}>
                  {(p) => (
                    <StyledDataList
                      theme={props.theme}
                      ref={p.innerRef}
                      {...p.draggableProps}
                      {...p.dragHandleProps}
                      key={getData(v, ["id"])}
                    >
                      <div className="oder">
                        <AiOutlineFieldNumber className="svg-AiOutlineFieldNumber" />
                        <span>.{k + 1}</span>
                      </div>
                      {children(v)}
                    </StyledDataList>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };
  return (
    <StyledDndEdit
      theme={props.theme}
      title={`變更${title}順序`}
      checkValueError={false}
      className={className}
      updateBtnHandler={() =>
        dispatch(
          setConfirm({
            status: true,
            content: "確定更新?",
            type: type,
            // api update data
            param: {
              id: updateList,
              lang: props.language,
            },
          })
        )
      }
      closeBtnHandler={closeHandler}
    >
      <CreateDnDList />
    </StyledDndEdit>
  );
};
