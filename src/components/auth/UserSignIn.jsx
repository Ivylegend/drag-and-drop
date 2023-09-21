import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignIn.css";
import Landing from "../../pages/Landing";

const UserSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [mailmsg, setMailmsg] = useState("");
  const [passwordmsg, setPasswordmsg] = useState("");

  const history = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    if (email === "") {
      setMailmsg("Enter an email address");
      return;
    } else if (password === "") {
      setPasswordmsg("Enter a password");
      return;
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setLoggedIn(true);
          history("/home");
        })
        .catch((error) => {
          alert(error.code);
          seterrorMsg(error.code);
        });
      setMailmsg("");
      setPasswordmsg("");
      seterrorMsg("");
    }
  };

  return (
    <div className="app__signin">
      <div className="signin__form">
        <h1>
          Hey, <br /> Welcome Back
        </h1>
        <form onSubmit={signIn}>
          <input
            type="email"
            placeholder="enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error">{errorMsg}</p>
          <p className="error">{mailmsg}</p>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="error">{errorMsg}</p>
          <p className="error">{passwordmsg}</p>
          <button className="login__btn" type="submit">
            Login
          </button>
        </form>
        <span className="signup">
          Not signed in ?
          <Link to={"/signup"}>
            <p>Sign Up</p>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default UserSignIn;
