import { Booking, Loader } from "../components/components";
import { useCallback, useEffect } from "react"



import '../assets/css/booking.css';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { deleteBooking, getAllBookings } from "../features/booking/bookingThunks";

import { toast } from "react-toastify";

export const Bookings = () => {

    const dispatch = useAppDispatch();
    const { bookings, loading } = useAppSelector(store => store.bookings);
    const sortedBookings = [...bookings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const handleClick = async (id: string): Promise<void> => {
        try {
            await dispatch(deleteBooking(id))
            toast.success('Booking deleted', {
                className: 'notification',
                position: 'top-right',
            })

        } catch (error) {
            toast.error((error as Error).message, {
                className: 'notification',
                position: 'top-right',
            })
        }
    }

    const getBookings = useCallback(async () => {
        try {
            const result = await dispatch(getAllBookings());

            if (getAllBookings.rejected.match(result)) {
                toast.error('Failed to fetch Trip', {
                    className: 'notification',
                    position: 'top-right'
                })
                return
            }

        } catch (error) {
            toast.error((error as Error).message, {
                className: 'notification',
                position: 'top-right'
            });
        }
    }, [dispatch]);


    useEffect(() => {
        getBookings()
    }, [getBookings])

    const bookingsData = sortedBookings.length !== 0
        ? sortedBookings.map(item => <Booking
            key={item.id}
            booking={item}
            handleClick={() => handleClick(item.id)}
        />)
        : <h2> No bookings found </h2>


    return (
        <section className="bookings-page">
            <h1 className="visually-hidden">Travel App</h1>
            <ul className="bookings__list">
                {
                    loading
                        ? <Loader />
                        : bookingsData
                }
            </ul>
        </section>
    )
}
