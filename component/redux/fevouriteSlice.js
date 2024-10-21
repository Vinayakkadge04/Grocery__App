import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  fevourite: "",
 
}

export const authSlice = createSlice({
  name: 'fev',
  initialState,
  reducers: {
    addfev: (state, action) => {
       
        state.fevourite = action.payload.token
       
    },
    removefev: (state) =>{
       
        state.fevourite = ""
      
    },
  },
})
// Action creators are generated for each case reducer function
export const { addfev , removefev } = authSlice.actions

export default authSlice.reducer;   