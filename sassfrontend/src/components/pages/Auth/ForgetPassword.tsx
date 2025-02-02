"use client";
import useResetPassword from "@/hooks/redux/use-forgetpassword";
import Spinner from "@/components/common/Spinner";
import InputField from "./InputField";
import Button from "@/components/common/Button";

const ForgetPassword = () => {
  const { email, onSubmit, onChange, isLoading } = useResetPassword();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <InputField
            label={"Email"}
            type={"email"}
            labelID={"email"}
            value={email}
            onChange={onChange}
            placeholder="example@gmail.com"
          />

          <div className="flex flex-col justify-center text-center -mx-3">
            <div className="w-full px-3 mb-5">
              <Button>{isLoading ? <Spinner /> : "Request Link"}</Button>
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
            <div className="text-black dark:text-white">
              Already have Account?{" "}
              <a
                className="hover:text-red font-bold hover:scale-110 underline underline-offset-4 text-black dark:text-white"
                href="/auth/login"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
