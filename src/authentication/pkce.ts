import pkceChallenge from 'pkce-challenge';

export const genegeratePKCE = async (): Promise<string> => {
    const { code_verifier, code_challenge } = await pkceChallenge();

    console.log('code_verifier', code_verifier);
    console.log('code_challenge', code_challenge);

    sessionStorage.setItem('pkce_verifier', code_verifier);
    return code_challenge;
}

export const getVerifier = (): string => sessionStorage.getItem('pkce_verifier') || '';
