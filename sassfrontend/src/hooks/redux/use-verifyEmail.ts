// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useActivationMutation } from "@/redux/feature/authApiSlice";
// import { useAppDispatcher } from "@/redux/hooks";
// import { setAuth } from "@/redux/feature/authSlice";
// import { toast } from "react-toastify";
// export default function useLogin() {
//   const dispacher = useAppDispatcher();
//   const [activation, { isLoading }] = useActivationMutation();
//   const router = useRouter();

//   const [formData, setformData] = useState({
//     token: ""
//   });

//   const { email, password } = formData;

//   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event?.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const onSumit = (event: FormEvent<HTMLFormElement>) => {
//     event?.preventDefault();
//     activation({
//       ...formData,
//     })
//       .unwrap()
//       .then( () => {
//         toast.success("Email verified successfully");
//         dispacher(setAuth());
//         router.push(`/auth/login/`);
//       })
//       .catch((e: any) => {
//         toast.error(
//           e?.data?.email?.[0] ||
//             e?.data?.password?.[0] ||
//             e?.data?.non_field_errors?.[0] ||
//             e?.data?.detail ||
//             "An error occurred. Please try again."
//         );
//         router.push(`/`);
//       });
//   };
//   return { email, password, onSumit, onChange, isLoading };
// }
