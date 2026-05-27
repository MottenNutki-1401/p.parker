import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/api";

import "../styles/login.css";

import car from "../assets/car.svg";

function Register() {

  const [fullName, setFullName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  //navigate 
  const navigate = useNavigate();



    const handleSubmit = async (e) => {

    e.preventDefault();

    // password validation
    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    try {

      // send request to backend
      const data = await registerUser({

        full_name: fullName,

        username: username,

        password: password
      });


      // backend success
      if (data.status === "success") {

        alert(data.message);
        navigate("/login");

      }

      else {

        alert(data.message);
      }

    }

    catch (error) {

      alert("Registration failed");
    }
  };

  return (

    <div className="register-page">

      <div className="illusion"></div>

      <img
        src={car}
        className="car-bg"
        alt="car"
      />

      <div className="Register-container">

        <h1 className="title">

          Create Account

        </h1>


        <form onSubmit={handleSubmit}>

          <input

            value={fullName}

            onChange={(e) =>
              setFullName(e.target.value)
            }

            placeholder="Full Name"
          />


          <input

            value={username}

            onChange={(e) =>
              setUsername(e.target.value)
            }

            placeholder="Username"
          />


          <input

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            placeholder="Password"
          />


          <input

            type="password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }

            placeholder="Confirm Password"
          />


          <button
            className="btnbtn2"
            type="submit"
          >

            Create Account

          </button>

        </form>


        <p>

          Already have an account?{" "}

          <Link
            to="/"
            className="link"
          >

            Login here

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;