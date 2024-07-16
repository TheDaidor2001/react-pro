import { Trip } from "../../interfaces/trip.interface";

export interface TripState {
    trips:Trip[];
    trip: Trip;
    loading: boolean;
    error: null | string;
}
