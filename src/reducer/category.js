import { createSlice } from "@reduxjs/toolkit";
const category = createSlice({
  name: "category",
  initialState: {
    id: "none",
    name: "",
    isError: true,
    dropStatus: false,
  },
  reducers: {
    setCategory: (state, actions) => {
      const {
        id = "none",
        name = "",
        isError = true,
        dropStatus = false,
      } = actions.payload;
      state.id = id;
      state.name = name;
      state.isError = isError;
      state.dropStatus = dropStatus;
    },
    setCategoryIdName: (state, actions) => {
      const { id = "none", name = "" } = actions.payload;
      const isNone = id === "none" && name === "";
      state.id = id;
      state.name = name;
      state.isError = isNone ? true : false;
    },
    setCategoryDrStatus: (state, actions) => {
      state.dropStatus = actions.payload;
    },
  },
});
export default category.reducer;
export const { setCategory, setCategoryIdName, setCategoryDrStatus } =
  category.actions;
