import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div id="homepage">
      <div>
        <h3>
          <span>
            <img src={process.env.PUBLIC_URL + "rocket-solid.svg"} alt=""></img>
          </span>
          <span>For Indian Users Only</span>
        </h3>
        <h1>Start posting anonymously where no one will judge.</h1>
        <h3>Welcome to Stranger discussion forum</h3>
      </div>
      <div>
        <Link id="signup-link" to="/signup">
          <button>
            <h4>Create Your Account</h4>
            <img
              src={process.env.PUBLIC_URL + "arrow-right-solid.svg"}
              alt=""
            ></img>
          </button>
        </Link>

        <Link id="signin-link" to="/login">
          <h4>Already have Account? Login</h4>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
