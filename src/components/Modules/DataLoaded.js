import { noop } from "lodash";
import { statusFetchList } from "../../constants/otherFuntions";
// loader
import { CompsLoader } from "./CompsLoader";
// component
import { ListComp, CompFloor1, CompFloor2 } from "./ListComp";

export const DataLoaded = ({
  isLoading = true,
  statusNone = false,
  data = [],
  children = noop,
}) => {
  const renderData = statusNone ? data : statusFetchList(data);
  return (
    <>
      {isLoading ? (
        <CompsLoader />
      ) : (
        <ListComp>
          {renderData.length === 0 ? (
            <CompFloor2 className="nodata">暫無資料</CompFloor2>
          ) : (
            renderData.map((v, k) => (
              <CompFloor1
                key={k}
                index={k}
                className={localStorage.getItem("tagSelected")}
              >
                {children(v)}
              </CompFloor1>
            ))
          )}
        </ListComp>
      )}
    </>
  );
};
