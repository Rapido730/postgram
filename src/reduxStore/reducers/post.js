import { createSlice } from "@reduxjs/toolkit";

const InitialState = [];

export const postSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    SetPostList: (state, action) => {
      return action.payload;
    },
    AddPost: (state, action) => {
      const { payload } = action;
      state.push(payload);
      return state;
    },
    DeletePost: (state, action) => {
      const { payload } = action;
      const NewState = state.filter((post) => post._id !== payload._id);

      return NewState;
    },
  },
});

export const { SetPostList, AddPost, DeletePost } = postSlice.actions;
export default postSlice.reducer;
