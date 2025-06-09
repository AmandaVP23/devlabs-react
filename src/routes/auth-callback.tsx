import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router';
import { Routes } from '../constants/routes';
import { useEffect, useRef } from 'react';
import { exchangeCodeForToken } from '../authentication/tokens';

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
        console.log('code', search.code);

        hasProcessed.current = true;

        console.log(hasProcessed.current);

        exchangeCodeForToken(search.code)
            .then((tokens) => {
                console.log(tokens);
                localStorage.setItem('access_token', tokens.access_token);
                localStorage.setItem('id_token', tokens.id_token);
                router.navigate({ to: '/' });
            })
            .catch(console.error);
    }, [search.code]);

    return <div>Hello "/callback"!</div>;
}
