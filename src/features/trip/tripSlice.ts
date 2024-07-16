import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllTrips, getOneTrip, TripState } from "../features";
import { Trip } from "../../interfaces/trip.interface";




const initialState: TripState = {
    trips: [],
    trip: {} as Trip,
    loading: false,
    error: null,
};



const userSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //get all trips
            .addCase(getAllTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTrips.fulfilled, (state,  action: PayloadAction<Trip[]>) => {
                state.loading = false;
                state.trips = action.payload;
            })
            .addCase(getAllTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An unexpected error occurred';
            })

            //get one trip
            .addCase(getOneTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneTrip.fulfilled, (state, action: PayloadAction<Trip>) => {
                state.loading = false;
                state.trip = action.payload;
            })
            .addCase(getOneTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An unexpected error occurred';
            })
    },
})



export default userSlice.reducer;