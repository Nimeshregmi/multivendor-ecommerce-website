import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useResetpasswordconformMutation } from "@/redux/feature/authApiSlice";
import { toast } from "react-toastify";


export default function useResetPasswordConform(uid: string, token: string) {
  const [resetPassword, { isLoading }] = useResetpasswordconformMutation();
  const router = useRouter();

  const [formData, setformData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const lodingstate = () => {
    toast.error(!isLoading);
  };

  const {  new_password, re_new_password } = formData;

  function isValidPassword(password: any) {
    if (password.length < 8) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setformData({ ...formData, [name]: value });
  };

  const onSumit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (new_password != re_new_password) {
      toast.error("Password and re_Password does not match");
    } else if (!isValidPassword(new_password)) {
      toast.error(
        "Password must contain Uppercase, lowercase,number and special character"
      );
    } else {
      resetPassword({
        uid,
        token,
        new_password,
        re_new_password,
      })
        .unwrap()
        .then(() => {
        //   toast.success("Plz check email to verify");
          router.push("/auth/login");
        })
        .catch((e: any) => {
          toast.error(
            e?.data?.email?.[0] ||
              e?.data?.password?.[0] ||
              e?.data?.non_field_errors?.[0] ||
              "An error occurred. Please try again."
          );
        });
    }
  };
  return {
    new_password,
    re_new_password,
    onSumit,
    onChange,
    isLoading,
    lodingstate,
  };
}
