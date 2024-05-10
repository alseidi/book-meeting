import  { createContext, useState, useContext, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { apiService } from "../utils/api";
import { Attendee } from "../components/eventCard/eventCard.interface";

interface UserContextType {
  token: string | null;
  updateToken: (newToken: string | null) => void;
  user: Attendee | null
}

const UserContext = createContext<UserContextType>({
  token: null,
  updateToken: () => {},
  user: null
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const authToken = Cookies.get('bm-token');
  const [token, setToken] = useState<string | null>(
    authToken ?? null
  );
  const [user, setUser] = useState<Attendee | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        const fetchedUser =  await apiService.get('me');
        setUser(fetchedUser);
      }
    }

    fetchUserInfo();
  },[token]);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      Cookies.set('bm-token', newToken, { expires: 7, path: '', secure: true });
    } else {
      Cookies.remove('bm-token');
    }
  };

  return (
    <UserContext.Provider value={{ token, updateToken, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
