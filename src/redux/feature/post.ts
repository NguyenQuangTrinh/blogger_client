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
    deletePostById: (state, actions: PayloadAction<any>) => {
      const index = state.value?.items.findIndex((items) => items.post_user_info.postId == actions.payload.id);
      console.log(index);
      if (index != -1) {
        state.value?.items.splice(index, 1);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getPost, deletePostById } = postSlice.actions

export default postSlice.reducer