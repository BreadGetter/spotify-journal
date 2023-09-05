import { createContext, useContext, useState, useEffect } from 'react';

// Create a UserContext
const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  // Fetch user data from the main endpoint and set it in the context
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/main'); // Replace with your main endpoint
        if (response.ok) {
          const userDataFromServer = await response.json();
          setUser(userDataFromServer);
        }
        else {
            setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error('Error fetching user data:', error);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
    return useContext(UserContext);
}




