import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface capsoState {
  id: string;
  nameDevice: {id: string,collection:"devices"}
  numberService: { id: string; collection: "services" };
  nameCustomer: string;
  grantTime: string;
  expiry: string;
  nameService: string;
  status: string;
}

interface firestoreState {
  capSo: capsoState[];
}

const initialState: firestoreState = {
  capSo: [],
};
export const fetchCapSo = createAsyncThunk("capso", async () => {
  const capsoRef = firestore.collection("capso");
  const snapshot = await capsoRef.get();
  const capsoData: capsoState[] = [];
  for (const doc of snapshot.docs) {
    const capso = doc.data() as capsoState;
    const deviceRef = firestore.collection("devices").doc(capso.nameDevice.id);
    const deviceSnapshot = await deviceRef.get();
    if (deviceSnapshot.exists) {
      const deviceData = deviceSnapshot.data();
      capso.nameDevice = deviceData?.name || "";
    }
    const serviceRef = firestore.collection("services").doc(capso.numberService.id);
    const serviceSnapshot = await serviceRef.get();
    if (serviceSnapshot.exists) {
      const serviceData = serviceSnapshot.data();
      capso.numberService = serviceData?.numberService || "";
    }
    capso.id = doc.id;
    capsoData.push(capso);
  }
  return capsoData;
});
const capSoSlice = createSlice({
  name: "capso",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCapSo.fulfilled, (state, action) => {
      state.capSo = action.payload;
    });
  },
});
export default capSoSlice.reducer;
