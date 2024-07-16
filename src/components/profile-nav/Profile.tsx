import { Button } from '../components';
import { ROUTES } from '../../enums/apiRoutes';
import { useAppSelector } from '../../hooks/useSelector';
import { useAppDispatch } from '../../hooks/useDispach';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


interface Props {
    user: string;
}

export const Profile = ({ user }: Props): JSX.Element => {

    const { user: userData } = useAppSelector(store => store.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        dispatch(logOut())
        navigate(ROUTES.LOGIN)
    }

    return (
        <div data-test-id="header-profile-nav" className="nav-header__inner profile-nav" tabIndex={0}>
            <span className="visually-hidden">Profile</span>
            <img src={user} alt="profile" />
            <ul data-test-id="header-profile-nav-list" className="profile-nav__list">
                <li data-test-id="header-profile-nav-username" className="profile-nav__item">
                    {userData?.fullName}
                </li>
                <li className="profile-nav__item">
                    <Button
                        type='button'
                        data_test_id="header-profile-nav-sign-out"
                        to={ROUTES.LOGIN}
                        text="Sign Out"
                        className="profile-nav__sign-out button"
                        onClick={handleLogOut}
                    />
                </li>
            </ul>
        </div>
    )
}



