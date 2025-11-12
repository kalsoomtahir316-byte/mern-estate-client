import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

const saved = localStorage.getItem("user");
const initialState = {
  user: saved ? JSON.parse(saved) : null,
  status: "idle",
  error: null
};

export const register = createAsyncThunk("auth/register", async (form) => {
  const { data } = await api.post("/auth/register", form);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk("auth/login", async (form) => {
  const { data } = await api.post("/auth/login", form);
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token"); localStorage.removeItem("user");
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(register.fulfilled, (s, a) => { s.user = a.payload; s.status = "succeeded"; })
     .addCase(login.fulfilled, (s, a) => { s.user = a.payload; s.status = "succeeded"; })
     .addCase(logout.fulfilled, (s) => { s.user = null; s.status = "idle"; });
  }
});

export default slice.reducer;