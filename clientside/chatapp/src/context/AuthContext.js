import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/Services";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  console.log("registerInfo", registerInfo);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    alert("working");
    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );

    setIsRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
