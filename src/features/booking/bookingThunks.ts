// src/features/booking/bookingThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Booking } from '../../interfaces/bookings.interface';
import { createBookingApi,deleteBookingApi,getAllBookingsApi} from '../../api/api';
import { CreateBooking } from '../../interfaces/createBooking.interface';


export const getAllBookings = createAsyncThunk<Booking[], void, { rejectValue: string }>(
  'booking/getAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const bookings = await getAllBookingsApi();
      return bookings;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
  }
);

export const createBooking = createAsyncThunk<Booking, CreateBooking, { rejectValue: string }>(
  'booking/createBooking',
  async (booking, { rejectWithValue }) => {
    try {
      const newBooking = await createBookingApi(booking);
      return newBooking;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteBooking = createAsyncThunk<string, string, { rejectValue: string }>(
  'booking/deleteBooking',
  async (id, { rejectWithValue }) => {
    try {
      const deletedId = await deleteBookingApi(id);
      return deletedId;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
  }
);
