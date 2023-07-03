import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AccountState {
  id: string;
  username: string;
  hvten: string;
  email: string;
  phone: string;
  position: string;
  isActive: boolean;
}

interface firestoreState {
  account: AccountState[];
}

const initialState: firestoreState = {
  account: [],
};

export const fetchAccount = createAsyncThunk("account", async () => {
  const accountRef = firestore.collection("account");
  const snapshot = await accountRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AccountState[];
});

const deviceSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      state.account = action.payload;
    });
  },
});
export default deviceSlice.reducer;
