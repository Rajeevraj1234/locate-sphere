import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";

interface Items {
  id: number;
  name: string;
  location: string;
  category: string;
  lostfound: string;
}

const Itemcard = ({ item }: { item: Items }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-md bg-[#a0e1e1] max-w-[1400px] hover:shadow-lg relative overflow-hidden">
      <div className="w-[60px] sm:w-[120px] h-[21px] sm:h-[40px]  bg-[#3c3535] text-[9px] sm:text-lg text-white font-semibold rounded-sm absolute  right-0 flex justify-center items-center">
          <span>{item.lostfound.toUpperCase()}</span>
      </div>
      <div className="p-3 sm:p-4">
        <h1
          onClick={() => navigate(`/product/${item.id}`)}
          className="text-[1.5rem] sm:text-[2rem] lg:text-[2.8rem] font-semibold mb-3 cursor-pointer"
        >
          Item: {item.name}
        </h1>
        <p className="flex items-center gap-2 text-xs sm:text-lg">
          <IoLocationSharp />
          Location: {item.location}
        </p>
        <p className="flex items-center gap-2 text-xs sm:text-lg">
          <BiSolidCategory />
          Category: {item.category}
        </p>
        {/* <p className="flex items-center gap-2">
          <LuFlagTriangleRight />
          Flag: {item.lostfound}
        </p> */}
        <button
          onClick={() => navigate(`/product/${item.id}`)}
          className="h-[30px] w-[70px]  sm:h-[40px] sm:w-[100px]  my-3 bg-[#3c3535] text-xs sm:text-lg text-white font-bold rounded-lg border flex items-center justify-center gap-1"
        >
          More <IoIosArrowRoundForward />
        </button>
      </div>
    </div>
  );
};

export default Itemcard;
