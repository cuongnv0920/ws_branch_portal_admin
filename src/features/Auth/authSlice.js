import { authApi } from "../../api";
import StorageKeys from "../../configs/StorageKeys.conf";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk("user/create", async (payload) => {
  // call API to register
  const data = await authApi.create(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  // call API to login
  const data = await authApi.login(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

// export const setting = createAsyncThunk("user/setting", async (payload) => {
//   // call API to setting user
//   const data = await authApi.update(payload);

//   // save data to local storage
//   localStorage.getItem(StorageKeys.TOKEN, data.jwt);
//   localStorage.getItem(StorageKeys.USER, JSON.stringify(data.user));

//   // return user data
//   return data.user;
// });

const userSlice = createSlice({
  name: "auth",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
