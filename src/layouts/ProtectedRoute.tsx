import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ROUTES } from '../enums/apiRoutes';
import { logOut } from '../features/auth/authSlice';
import { authenticatedUser } from '../features/auth/authThunks';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { user } = useAppSelector(state => state.users);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            if (location.pathname !== ROUTES.LOGIN && location.pathname !== ROUTES.REGISTER) {
                localStorage.setItem('redirectAfterLogin', location.pathname);
                dispatch(logOut());
                navigate(ROUTES.LOGIN);
            }
        } else {
            if (!user) {
                dispatch(authenticatedUser())
                    .unwrap()
                    .then(() => {
                        const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
                        if (redirectAfterLogin) {
                            navigate(redirectAfterLogin);
                            localStorage.removeItem('redirectAfterLogin');
                        } else {
                            navigate(ROUTES.HOME);
                        }
                    })
                    .catch(() => {
                        dispatch(logOut());
                        navigate(ROUTES.LOGIN);
                    });
            }
        }
    }, [dispatch, navigate, location.pathname, user]);

    useEffect(() => {
        if (user) {
            if (location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER) {
                navigate(ROUTES.HOME);
            } else {
                localStorage.setItem('redirectAfterLogin', location.pathname);
            }
        }
    }, [location.pathname, user, navigate]);

    return <>
        {children}
    </>;
};

export default ProtectedRoute;