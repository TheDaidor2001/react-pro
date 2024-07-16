import { createBrowserRouter } from "react-router-dom";
import { LoginLayout } from "../layouts/LoginLayout";
import { MainLayout } from '../layouts/MainLayout';
import { RedirectToHome } from "../helpers/redirectHome";
import { ROUTES } from "../enums/apiRoutes";
import { Bookings, Home, SignIn, SignUp, Trip } from '../views/views';





const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ROUTES.TRIP_ID,
        element: <Trip />
      },
      {
        path: ROUTES.BOOKINGS,
        element: <Bookings />
      }

    ]
  },
  {
    path: ROUTES.HOME,
    element: <LoginLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <SignIn />
      },
      {
        path: ROUTES.REGISTER,
        element: <SignUp />
      },
    ]

  },
  {
    path: '*',
    element: <RedirectToHome />,
  },
]);


export {
  router
}