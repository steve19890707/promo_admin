import { createSlice } from "@reduxjs/toolkit";
const edit = createSlice({
  name: "edit",
  initialState: {
    type: "add",
    id: "",
    status: false,
  },
  reducers: {
    setAdd: (state) => {
      state.type = "add";
      state.id = "";
      state.status = true;
    },
    setEdit: (state, actions) => {
      state.type = "edit";
      state.id = actions.payload;
      state.status = true;
    },
    setEditReset: (state) => {
      state.type = "add";
      state.id = "";
      state.status = false;
    },
  },
});
export default edit.reducer;
export const { setAdd, setEdit, setEditReset } = edit.actions;
