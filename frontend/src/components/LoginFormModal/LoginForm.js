import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import '../LoginFormModal/LoginForm.css'

function LoginForm({ setShowLoginModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let isError = false;
        dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                console.log("printing data...." + data.statusCode);
                if (data && data.errors) setErrors(data.errors);
                else if (data && data.statusCode === 401) setErrors([data.message]);
                isError = true;
            })
            .then(() => {
                // console.log("data...." + data.statusCode);
                if (!isError) setShowLoginModal(false);
            })




         setErrors([]);
    }



    return (
        <>



            <div className="login-form-div">

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-header">
                        <div className="log-in"> Log in</div>
                        <div className="wel-title">Welcome to Aircnc</div>
                    </div>
                    <div className="errors-div">
                        <ul>
                            {errors?.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="input-info">
                        <div className="input-username">
                            <div className="input-m" >
                                Username or Email
                            </div>
                            <input
                                placeholder=" Username or Email"
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />

                        </div>

                        <div className="input-password" >
                            <label htmlfor="input-p">
                                <div className="input-m" >
                                    Password
                                </div>
                            </label>
                            <input id="input-p"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                    </div>
                    <div className="login-button">
                        <button type="submit" className="submit-button">Log in</button>
                    </div>
                    <div className="Demo-button">
                        <button type='submit'
                            onClick={() => {
                                setCredential('Demo-lition')
                                setPassword('password')
                                //  setShowLoginModal(false)
                            }}> Demo user</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default LoginForm;
