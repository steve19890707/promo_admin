import axios from "axios";
import { API_URL } from "./configs/apiUrl";

const token = "";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authorization"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// api put
export const apiLogout = () => {
  return axios.put(`${API_URL}/logout`);
};

export const apiRotateUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/rotate/update`, param);
};

export const apiRotateSort = (param = {}) => {
  return axios.put(`${API_URL}/backend/rotate/sort`, param);
};

export const apiActiveUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/active/update`, param);
};

export const apiSpecialGameUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/special_game/update`, param);
};

export const apiSpecialGameSort = (param = {}) => {
  return axios.put(`${API_URL}/backend/special_game/sort`, param);
};

export const apiVideoUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/video/update`, param);
};

export const apiVideoSort = (param = {}) => {
  return axios.put(`${API_URL}/backend/video/sort`, param);
};

export const apiHtmlUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/html/update`, param);
};

export const apiMaintainUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/maintain/update`, param);
};

export const apiAdFloatUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/ad_float/update`, param);
};

export const apiAdFloatSort = (param = {}) => {
  return axios.put(`${API_URL}/backend/ad_float/sort`, param);
};

export const apiAdPopupUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/ad_popup/update`, param);
};

export const apiAdminUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/admin/update`, param);
};

export const apiCategoryUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/category/update`, param);
};

export const apiMarqueeUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/marquee/update`, param);
};

export const apiMarqueeAutoSetUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/marquee/auto_set`, param);
};

export const apiNewsUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/news/update`, param);
};

export const apiNewsSort = (param = {}) => {
  return axios.put(`${API_URL}/backend/news/sort`, param);
};

// api post
export const apiUpload = (param, type, setDataOnProgress) => {
  const config = {
    onUploadProgress: (progressEvent) => {
      if (type === "video") {
        setDataOnProgress(
          Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
        );
      }
    },
  };
  return axios.post(`${API_URL}/backend/upload/`, param, config);
};

export const apiRotateCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/rotate/create`, param);
};

export const apiActiveCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/active/create`, param);
};

export const apiSpecialGameCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/special_game/create`, param);
};

export const apiVideoCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/video/create`, param);
};

export const apiAdFloatCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/ad_float/create`, param);
};

export const apiAdPopupCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/ad_popup/create`, param);
};

export const apiCategoryCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/category/create`, param);
};

export const apiMarqueeCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/marquee/create`, param);
};

export const apiNewsCreate = (param = {}) => {
  return axios.post(`${API_URL}/backend/news/create`, param);
};

// api get
export const apiAdminList = () => {
  return axios.get(`${API_URL}/backend/admin/admin_list`);
};

export const apiAdminUserInfo = () => {
  return axios.get(`${API_URL}/backend/admin/user_info`);
};

export const apiMenuList = () => {
  return axios.get(`${API_URL}/backend/menu/menu_list`);
};

export const apiGuidList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/game/guide_list?lang=${lang}`);
};

export const apiLangList = () => {
  return axios.get(`${API_URL}/backend/lang/lang_list`);
};

export const apiActiveList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/active/active_list?lang=${lang}`);
};

export const apiRotateList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/rotate/rotate_list?lang=${lang}`);
};

export const apiSpecialGameList = (lang = "cn", status = false) => {
  return axios.get(
    `${API_URL}/backend/special_game/special_game_list?lang=${lang}${
      status ? "&status=1" : ""
    }`
  );
};

export const apiVideoList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/video/video_list?lang=${lang}`);
};

export const apiHtmlList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/html/html_list?lang=${lang}`);
};

export const apiMaintainList = () => {
  return axios.get(`${API_URL}/backend/maintain/maintain_list`);
};

export const apiAdFloatList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/ad_float/adfloat_list?lang=${lang}`);
};

export const apiAdPopupList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/ad_popup/adpop_list?lang=${lang}`);
};

export const apiCategoryList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/category/category_list?lang=${lang}`);
};

export const apiMarqueeList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/marquee/marquee_list?lang=${lang}`);
};

export const apiMarqueeAutoSet = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/marquee/auto_set?lang=${lang}`);
};

export const apiNewsList = (lang = "cn") => {
  return axios.get(`${API_URL}/backend/news/news_list?lang=${lang}`);
};

// api delete
export const apiRotateDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/rotate/delete`, {
    data: param,
  });
};

export const apiActiveDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/active/delete`, {
    data: param,
  });
};

export const apiSpecialGameDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/special_game/delete`, {
    data: param,
  });
};

export const apiVideoDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/video/delete`, {
    data: param,
  });
};

export const apiAdFloatDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/ad_float/delete`, {
    data: param,
  });
};

export const apiAdPopupDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/ad_popup/delete`, {
    data: param,
  });
};

export const apiCategoryDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/category/delete`, {
    data: param,
  });
};

export const apiMarqueeDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/marquee/delete`, {
    data: param,
  });
};

export const apiNewsDelete = (param = {}) => {
  return axios.delete(`${API_URL}/backend/news/delete`, {
    data: param,
  });
};
