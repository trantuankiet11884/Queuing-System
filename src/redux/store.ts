import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./slices/deviceSlice";
import serviceSlice from "./slices/serviceSlice";
export const store = configureStore({
  reducer: {
    devices: deviceSlice,
    service: serviceSlice,
    // levelNum: ,
    // report: ,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
