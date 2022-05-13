import { createSlice } from "@reduxjs/toolkit";

const apiProps = createSlice({
  name: "apiProps",
  initialState: {
    title: "",
    checked: false,
  },
  reducers: {
    setTitle: (state, actions) => {
      state.title = actions.payload;
    },
    setChecked: (state, actions) => {
      state.checked = actions.payload;
    },
    setApiProps: (state, actions) => {
      const { title = "", checked = false } = actions.payload;
      state.title = title;
      state.checked = checked;
    },
  },
});
export default apiProps.reducer;
export const { setTitle, setChecked, setApiProps } = apiProps.actions;
