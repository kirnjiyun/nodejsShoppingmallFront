import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import "../style/login.style.css";
import useScript from "./useScript";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useSelector((state) => state.user.error);

    const scriptStatus = useScript("https://accounts.google.com/gsi/client");

    useEffect(() => {
        if (scriptStatus === "ready") {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin,
            });
        }
    }, [scriptStatus]);

    const loginWithEmail = (event) => {
        event.preventDefault();
        dispatch(userActions.loginWithEmail({ email, password }));
    };

    const handleGoogleLogin = (response) => {
        console.log("구글로그인", response);
        // 여기서 구글 로그인 응답을 처리합니다.
    };

    const handleGoogleSignIn = () => {
        if (
            window.google &&
            window.google.accounts &&
            window.google.accounts.id
        ) {
            window.google.accounts.id.prompt();
        }
    };

    if (user) {
        navigate("/");
    }

    return (
        <>
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
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </Form.Group>
                    <div className="display-space-between login-button-area">
                        <Button variant="danger" type="submit">
                            Login
                        </Button>
                        <div>
                            아직 계정이 없으세요?
                            <Link to="/register">회원가입 하기</Link>{" "}
                        </div>
                    </div>

                    <div className="text-align-center mt-3">
                        <p>-sns 계정으로 로그인하기-</p>
                        <div className="bottomBox">
                            <button className="loginBtn kakaoBtn">
                                카카오톡 계정으로 로그인
                            </button>
                            {scriptStatus === "ready" && (
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="loginBtn googleBtn"
                                >
                                    구글 계정으로 로그인
                                </button>
                            )}
                            {scriptStatus !== "ready" && (
                                <button
                                    className="loginBtn googleBtn"
                                    style={{
                                        cursor: "not-allowed",
                                        opacity: 0.5,
                                    }}
                                    disabled
                                >
                                    구글 계정으로 로그인
                                </button>
                            )}
                        </div>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default Login;

// import React, { useState } from "react";
// import { Container, Form, Button, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../action/userAction";
// import { GoogleLogin } from "@react-oauth/google";
// import "../style/login.style.css";

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.user);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const error = useSelector((state) => state.user.error);

//     const loginWithEmail = (event) => {
//         event.preventDefault();
//         dispatch(userActions.loginWithEmail({ email, password }));
//     };

//     const handleGoogleLogin = async (googleData) => {
//         console.log("구글로그인", googleData);
//     };

//     if (user) {
//         navigate("/");
//     }

//     const googleButtonStyle = {
//         borderRadius: "0.25rem",
//         padding: "0.5rem 0.75rem",
//         height: "45px",
//         width: "100%",
//         backgroundColor: "#fff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "relative",
//         fontSize: "16px",
//         fontWeight: "bold",
//         textAlign: "center",
//         cursor: "pointer",
//         border: "1px solid #4185f4",
//         color: "#4285f4",
//     };

//     const googleLogoStyle = {
//         position: "absolute",
//         width: "24px",
//         height: "24px",
//         left: "14px",
//         background:
//             'url("/assets/images/login/logo_google.svg") no-repeat center center',
//         backgroundSize: "contain",
//     };

//     return (
//         <>
//             <Container className="login-area">
//                 {error && (
//                     <div className="error-message">
//                         <Alert variant="danger">{error}</Alert>
//                     </div>
//                 )}
//                 <Form className="login-form" onSubmit={loginWithEmail}>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             required
//                             onChange={(event) => setEmail(event.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Password"
//                             required
//                             onChange={(event) =>
//                                 setPassword(event.target.value)
//                             }
//                         />
//                     </Form.Group>
//                     <div className="display-space-between login-button-area">
//                         <Button variant="danger" type="submit">
//                             Login
//                         </Button>
//                         <div>
//                             아직 계정이 없으세요?
//                             <Link to="/register">회원가입 하기</Link>{" "}
//                         </div>
//                     </div>

//                     <div className="text-align-center mt-3">
//                         <p>-sns 계정으로 로그인하기-</p>
//                         <div className="bottomBox">
//                             <button className="loginBtn kakaoBtn">
//                                 카카오톡 계정으로 로그인
//                             </button>
//                             <GoogleLogin
//                                 onSuccess={handleGoogleLogin}
//                                 onFailure={() => {
//                                     console.log("Login Failed");
//                                 }}
//                                 render={(renderProps) => (
//                                     <button
//                                         onClick={renderProps.onClick}
//                                         disabled={renderProps.disabled}
//                                         style={googleButtonStyle}
//                                     >
//                                         <span style={googleLogoStyle}></span>
//                                         구글 계정으로 로그인
//                                     </button>
//                                 )}
//                             />
//                         </div>
//                     </div>
//                 </Form>
//             </Container>
//         </>
//     );
// };

// export default Login;
