
import '../assets/css/home.css'
import { CardTrip, Input, Loader, Select } from '../components/components';
import { useFilters } from '../hooks/hooks';
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAllTrips } from '../features/trip/tripThunks';
import { toast } from 'react-toastify';


export const Home = (): JSX.Element => {

    const { changeFilters, setFilters, filters, setSearch, search } = useFilters()
    const token = localStorage.getItem('token')
    const dispatch = useAppDispatch()
    const { trips, loading, error } = useAppSelector(state => state.trips)
    const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, level: e.target.value })
    }

    const handleChangeDurantion = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, duration: e.target.value })
    }

    const handleChangeShearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }


    const getTrips = useCallback(async () => {
        try {
            const result = await dispatch(getAllTrips())

            if (getAllTrips.rejected.match(result)) {
                toast.error('Failed to fetch trips', {
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
        if (!loading && trips.length === 0 && !error && token) {
            getTrips()
        }
    }, [loading, trips, getTrips, error, token]);



    const filterData = changeFilters(trips)
    const tripsData = filterData.length > 0 ? filterData.map((trip) => <CardTrip key={trip.id} trip={trip} />) : <h2>No trips found</h2>

    return (
        <>
            <h1 className="visually-hidden">Travel App</h1>
            <section className="trips-filter">
                <h2 className="visually-hidden">Trips filter</h2>
                <form className="trips-filter__form" autoComplete="off">
                    <label className="trips-filter__search input">
                        <span className="visually-hidden">Search by name</span>
                        <Input
                            data_test_id="filter-search"
                            name="search"
                            type="search"
                            placeholder="search by title"
                            value={search}
                            onChange={handleChangeShearch}
                            className='filter-search'
                        />
                    </label>
                    <label className="select">
                        <span className="visually-hidden">Search by duration</span>
                        <Select
                            data_test_id='filter-duration'
                            name='duration'
                            onChange={handleChangeDurantion}
                        >
                            <option value="">duration</option>
                            <option value="0_x_5"> 5 days</option>
                            <option value="5_x_10"> 10 days</option>
                            <option value="10">≥ 10 days</option>
                        </Select>

                    </label>
                    <label className="select">
                        <span className="visually-hidden">Search by level</span>
                        <Select
                            data_test_id='filter-level'
                            name='level'
                            onChange={handleChangeLevel}
                        >
                            <option value="">level</option>
                            <option value="easy">easy</option>
                            <option value="moderate">moderate</option>
                            <option value="difficult">difficult</option>
                        </Select>
                    </label>
                </form>
            </section>
            <section className="trips">
                <h2 className="visually-hidden">Trips List</h2>
                <ul className="trip-list">
                    {
                        loading
                            ? <Loader />
                            : tripsData
                    }
                </ul>
            </section>
        </>
    )
}

