const ROUTES = {
    HOME: '/',
    TRIP_ID: '/trip/:tripId',
    BOOKINGS: '/bookings',
    LOGIN: '/sign-in',
    REGISTER: '/sign-up',
    AUTHENTICATED_USER: '/authenticated-user'
} as const;

const URL = {
    API: import.meta.env.VITE_API_URL,
    AUTH: '/auth',
    BOOKING: '/bookings',
    TRIP: '/trips'
}


export {
    ROUTES,
    URL
}