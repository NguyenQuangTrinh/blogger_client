import { configureStore } from '@reduxjs/toolkit'
import bloggerReducer from './feature/dataBlog'
import tokenReducer from './feature/auth'
import postReducer from './feature/post'
import postByIdReducer from './feature/postById'

export const store = configureStore({
  reducer: {
    bloggers: bloggerReducer,
    tokens: tokenReducer,
    posts: postReducer,
    postById: postByIdReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch