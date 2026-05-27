import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/api";

import "../styles/login.css";

import car from "../assets/car.svg";
import vector from "../assets/vector.svg";



function Login() {

  //form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  //login submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // send login request to backend
      const data = await loginUser({
        username,
        password
      });


      //sumakses
      if (data.status === "success") {

        // save jwt token
        localStorage.setItem(
          "token",
          data.token
        );

        // save user info
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "auth",
          "true"
        );

        // redirect to home
        navigate("/home");

      }

      // failed login
      else {

        alert(data.message);
      }

    }

    // server error
    catch (error) {

      console.error(error);

      alert("Login error");
    }
  };


  return (
    
    <div className="login-page">
      {/* BACKGROUND */}
      <div className="illusion"></div>

      <img
        src={car}
        className="car-bg"
        alt="car"
      />

      <img
        src={vector}
        className="vector"
        alt="yellow"
      />


      {/* LOGIN CONTAINER */}
      <div className="login-container">

        <h1 className="title">
          P.Parkers
        </h1>


        {/* LOGIN FORM */}
        <form
          onSubmit={handleSubmit}
          className="login-box"
        >

          {/* FULL NAME */}
          <input

            value={username}

            onChange={(e) =>
              setUsername(e.target.value)
            }

            placeholder="Username"
          />


          {/* PASSWORD */}
          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            placeholder="Password"
          />


          {/* LOGIN BUTTON */}
          <button
            className="btnbtn"
            type="submit"
          >
            Login
          </button>

        </form>


        {/* REGISTER LINK */}
        <p>
          Don’t have an account? {" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;