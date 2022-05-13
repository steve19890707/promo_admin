import { createSlice } from "@reduxjs/toolkit";
const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    account: "---",
    department: "",
    avatar_url: "",
    level: "none",
  },
  reducers: {
    setUserInfo: (state, actions) => {
      const {
        account = "---",
        department = "",
        avatar_url = "",
        level = 0,
      } = actions.payload;
      state.account = account;
      state.department = department;
      state.avatar_url = avatar_url;
      state.level = level;
    },
  },
});
export default userInfo.reducer;
export const { setUserInfo } = userInfo.actions;
