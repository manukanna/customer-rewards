import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/custome-styles.scss";

export const CustomerLogin = () => {
  const navigate = useNavigate();
  const [userLoginInfo, setUserLoginInfo] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [userLoogedIn, setUserLoogedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserLoogedIn(true);
    const isValid =
      userLoginInfo.userEmail === "customer-rewards@points.com" &&
      userLoginInfo.userPassword === "Rewards!123";
    // Simulating an API call to validate user credentials added a delay of 3 seconds to show the loading spinner
    setTimeout(() => {
      if (isValid) {
        const uniqueId = Math.floor(10000 + Math.random() * 90000);
        localStorage.setItem("customerRewardsUserId", uniqueId);
        navigate("/customer-rewards");
        setUserLoginInfo({
          userEmail: "",
          userPassword: "",
        });
      } else {
        setShowError(true);
        // added setTimeout to hide the error message after 3 seconds
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
      setUserLoogedIn(false);
    }, 3000);
  };

  const handleUserInfoChange = (e) => {
    setUserLoginInfo({ ...userLoginInfo, [e.target.name]: e.target.value });
  };

  let emailId;
  let emailChars = /^([a-z._\d-]+)@([a-z\d]+)\.([a-z]{2,8})$/;
  let emailValid = userLoginInfo.userEmail;
  if (emailValid === "") {
    emailId = <div></div>;
  } else if (emailValid.match(emailChars)) {
    emailId = <div></div>;
  } else {
    emailId = (
      <div className="text-danger">Please enter a valid email address.</div>
    );
  }

  let userPassword;
  let passwordValid = userLoginInfo.userPassword;
  if (passwordValid === "") {
    userPassword = <div></div>;
  } else if (passwordValid.length >= 8) {
    userPassword = <div></div>;
  } else {
    userPassword = (
      <div className="text-danger">
        Password must be at least 8 characters long
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center customer-login-container">
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mx-auto">
            <div className="card-body">
              <div className="customer-login text-center">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <input
                      className="form-control"
                      type="email"
                      name="userEmail"
                      value={userLoginInfo.userEmail}
                      onChange={handleUserInfoChange}
                      placeholder="Email"
                    />
                    <div className="text-danger text-start ps-1 mt-2 error-message">
                      {emailId}
                    </div>
                  </div>
                  <div className="form-group mb-2 position-relative">
                    <input
                      className="form-control"
                      type={showPassword ? "text" : "password"}
                      name="userPassword"
                      value={userLoginInfo.userPassword}
                      onChange={handleUserInfoChange}
                      placeholder="Password"
                    />
                    <div
                      className="position-absolute top-50 end-0 translate-middle-y pe-2 customer-cursor"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </div>
                    <div className="text-danger text-start ps-1 mt-2 error-message">
                      {userPassword}
                    </div>
                  </div>
                  <button
                    className="form-control btn btn-primary"
                    type="submit"
                  >
                    {!userLoogedIn ? (
                      <span>Login</span>
                    ) : (
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showError && (
        <div className="position-fixed position-absolute top-0 end-0 bg-danger text-white p-2 border border-light rounded-2">
          Invalid Credentials
        </div>
      )}
    </>
  );
};
