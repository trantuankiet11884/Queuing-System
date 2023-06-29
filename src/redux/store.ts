import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./slices/deviceSlice";
export const store = configureStore({
  reducer: {
    devices: deviceSlice,
    // service: ,
    // levelNum: ,
    // report: ,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
