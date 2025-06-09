import { OIDC_CONFIG } from './config';
import { getVerifier } from './pkce';
import axios from 'axios';

export const exchangeCodeForToken = async (code: string) => {
    const verifier = getVerifier();

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: OIDC_CONFIG.clientId,
        code,
        redirect_uri: OIDC_CONFIG.redirectUri,
        code_verifier: verifier,
    });

    const response = await axios.post(
        `${OIDC_CONFIG.authority}/protocol/openid-connect/token`,
        body,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    
    return response.data;
};
