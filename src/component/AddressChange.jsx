import React, { useState, useEffect, useRef, useCallback } from "react";
import "../style/addressChange.style.css"; // Ensure correct path

const AddressChange = ({ setAddress }) => {
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const togglePostcode = useCallback(() => {
        setIsPostcodeOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        if (isPostcodeOpen && elementRef.current) {
            window.daum.postcode.load(() => {
                new window.daum.Postcode({
                    oncomplete: (data) => {
                        let fullAddress = data.address;
                        const extraAddress = data.extraAddress
                            ? ` (${data.extraAddress})`
                            : "";
                        if (data.userSelectedType === "R") {
                            fullAddress += extraAddress;
                        }
                        setAddress(fullAddress);
                        togglePostcode();
                    },
                    width: "100%",
                    height: "100%",
                }).embed(elementRef.current);
            });
        } else if (elementRef.current) {
            elementRef.current.innerHTML = "";
        }
    }, [isPostcodeOpen, setAddress, togglePostcode]);

    return (
        <div style={{ position: "relative" }}>
            <div className="address-change-container">
                <button className="change-button" onClick={togglePostcode}>
                    지역 선택 {"▾"}
                </button>
                <div>수도권과 부산은 하루배송 가능 지역입니다.</div>
            </div>
            <div
                className={`postcode-widget ${isPostcodeOpen ? "open" : ""}`}
                ref={elementRef}
            ></div>
        </div>
    );
};

export default AddressChange;
