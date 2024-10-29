import { createContext, useEffect, useState, ReactNode, useMemo } from "react";
import { account } from "../utils/appwriteConfig";
import { Models } from "appwrite";

interface UserAuthContextType {
  user: Models.User<{}> | null;
  setUser: React.Dispatch<React.SetStateAction<Models.User<{}> | null>>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const UserAuthContext = createContext<UserAuthContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Failed to log out.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const session = await account.getSession("current");
        if (session) {
          const response = await account.get();
          setUser(response);
          console.log("User data:", response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const contextValue = useMemo(
    () => ({ user, setUser, isLoading, error, logout }),
    [user, isLoading, error]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};
