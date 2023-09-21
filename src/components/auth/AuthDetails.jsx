import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./UserSignIn.css";

const AuthDetails = () => {
    const [authuser, setAuthuser] = useState(null);

    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthuser(user)
        } else {
            setAuthuser(null);
        }
      })

      return () => {
        listen();
      }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign out successful");
        }).catch(error => console.log(error))
    }
    
  return <div className="signout">
    { authuser ? <><p>{`Signed In as ${authuser.email}`}</p> <Link to={"/"}><button onClick={userSignOut}>Sign Out</button></Link> </>  : <p>Signed Out</p>}
  </div>;
};

export default AuthDetails;
