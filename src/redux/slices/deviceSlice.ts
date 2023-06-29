import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface deviceState {
  id: string;
  name: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  service: string;
}

interface firestoreState {
  devices: deviceState[];
}

const initialState: firestoreState = {
  devices: [],
};

export const fetchDevices = createAsyncThunk("devices/device", async () => {
  const devicesRef = firestore.collection("devices");
  const snapshot = await devicesRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as deviceState[];
});

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
  },
});

// export const {selectDevice} = deviceSlice.actions
export default deviceSlice.reducer;
