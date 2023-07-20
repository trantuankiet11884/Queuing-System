import { message } from "antd";
import { firestore } from "./../../firebase/firebase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface serviceState {
  id?: string;
  idService: string;
  name: string;
  desc: string;
  isActive: boolean;
  numberService: number;
  constant: boolean;
}

interface firestoreState {
  services: serviceState[];
  newActivity: string;
}

const initialState: firestoreState = {
  services: [],
  newActivity: "",
};

export const fetchServices = createAsyncThunk("/services", async () => {
  const servicesRef = firestore.collection("services");
  const snapshot = await servicesRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as serviceState[];
});

export const addNewService = createAsyncThunk(
  "services/addNewService",
  async (newService: serviceState, { rejectWithValue }) => {
    try {
      const servicesRef = firestore.collection("services");

      if (!newService.idService || !newService.name || !newService.desc) {
        throw new Error("Bạn hãy nhập đầy đủ các trường dữ liệu !!!");
      }

      const snapshot = await servicesRef
        .where("constant", "==", newService.constant)
        .get();

      let numberService = 2010001;

      if (!snapshot.empty) {
        const services = snapshot.docs.map((doc) => doc.data());
        numberService =
          services.reduce((max, service) => {
            return Math.max(max, service.numberService);
          }, 0) + 1;
      }

      const docRef = await servicesRef.add({
        ...newService,
        numberService,
      });

      message.success("Thêm dịch vụ thành công!");

      const addedService: serviceState = {
        ...newService,
        numberService,
        id: docRef.id,
      };

      return addedService;
    } catch (error) {
      return rejectWithValue(`Lỗi khi thêm dịch vụ: ${error}`);
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async (updatedService: serviceState, { rejectWithValue }) => {
    try {
      const { id, ...updatedData } = updatedService;
      const serviceRef = firestore.collection("services").doc(id);
      await serviceRef.update(updatedData);
      message.success("Cập nhật thành công!");
      return updatedService;
    } catch (error) {
      return rejectWithValue(`Lỗi khi cập nhật dịch vụ: ${error}`);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    // setNewActivity: (state, action: PayloadAction<string>) => {
    //   state.newActivity = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
    builder.addCase(addNewService.fulfilled, (state, action) => {
      state.services.push(action.payload);
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      const updatedService = action.payload;
      const index = state.services.findIndex(
        (service) => service.id === updatedService.id
      );
      if (index !== -1) {
        state.services[index] = updatedService;
      }
    });
  },
});

// export const { setNewActivity } = serviceSlice.actions;
// export const selectNewActivity = (state: RootState) => state.newActivity;
export default serviceSlice.reducer;
