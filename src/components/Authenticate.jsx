import { useState } from "react";

const Authenticate = ({ token }) => {
    const [error, setError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [data, setData] = useState(null)
    
    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`}
            });
            const json = await response.json();
            setSuccessMsg(json.message);
            setData(json.data)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
        {token && 
            <div className="authContainer">
                <h2>Authenticate</h2>
                {successMsg && <p>{successMsg}</p>}
                {data && <p>{`Username: ${data.username}`}</p>}
                {error && <p>Error: {error}</p>}
                <button onClick={handleClick} >Authenticate Token</button>
            </div>
        }
        </>
    );
}

export default Authenticate;