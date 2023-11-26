import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/types';

// Определим тип для состояния среза
interface UserState {
  user: IUser | null,
  isAuth: boolean,
}

// Определим начальное состояние, используя этот тип
const initialState: UserState = {
  user: null,
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` будет выводить тип состояния из `initialState` аргумента
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuth = true
    },
    logout: (state) => {
      state.user = null
      state.isAuth = false
    },
  },
})

export const { login, logout } = userSlice.actions

// Другой код, такой как селекторы, может использовать импортированный `RootState` тип
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer