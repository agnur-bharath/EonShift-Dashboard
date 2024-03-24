"use client";

import { type ReactElement } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { LoadingPage } from "~/shared/custom";

import { persistor, store } from "~/redux/store";

const ReduxProvider = ({ children }: { children: ReactElement }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
