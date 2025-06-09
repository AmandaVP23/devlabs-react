import { APP_PORT } from '../settings';

export const OIDC_CONFIG = {
    authority: 'http://localhost:8082/realms/devlabs',
    clientId: 'devlabs-web',
    redirectUri: `http://localhost:${APP_PORT}/auth-callback`,
    responseType: 'code',
    scope: 'openid profile email',
};
