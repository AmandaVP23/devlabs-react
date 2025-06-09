import { createFileRoute, type ErrorRouteComponent, type FileRoutesByPath, type RouteComponent } from '@tanstack/react-router';
import { isAuthenticated } from './utils';
import { redirectToLogin } from './oidc';

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
            if (!isAuthenticated()) {
                throw redirectToLogin();
            }

            return config.beforeLoad?.();
        }
    });
}
