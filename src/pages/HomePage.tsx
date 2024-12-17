import { useState, useEffect } from "react";
import bcgLogo from "../assets/bcg.png";
import LoginForm from "../component/LoginForm";
import { Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { FaBoxes, FaTags } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import "./Page.scss";
import "./HomePage.scss";

function HomePage() {
    const [form, showForm] = useState<"login" | "register" | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error, auth } = useAppSelector(
        (state: RootState) => state.auth
    );

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

            <div className="card_container">
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <FaBoxes className="top" />

                        <Card.Title>Create and Manage Product</Card.Title>

                        <Card.Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna
                        </Card.Text>
                        <div>
                            
                        </div>
                        <GoArrowRight
                            className="bottom"
                            onClick={() => navigate("/product")}
                        />
                    </Card.Body>
                </Card>

                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <FaTags className="top" />
                        <Card.Title>Price Optimization</Card.Title>

                        <Card.Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna
                        </Card.Text>
                        <GoArrowRight className="bottom" />
                    </Card.Body>
                </Card>
            </div>

            {form_container}
        </div>
    );
}

export default HomePage;
