import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
import { Routes } from '../constants/routes';
import { useEffect, useRef } from 'react';
import { exchangeCodeForToken } from '../authentication/tokens';
import { AuthenticationService } from '../authentication/AuthenticationService';

export const Route = createFileRoute(Routes.AuthCallback)({
    component: AuthCallbackScreen,
    validateSearch: (search) => ({
        code: typeof search.code === 'string' ? search.code : undefined,
    }),
});

function AuthCallbackScreen() {
    const search = useSearch({ from: Routes.AuthCallback });
    const router = useRouter();

    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current || !search.code) return;

        hasProcessed.current = true;

        exchangeCodeForToken(search.code)
            .then((tokens) => {
                AuthenticationService.storeTokens(tokens);
                router.navigate({ to: '/' });
            })
            .catch(console.error);
    }, [search.code]);

    return <div>Hello "/callback"!</div>;
}
