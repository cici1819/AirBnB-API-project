import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../LoginFormModal/LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                console.log("printing data...." + data.statusCode);
                if (data && data.errors) setErrors(data.errors);
                if (data && data.statusCode === 401) setErrors([data.message]);
            }
        );
        // console.log ("?????????????????????", user)

        // return user;

    };

    return (
        <>
            <div className="header">
                Log in
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="input-info">
                    <label>

                    </label>
                    <input
                        placeholder=" Username or Email"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </div>
                <div className="input-password">
                    <label>

                    </label>
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login-button">
                    <button type="submit" className="submit-button">Log in</button>
                </div>
                <div className="Demo-button">
                    <button type='submit'
                        onClick={() => {
                            setCredential('Demo-lition')
                            setPassword('password')
                        }}> Demo user</button>
                </div>
            </form>
        </>
    );
}

export default LoginForm;
