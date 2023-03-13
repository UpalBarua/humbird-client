import React, { useState, createContext, useEffect } from 'react';
import { app } from '../firebase/firebase.config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const AuthContext = createContext({});
const GoogleAuth = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleSignUp = () => {
    return signInWithPopup(auth, GoogleAuth);
  };

  const signOutFn = () => {
    return signOut(auth);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    user,
    createUser,
    signIn,
    googleSignUp,
    signOutFn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
