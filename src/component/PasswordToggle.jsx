import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const PasswordToggle = ({ onChange, value, placeholder }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder={placeholder}
                required
                onChange={onChange}
                value={value}
                style={{ paddingRight: "2rem" }}
            />
            <span
                onClick={togglePasswordVisibility}
                style={{
                    position: "absolute",
                    right: "0.5rem",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
        </div>
    );
};

export default PasswordToggle;
