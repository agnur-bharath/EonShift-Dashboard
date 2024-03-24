"use client";

import { type ReactElement } from "react";

import { AuthProvider, FirebaseAppProvider } from "reactfire";

import firebaseApp, { auth } from "~/lib/firebase";

const ReactFireProvider = ({ children }: { children: ReactElement }) => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirebaseAppProvider>
  );
};

export default ReactFireProvider;
