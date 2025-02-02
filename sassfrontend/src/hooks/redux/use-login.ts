import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/feature/authApiSlice";
import { useAppDispatcher } from "@/redux/hooks";
import { setAuth } from "@/redux/feature/authSlice";
import { toast } from "react-toastify";
export default function useLogin() {
  const dispacher = useAppDispatcher();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target;
    setformData({ ...formData, [name]: value });
  };

  const onSumit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    login({
      ...formData,
    })
      .unwrap()
      .then( async(response) => {
        Object.entries({ username: response.username, email: response.email, role: response.role, full_name: response.full_name }).forEach(([key, value]) => localStorage.setItem(key, value));
        toast.success("Login Successfull");
        dispacher(setAuth());
        router.push(`/dashboard/`);
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
  };
  return { email, password, onSumit, onChange, isLoading };
}
