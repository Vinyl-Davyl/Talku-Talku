import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// From firebase docs
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RiChatSmile3Fill } from "react-icons/ri";

import Spinner from "../components/Spinner/Spinner";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // From firebase docs
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talku Talku <RiChatSmile3Fill /></span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="onboard-button" disabled={loading}> 
            {loading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              "Sign In"
            )}
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
