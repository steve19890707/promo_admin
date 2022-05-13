import { noop } from "lodash";
import { getData } from "../common-lib/lib";

export const statusFetchList = (list = [], type = "positive") => {
  const checked = localStorage.getItem("tagSelected") === "open" ? true : false;
  switch (type) {
    case "positive":
      return list.filter((v) => getData(v, ["status"]) === checked);
    case "reverse":
      return list.filter((v) => getData(v, ["status"]) !== checked);
    default:
      break;
  }
};

export const mouseDownEvent = (event, target, handler = noop) => {
  const eTarget = document.getElementById(target);
  if (eTarget && !eTarget.contains(event.target)) {
    handler();
  } else return;
};
