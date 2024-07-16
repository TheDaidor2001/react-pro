export interface CreateBooking {
    tripId: string;
    guests: number;
    date:   Date | string;
}
