import { useSelector } from "react-redux";
import { useEffect } from "react";
import { noop } from "@babel/types";
import * as api from "../../api";

const dataFetch = ({ res, handler = noop, emptyData = [] }) => {
  const preview = res.data;
  const SUCCESS = preview.error_msg === "SUCCESS";
  if (SUCCESS) {
    const data = preview.result;
    handler(dataVerify(data, emptyData));
  } else {
    handler(emptyData);
    redirectToLogin(preview.error_code, preview.error_msg);
    console.error(preview.error_msg);
  }
};

export const dataVerify = (data, defaultData = []) => {
  if (data && data !== null && data !== undefined) {
    return data;
  } else {
    return defaultData;
  }
};

const update = ({ res }) => {
  const preview = res.data;
  const SUCCESS = preview.error_msg === "SUCCESS";
  if (!SUCCESS) {
    redirectToLogin(preview.error_code, preview.error_msg);
    console.error(preview.error_msg);
  } else {
    window.location.reload();
  }
};

const errorFetch = (error) => {
  alert(error);
  console.error(error);
};

const errorFetchReset = (error, handler = noop) => {
  alert(error);
  console.error(error);
  handler();
};

const redirectToLogin = (code = 1, msg = "") => {
  switch (code) {
    case 1301004:
    case 1605001:
    case 1605002:
    case 1605003:
    case 1605004:
    case 1604006:
      if (window.location.hash !== "#/login") {
        if (localStorage.getItem("isLogin") !== "false") {
          alert(msg);
        }
        localStorage.setItem("isLogin", "false");
        window.location.href = window.location.origin + "#/login";
      } else return;
      break;
    default:
      alert(msg);
      break;
  }
};

// render get data hook
export const RenderGetDataHook = ({
  lang = "",
  isMap = false,
  fetchData = noop,
  setData = noop,
  isPermission = false,
  isNeedReRender = false,
  setReRenderData = noop,
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    // const noLogin = localStorage.getItem("isLogin") === "false";
    // if (noLogin && window.location.hash !== "#/login") {
    //   window.location.href = window.location.origin + "#/login";
    // }
    // if (userInfo.level === "none" || noLogin) {
    //   return;
    // }
    if (isPermission && userInfo.level !== 2) {
      return (window.location.href =
        window.location.origin + window.location.pathname + `#/`);
    }
    const defaultData = isMap ? {} : [];
    setData({
      data: defaultData,
      isLoading: true,
    });
    fetchData({
      lang: lang,
      handler: (data) => {
        isNeedReRender && setReRenderData(dataVerify(data, defaultData));
        setData({
          data: dataVerify(data, defaultData),
          isLoading: false,
        });
      },
    });
  }, [
    lang,
    isMap,
    fetchData,
    setData,
    isPermission,
    isNeedReRender,
    setReRenderData,
    userInfo.level,
  ]);
};

export const fetchUpload = (
  param,
  handler = noop,
  type = "img",
  setDataOnProgress = noop
) => {
  return api
    .apiUpload(param, type, setDataOnProgress)
    .then((res) => dataFetch({ res, handler, emptyData: "" }))
    .catch((error) => errorFetchReset(error, handler));
};

export const fetchLogout = () => {
  return api
    .apiLogout()
    .then((res) => {
      const preview = res.data;
      const SUCCESS = preview.error_msg === "SUCCESS";
      if (SUCCESS) {
        localStorage.setItem("authorization", "");
        localStorage.setItem("isLogin", "false");
        window.location.reload();
      }
    })
    .catch((error) => errorFetch(error));
};
//  admin
export const fetchAdminList = ({ handler = noop }) => {
  return api
    .apiAdminList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchAdminUserInfo = (handler = noop) => {
  return api
    .apiAdminUserInfo()
    .then((res) => dataFetch({ res, handler, emptyData: {} }))
    .catch((error) => errorFetch(error));
};

export const fetchAdminUpdate = (param) => {
  return api
    .apiAdminUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// other
export const fetchMenuList = (handler = noop) => {
  return api
    .apiMenuList()
    .then((res) => dataFetch({ res, handler, emptyData: {} }))
    .catch((error) => errorFetch(error));
};

export const fetchGuidList = ({ lang, handler = noop }) => {
  return api
    .apiGuidList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchLangList = (handler = noop) => {
  return api
    .apiLangList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

// activie
export const fetchActiveList = ({ lang, handler = noop }) => {
  return api
    .apiActiveList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchActiveUpdate = (param) => {
  return api
    .apiActiveUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchActiveCreate = (param) => {
  return api
    .apiActiveCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};
export const fetchActiveDelete = (param) => {
  return api
    .apiActiveDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// rotate
export const fetchRotateList = ({ lang, handler = noop }) => {
  return api
    .apiRotateList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchRotateUpdate = (param) => {
  return api
    .apiRotateUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchRotateSort = (param) => {
  return api
    .apiRotateSort(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchRotateCreate = (param) => {
  return api
    .apiRotateCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchRotateDelete = (param) => {
  return api
    .apiRotateDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// special game
export const fetchSpecialGameList = ({
  lang,
  status = false,
  handler = noop,
}) => {
  return api
    .apiSpecialGameList(lang, status)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchSpecialGameUpdate = (param) => {
  return api
    .apiSpecialGameUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchSpecialGameSort = (param) => {
  return api
    .apiSpecialGameSort(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchSpecialGameCreate = (param) => {
  return api
    .apiSpecialGameCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchSpecialGameDelete = (param) => {
  return api
    .apiSpecialGameDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// video
export const fetchVideoList = ({ lang, handler = noop }) => {
  return api
    .apiVideoList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchVideoUpdate = (param) => {
  return api
    .apiVideoUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchVideoSort = (param) => {
  return api
    .apiVideoSort(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchVideoCreate = (param) => {
  return api
    .apiVideoCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchVideoDelete = (param) => {
  return api
    .apiVideoDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// html
export const fetchHtmlList = ({ lang, handler = noop }) => {
  return api
    .apiHtmlList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchHtmlUpdate = (param) => {
  return api
    .apiHtmlUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// maintin
export const fetchMaintainList = ({ handler = noop }) => {
  return api
    .apiMaintainList()
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchMaintainUpdate = (param) => {
  return api
    .apiMaintainUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// ad float
export const fetchAdFloatList = ({ lang, handler = noop }) => {
  return api
    .apiAdFloatList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchAdFloatUpdate = (param) => {
  return api
    .apiAdFloatUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchAdFloatSort = (param) => {
  return api
    .apiAdFloatSort(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchAdFloatCreate = (param) => {
  return api
    .apiAdFloatCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchAdFloatDelete = (param) => {
  return api
    .apiAdFloatDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// ad popup
export const fetchAdPopupList = ({ lang, handler = noop }) => {
  return api
    .apiAdPopupList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchAdPopupUpdate = (param) => {
  return api
    .apiAdPopupUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchAdPopupCreate = (param) => {
  return api
    .apiAdPopupCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchAdPopupDelete = (param) => {
  return api
    .apiAdPopupDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// category
export const fetchCategoryList = ({ lang, handler = noop }) => {
  return api
    .apiCategoryList(lang)
    .then((res) => dataFetch({ res, handler, emptyData: {} }))
    .catch((error) => errorFetch(error));
};

export const fetchCategoryUpdate = (param) => {
  return api
    .apiCategoryUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchCategoryCreate = (param) => {
  return api
    .apiCategoryCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchCategoryDelete = (param) => {
  return api
    .apiCategoryDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// marquee
export const fetchMarqueeList = ({ lang, handler = noop }) => {
  return api
    .apiMarqueeList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchMarqueeUpdate = (param) => {
  return api
    .apiMarqueeUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchMarqueeCreate = (param) => {
  return api
    .apiMarqueeCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchMarqueeDelete = (param) => {
  return api
    .apiMarqueeDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchMarqueeAutoSet = ({ lang, handler = noop }) => {
  return api
    .apiMarqueeAutoSet(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchMarqueeAutoSetUpdate = (param) => {
  return api
    .apiMarqueeAutoSetUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

// news
export const fetchNewsList = ({ lang, handler = noop }) => {
  return api
    .apiNewsList(lang)
    .then((res) => dataFetch({ res, handler }))
    .catch((error) => errorFetch(error));
};

export const fetchNewsUpdate = (param) => {
  return api
    .apiNewsUpdate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchNewsSort = (param) => {
  return api
    .apiNewsSort(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchNewsCreate = (param) => {
  return api
    .apiNewsCreate(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};

export const fetchNewsDelete = (param) => {
  return api
    .apiNewsDelete(param)
    .then((res) => update({ res }))
    .catch((error) => errorFetch(error));
};
