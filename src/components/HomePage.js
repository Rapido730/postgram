import { Fragment } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <h3> For Indian Users Only</h3>
        <h1>Start posting anonymously where no one will judge.</h1>
        <h3>Welcome to Stranger discussion forum</h3>
      </div>
      <div>
        <button>
          <h4>Create Your Account</h4>
          <img
            src={process.env.PUBLIC_URL + "arrow-right-solid.svg"}
            alt=""
          ></img>
        </button>

        <h4>Already have Account? Login</h4>
      </div>
    </Fragment>
  );
};

export default HomePage;
