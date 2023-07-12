import { firestore } from "./../../firebase/firebase";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

interface AccountState {
  id: string;
  username: string;
  hvten: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  password: string;
  confirmPwd: string;
}

interface firestoreState {
  account: AccountState[];
  currentAccount: AccountState | null;
  isLoggedIn: boolean;
}

const initialState: firestoreState = {
  account: [],
  currentAccount: null,
  isLoggedIn: false,
};

export const fetchAccount = createAsyncThunk("account", async () => {
  const accountRef = firestore.collection("account");
  const snapshot = await accountRef.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as AccountState[];
});

export const login = createAsyncThunk(
  "account/login",
  async (account: AccountState) => {
    const accountRef = firestore.collection("account");
    const query = await accountRef
      .where("email", "==", account.email)
      .where("password", "==", account.password)
      .get();

    if (query.size > 0) {
      const doc = query.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as AccountState;
    } else {
      return null;
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentAccount = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      state.account = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentAccount = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const logout = createAction("account/logout");

export default accountSlice.reducer;
