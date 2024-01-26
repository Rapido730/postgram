import { createSlice } from "@reduxjs/toolkit";

const InitialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    SetUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { SetUser } = userSlice.actions;
export default userSlice.reducer;
