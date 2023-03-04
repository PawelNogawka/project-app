import { useState, useEffect } from "react";

import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firestore/config";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, photo) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `thumbnails/${response.user.uid}/${photo.name}`;
      const img = await projectStorage.ref(uploadPath).put(photo);
      const imgUrl = await img.ref.getDownloadURL();

      await response.user.updateProfile({ displayName, photoURL: imgUrl });

      await projectFirestore.collection("users").doc(response.user.id).set({
        online: true,
        displayName,
        photoUrl: imgUrl,
      });

      dispatch({ type: "SIGN_IN", payload: response.user });

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

  return { signup, error, isLoading };
};
