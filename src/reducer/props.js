import { createSlice } from "@reduxjs/toolkit";

const props = createSlice({
  name: "props",
  initialState: {
    theme: localStorage.getItem("theme") || "light",
    language: localStorage.getItem("lang") || "cn",
    langList: [],
    changePwd: false,
    alert: {
      status: false,
      content: "",
    },
    confirm: {
      status: false,
      content: "",
      type: "",
    },
    hidden: {
      url: "",
      status: false,
      width: 400,
      height: 300,
    },
  },
  reducers: {
    setTheme: (state, actions) => {
      localStorage.setItem("theme", actions.payload);
      state.theme = actions.payload;
    },
    setLanguage: (state, actions) => {
      localStorage.setItem("lang", actions.payload);
      state.language = actions.payload;
    },
    setLangList: (state, actions) => {
      state.langList = actions.payload;
    },
    setChangePwd: (state, actions) => {
      state.changePwd = actions.payload;
    },
    setAlert: (state, actions) => {
      const { status, content } = actions.payload;
      state.alert = {
        status: status,
        content: content,
      };
    },
    setConfirm: (state, actions) => {
      const { status, content, type, param } = actions.payload;
      state.confirm = {
        status: status,
        content: content,
        type: type,
        param: param,
      };
    },
    setHidden: (state, actions) => {
      const {
        url = "",
        status = false,
        width = 400,
        height = 300,
      } = actions.payload;
      state.hidden = {
        url: url,
        status: status,
        width: width,
        height: height,
      };
    },
  },
});
export default props.reducer;
export const {
  setTheme,
  setLanguage,
  setLangList,
  setChangePwd,
  setAlert,
  setConfirm,
  setHidden,
} = props.actions;
