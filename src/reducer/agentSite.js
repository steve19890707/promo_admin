import { createSlice } from "@reduxjs/toolkit";
import { AGENT_STATUS_LIST } from "../constants/agentList";
const agentSite = createSlice({
  name: "agentSite",
  initialState: {
    list: [],
    siteStatus: AGENT_STATUS_LIST,
  },
  reducers: {
    setAgentSite: (state, actions) => {
      const isArray = Array.isArray(actions.payload);
      state.list = isArray ? actions.payload : [];
    },
    setAgentSiteUpdate: (state, actions) => {
      const { status, data } = actions.payload;
      if (status) {
        state.list.push(data);
      } else {
        state.list = state.list.filter((v) => v !== data);
      }
    },
    setSiteStatus: (state, actions) => {
      state.siteStatus = actions.payload;
    },
  },
});
export default agentSite.reducer;
export const { setAgentSite, setAgentSiteUpdate, setSiteStatus } =
  agentSite.actions;
