import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firestore/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { uid } = user;
      projectFirestore.collection("users").doc(uid).update({
        online: false,
      });
      await projectAuth.signOut();

      dispatch({ type: "LOGOUT" });
      if (!isCancelled) {
        setError(null);
        setIsLoading(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, isLoading, error };
};
