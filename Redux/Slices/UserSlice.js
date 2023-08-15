import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = { ...action.payload };
    },
    removeUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

export const userActions = userSlice.actions;

// Selectors
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
