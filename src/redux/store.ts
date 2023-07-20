import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import deviceSlice from "./slices/deviceSlice";
import serviceSlice from "./slices/serviceSlice";
import capsoSlice from "./slices/capsoSlice";
import accountSlice from "./slices/accountSlice";
import activityLogger from "./middleware/middleware";
import loggerSlice from "./slices/activityLogger";

const middleware: any = [...getDefaultMiddleware(), activityLogger];

const rootReducer = combineReducers({
  devices: deviceSlice,
  service: serviceSlice,
  levelNum: capsoSlice,
  account: accountSlice,
  actions: loggerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
