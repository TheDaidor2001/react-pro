
import { Booking as BookingInterface } from "../../interfaces/interfaces"
import { getCurrentDate } from '../../helpers/helpers';

interface Props {
    booking: BookingInterface,
    handleClick: (id: string) => void;
}

export const Booking = ({ booking, handleClick }: Props): JSX.Element => {

    const { id, date, totalPrice, guests, trip } = booking
    const { title } = trip
    return (
        <li data-test-id="booking" className="booking" key={id}>
            <h3 data-test-id="booking-title" className="booking__title">{title}</h3>
            <span data-test-id="booking-guests" className="booking__guests">
                {guests} guests
            </span>
            <span data-test-id="booking-date" className="booking__date">
                {getCurrentDate(date)}
            </span>
            <span data-test-id="booking-total" className="booking__total">
                ${totalPrice}
            </span>
            <button data-test-id="booking-cancel" className="booking__cancel" title="Cancel booking" onClick={() => handleClick(id)}>
                <span className="visually-hidden">Cancel booking</span>
                ×
            </button>
        </li>
    )
}
