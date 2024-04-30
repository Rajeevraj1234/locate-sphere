import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();
  return (
    <div className=" 2xl:mx-[300px] mx-2 md:mx-[80px] flex justify-center  mb-20">
      <div>
        <h1 className="text-center  mainHeading max-w-[1400px]  text-[2rem] sm:text-[4rem] xl:text-[5rem] mt-[60px] leading-[40px] sm:leading-[70px] 2xl:leading-[110px] ">
        Lost Doesn't Mean Gone <br /> Reconnect with Your Belongings.
          
        </h1>
        <p className="flex justify-center font-light text-xs md:text:sm 2xl:text-lg mt-5 w-full">
          <div className="w-[300px] sm:w-[470px] 2xl:w-[550px] text-center">
          We are dedicated to helping people find their lost items. With our motto 'Bringing Lost Items Home,' we strive to reunite individuals with their belongings. Let us assist you in reclaiming what's rightfully yours.
          </div>
        </p>
        <div className="flex justify-center mt-7">
            <button onClick={()=>{
                navigate("/products")
            }} className="sm:w-[150px] text-xs w-[100px] 2xl:w-[200px] border border-black py-2 md:text-sm 2xl:text-lg rounded-lg font-medium bg-[#9fe870] hover:bg-[#91d964]">Explore</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
