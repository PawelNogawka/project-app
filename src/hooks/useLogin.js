import { useState, useEffect } from "react";

import { projectAuth } from "../firestore/config";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signin");
      }

      dispatch({ type: "LOGIN", payload: response.user });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isLoading };
};
