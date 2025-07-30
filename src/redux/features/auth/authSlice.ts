import { createSlice } from "@reduxjs/toolkit";

import { AuthUser } from "@/types/global";
import { RootState } from "@/redux/store";

type InitialValue = {
  user: AuthUser | null;
  token: string | null;
};

const initialState: InitialValue = {
  user: {
    name: "",
    id: "",
    role: "",
    iat: 0,
    exp: 0,
  },
  token: "",
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export const currentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
