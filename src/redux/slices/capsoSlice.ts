import moment from "moment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "./../../firebase/firebase";

interface CapSoMoi {
  numberService: number;
  nameCustomer: string;
  nameDevice: string;
  nameService: string;
  grantTime: string;
  expiry: string;
  status: string;
  isActive: boolean;
}

interface CapsoState {
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

interface FirestoreState {
  capSo: CapsoState[];
}

const initialState: FirestoreState = {
  capSo: [],
};

export const fetchCapSo = createAsyncThunk("capso/fetchCapSo", async () => {
  const capsoRef = firestore.collection("capso");
  const snapshot = await capsoRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CapsoState[];
});

export const addCapSo = createAsyncThunk(
  "capso/addCapSo",
  async (selectedService: string) => {
    const servicesRef = firestore.collection("capso");
    const snapshot = await servicesRef.where("isActive", "==", false).get();
    let numberService = 1;
    if (!snapshot.empty) {
      const services = snapshot.docs.map((doc) => doc.data());
      numberService =
        services.reduce((max, service) => {
          return Math.max(max, service.numberService);
        }, 0) + 1;
    }

    const nameDevice = Math.random() < 0.5 ? "Kiosk" : "Hệ thống";
    const grantTime = moment().format("HH:mm DD/MM/YYYY");
    const expiry = moment().add(1, "day").format("HH:mm DD/MM/YYYY");
    const status = ["Đã sử dụng", "Đang chờ", "Bỏ qua"][
      Math.floor(Math.random() * 3)
    ];

    const capSo: CapSoMoi = {
      numberService,
      nameCustomer: "",
      nameDevice,
      nameService: selectedService,
      grantTime,
      expiry,
      status,
      isActive: false,
    };

    const capSoRef = firestore.collection("capso");
    const docRef = await capSoRef.add(capSo);

    return { capSo: { ...capSo, id: docRef.id } };
  }
);

const capSoSlice = createSlice({
  name: "capso",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCapSo.fulfilled, (state, action) => {
      state.capSo = action.payload;
    });
    builder.addCase(addCapSo.fulfilled, (state, action) => {
      state.capSo.unshift(action.payload.capSo);
    });
  },
});
export default capSoSlice.reducer;
