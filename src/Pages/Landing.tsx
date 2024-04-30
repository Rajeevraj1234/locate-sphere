import HomeFoundSection from "../Components/HomeFoundSection"
import Main from "../Components/Main"
import HomeTestimonialSection from "../Components/HomeTestimonialSection"
import { useState } from "react"

const Landing = () => {
  return (
    <div className="mt-[100px] select-none">
      <TheLoader />
      <div>
        <Main />
      </div>
      <div>
        <HomeFoundSection />
      </div>
      <div>
        <HomeTestimonialSection />
      </div>
    </div>
  )
}

const TheLoader = () => {
  const [loader, setLoader] = useState<boolean>(true);

  setTimeout(() => {
    setLoader(false);
  }, 2000);
  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-[100vh] w-[100%] absolute bg-white inset-0  z-[102]">
          <img src="/images/loader.gif" alt="Loading..." />
        </div>
      ) : null}
    </>
  );
};

export default Landing