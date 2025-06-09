import React from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '../assets/styles/main.scss';

export const Route = createRootRoute({
    component: () => (
        <React.Fragment>
            <Outlet />
            <TanStackRouterDevtools />
        </React.Fragment>
    ),
});
