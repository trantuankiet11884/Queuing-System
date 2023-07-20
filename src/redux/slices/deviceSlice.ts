import { RootState } from "../store";
import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface deviceState {
  id?: string;
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
  newActivity: string;
}

const initialState: firestoreState = {
  devices: [],
  newActivity: "",
};

export const fetchDevices = createAsyncThunk("devices/device", async () => {
  const devicesRef = firestore.collection("devices");
  const snapshot = await devicesRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as deviceState[];
});

export const addDevice = createAsyncThunk(
  "devices/addDevice",
  async (device: deviceState, { dispatch }) => {
    const deviceRef = firestore.collection("devices");
    const newDeviceRef = await deviceRef.add(device);
    const newDeviceSnapshot = await newDeviceRef.get();
    const newDevice = {
      id: newDeviceSnapshot.id,
      ...newDeviceSnapshot.data(),
    } as deviceState;

    return newDevice;
  }
);

export const updateDevice = createAsyncThunk(
  "devices/updateDevice",
  async (device: deviceState, { dispatch }) => {
    const { id, ...updatedDevice } = device;
    const deviceRef = firestore.collection("devices").doc(id);
    await deviceRef.update(updatedDevice);

    return device;
  }
);

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    // setNewActivity: (state, action: PayloadAction<string>) => {
    //   state.newActivity = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
    builder.addCase(addDevice.fulfilled, (state, action) => {
      state.devices.push(action.payload);
    });
    builder.addCase(updateDevice.fulfilled, (state, action) => {
      const updatedDevice = action.payload;
      const deviceIndex = state.devices.findIndex(
        (device) => device.id === updatedDevice.id
      );
      if (deviceIndex !== -1) {
        state.devices[deviceIndex] = updatedDevice;
      }
    });
  },
});
// export const { setNewActivity } = deviceSlice.actions;
// export const selectNewActivity = (state: RootState) => state.newActivity;
export default deviceSlice.reducer;
