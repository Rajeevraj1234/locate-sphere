
import FeebackCard from "../Components/FeebackCard";


const Feedback = () => {



  return (
    <div className="mt-[120px] mb-5 md:mb-0 mx-5 sm:mx-[60px] md:mx-[50px] 2xl:mx-[200px] p-10 rounded-lg md:flex justify-center bg-[#a0e1e1] items-center min-h-[70vh]">
      <div className="md:w-1/2 mb-20 ">
        <h1 className="text-[1.6rem]">Help us improve by giving feedback </h1>
        <p className="mt-2 text-sm w-[70%] font-light">
          It will improve us and make use experience much better and help more
          people find there items easily and safely
        </p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <FeebackCard />
      </div>
    </div>
  );
};

export default Feedback;
