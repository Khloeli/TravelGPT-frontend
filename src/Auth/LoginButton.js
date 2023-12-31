import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      onClick={
        () => loginWithRedirect()
        // loginWithRedirect({ redirectUri: "http://localhost:3001/profile" })
      }
    >
      Sign Up / Log In
    </Button>
  );
};

export default LoginButton;
