import { createContext, useReducer, useEffect } from "react";

import { projectAuth } from "../firestore/config";

export const AuthContext = createContext();

const initialstate = {
  user: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialstate);
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);
  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
