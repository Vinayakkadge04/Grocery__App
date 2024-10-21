import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
  customer: ""
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    login: (state, action) => {
        state.customer = action.payload.customer
    },
    logout: (state) =>{
        state.customer = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = customerSlice.actions

export default customerSlice.reducer;   