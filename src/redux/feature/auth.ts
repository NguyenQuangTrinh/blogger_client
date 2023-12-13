import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface token{
    access_token : string | undefined,
    login : boolean
}
interface DataState {
  value: token
}

const initialState: DataState = {
  value: {
    access_token : undefined,
    login: false
  },
}

export const tokenSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getToken: (state, actions: PayloadAction<token>) => {
      state.value = actions.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { getToken } = tokenSlice.actions

export default tokenSlice.reducer