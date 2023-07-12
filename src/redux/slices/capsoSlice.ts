import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface capsoState {
  isActive: boolean;
  id: string;
  nameDevice: string;
  numberService: number;
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
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as capsoState[];
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
