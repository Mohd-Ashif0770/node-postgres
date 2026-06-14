import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, userLogout } from "../services/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();

        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const response = await userLogout();
      if (response.status === 200) {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.log(error.message);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn: !!user,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
