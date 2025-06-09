import { useEffect, useRef } from 'react';
import { AuthenticationService } from './AuthenticationService';

const REFRESH_BUFFER_SECONDS = 60;

export const useTokenRefresh = () => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    useEffect(() => {
        const scheduleRefresh = () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;
            
            const expiry = AuthenticationService.getTokenExpiry(token);
            const now = Math.floor(Date.now() / 1000);
            const delayMilliseconds = (expiry - now - REFRESH_BUFFER_SECONDS) * 1000;

            console.log('-------- scheduleRefresh');
            console.log(expiry);
            console.log(delayMilliseconds);
            
            if (delayMilliseconds <= 0) {
                refresh();
                return;
            }
            
            timeoutRef.current = setTimeout(refresh, delayMilliseconds);
        };
        
        const refresh = async () => {
            const success = await AuthenticationService.refreshTokens();
            console.log('refresh token', success);
            if (success) {
                scheduleRefresh();
            } else {
                AuthenticationServiceredirectToLogin();
            }
        };
        
        scheduleRefresh();
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);
};
