import { useChangepasswordMutation } from "@/redux/feature/authApiSlice";
import { toast } from "react-toastify";
import { useState, ChangeEvent, FormEvent } from "react";
import { setAuthToken } from "@/utils/TokenManagement";
import router from "next/router";

export default function useResetPassword() {
  const [changePassword, { isLoading }] = useChangepasswordMutation();

  const [formdata, setformdata] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setformdata({ ...formdata, [name]: value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try {
    changePassword({
      ...formdata,
    })
      .unwrap()
      .then(async (response: any) => {
        const accessToken = response.access;
        const refreshToken = response.refresh;
        setAuthToken(accessToken, "accessToken");
        setAuthToken(refreshToken, "refreshToken");
        toast.success("Login Successfull");
        router.push("/dashboard");
      })
      .catch((e: any) => {
        toast.error(
          e?.data?.email?.[0] ||
            e?.data?.password?.[0] ||
            e?.data?.non_field_errors?.[0] ||
            e?.data?.detail ||
            "An error occurred. Please try again."
        );
      });

    return { formdata, onChange, onSubmit, isLoading };
  };
}
