import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/feature/authApiSlice";
// import { setAuthToken } from "@/utils/TokenManagement";
import { toast } from "react-toastify";
export default function useRegister() {
  const [register, { isLoading }] = useRegisterMutation();
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [role, setrole] = useState("Select a Account Type");
  const [formData, setformData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

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
    // setIsLoading(true);
    event?.preventDefault();
    if (formData.password != formData.confirm_password) {
      toast.error("Password and re_Password does not match");
    } else if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must contain Uppercase, lowercase,number and special character"
      );
    } else {
      register({
        ...formData,
        role,
      })
        .unwrap()
        .then(() => {
          toast.success("Plz check email to verify");
          router.push("/auth/login");
        })
        .catch((e: any) => {
          console.log(e);
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
    formData,
    role,
    setrole,
    onSumit,
    onChange,
    isLoading,
  };
}
