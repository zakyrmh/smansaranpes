"use client";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Cannot create account!");
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
              Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Full Name
                </Typography>
                <Input
                  name="fullname"
                  id="fullname"
                  size="lg"
                  crossOrigin="anonymous"
                  placeholder="Full Name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
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
                  Phone
                </Typography>
                <Input
                  name="phone"
                  id="phone"
                  size="lg"
                  crossOrigin="anonymous"
                  placeholder="62812345678"
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
                Sign Up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-gray-900">
                  Log In
                </Link>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default RegisterView;
