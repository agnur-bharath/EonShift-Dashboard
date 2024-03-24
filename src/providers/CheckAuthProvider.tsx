"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSigninCheck } from "reactfire";

import LoadingPage from "~/shared/custom/loading-page";

const CheckAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: signinData, status, error } = useSigninCheck();
  const router = useRouter();

  useEffect(() => {
    // Ensure the signin check is complete
    if (status === "loading") {
      return;
    }

    if (status === "error") {
      // Error fetching signin status, redirect to login page
      console.log("Error in signin check", error);
      router.push("/login");
      return;
    }

    if (status === "success" && !signinData?.signedIn) {
      // User is not logged in, redirect to login page
      router.push("/login");
      return;
    }
  }, [signinData, status, router]);

  // Render children only if user is logged in and signin check is complete
  if (status === "success" && signinData?.signedIn) {
    return children;
  }

  if (status === "success" && !signinData?.signedIn) {
    return (
      <LoadingPage
        title={"Loading..."}
        description={"Redirecting to login..."}
      />
    );
  }

  return (
    <LoadingPage
      title={"Loading..."}
      description={"Checking the status of the auth."}
    />
  );
};

export default CheckAuthProvider;
