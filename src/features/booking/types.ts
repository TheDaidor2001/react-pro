// src/features/booking/types.ts

import { Booking } from '../../interfaces/bookings.interface';

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}