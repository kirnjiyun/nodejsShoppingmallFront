import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import PasswordToggle from "../component/PasswordToggle"; // PasswordToggle 컴포넌트 임포트
import "../style/register.style.css";

const RegisterPage = () => {
    const error = useSelector((state) => state.user?.error || null);
    const isRegistered = useSelector(
        (state) => state.user?.isRegistered || false
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        policy: false,
    });
    const [passwordError, setPasswordError] = useState("");
    const [policyError, setPolicyError] = useState(false);

    useEffect(() => {
        if (isRegistered) {
            navigate("/login");
        }
    }, [isRegistered, navigate]);

    const register = (event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword, policy } = formData;

        if (password !== confirmPassword) {
            setPasswordError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!policy) {
            setPolicyError(true);
            return;
        }

        setPasswordError("");
        setPolicyError(false);
        dispatch(userActions.registerUser({ name, email, password }));
    };

    const handleChange = (event) => {
        const { id, value, checked } = event.target;
        id === "policy"
            ? setFormData({ ...formData, [id]: checked })
            : setFormData({ ...formData, [id]: value });
    };

    return (
        <Container className="register-area">
            {error && (
                <Alert variant="danger" className="error-message">
                    {error}
                </Alert>
            )}
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <PasswordToggle
                        placeholder="Password"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                password: event.target.value,
                            })
                        }
                        value={formData.password}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <PasswordToggle
                        placeholder="Confirm Password"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                confirmPassword: event.target.value,
                            })
                        }
                        value={formData.confirmPassword}
                        isInvalid={!!passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="이용약관에 동의합니다"
                        id="policy"
                        onChange={handleChange}
                        isInvalid={policyError}
                    />
                </Form.Group>
                <Button variant="danger" type="submit">
                    회원가입
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
