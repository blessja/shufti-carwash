import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import staffService from './staffService'

// Get staff from localStorage
const staff = JSON.parse(localStorage.getItem('staff'))

const initialState = {
  staff: staff ? staff : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register staff
export const register = createAsyncThunk(
  'staff/register',
  async (staff, thunkAPI) => {
    try {
      return await staffService.register(staff)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login staff
export const login = createAsyncThunk('staff/login', async (staff, thunkAPI) => {
  try {
    return await staffService.login(staff)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutStaff = createAsyncThunk('staff/logout', async () => {
  await staffService.logoutStaff()
})

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    resetStaff: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.staff = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.staff = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.staff = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.staff = null
      })
      .addCase(logoutStaff.fulfilled, (state) => {
        state.staff = null
      })
  },
})

export const { resetStaff } = staffSlice.actions
export default staffSlice.reducer
