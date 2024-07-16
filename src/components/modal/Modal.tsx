
import './modal.css'
import { CreateBooking, Trip } from '../../interfaces/interfaces';
import { Button, Input } from '../components';
import { ROUTES } from "../../enums/apiRoutes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks/useDispach';
import { createBooking } from '../../features/booking/bookingThunks'
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/useSelector';


interface Props {
    isModalVisible: boolean;
    handleButtonClick: () => void;
    trip: Trip;
}

export const Modal = ({ handleButtonClick, isModalVisible, trip }: Props): JSX.Element => {
    const { title, price, level, duration, id } = trip
    const [total, setTotal] = useState(price)

    const navigate = useNavigate();

    const [date, setDate] = useState('')
    const [guests, setGuests] = useState('1')

    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(store => store.bookings)



    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const bookingDate = new Date(date);
        bookingDate.setHours(0, 0, 0, 0);

        if (bookingDate <= currentDate) {
            alert('You cannot book a trip for today or a past date');
            return;
        }

        if (+guests < 1 || +guests > 10) {
            alert('The number of guests must be between 1 and 10')
            return
        }

        const booking: CreateBooking = {
            tripId: id,
            date: new Date(date).toISOString(),
            guests: +guests,
        }


        try {
            const result = await dispatch(createBooking(booking));

            if (createBooking.rejected.match(result)) {
                toast.error(result.payload, {
                    className: 'notification',
                    position: 'top-right'
                })
                return
            }
            handleButtonClick()
            navigate(ROUTES.BOOKINGS)
            toast.success('Booking created successfully', {
                className: 'notification',
                position: 'top-right'
            })
        } catch (error) {
            toast.error((error as Error).message, {
                className: 'notification',
                position: 'top-right'
            })
        }



    }

    useEffect(() => {
        setTotal(price * +guests)
    }, [guests, price])

    return (
        <div hidden={!isModalVisible}>
            <div className="modal">
                <div data-test-id="book-trip-popup" className="book-trip-popup">
                    <button data-test-id="book-trip-popup-close" className="book-trip-popup__close" onClick={handleButtonClick}>
                        ×
                    </button>
                    <form className="book-trip-popup__form" autoComplete="off" onSubmit={handleFormSubmit}>
                        <div className="trip-info">
                            <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                                {title}
                            </h3>
                            <div className="trip-info__content">
                                <span data-test-id="book-trip-popup-duration" className="trip-info__duration">
                                    <strong>{duration}</strong> days
                                </span>
                                <span data-test-id="book-trip-popup-level" className="trip-info__level">
                                    {level}
                                </span>
                            </div>
                        </div>
                        <label className="input">
                            <span className="input__heading">Date</span>
                            <Input
                                data_test_id='book-trip-popup-date'
                                name='date'
                                type='date'
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </label>
                        <label className="input">
                            <span className="input__heading">Number of guests</span>
                            <Input
                                data_test_id='book-trip-popup-guests'
                                name='guests'
                                type='number'
                                min='1'
                                max='10'
                                value={guests}
                                onChange={e => setGuests(e.target.value)}
                            />
                        </label>
                        <span className="book-trip-popup__total">
                            Total:
                            <output data-test-id="book-trip-popup-total-value" className="book-trip-popup__total-value">
                                ${total}
                            </output>
                        </span>
                        <Button
                            data_test_id='book-trip-popup-submit'
                            type='button'
                            btnType='submit'
                            className='button'
                            to=''
                            text={loading ? 'Loading...' : 'Book a trip'}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
