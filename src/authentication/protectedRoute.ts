import { createFileRoute, type ErrorRouteComponent, type FileRoutesByPath, type RouteComponent } from '@tanstack/react-router';
import { AuthenticationService } from './AuthenticationService';

type ProtectedRouteConfig = {
    path: keyof FileRoutesByPath;
    component?: RouteComponent;
    loader?: () => Promise<unknown>;
    errorComponent?: ErrorRouteComponent;
    beforeLoad?: () => Promise<unknown> | unknown;
};

export function createProtectedRoute(config: ProtectedRouteConfig) {
    return createFileRoute(config.path)({
        ...config,
        beforeLoad: () => {
            if (!AuthenticationService.isAuthenticated()) {
                console.log('not authenticated');
                throw AuthenticationService.redirectToLogin();
            }

            return config.beforeLoad?.();
        }
    });
}
