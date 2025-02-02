"use client";
import useResetPasswordConform from "@/hooks/redux/use-resetPasswoedConfirm";
import Spinner from "@/components/common/Spinner";
import InputField from "./InputField";
import Button from "@/components/common/Button";

interface Props{
    uid:string;
    token:string;
}
const ResetForgetPassword = ({uid,token}:Props) => {
  const preventEnterSubmit = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const {
    new_password,
    re_new_password,
    onSumit,
    onChange,
    isLoading,
  } = useResetPasswordConform(uid,token);
  return (
    <div>
      <form onSubmit={onSumit} onKeyPress={preventEnterSubmit}>
        <div>
          <InputField
            label={"new_password"}
            type={"password"}
            labelID={"new_password"}
            value={new_password}
            onChange={onChange}
            placeholder="*********"
          />

          <InputField
            label={"re_new_password"}
            type={"password"}
            labelID={"re_new_password"}
            value={re_new_password}
            onChange={onChange}
            placeholder="*********"
          />
          <div className="flex flex-col justify-center text-center -mx-3">
            <div className="w-full px-3 mb-5">
              <Button>{isLoading ? <Spinner /> : "Submit"}</Button>
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

export default ResetForgetPassword;
