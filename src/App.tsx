import { redirectToLogin } from './authentication/oidc';

function App() {
    return (
        <div>
            <h1>Hello World</h1>
            <button type="button" onClick={() => redirectToLogin()}>
                redirect to login
            </button>
        </div>
    );
}

export default App;
