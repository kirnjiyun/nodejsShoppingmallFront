import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import PasswordToggle from "../component/PasswordToggle";
import { GoogleLogin } from "@react-oauth/google";
import "../style/login.style.css";
import KakaoLogin from "../component/KakaoLogin";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        return () => {
            dispatch(userActions.clearErrors());
        };
    }, [dispatch]);

    const loginWithEmail = (event) => {
        event.preventDefault();
        dispatch(userActions.loginWithEmail({ email, password }));
    };

    const handleGoogleLogin = async (googleData) => {
        dispatch(userActions.loginWithGoogle(googleData.credential));
    };

    return (
        <Container className="login-area">
            {error && (
                <div className="error-message">
                    <Alert variant="danger">{error}</Alert>
                </div>
            )}
            <Form className="login-form" onSubmit={loginWithEmail}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <PasswordToggle
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <div className="display-space-between login-button-area">
                    <Button variant="danger" type="submit">
                        Login
                    </Button>
                    <div>
                        아직 계정이 없으세요?
                        <Link to="/register">회원가입 하기</Link>
                    </div>
                </div>

                <div className="text-align-center mt-3">
                    <p>-sns 계정으로 로그인하기-</p>
                    <div className="bottomBox">
                        <KakaoLogin />
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default Login;
