import { Fragment, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../reduxStore/reducers/user";
import Cookies from "js-cookie";

const Navigation = () => {
  const User = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    Cookies.remove("token");
    Dispatch(SetUser(null));
    navigate("/");
  };

  return (
    <Fragment>
      <header id="Navigation">
        <figure>
          <div></div>
        </figure>
        {User && (
          <h3 onClick={logoutHandler}>
            {"Welcome, " + User.name.split(" ")[0]}
          </h3>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </Fragment>
  );
};

export default Navigation;
