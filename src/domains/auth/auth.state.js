import * as React from "react";
import { fetchJson } from "lib/fetch-json";
import { BASE_URL } from "const";

const ACCESS_TOKEN_STORAGE = "auth";
const UID_STORAGE = "uid";

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE);
const storedUID = localStorage.getItem(UID_STORAGE);

const AUTH_DEFAULT_STATE = storedAccessToken && storedUID
  ? {
      status: "authenticated",
      accessToken: storedAccessToken,
      uid: storedUID
    }
  : {
      status: "anonymous",
      accessToken: null,
      uid: null
    };

const AuthContext = React.createContext();

const authReducer = (state, event) => {
  switch (event.type) {
    case "login":
      return {
        accessToken: event.accessToken,
        status: "authenticated",
        uid: event.uid
      };

    case "logout":
      return {
        accessToken: null,
        status: "anonymous",
        uid: null
      };

    default:
      throw new Error(`Unsupported event type ${event.type} in authReducer`);
  }
};

export const useAuthState = () => {
  const [state, dispatch] = React.useReducer(authReducer, AUTH_DEFAULT_STATE);

  const login = (accessToken, uid) =>
    dispatch({
      type: "login",
      accessToken,
      uid
    });

  const logout = () =>
    dispatch({
      type: "logout",
    });

  return {
    ...state,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return auth;
};

const login = (email, password) =>
  fetchJson(`${BASE_URL}/login`, {
    method: "POST",
    body: {
      username: email,
      password,
    },
  });

const getUserId = (token) => fetchJson(`${BASE_URL}/whoami`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const useLogin = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return function invokeLogin({ email, password }) {
    return login(email, password)
      .then(async (res) => {
        const userInfo = await getUserId(res.access_token);
        res.uid = userInfo.userId;
        return res;
      })
      .then((res) => {
        auth.login(res.access_token, res.uid);
        localStorage.setItem(ACCESS_TOKEN_STORAGE, res.access_token);
        localStorage.setItem(UID_STORAGE, res.userId);
      });
  };
};

export const useLogout = () => {
  const auth = React.useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return () => {
    auth.logout();
    localStorage.removeItem(ACCESS_TOKEN_STORAGE);
    localStorage.removeItem(UID_STORAGE);
  };
};

const register = ({name, email, password, avatar}) => 
  fetchJson(`${BASE_URL}/register`, {
    method: 'POST',
    body: {
      name, email, password, avatar
    }
  });

export const useRegister = () => {
  const auth = React.useContext(AuthContext);
  
  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }
  
  return function invokeRegister({name, email, password, avatar}) {
    return register({name, email, password, avatar}).then(res => {
      auth.login(res.access_token);
      localStorage.setItem(ACCESS_TOKEN_STORAGE, res.access_token);
    });
  };
};