import { useEffect, useState } from "react";
import ClaimentInput from "../Components/ClaimentInput";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClaimentRequestCard from "../Components/ClaimentRequestCard";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LuFlagTriangleRight } from "react-icons/lu";


// import { phoneAndEmailReveal } from "../globalState/atom";
// import { useRecoilValue } from "recoil";

interface Item {
  id: number;
  name: string;
  location: string;
  category: string;
  lostfound: string;
  user: {
    name: string;
    phoneNumber: string;
    email: string;
  };
}

const Product = () => {
  const [item, setItem] = useState<Item | undefined>();
  const { id } = useParams();
  const [isClaimet, setIsClaimet] = useState<boolean>(true);
  const email = localStorage.getItem("email");
  const [reveal, setReveal] = useState(false);


  

  // const revealer = useRecoilValue(phoneAndEmailReveal);

  useEffect(() => {
    async function pullProduct() {
      const res = await axios.get(
        `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/product/getsingleprouct/${id}`
      );
      if (res.data.user.email === email) {
        setIsClaimet(false);
      }
      setItem(res.data);
    }
    pullProduct();
  }, []);


  

  return (
    <div className="mt-[100px] mx-5 sm:mx-[60px] md:mx-[50px] 2xl:mx-[200px]  mb-10  z-[0]">
      <TheLoader />
      <div className="grid grid-cols-1 gap-1  bg-[#a3dfdf] text-[#3c3535] px-5 sm:px-10 py-5 rounded-xl">
        <h1 className="text-[2rem] sm:text-[3.7rem] lg:text-[5rem] mb-5 sm:mb-0 font-bold text-[#3c3535] tracking-tighter">
          {item?.name.toUpperCase()}
        </h1>
        <p className="flex  items-center gap-2 text-xs sm:text-lg">
          <IoLocationSharp /> Location: {item?.location}
        </p>
        <p className="flex  items-center gap-2 text-xs sm:text-lg">
          <BiSolidCategory /> Category: {item?.category}
        </p>

        <p className="flex  items-center gap-2 text-xs sm:text-lg">
          <LuFlagTriangleRight /> Flag: {item?.lostfound}
        </p>

        {isClaimet && (
          <div className="mb-10">
            <h1 className="text-md sm:text-[1.4rem] text-[#3c3535]  font-semibold mt-10 mb-3">
              Founder Details
            </h1>
            <p className="flex  items-center gap-2 text-xs sm:text-lg">
              <FaUserLarge className="text-xs" />
              Name: {item?.user.name}
            </p>
            <p className="flex  items-center gap-2 text-xs sm:text-lg">
              <FaPhoneAlt className="text-xs" />
              Phone Number: {reveal ? item?.user?.phoneNumber : " ***** "}
            </p>
            <p className="flex  items-center gap-2 text-xs sm:text-lg">
              <HiOutlineMailOpen className="text-xs" />
              Email:{reveal ? item?.user?.email : " ******"}
            </p>
          </div>
        )}

        {isClaimet ? (
          <div className="z-[1]">
            <ClaimentInput id={item?.id} setReveal={setReveal} />
          </div>
        ) : (
          <div className="z-[1]">
            <h1 className="text-[1.4rem] text-[#3c3535]  font-semibold mb-3 mt-14">
              {" "}
              Requests
            </h1>

            <ClaimentRequestCard id={item?.id} />
          </div>
        )}
      </div>
    </div>
  );
};

const TheLoader = () => {
  const [loader, setLoader] = useState<boolean>(true);

  setTimeout(() => {
    setLoader(false);
  }, 3000);
  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-[100vh] w-[100%] absolute bg-white inset-0 top-[100px] z-[100]">
          <img src="/images/loader.gif" alt="Loading..." />
        </div>
      ) : null}
    </>
  );
};

export default Product;
