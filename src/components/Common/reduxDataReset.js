import { noop } from "lodash";
// reducers
import { setApiProps } from "../../reducer/apiProps";
import { setAgentSite } from "../../reducer/agentSite";
import { setVideo } from "../../reducer/video";
import { setLinkSelector } from "../../reducer/linkSelector";
import { setTimes } from "../../reducer/times";
import { setPictureAllReset } from "../../reducer/picture";
import { setCategory } from "../../reducer/category";

export const reduxDataReset = (dispatch = noop) => {
  dispatch(setApiProps({}));
  dispatch(setAgentSite([]));
  dispatch(setLinkSelector({}));
  dispatch(setTimes({}));
  dispatch(setPictureAllReset());
  dispatch(setVideo({}));
  dispatch(setCategory({}));
};
