import { createFileRoute } from '@tanstack/react-router';
import type { FunctionComponent } from 'react';
import { Routes } from '../constants/routes';
import { redirectToLogin } from '../authentication/oidc';
import { createProtectedRoute } from '../authentication/protectedRoute';

type OwnProps = {};

const IndexScreen: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {} = props;

    return (
        <div>
            <h1>Hello World</h1>
            <button type="button" onClick={() => redirectToLogin()}>
                redirect to login
            </button>
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
