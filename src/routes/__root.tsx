import React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Routes } from '../constants/routes';

export const Route = createRootRoute({
    component: () => (
        <React.Fragment>
            <div>
                <Link to={Routes.Index}>Home</Link>
            </div>
            <Outlet />
            <TanStackRouterDevtools />
        </React.Fragment>
    ),
});
