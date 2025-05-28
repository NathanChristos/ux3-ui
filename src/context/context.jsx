import { createContext, useContext as useCtx, useEffect, useState } from 'react';
import { route } from '../shared/api';
import { Login } from '../components/login';
import { useUser } from '../hooks/useUser';

export const AuthContext = createContext({
    user: undefined,
    token: undefined,
    peage: undefined,
    setPage: () => {},
    setToken: () => {},
    clearToken: () => {},
    updateUser: (data) => {},
    search: {},
});

export const useContext = () => useCtx(AuthContext)
    
export const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(undefined);
  const [token, set] = useState(localStorage.getItem('token'));
  const { user, rehydrate } = useUser(!!token, userId);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({
    maxPrice: '',
    location: ''
  });
  const updateSearch = (data = {}) => {
    setSearch(prev => ({ ...prev, ...data }));
  }
  
  const updateUser = (data = {}) => {    
    route(`/users/${user._id}`).put({
      body: data,
      onSuccess: (data) => {
        console.log('Profile updated successfully', data);
        rehydrate();
      },
      onError: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
    set(token);
  };
  
  const clearToken = () => {
    localStorage.removeItem('token');
    set(undefined);
  }
  
  useEffect(() => {
    if (token) {
      route('/auth/validate').get({ 
                onSuccess: (data) => setUserId(data.user?.id),
                onError: () => {
                  console.log('Invalid token');
                    setUserId(undefined);
                    clearToken();
                }
              });
    } else {
      setUserId(undefined);
      clearToken();
    }
    return undefined;
  }, [token]);
  
  if (user) {
    return (
      <AuthContext.Provider value={{ user, token, page, setToken, clearToken, setPage, updateUser, search, updateSearch }}>
          {children}
      </AuthContext.Provider>
    );
  } else {
    return (
      <Login onSuccess={setToken} />
    )
  }
};
