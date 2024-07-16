import { createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit';

import { ROUTES } from '../enums/apiRoutes';
import { logOut } from '../features/features';

// Define el listener middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isRejectedWithValue,
    effect: async (action, listenerApi) => {
        const error = action.payload as { response?: { status: number }, status?: number };
        const status = error?.response?.status || error?.status;

        if (status === 401) {
            // Cierra sesión del usuario
            listenerApi.dispatch(logOut());

            // Navega a la página de login
            window.location.href = ROUTES.LOGIN;
        }
    },
});

export default listenerMiddleware;
