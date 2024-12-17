import { useState, useEffect } from "react";
import bcgLogo from "../assets/bcg.png";
import LoginForm from "../component/LoginForm";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

import "./Page.scss";

function AuthPage() {
    const dispatch = useAppDispatch();
    const { loading, error, auth } = useAppSelector(
        (state: RootState) => state.auth
    );
    const [form, showForm] = useState<"login" | "register" | null>(null);

    if (auth) {
        return <Navigate to="/" />;
    }
    
    let form_container = null;
    if (form == "login") {
        form_container = <LoginForm />;
    }
    if (form == "register") {
        form_container = <LoginForm />;
    }

    return (
        <div className="page_container">
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={bcgLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            <h1>Price Optimization Tool</h1>

            <p className="subtext">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="button_group">
                <button onClick={() => showForm("login")}>Login</button>

                <button onClick={() => showForm("register")}>Register</button>
            </div>

            {form_container}
        </div>
    );
}

export default AuthPage;
