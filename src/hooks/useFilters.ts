import { useState } from "react";
import { Trip } from "../interfaces/interfaces";

export function useFilters() {
    const [filters, setFilters] = useState({
        level: '',
        duration: '',
    })
    const [search, setSearch] = useState('');

    const changeFilters = (tripsData: Trip[]) => {
        return tripsData.filter((trip) => {
            const durationFilter = filters.duration;
            let matchesDuration = false;
            if (durationFilter === '') {
                matchesDuration = true;
            } else if (durationFilter === '0_x_5' && trip.duration >= 1 && trip.duration <= 5) {
                matchesDuration = true;
            } else if (durationFilter === '5_x_10' && trip.duration >= 6 && trip.duration <= 10) {
                matchesDuration = true;
            } else if (durationFilter === '10' && trip.duration >= 11) {
                matchesDuration = true;
            }

            return (
                (filters.level === '' || trip.level === filters.level) &&
                matchesDuration &&
                trip.title.toLowerCase().includes(search.toLowerCase())

            );
        });
    }

    

    return { setFilters, changeFilters, filters, setSearch, search }
}