import userReducer, { logOut } from './auth/authSlice'
import {
    authenticatedUser,
    signinUser,
    signupUser
} from './auth/authThunks'
import {
    SigninCredentials,
    SignupCredentials,
    UserState
} from './auth/types'

import bookingReducer from './booking/bookingSlice'
import {
    createBooking,
    deleteBooking,
    getAllBookings
} from './booking/bookingThunks'
import { BookingState } from './booking/types'

import tripReducer from './trip/tripSlice'
import {
    getAllTrips,
    getOneTrip
} from './trip/tripThunks'
import { TripState } from './trip/type'



export {
    authenticatedUser,
    signinUser,
    signupUser,
    logOut,
    userReducer,
    type SigninCredentials,
    type SignupCredentials,
    type UserState,

    bookingReducer,
    createBooking,
    deleteBooking,
    getAllBookings,
    type BookingState,

    tripReducer,
    getAllTrips,
    getOneTrip,
    type TripState,
}