import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { PrivateRoute } from '../components/Utile/PrivateRoute';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout><PrivateRoute>{route.element}</PrivateRoute></DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
