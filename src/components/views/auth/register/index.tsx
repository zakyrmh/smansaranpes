"use client";
import { Input } from "@material-tailwind/react";

const RegisterView = () => {
  return (
    <div>
      <h1>Register</h1>
      <div>
        <form action="">
          <div>
            <div className="w-72">
              <Input
                label="Username"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </div>
          <button>Register</button>
        </form>
      </div>
      <p>Have an account? Sign in here</p>
    </div>
  );
};

export default RegisterView;
