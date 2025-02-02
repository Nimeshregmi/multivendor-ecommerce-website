"use client";
import useRegister from "@/hooks/redux/use-register";
import InputField from "./InputField";
import Spinner from "@/components/common/Spinner";
import Button from "@/components/common/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Register = () => {
  const { formData, setrole, role, onSumit, onChange, isLoading } =
    useRegister();
  const preventEnterSubmit = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="text-white dark:text-black">
      <form onSubmit={onSumit} onKeyPress={preventEnterSubmit}>
        {/* <div className="flex  gap-2 "> */}
        <InputField
          label={"full_name"}
          type={"text"}
          labelID={"full_name"}
          value={formData.full_name}
          onChange={onChange}
          placeholder="Bipin"
        />
        {/* </div> */}
        <InputField
          label={"Email"}
          type={"email"}
          labelID={"email"}
          value={formData.email}
          onChange={onChange}
          placeholder="example@gmail.com"
        />
        <InputField
          label={"phone"}
          type={"email"}
          labelID={"phone"}
          value={formData.phone}
          onChange={onChange}
          placeholder="example@gmail.com"
        />
        <InputField
          label={"username"}
          type={"text"}
          labelID={"username"}
          value={formData.username}
          onChange={onChange}
          placeholder="BaralBipin"
        />
        <Select value={role} onValueChange={(e) => setrole(e)} name="role">
          <label
            htmlFor="role"
            className="text-xs dark:text-white 2xl:text-base text-black font-semibold px-1"
          >
            Role
          </label>
          <SelectTrigger className="w-full rounded-xl bg-white mb-5 text-black border-2 border-black py-2 pl-2 pr-2 2xl:text-xl">
            <SelectValue
              className="font-normal"
              placeholder="Select a Account Type"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-black rounded-md  text-white">
              <SelectLabel className="text-xs dark:text-white 2xl:text-base text-white font-semibold px-1">
                Role
              </SelectLabel>
              <SelectItem
                value="buyer"
                className="cursor-pointer hover:bg-white hover:text-black "
              >
                Buyer
              </SelectItem>
              <SelectItem
                value="seller"
                className="cursor-pointer hover:bg-white hover:text-black "
              >
                Seller
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <InputField
          label={"password"}
          type={"password"}
          labelID={"password"}
          value={formData.password}
          onChange={onChange}
          placeholder="*********"
        />
        <InputField
          label={"confirm Password"}
          type={"password"}
          labelID={"confirm_password"}
          value={formData.confirm_password}
          onChange={onChange}
          placeholder="*********"
        />
        <div className="flex items-center mb-2 justify-center ">
          <span className="text-sm text-black dark:text-white">
            By SignUp. You will accept our{" "}
            <a
              className="text-blue-500 font-bold hover:underline hover:underline-offset-2"
              href="/terms_and_condition"
            >
              tearms and condition
            </a>
          </span>
        </div>{" "}
        <div className="w-full px-3 mb-5">
          <Button type="submit">
            {isLoading ? <Spinner /> : "REGISTER NOW"}
          </Button>
        </div>
      </form>
      <div className="flex flex-col justify-center text-center -mx-3">
        
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
  );
};

export default Register;
