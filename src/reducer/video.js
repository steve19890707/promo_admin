import { createSlice } from "@reduxjs/toolkit";
const video = createSlice({
  name: "video",
  initialState: {
    internal: true,
    url: {
      domain: "",
      link: "",
    },
  },
  reducers: {
    setVideo: (state, actions) => {
      const {
        internal = true,
        url = {
          domain: "",
          link: "",
        },
      } = actions.payload;
      state.internal = internal;
      state.url = url;
    },
    setVideoInternal: (state, actions) => {
      state.internal = actions.payload;
    },
    setVideoUrl: (state, actions) => {
      const { domain = "", link = "" } = actions.payload;
      state.url = {
        domain: domain,
        link: link,
      };
    },
  },
});
export default video.reducer;
export const { setVideo, setVideoInternal, setVideoUrl } = video.actions;
