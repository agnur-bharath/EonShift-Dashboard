"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { BatteryFull } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSigninCheck } from "reactfire";

import LoadingPage from "~/shared/custom/loading-page";
import { Button } from "~/shared/shadcn/ui/button";
import { Input } from "~/shared/shadcn/ui/input";
import { Label } from "~/shared/shadcn/ui/label";

import { auth } from "~/lib/firebase";
import { Icons } from "~/lib/icons";

const Login = () => {
  const router = useRouter();
  const { data: signInData, status } = useSigninCheck();
  const [signInStatus, setSignInStatus] = useState("default");

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (status === "success" && signInData?.signedIn) {
      router.push("/dashboard");
    }
  }, [signInData, status, router]);

  const handleSignIn = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(userCredential.user);
      router.push("/dashboard");
      setSignInStatus("logged-in");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  if (status === "loading") {
    return <LoadingPage title={"Loading..."} />;
  }

  if (status === "success" && signInData?.signedIn) {
    return (
      <LoadingPage
        title={"Loading..."}
        description={
          signInStatus === "logged-in"
            ? "Logging In..."
            : "Already Logged In, Redirecting..."
        }
      />
    );
  }
  return (
    <div className="flex flex-row items-center justify-center h-screen w-full">
      <div className="w-7/12 h-full bg-white hidden xl:flex items-center justify-center duration-150">
        <div className={"hidden xl:flex flex-col gap-1"}>
          <div className={"flex gap-2 items-center text-white dark:text-black"}>
            <BatteryFull size={45} />
            <h3 className={"text-5xl tracking-tight font-bold"}>EonShift</h3>
          </div>
          <h5
            className={"text-center xl:text-left mb-8 font-medium text-muted"}
          >
            Shifting energy for better tomorrow
          </h5>
        </div>
        <h5
          className={"text-white dark:text-black absolute bottom-8 font-medium"}
        >
          Made with ❤️ for Smart India Hackathon
        </h5>
      </div>
      <div className={"flex items-center justify-center flex-auto h-full"}>
        <form
          className={"flex flex-col gap-4 w-11/12 xl:w-8/12"}
          onSubmit={methods.handleSubmit(handleSignIn)}
        >
          <div className={"grid gap-1"}>
            <div
              className={
                "flex flex-row gap-2 justify-center xl:justify-start items-center"
              }
            >
              <BatteryFull size={30} />
              <h3
                className={
                  "text-3xl text-center xl:text-left tracking-tight font-bold"
                }
              >
                EonShift
              </h3>
            </div>
            <h5
              className={
                "text-center xl:text-left mb-8 font-medium text-muted-foreground"
              }
            >
              Shifting energy for better tomorrow
            </h5>
          </div>
          <div className={"grid gap-2"}>
            <Label>Email</Label>
            <Input
              {...methods.register("email")}
              placeholder="name@example.com"
              type="email"
              required
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className={"grid gap-2"}>
            <Label>Password</Label>
            <Input
              {...methods.register("password")}
              placeholder={"Enter you're password"}
              required
              type={"password"}
            />
          </div>
          <Button type={"submit"} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
        <p
          className={
            "text-sm font-medium absolute bottom-8 block xl:hidden text-primary"
          }
        >
          Made with ❤️ for Smart India Hackathon
        </p>
      </div>
    </div>
  );
};

export default Login;
