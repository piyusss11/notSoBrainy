import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { ZodErrorResponse } from "../types/myTypes";

const SignUp = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const handelSignUp = async () => {
    const firstName = firstNameRef.current?.value;
    const userName = userNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // console.log(firstName, userName, email, password);
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/user/register`,
        {
          firstName,
          userName,
          email,
          password,
        }
      );
      navigate("/signin");
    } catch (err) {
      const error = err as AxiosError<ZodErrorResponse>;
      const zodMessage = error.response?.data.message[0].message;

      setError(zodMessage || "username or email already exists");
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded shadow-lg p-8 w-96">
        <h1 className="text-center text-lg my-4">Welcome to Not so Brainy</h1>
        <Input
          reference={firstNameRef}
          className=" outline-mypurple-500"
          placeholder="First Name"
        />
        <Input
          reference={userNameRef}
          className=" outline-mypurple-500"
          placeholder="Username"
        />
        <Input
          reference={emailRef}
          className=" outline-mypurple-500"
          placeholder="Email"
        />
        <Input
          reference={passwordRef}
          className=" outline-mypurple-500"
          placeholder="Password"
          type="password"
        />
        <h1 className="ml-2">
          Already a user?{" "}
          <span className="text-mypurple-500">
            <Link to={"/signin"}>Sign in</Link>
          </span>
        </h1>
        <h1 className="ml-2 text-red-700 font-semibold">{error}</h1>
        <Button
          className="w-full flex justify-center mt-4"
          size="md"
          variant="primary"
          text="Sign Up"
          onClick={handelSignUp}
        />
      </div>
    </div>
  );
};

export default SignUp;
