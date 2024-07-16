import { configureStore } from '@reduxjs/toolkit'
import listenerMiddleware from './middlewares';
import { bookingReducer, tripReducer, userReducer } from '../features/features';

export const store = configureStore({
    reducer: {
      users: userReducer,
      trips: tripReducer,
      bookings: bookingReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch




