import { Fragment, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../reduxStore/reducers/user";
import Cookies from "js-cookie";

const Navigation = () => {
  const User = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log({ User });
  }, [User]);

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
          <img
            src={process.env.PUBLIC_URL + "postgram_logo.png"}
            alt="postgram"
          ></img>
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
