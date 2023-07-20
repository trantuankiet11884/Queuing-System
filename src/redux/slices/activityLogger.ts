import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../firebase/firebase";

export interface loggerState {
  id: string;
  hvten: string;
  grantTime: string;
  ip: string;
  actions: string;
}

export interface firestoreState {
  logger: loggerState[];
}

const initialState: firestoreState = {
  logger: [],
};

export const fetchLogger = createAsyncThunk("logger", async () => {
  const loggerRef = firestore.collection("logger");
  const snapshot = await loggerRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as loggerState[];
});

export const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLogger.fulfilled, (state, action) => {
      state.logger = action.payload;
    });
  },
});

export default loggerSlice.reducer;
