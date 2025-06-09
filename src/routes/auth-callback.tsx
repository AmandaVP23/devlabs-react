import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
import { Routes } from '../constants/routes';
import { useEffect, useRef } from 'react';
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
        prepare();
    }, [search.code]);

    const prepare = async () => {
        if (hasProcessed.current || !search.code) return;

        hasProcessed.current = true;

        const tokensResponse = await AuthenticationService.exchangeCodeForToken(
            search.code,
        );

        if (tokensResponse) {
            AuthenticationService.storeTokens(tokensResponse);
            router.navigate({ to: '/' });
        }
    };

    // todo - show loader here
    return <div>Hello "/callback"!</div>;
}
