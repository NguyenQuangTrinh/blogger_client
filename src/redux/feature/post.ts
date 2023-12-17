import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../Object/post'


interface DataState {
  value: Post | null
}

const initialState: DataState = {
  value: null,
}

export const postSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getPost: (state, actions: PayloadAction<Post>) => {
      state.value = actions.payload != undefined ? actions.payload : null
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { getPost } = postSlice.actions

export default postSlice.reducer