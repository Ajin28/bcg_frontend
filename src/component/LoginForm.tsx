import { Form, Row, Col } from "react-bootstrap";
import React, { useState, FormEvent } from "react";
import { login, register, clearAuth } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const [formErrors, setFormErrors] = useState({
        passwordError: "",
        emailError: "",
    });

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    

    const handleFormChange = () => {
        // Reset error states
        setFormErrors({
            passwordError: "",
            emailError: "",
        });

        dispatch(clearAuth());
    };

    // Handling the form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error states
        setFormErrors({
            passwordError: "",
            emailError: "",
        });

        if (!email) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                emailError: "Email cannot be empty",
            }));
        }

        if (!password) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: "Password cannot be empty",
            }));
        }

        // If the form is invalid, return early
        if (!email || !password) return;

        dispatch(login({ email, password }));
        // Clear any previous errors
        setFormErrors({
            emailError: "",
            passwordError: "",
        });
    };

    return (
        <div className="form_container">
            <div className="form_content">
            <Form
                className="form"
                onChange={handleFormChange}
                onSubmit={handleSubmit}
            >
                <Form.Group as={Row} className="mb-3" controlId="email">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!formErrors.emailError}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.emailError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!formErrors.passwordError}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formErrors.passwordError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="pt-3">
                    <Col sm={{ span: 12 }}>
                        <button>Submit</button>
                    </Col>
                </Form.Group>
            </Form>
            </div>
           
        </div>
    );
};

export default LoginForm;
