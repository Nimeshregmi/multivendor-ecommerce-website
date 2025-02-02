import { useResetpasswordMutation } from "@/redux/feature/authApiSlice";
import { toast } from "react-toastify";
import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";

export default function useResetPassword() {
  const [resetPassword, { isLoading }] = useResetpasswordMutation();

  const [email, setemail] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setemail(event.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await resetPassword({ email });
      if (response.data) {
        toast.success("Check mail for reset link");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { email, onChange, onSubmit, isLoading };
}
