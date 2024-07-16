export interface Booking {
    id:         string;
    userId:     string;
    tripId:     string;
    guests:     number;
    date:       string;
    trip:       Trip;
    totalPrice: number;
    createdAt:  string;
}

export interface Trip {
    title:    string;
    duration: number;
    price:    number;
}
