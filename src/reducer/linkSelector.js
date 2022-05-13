import { createSlice } from "@reduxjs/toolkit";
const linkSelector = createSlice({
  name: "linkSelector",
  initialState: {
    linkId: 6,
    url: "",
    isError: true,
    tip: "",
    typeDropStatus: false,
    childDropStatus: false,
  },
  reducers: {
    setLinkSelector: (state, actions) => {
      const { linkId = 7, url = "" } = actions.payload;
      let isError = true;
      switch (linkId) {
        case 2:
        case 4:
        case 6:
          isError = false;
          break;
        default:
          if (url) {
            isError = false;
          }
          break;
      }
      state.linkId = linkId;
      state.url = url;
      state.isError = isError;
      state.typeDropStatus = false;
      state.childDropStatus = false;
    },
    setLinkSelectorOnly: (state, actions) => {
      state.url = actions.payload.toString();
      state.isError = false;
    },
    setLink: (state, actions) => {
      state.url = actions.payload;
    },
    setLinkStatus: (state, actions) => {
      state.isError = actions.payload;
    },
    setLinkTip: (state, actions) => {
      state.tip = actions.payload;
    },
    setLinkTypeDropStatus: (state, actions) => {
      state.typeDropStatus = actions.payload;
    },
    setLinkChildDropStatus: (state, actions) => {
      state.childDropStatus = actions.payload;
    },
  },
});
export default linkSelector.reducer;
export const {
  setLinkSelector,
  setLink,
  setLinkStatus,
  setLinkSelectorOnly,
  setLinkTip,
  setLinkTypeDropStatus,
  setLinkChildDropStatus,
} = linkSelector.actions;
