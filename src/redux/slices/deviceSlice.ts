import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface deviceState {
  id: string;
  idDevice: string;
  name: string;
  ip: string;
  isActive: boolean;
  isConnect: boolean;
  service: string;
  username?: string;
  type: string;
  password?: string;
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
export default deviceSlice.reducer;