import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import staffReducer from '../features/staff/staffSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    staff: staffReducer,
    
  },
})
