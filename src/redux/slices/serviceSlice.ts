import { firestore } from "./../../firebase/firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface serviceState {
  id: string;
  idService: string;
  name: string;
  desc: string;
  isActive: boolean;
  numberService: string;
}

interface firestoreState {
  services: serviceState[];
}

const initialState: firestoreState = {
  services: [],
};

export const fetchServices = createAsyncThunk("/services", async () => {
  const servicesRef = firestore.collection("services");
  const snapshot = await servicesRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as serviceState[];
});

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
  },
});

export default serviceSlice.reducer;
