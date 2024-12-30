import { Link} from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { LoginErrorResponse } from "../types/myTypes";

const SignIn = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const handleSignIn = async () => {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;
    // console.log(userName, password);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/api/v1/user/login`,
        {
          userName,
          password,
        }
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      window.location.reload();
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<LoginErrorResponse>;
      const errorMessage = error?.response?.data?.message;
      setError(errorMessage || "Try again later");
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded shadow-lg p-8 w-96">
        <h1 className="text-center text-lg my-4">Welcome to Not so Brainy</h1>
        <Input
          reference={userNameRef}
          className=" outline-mypurple-500"
          placeholder="Username"
        />
        <Input
          reference={passwordRef}
          className=" outline-mypurple-500"
          placeholder="Password"
          type="password"
        />
        <h1 className="ml-2">
          Not a user?
          <span className="text-mypurple-500">
            <Link to={"/signup"}>Sign up</Link>
          </span>
        </h1>
        <h1 className="ml-2 text-red-700 font-semibold">{error}</h1>
        <Button
          className="w-full flex justify-center mt-4"
          size="md"
          variant="primary"
          text="Sign In"
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
};

export default SignIn;
