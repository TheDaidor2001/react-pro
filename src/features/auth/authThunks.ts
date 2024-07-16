// src/stores/auth/authThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

import { SignupCredentials, SigninCredentials } from '../features';
import { authenticateUserApi, signinApi, signupApi } from '../../api/api';

export const signupUser = createAsyncThunk<
  User,
  SignupCredentials,
  { rejectValue: string }
>(
  'user/signupUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const data = await signupApi(userCredentials);
      localStorage.setItem('token', JSON.stringify(data.token));
      return data as User;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signinUser = createAsyncThunk<
  User,
  SigninCredentials,
  { rejectValue: string }
>(
  'user/signinUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const data = await signinApi(userCredentials);
      localStorage.setItem('token', JSON.stringify(data.token));
      return data as User;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const authenticatedUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'user/authenticatedUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authenticateUserApi();
      return data as User;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
