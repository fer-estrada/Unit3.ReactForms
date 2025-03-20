import { useState } from "react";

const SignUpForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    
    async function handleSubmit(e) {
        e.preventDefault()

        if (password.length < 8) {
            setError('Password is too short - 8 or more characters required');
            return;
        }

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username, password })
            });
            const json = await response.json();
            if (json.token) {
                setToken(json.token)
                setUsername('')
                setPassword('')
                setError(null)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="formContainer">
            <h2>Sign-up Form</h2>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit} >
                <label>Username: <input value={username} onChange={(e) => setUsername(e.target.value)} /></label><br />
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br /><br />
                <button>Submit</button>
            </form>
        </div>
    );
}
export default SignUpForm;