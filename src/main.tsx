import './assets/css/styles.css'
import { router } from './router/index.tsx';
import { RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { store } from './stores/store.ts';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
