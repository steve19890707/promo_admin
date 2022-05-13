import { createStore, combineReducers } from "redux";
import props from "./props";
import userInfo from "./userInfo";
import apiProps from "./apiProps";
import edit from "./edit";
import times from "./times";
import linkSelector from "./linkSelector";
import agentSite from "./agentSite";
import picture from "./picture";
import video from "./video";
import category from "./category";
// ...
const rootReducer = combineReducers({
  props,
  userInfo,
  apiProps,
  edit,
  times,
  linkSelector,
  agentSite,
  picture,
  video,
  category,
});
export const store = createStore(rootReducer);
