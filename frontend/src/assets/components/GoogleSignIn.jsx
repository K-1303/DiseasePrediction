import { useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
  const {
    email,
    setEmail,
    setPassword,
    submitLogin,
    setUsername,
    username,
    password,
    submitRegistration,
  } = useGlobalContext();

  const userObject = useRef({});
  const user_email = useRef("");
  const user_name = useRef("");
  const password_ = useRef("");

  const updaterFunction = (user_email, user_name, password) => {
    setEmail(user_email);
    setUsername(user_name);
    setPassword(password);
  };

  const handleCallback = async (response, event) => {
    console.log(response.credential);
    userObject.current = jwt_decode(response.credential);
    console.log(userObject.current);

    user_name.current = userObject.current.name;
    user_email.current = userObject.current.email;
    password_.current = response.credential.slice(0, 8);

    console.log(user_name.current);
    console.log(user_email.current);
    console.log(password_.current);

    try {
      const fetchResponse = await fetch(
        "http://127.0.0.01:8000/check_email?email=" + user_email.current
      );
      const data = await fetchResponse.json();
      console.log(data.email_exists);

      if (data.email_exists) {
        submitLogin(event);
      } else {
        submitRegistration(event);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id:
          "400096200976-8a5jsv00o9pnijg0mq64hh3oer3nnbab.apps.googleusercontent.com",
        callback: (response) => handleCallback(response, null),
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
};

export default SignIn;