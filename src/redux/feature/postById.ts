import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostById } from '../../Object/pot'


interface DataState {
  value: PostById | null
}

const initialState: DataState = {
  value: null,
}

export const postByIdSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getPostByIds: (state, actions: PayloadAction<PostById>) => {
      state.value = actions.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { getPostByIds } = postByIdSlice.actions

export default postByIdSlice.reducer