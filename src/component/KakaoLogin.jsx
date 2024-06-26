import React from "react";

const KakaoLogin = ({ onSuccess }) => {
    const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
    const redirect_uri =
        process.env.REACT_APP_REDIRECT_URI ||
        "https://www.jiyun-shopping.netlify.app/auth";

    console.log("Redirect URI: ", redirect_uri);
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_KEY}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <button onClick={handleKakaoLogin} className="loginBtn kakaoBtn">
            카카오톡 계정으로 로그인
        </button>
    );
};

export default KakaoLogin;
