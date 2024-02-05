import { useState } from "react";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { SetUser } from "../reduxStore/reducers/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Server_URL = process.env.REACT_APP_SERVER_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Field, SetField] = useState({ email: "", otp: "" });
  const [OtpCheck, SetOtpCheck] = useState({
    status: false,
    value: "",
    UserExist: true,
    IsProcessing: false,
  });
  const [Verified, SetVerified] = useState(false);
  const [Notification, SetNotification] = useState({
    IsOpen: false,
    body: "",
  });
  //   //console.log(Field);
  const OnFieldChangeHandler = (event) => {
    const { name, value } = event.target;
    // //console.log(name, value);

    SetField({ ...Field, [name]: value });
  };

  const OnFormSubmitHandler = async (event) => {
    event.preventDefault();
    SetOtpCheck((prev) => ({ ...prev, IsProcessing: true, UserExist: true }));
    if (OtpCheck.status === false) {
      try {
        const response = await axios.post(Server_URL + "user/sendotp/login", {
          email: Field.email,
        });

        if (response.status === 200) {
          SetOtpCheck({
            status: true,
            value: response.data.otp,
            IsProcessing: false,
          });
        }
      } catch ({ response }) {
        if (response.status === 401) {
          SetNotification((prev) => ({
            ...prev,
            IsOpen: true,
            body: response.data.message,
          }));
          SetOtpCheck((prev) => ({
            ...prev,
            UserExist: false,
            IsProcessing: false,
          }));

          setTimeout(() => {
            SetNotification((prev) => ({
              ...prev,
              IsOpen: false,
              body: "",
            }));
          }, 3000);
        }
      }
    } else {
      if (Field.otp !== OtpCheck.value) {
        SetNotification((prev) => ({
          ...prev,
          IsOpen: true,
          body: "Incorrect Otp.\nTry Again...",
        }));

        SetOtpCheck((prev) => ({
          ...prev,
          IsProcessing: false,
        }));

        setTimeout(() => {
          SetNotification((prev) => ({
            ...prev,
            IsOpen: false,
            body: "",
          }));
        }, 3000);
      } else {
        const response = await axios.post(Server_URL + "user/login", {
          ...Field,
        });

        if (response.status === 200) {
          SetVerified(true);
          const token = response.data.token;
          Cookies.set("token", token, { expires: 3, secure: true });
          dispatch(SetUser({ ...response.data.User, token: token }));
          // dispatch(SetUser());
        }
      }
    }
  };

  const onClickHandler = (event) => {
    navigate("/posts");
  };

  return (
    <div id="signup">
      {!Verified ? (
        <form onSubmit={OnFormSubmitHandler}>
          <img src={process.env.PUBLIC_URL + "rocket-solid.svg"} alt=""></img>
          <h3>Login Your Account</h3>
          {OtpCheck.status ? (
            <Fragment>
              <h4>
                <span>{`Please verify your email ID to continue.`}</span>
                <br />
                <span>{`We have sent an OTP to this ${Field.email}`}</span>
              </h4>

              <input
                name="otp"
                type="text"
                required
                placeholder="Enter OTP"
                value={Field.otp}
                maxLength={6}
                disabled={OtpCheck.IsProcessing}
                onChange={OnFieldChangeHandler}
              ></input>
            </Fragment>
          ) : (
            <Fragment>
              <input
                name="email"
                type="email"
                required
                placeholder="Enter Email ID"
                value={Field.email}
                disabled={OtpCheck.IsProcessing}
                onChange={OnFieldChangeHandler}
              ></input>
            </Fragment>
          )}
          {Notification.IsOpen && <p id="Notification">{Notification.body}</p>}
          <button disabled={OtpCheck.IsProcessing} type="submit">
            <h4>{OtpCheck.IsProcessing ? "Wait..." : "Continue"}</h4>
            <img
              src={process.env.PUBLIC_URL + "arrow-right-solid.svg"}
              alt=""
            ></img>
          </button>
          {!OtpCheck.UserExist && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              {" "}
              Register your account{" "}
            </p>
          )}
        </form>
      ) : (
        <div>
          <img
            src="data:image/png;base64,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"
            alt=""
          ></img>

          <h3>Account Verified Successfully</h3>
          <button onClick={onClickHandler}>
            <h4>Open Your Account</h4>
            <img
              src={process.env.PUBLIC_URL + "arrow-right-solid.svg"}
              alt=""
            ></img>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
