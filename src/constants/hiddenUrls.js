import { noop } from "lodash";
// reducers
import { setHidden } from "../reducer/props";

export const hiddenUrls = (value, dispatch = noop) => {
  const confrimCheck = (url = "", width = 400, height = 300) => {
    const confrim = window.confirm("確定開啟?");
    if (confrim) {
      dispatch(
        setHidden({
          url: url,
          status: true,
          width: width,
          height: height,
        })
      );
    }
  };

  switch (value) {
    case "playmegamanx":
      confrimCheck(
        "http://games.499games.com/o/499games/dosbox/mmx.html",
        680,
        450
      );
      break;
    case "playpacman":
      confrimCheck(
        "//www.google.com/logos/2010/pacman10-hp.html?hl=zh-TW",
        500
      );
      break;
    case "playmota":
      confrimCheck("https://h5mota.com/games/MagicTower_Obsidianite/");
      break;
    default:
      break;
  }
};
