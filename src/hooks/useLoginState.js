import { useState } from "react";

const useLoginState = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState(null);

  return {
    username,
    setUsername,
    password,
    setPassword,
    userType,
    setUserType,
    error,
    setError,
  };
};

export default useLoginState;
