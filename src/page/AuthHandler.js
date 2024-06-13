import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userActions } from "../action/userAction";

const AuthHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authenticate = async () => {
            const query = new URLSearchParams(location.search);
            const code = query.get("code");

            if (code) {
                try {
                    await dispatch(userActions.loginWithKakao(code));
                    navigate("/");
                } catch (error) {
                    navigate("/login");
                }
            }
        };

        authenticate();
    }, [location, dispatch, navigate]);

    return <div>Redirecting...</div>;
};

export default AuthHandler;
