import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./slices/deviceSlice";
import serviceSlice from "./slices/serviceSlice";
import capsoSlice from "./slices/capsoSlice";
import accountSlice from "./slices/accountSlice";
export const store = configureStore({
  reducer: {
    devices: deviceSlice,
    service: serviceSlice,
    levelNum: capsoSlice,
    account: accountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
