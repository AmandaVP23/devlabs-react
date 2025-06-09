import { OIDC_CONFIG } from './config';
import axios from 'axios';
import { PKCEService } from './PKCEService';

export class AuthenticationService {
    public static isAuthenticated() {
        const token = localStorage.getItem('access_token');
        if (!token) return false;

        return !AuthenticationService.isTokenExpired(token);
    }

    public static getTokenExpiry(token: string): number {
        try {
            const [, payload] = token.split('.');
            const decoded = JSON.parse(atob(payload));
    
            return decoded.exp;
        } catch {
            return 0;
        }
    };

    public static isTokenExpired(token: string): boolean {
        const now = Math.floor(Date.now() / 1000);
        return AuthenticationService.getTokenExpiry(token) < now;
    };

    public static async refreshTokens(): Promise<boolean> {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return false;

        try {
            const requestBody = new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: OIDC_CONFIG.clientId,
                refresh_token: refreshToken,
            });

            const requestUrl = `${OIDC_CONFIG.authority}/protocol/openid-connect/token`;

            const response = await axios.post(requestUrl, requestBody, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const { access_token, id_token, refresh_token } = response.data;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('id_token', id_token);
            localStorage.setItem('refresh_token', refresh_token);

            return true;
        } catch (error) {
            console.warn('Refresh token invalid or expired');
            console.log(error);
            return false;
        }
    }

    public static async ensureValidSession(): Promise<boolean> {
        const token = localStorage.getItem('access_token');
    
        if (token && !AuthenticationService.isTokenExpired(token)) {
            return true;
        }
    
        const refreshed = await AuthenticationService.refreshTokens();
        console.log('refreshed', refreshed);
    
        if (refreshed) {
            return true;
        }
    
        AuthenticationService.redirectToLogin();
        return false;
    }

    public static storeTokens(tokens: any) {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('id_token', tokens.id_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
    }

    public static async redirectToLogin(): Promise<void> {
        const codeChallenge = await PKCEService.genegeratePKCE();
    
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

    public static async exchangeCodeForToken(code: string): Promise<any> {
        const verifier = PKCEService.getVerifier();
    
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
    }

    public static logout() {
        const idToken = localStorage.getItem('id_token');
        AuthenticationService.cleanLocalTokens();
      
        const params = new URLSearchParams({
            post_logout_redirect_uri: window.location.origin,
        });
      
        if (idToken) {
            params.set('id_token_hint', idToken);
        }
      
        window.location.href = `${OIDC_CONFIG.authority}/protocol/openid-connect/logout?${params}`;
    }

    public static cleanLocalTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('refresh_token');
    }
}
