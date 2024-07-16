import { URL } from "../enums/apiRoutes";
import { CreateBooking } from "../interfaces/createBooking.interface";

const getAllBookingsApi = async () => {
    const response = await fetch(
        `${URL.API}${URL.BOOKING}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
            },
        }
    );

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return await response.json();
}


const createBookingApi = async (booking: CreateBooking) => {
    const response = await fetch(
        `${URL.API}${URL.BOOKING}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
            },
            body: JSON.stringify(booking),
        }
    );

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return await response.json();

}

const deleteBookingApi = async (id: string) => {
    const response = await fetch(
        `${URL.API}${URL.BOOKING}/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
            },
        }
    );

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return id;
}






export {
    getAllBookingsApi,
     createBookingApi,
     deleteBookingApi
}