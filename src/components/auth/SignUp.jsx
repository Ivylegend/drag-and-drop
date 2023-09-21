import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./UserSignIn.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [mailmsg, setMailmsg] = useState("");
  const [passwordmsg, setPasswordmsg] = useState("");

  const history = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (email === "") {
      setMailmsg("Enter an email address");
      return;
    } else if (password === "") {
      setPasswordmsg("Enter a password");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
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
        <h2>Sign Up</h2>
        <form onSubmit={signUp}>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
