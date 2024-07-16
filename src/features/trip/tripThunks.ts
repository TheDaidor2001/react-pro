import { createAsyncThunk } from "@reduxjs/toolkit";
import { Trip } from "../../interfaces/trip.interface";
import { getAllTripsApi, getOneTripApi } from "../../api/api";

const getAllTrips = createAsyncThunk<
    Trip[],
    void,
    { rejectValue: string; }
>(
    'trip/getAllTrips',
    async (_, { rejectWithValue }) => {
       try {
            const data = await getAllTripsApi() 
            return data as Trip[];
       } catch (error) {
            return rejectWithValue((error as Error).message);
       }
    }
)

const getOneTrip = createAsyncThunk<
    Trip,
    string | undefined,
    { rejectValue: string; }
> (
    'trip/getOneTrip',
    async (id, { rejectWithValue }) => {
        try{
            if(!id) {
                return rejectWithValue('This Trip does not exists');
            }

            const data = await getOneTripApi(id!)
            return data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)

export {
    getAllTrips,
    getOneTrip
}
