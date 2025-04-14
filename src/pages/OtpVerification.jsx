import { useState } from "react";
import "../styles/OtpVerification.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { server } from "@/config";

const OtpVerification = () => {

  const { email } = useParams();

  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box after give one digit
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // when we click backspace move to previous box
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const data = {
      email,
      otp: enteredOtp,
    };
    await axios
      .post(`${server}/api/v1/user/otp-verification`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };


  return (
    <>
      <div className="otp-verification-page">
        <div className="otp-container">
          <h1>OTP Verification</h1>
          <p>Enter the 5-digit OTP sent to your registered email or phone.</p>
          <form onSubmit={handleOtpVerification} className="otp-form">
            <div className="otp-input-container">
              {otp.map((digit, index) => {
                return (
                  <input
                  id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="otp-input"
                  />
                );
              })}
            </div>
            <button type="submit" className="verify-button">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
