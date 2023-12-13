import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bloggers } from '../../Object/blogger'

export interface DataState {
  value: Bloggers[]
}

const initialState: DataState = {
  value: [],
}

export const bloggerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getAllBlogger: (state, actions: PayloadAction<Bloggers[]>) => {
      state.value = actions.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { getAllBlogger } = bloggerSlice.actions

export default bloggerSlice.reducer