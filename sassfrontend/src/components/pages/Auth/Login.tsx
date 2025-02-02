"use client";
import useLogin from "@/hooks/redux/use-login"
import Spinner from "@/components/common/Spinner";
import InputField from "./InputField";
import Button from "@/components/common/Button";

const Login = () => {
  const preventEnterSubmit = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const { email, password, onSumit, onChange, isLoading } = useLogin();
  return (
    <div>
      <form onSubmit={onSumit} onKeyPress={preventEnterSubmit}>
        <div>
          <InputField
            label={"Email"}
            type={"email"}
            labelID={"email"}
            value={email}
            onChange={onChange}
            placeholder="example@gmail.com"
          />
          <div className="justify-end flex w-full items-end">
            <a
              className="text-black hover:underline hover:underline-offset-2 dark:text-white hover:text-red font-medium"
              href="/auth/forget-password"
            >
              forget password?
            </a>
          </div>
          <InputField
            label={"password"}
            type={"password"}
            labelID={"password"}
            value={password}
            onChange={onChange}
            placeholder="*********"
          />
          <div className="flex flex-col justify-center text-center -mx-3">
            <div className="w-full px-3 mb-5">
              <Button >
                {isLoading ? <Spinner /> : "Login"}
              </Button>
            </div>
            <div className="text-black dark:text-white">
              Don&apos;t have Account?{" "}
              <a
                className="hover:text-indigo-700 hover:underline hover:underline-offset-2 font-bold dark:text-white text-black hover:text-red"
                href="/auth/registration"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
