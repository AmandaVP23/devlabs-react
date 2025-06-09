import { useEffect, useState, type FunctionComponent } from 'react';
import Sidebar from '../components/sidebar';
import { Routes } from '../constants/routes';
import { createProtectedRoute } from '../authentication/protectedRoute';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { useTokenRefresh } from '../authentication/useTokenRefresh';

type OwnProps = {};

const IndexScreen: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {} = props;

    const [ready, setReady] = useState(false);

    useTokenRefresh();

    useEffect(() => {
        AuthenticationService.ensureValidSession().then((valid) => {
            console.log('valid', valid);
            setReady(true);
        });
    }, []);

    if (!ready) return <div>Loading...</div>;

    return (
        <div className="screen-container">
            <Sidebar />
            <h1>Hello World!</h1>
            <h2>You are authenticated!</h2>
        </div>
    );
};

// export const IndexRoute = createFileRoute(Routes.Index)({
//     component: IndexScreen,
// });

export const Route = createProtectedRoute({
    path: Routes.Index,
    component: IndexScreen,
});

// return createFileRoute(config.path)({
//     ...config,
//     beforeLoad: () => {
//         if (!isAuthenticated()) {
//             throw redirectToLogin();
//         }

//         return config.beforeLoad?.();
//     }
// });
