import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/admin.css";

import { loginUser } from "../api/api";

function AdminLoginModal({ isOpen, onClose }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  if (!isOpen) return null;

  const handleLogin = async () => {

    setError("");

    setLoading(true);

    try {

      const response =
        await loginUser({

          username: email,

          password: password

        });

      if (
        response.status ===
        "success"
      ) {

        // admin only
        if (
          response.user.role !==
          "admin"
        ) {

          setError(
            "Admin access only"
          );

          return;
        }

        // save jwt
        localStorage.setItem(
          "token",
          response.token
        );

        // save user
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.user
          )
        );

        localStorage.setItem(
          "auth",
          "true"
        );

        onClose();

        navigate("/admin");

      }

      else {

        setError(
          response.message ||
          "Login failed"
        );
      }

    }

    catch (err) {

      console.error(err);

      setError(
        "Server error or no response"
      );
    }

    finally {

      setLoading(false);
    }
  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Admin Login</h2>
        <input
          className="in"
          placeholder="Username"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          className="in"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {error && (

          <p
            style={{
              color: "red"
            }}
          >
            {error}
          </p>

        )}

        <div className="devgrp">

          <button
            className="log"
            onClick={handleLogin}
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          <button
            className="close"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminLoginModal;