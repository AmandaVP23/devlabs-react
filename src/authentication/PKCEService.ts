import pkceChallenge from 'pkce-challenge';


export class PKCEService {
    public static async genegeratePKCE(): Promise<string> {
        const { code_verifier, code_challenge } = await pkceChallenge();
    
        console.log('code_verifier', code_verifier);
        console.log('code_challenge', code_challenge);
    
        sessionStorage.setItem('pkce_verifier', code_verifier);
        return code_challenge;
    }

    public static getVerifier(): string {
        return sessionStorage.getItem('pkce_verifier') || '';
    }
}
