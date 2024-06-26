import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import Popup from "./Popup";
import { IoSearch } from "react-icons/io5";

interface claiment {
  id: number;
  aboutProduct: string;
  isAproved: boolean;
  user: {
    name: string;
    email: string;
  };
}

const ClaimentRequestCard = ({ id }: { id: number | undefined }) => {
  const [claiments, setClaiments] = useState<claiment[]>([]);
  const auth = localStorage.getItem("auth");
  const [globalClaiment, setGlobalClaiment] = useState<claiment[]>([]);
  var approvalFlag: boolean = false;

  interface PopInterface {
    status: boolean;
    msg: string;
  }

  const [isPOP, setPOP] = useState<boolean>(false);
  const [popData, setPopData] = useState<PopInterface | undefined>(undefined);

  function popTimeOuter() {
    setTimeout(() => {
      setPOP(false);
    }, 3000);
  }

  useEffect(() => {
    async function pullClaiment() {
      const res = await axios.get(
        `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/claiment/getclaiment/${id}`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setClaiments(res.data);
      setGlobalClaiment(res.data);
    }
    pullClaiment();
  }, []);

  async function handleClick(claimentReqId: number) {
    const res = await axios.post(
      `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/claiment/approve-claiment/${id}`,
      {
        id: claimentReqId,
      },
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    setPopData(res.data);
    setPOP(true);
    popTimeOuter();

    //To refresh window
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  //handle search
  const handleSearch = (e: any) => {
    const data = claiments?.filter((val: any) => {
      return (
        val?.user?.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val?.user?.email
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        val?.aboutProduct?.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setGlobalClaiment(data);
  };

  //search for Approved claiment
  claiments.map((val) => {
    val?.isAproved ? (approvalFlag = true) : null;
    return;
  });

  return (
    <div className="md:w-[600px] grid grid-cols-1 gap-5    rounded-md ">
      {claiments?.length > 0 ? (
        <div className="border sm:w-[300px] overflow-hidden bg-white rounded-xl flex justify-center items-center gap-2 border-gray-400">
          <IoSearch className="text-xl w-[10%]" />
          <input
            onChange={handleSearch}
            type="text"
            className="py-2 focus:outline-none w-[90%] "
            placeholder="Search for keywords"
          />
        </div>
      ) : null}
      {globalClaiment.length > 0 ? (
        globalClaiment.map((claiment) => (
          <div
            key={claiment.id}
            className="border border-gray-300 shadow-md bg-[#e4ecec] rounded-md p-4 "
          >
            <h2 className="flex items-center gap-1 text-xs md:text-lg">
              <FaUserLarge className="text-xs" />
              Name: {claiment?.user?.name}
            </h2>
            <p className="flex items-center gap-1 text-xs md:text-lg">
              <HiOutlineMailOpen className="text-sm" />
              Email: {claiment?.user?.email}
            </p>
            <div className="mt-3 text-sm  md:text-lg">
              <div>
                <span className="font-semibold block text-xs md:text-lg">
                  Description:{" "}
                </span>{" "}
                {claiment?.aboutProduct}
              </div>
            </div>
            {claiment.isAproved ? (
              <div className="mt-5">
                <button className="w-full border py-3 px-4  rounded-md text-black font-semibold bg-[#9fe870] ease-linear ">
                  Got Approved !!
                </button>
              </div>
            ) : (
              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => {
                    handleClick(claiment.id);
                  }}
                  className={`border focus-outline-none ${
                    approvalFlag ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#9fe870]"
                  } text-xs md:text-lg  py-2 px-3 md:px-4 border-gray-600 rounded-md hover:text-black font-semibold   ease-linear`}
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No Request Here !!</div>
      )}
      {isPOP && popData && (
        <div className="fixed h-[60px] text-black w-[300px] z-[200] top-[10%] right-0 ">
          <Popup isRight={popData.status} message={popData.msg} />
        </div>
      )}
    </div>
  );
};

export default ClaimentRequestCard;
