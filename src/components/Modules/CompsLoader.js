// loader
import { LoaderSpinner } from "../Common/Loader";
// component
import { ListComp } from "../Modules/ListComp";
import styled from "styled-components";

const StyledCompsLoader = styled(ListComp)`
  .comps-loader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
  }
`;
export const CompsLoader = ({ className }) => {
  return (
    <StyledCompsLoader className={className}>
      <div className="comps-loader">
        <LoaderSpinner />
      </div>
    </StyledCompsLoader>
  );
};
