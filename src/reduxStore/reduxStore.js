import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./reducers/user";
import postReducer from "./reducers/post";
// const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    middleware: [logger],
  },
});

export default store;
