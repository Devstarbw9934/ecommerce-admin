import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from './history';

export { PrivateRoute };

function PrivateRoute({ children }: any) {
    const isAuth = useSelector((x: any) => x.auth.isAuth);
    
    if (!isAuth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/auth" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}