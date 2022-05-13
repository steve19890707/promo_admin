import { createSlice } from "@reduxjs/toolkit";
const picture = createSlice({
  name: "picture",
  initialState: {
    pic: {
      url: "",
      img: "",
    },
    comboPic: {
      // flag for special game
      flag: {
        url: "",
        img: "",
      },
      pc: {
        url: "",
        img: "",
      },
      mobile: {
        url: "",
        img: "",
      },
      tablet: {
        url: "",
        img: "",
      },
    },
  },
  reducers: {
    setPicture: (state, actions) => {
      const { url = "", img = "" } = actions.payload;
      state.pic = {
        url: url,
        img: img,
      };
    },
    setComboOneTypePicture: (state, actions) => {
      const { url = "", img = "", type = "pc" } = actions.payload;
      state.comboPic = {
        ...state.comboPic,
        [type]: {
          url: url,
          img: img,
        },
      };
    },
    setComboPicture: (state, actions) => {
      const {
        flag = {
          url: "",
          img: "",
        },
        pc = {
          url: "",
          img: "",
        },
        mobile = {
          url: "",
          img: "",
        },
        tablet = {
          url: "",
          img: "",
        },
      } = actions.payload;
      state.comboPic = {
        flag: flag,
        pc: pc,
        mobile: mobile,
        tablet: tablet,
      };
    },
    setPictureAllReset: (state) => {
      state.pic = {
        url: "",
        img: "",
      };
      state.comboPic = {
        flag: {
          url: "",
          img: "",
        },
        pc: {
          url: "",
          img: "",
        },
        mobile: {
          url: "",
          img: "",
        },
        tablet: {
          url: "",
          img: "",
        },
      };
    },
  },
});
export default picture.reducer;
export const {
  setPicture,
  setComboOneTypePicture,
  setComboPicture,
  setPictureAllReset,
} = picture.actions;
