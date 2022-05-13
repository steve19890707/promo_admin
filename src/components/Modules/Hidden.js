import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setHidden } from "../../reducer/props";
const StyledHidden = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #000;
  z-index: 2;
  .close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
`;
export const Hidden = () => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  return (
    <StyledHidden
      style={{
        width: `${props.hidden.width}px`,
        height: `${props.hidden.height}px`,
      }}
    >
      <div className="close" onClick={() => dispatch(setHidden({}))}>
        X
      </div>
      <iframe title="hidden" src={props.hidden.url} />
    </StyledHidden>
  );
};
