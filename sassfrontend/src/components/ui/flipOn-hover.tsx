interface Props{
    name:string
  }

const FlipOnHover = ({name}:Props) => {
    return (
      <>
        <button className='group relative inline-flex h-8  items-center justify-center overflow-hidden rounded-md  border-2  border-[#394481]  font-medium'>
          <div className='inline-flex h-8 translate-y-0 rounded-md items-center justify-center  bg-gradient-to-r from-[#070e41] to-[#263381]    px-6  text-white transition group-hover:-translate-y-[150%]'>
            {name}
          </div>
          <div className='absolute inline-flex rounded-md h-8 w-full translate-y-[100%] items-center justify-center bg-[#394481] dark:bg-[#656fe2] px-6 text-neutral-50 transition duration-300 group-hover:translate-y-0'>
            {name}
          </div>
        </button>
      </>
    );
  };
  
  export default FlipOnHover;
  