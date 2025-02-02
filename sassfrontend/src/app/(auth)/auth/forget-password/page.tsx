import { ForgetPassword, SvgImage } from "@/components";

const page = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div
          className="  rounded-3xl dark:shadow-white shadow-black shadow-lg w-full overflow-hidden"
          style={{ maxWidth: "1000px" }}
        >
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div>
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-black dark:text-white text-red">
                    ResetPassword
                  </h1>
                  <p className="text-black dark:text-white">
                    Enter your Information to ResetPassword
                  </p>
                </div>
                <div>
                  <ForgetPassword />
                </div>
              </div>
            </div>
            <SvgImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
