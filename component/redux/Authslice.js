import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: "",
  info:""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.isLoggedIn = true
        state.token = action.payload.token
        state.info = action.payload.info
    },
    logout: (state) =>{
        state.isLoggedIn = false
        state.token = ""
        state.info = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer;   