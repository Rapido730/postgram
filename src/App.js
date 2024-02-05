import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard.js";
import HomePage from "./components/HomePage.js";
import Cookies from "js-cookie";
import Navigation from "./components/Navigation.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import {
  Route,
  Routes,
  redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { getUser } from "./services/user.js";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "./reduxStore/reducers/user.js";

function App() {
  const Dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("token");
    // //console.log(jwtToken);
    getUser(jwtToken).then(({ user, message }) => {
      if (user) {
        Dispatch(SetUser({ ...user, token: jwtToken }));
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route
            path="posts/*"
            element={
              User ? (
                <Dashboard />
              ) : (
                <div>
                  Login first{" "}
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </button>
                </div>
              )
            }
          ></Route>
          <Route
            path="signup/"
            element={!User ? <Signup /> : <Navigate to="/posts" />}
          />
          <Route
            path="login/"
            element={!User ? <Login /> : <Navigate to="/posts" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
