
import './cardTrip.css'
import { Button } from '../components'
import { Trip } from '../../interfaces/interfaces'


interface Props {
    trip: Trip
}

export const CardTrip = ({ trip }: Props): JSX.Element => {

    const {
        id,
        duration,
        image,
        level,
        price,
        title
    } = trip

    return (
        <li data-test-id="trip-card" className="trip-card">
            <img data-test-id="trip-card-image" src={image} alt="trip photo" />
            <div className="trip-card__content">
                <div className="trip-info">
                    <h3 data-test-id="trip-card-title" className="trip-info__title">
                        {title}
                    </h3>
                    <div className="trip-info__content">
                        <span data-test-id="trip-card-duration" className="trip-info__duration">
                            <strong>{duration}</strong> days
                        </span>
                        <span data-test-id="trip-card-level" className="trip-info__level">
                            {level}
                        </span>
                    </div>
                </div>
                <div className="trip-price">
                    <span>Price</span>
                    <strong data-test-id="trip-card-price-value" className="trip-price__value">
                        ${price}
                    </strong>
                </div>
            </div>
            <Button
                type='link'
                data_test_id="trip-card-link"
                to={`/trip/${id}`}
                text="Discover a trip"
                className='button'
            />
        </li>
    )
}
