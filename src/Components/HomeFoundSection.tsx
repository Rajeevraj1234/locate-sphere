import UploadCard from "../Components/UploadCard";

const HomeFoundSection = () => {
  return (
    <div className="bg-[#9fe870] py-[60px] sm:py-[150px] relative">
      <div className="mx-3 lg:mx-[120px] 2xl:mx-[300px] lg:flex justify-center items-center">
        <div className="lg:w-1/2 flex mb-10 justify-center lg:justify-start">
          <div>
            <h1 className=" text-[1.5rem] sm:text-[2rem] font-semibold">You Found Some Item ?</h1>
            <p className=" text-xs sm:text-sm">
              Help by uploading here and let the real owner find it
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <UploadCard />
        </div>
      </div>
    </div>
  );
};

export default HomeFoundSection;
