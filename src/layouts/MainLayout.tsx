import { Outlet } from "react-router-dom"


import './mainLayouts.css'
import { Footer, Header, Loader } from "../components/components"

import ProtectedRoute from "./ProtectedRoute"
import { useEffect } from "react"
import { authenticatedUser } from "../features/auth/authThunks"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { ToastContainer } from "react-toastify"


export const MainLayout = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.users)


    useEffect(() => {
        dispatch(authenticatedUser())
    }, [dispatch])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <ToastContainer />
            <ProtectedRoute>
                <Header isLogged />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </ProtectedRoute>
        </>

    )
}

