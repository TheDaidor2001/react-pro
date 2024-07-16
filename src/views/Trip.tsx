

import '../assets/css/trip.css'
import { Button, Loader, Modal } from "../components/components";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getOneTrip } from '../features/features';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { toast } from 'react-toastify';
import { isEmpty } from '../helpers/objectIsEmpty';


export const Trip = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { trip, loading } = useAppSelector(store => store.trips)

    const { tripId } = useParams();

    const getTrip = useCallback(async (tripId: string) => {
        try {
            const result = await dispatch(getOneTrip(tripId));

            if (getOneTrip.rejected.match(result)) {
                toast.error(result.payload, {
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
        if (tripId) {
            getTrip(tripId)
        }
    }, [tripId, getTrip]);


    if (isEmpty(trip) && !loading) {
        return <h1 className='trip_not-found'>Trip not found</h1>
    }



    const { image, title, price, description, duration, level } = trip


    const handleButtonClick = () => {
        setIsModalVisible(!isModalVisible);
    };




    return (
        <section className="trip-page">
            <h1 className="visually-hidden">Travel App</h1>
            {
                loading
                    ? <Loader />
                    : <div className="trip">
                        <img data-test-id="trip-details-image" src={image} className="trip__img" alt="trip photo" />
                        <div className="trip__content">
                            <div className="trip-info">
                                <h3 data-test-id="trip-details-title" className="trip-info__title">
                                    {title}
                                </h3>
                                <div className="trip-info__content">
                                    <span data-test-id="trip-details-duration" className="trip-info__duration">
                                        <strong>{duration}</strong> days
                                    </span>
                                    <span data-test-id="trip-details-level" className="trip-info__level">
                                        {level}
                                    </span>
                                </div>
                            </div>
                            <div data-test-id="trip-details-description" className="trip__description">
                                {description}
                            </div>
                            <div className="trip-price">
                                <span>Price</span>
                                <strong data-test-id="trip-details-price-value" className="trip-price__value">
                                    ${price}
                                </strong>
                            </div>
                            <Button
                                data_test_id="trip-details-button"
                                className="trip__button button"
                                onClick={handleButtonClick}
                                to=""
                                text="Book a trip"
                                type="button"
                            />

                        </div>
                    </div>
            }
            <Modal
                handleButtonClick={handleButtonClick}
                isModalVisible={isModalVisible}
                trip={trip}
            />

        </section>

    )
}
