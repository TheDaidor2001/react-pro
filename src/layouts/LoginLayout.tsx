import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './loginLayout.css'
import { Footer, Header, Loader } from "../components/components"
import ProtectedRoute from "./ProtectedRoute";
import { useAppSelector } from "../hooks/useSelector";




export const LoginLayout = (): JSX.Element => {

    const { loading } = useAppSelector(store => store.users);


    if (loading) return <Loader />

    return (
        <>
            <ToastContainer />
            <ProtectedRoute>
                <Header isLogged={false} />
                <Outlet />
                <Footer />
            </ProtectedRoute>
        </>

    )
}