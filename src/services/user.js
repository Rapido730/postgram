import axios from "axios";

const Server_URL = process.env.REACT_APP_SERVER_URL;
//console.log(Server_URL);

export const getUser = async (token) => {
  try {
    const response = await axios.post(Server_URL + "user/getuser", { token });

    if (response.status === 200) {
      return { user: response.data.User, message: "" };
    } else {
      return { user: null, message: response.data.message };
    }
  } catch (error) {
    return { user: null, message: error.message };
  }
};
