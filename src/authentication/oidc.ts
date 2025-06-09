import { OIDC_CONFIG } from './config';
import { genegeratePKCE } from './pkce';

export const redirectToLogin = async () => {
    const codeChallenge = await genegeratePKCE();

    const params = new URLSearchParams({
        client_id: OIDC_CONFIG.clientId,
        redirect_uri: OIDC_CONFIG.redirectUri,
        response_type: OIDC_CONFIG.responseType,
        scope: OIDC_CONFIG.scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
    });

    window.location.href = `${OIDC_CONFIG.authority}/protocol/openid-connect/auth?${params}`;
};
