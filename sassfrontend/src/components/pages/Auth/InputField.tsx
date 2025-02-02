import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface Props {
  label: string;
  type: string;
  placeholder?: string;
  labelID: string;
  value: string;
  required?: boolean;
  classname?:string;
  onChange:(event:ChangeEvent<HTMLInputElement>)=>void;
}
const InputField = ({
  label,
  type,
  placeholder = "",
  onChange,
  labelID,
  classname,
  value,
  required = true,
}: Props) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const handlechange = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-5">
          <label htmlFor={labelID} className="text-xs dark:text-white 2xl:text-base text-black font-semibold px-1">
            {label}
          </label>
          <div className="flex relative items-center">
    
            <input
              type={passwordVisible?'text':type}
              id={labelID}
              name={labelID}
              value={value}
              onChange={onChange}
              required={required}
              autoComplete={`${type}`}
              className={`${classname} w-full  pl-2 pr-2 2xl:text-xl py-2 bg-white placeholder:text-black placeholder:opacity-70  text-black rounded-xl border-2 border-black outline-none`}
              placeholder={`${placeholder}`}

            />
            {
              type === 'password' && <div className="absolute z-50 cursor-pointer text-black right-2 " onClick={handlechange} >{passwordVisible?<Eye />:<EyeOff />}</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default InputField;
