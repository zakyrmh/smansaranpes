"use client";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password does not match!");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password does not match!");
    }
  };

  const dismissError = () => {
    setError("");
  };

  return (
    <>
      {error && (
        <Alert
          color="red"
          onClose={dismissError}
          className="fixed z-50 max-w-fit m-3"
        >
          {error}
        </Alert>
      )}
      <div className="flex flex-col justify-center items-center">
        <Card className="my-6">
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              Log In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Welcome back, please log in to get started.
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Email Address
                </Typography>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  size="lg"
                  crossOrigin="anonymous"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  size="lg"
                  crossOrigin="anonymous"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button
                type="submit"
                className="flex justify-center mt-6"
                fullWidth
                loading={isLoading}
              >
                Sign In
              </Button>
              <Typography color="gray" className="text-center font-normal my-2">
                Or
              </Typography>
              <Button
                type="button"
                onClick={() =>
                  signIn("google", { callbackUrl, redirect: false })
                }
                className="flex justify-center items-center gap-3"
                fullWidth
                variant="outlined"
                loading={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  className="w-4 h-4"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Google
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-gray-900"
                >
                  Sign In
                </Link>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default LoginView;
