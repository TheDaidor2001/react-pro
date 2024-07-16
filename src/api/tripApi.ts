import { URL } from "../enums/apiRoutes";


const getAllTripsApi = async () => {
    const response = await fetch(
        `${URL.API}${URL.TRIP}`,
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
    return response.json();

}

const getOneTripApi = async (id: string) => {
    const response = await fetch(
        `${URL.API}${URL.TRIP}/${id}`,
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


export {
    getAllTripsApi,
    getOneTripApi,
}