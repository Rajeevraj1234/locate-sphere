import axios from "axios";
import { useEffect, useState } from "react";
import { PiClockClockwiseBold } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { LuPartyPopper } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const ClaimentInput = ({
  id,
  setReveal,
}: {
  id: number | undefined;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState("");
  const [isClaiment, setIsClaiment] = useState<boolean>(false);
  // const [, setRevealer] = useRecoilState(phoneAndEmailReveal);
  const [requestForProduct, setRequestForProduct] = useState<{
    id: number;
    aboutProduct: string;
    isAproved: boolean;
  }>();

  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();

  useEffect(() => {
    async function pullApprovalData() {
      const res = await axios.get(
        `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/claiment/client-approval-data/${id}`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      if (res.data.status) {
        setIsClaiment(res.data.status);
        setRequestForProduct(res.data.claimentData);
        if (res.data.claimentData?.isAproved) {
          setReveal(true);
        }
      }
    }
    pullApprovalData();
  }, [id]);

  async function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setData(e.target.value);
  }

  //pop all working
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
  async function handleSubmit() {
    const res = await axios.post(
      `  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/claiment/setclaiment/${id}`,
      { aboutProduct: data },
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    setPopData(res.data);
    setPOP(true);
    popTimeOuter();
    setData("");

    //To refresh window
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  return (
    <div>
      {isClaiment ? (
        <div className="">
          <h1 className="text-md md:text-[1.4rem] font-semibold text-[#3c3535]  mb-3">
            Your Request
          </h1>
          <div>
            <p className="flex flex-col mb-5 text-xs md:text-lg sm:w-[650px]">
              <span className="font-medium  mr-2">Description: </span>{" "}
              {requestForProduct?.aboutProduct}
            </p>
            {requestForProduct?.isAproved ? (
              <>
                <div>
                  <h3 className="text-[1.4rem] text-[#3c3535]  font-semibold">
                    Status
                  </h3>
                  <div className="py-2 md:py-3 px-4 w-[200px] sm:w-[300px] text-sm md:text-lg bg-green-500 text-white font-bold rounded-md  flex justify-center items-center gap-1">
                    <TiTick className="text-2xl" />
                    Got Aproved !!{" "}
                  </div>
                </div>
                <div className="mt-9">
                  <h3 className="text-xs md:text-xl font-medium  text-[#3c3535]   ">
                    Woohoo!{" "}
                    <LuPartyPopper className="inline ml-1 text-lg md:text-2xl" />{" "}
                    <br /> Your approval is fantastic news! Let's celebrate
                    together <br /> your feedback would be awesome too!
                  </h3>
                  <button
                    onClick={() => {
                      navigate("/feedback");
                    }}
                    className="bg-[#a0e1e1] border border-black text-xs md:text-lg text-black font-medium tracking-wider py-2 px-5 mt-4 rounded-md"
                  >
                    Feedback
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl md:text-[1.4rem] text-[#3c3535] mb-2 font-semibold">
                    Status
                  </h3>
                  <div className="py-3 px-4 border border-black text-sm sm:text-lg w-[70%] sm:w-[300px] rounded-md text-center flex justify-center items-center gap-2">
                    <PiClockClockwiseBold />
                    Pending...{" "}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-md sm:text-[1.4rem] text-[#3c3535]  font-semibold mb-3">
            Is this yours ?
          </h1>
          <div>
            <textarea
              onChange={handleChange}
              value={data}
              name="description"
              className="placeholder:text-black text-black bg-[#e4ecec] text-xs sm:text-lg focus:outline-none rounded-md w-full md:w-[400px] h-[80px] sm:h-32 resize-none px-3 py-2 overflow-auto"
              placeholder="Enter your item Deatils here..."
            />{" "}
            <br />
            <button
              onClick={handleSubmit}
              className="sm:h-[40px] h-[30px] my-3 text-xs sm:text-lg border-black hover:text-black hover:border-none  hover:bg-[#e4ecec] text-black font-bold rounded-lg w-[70px] sm:w-[100px] border flex items-center justify-center gap-1"
            >
              Claim
            </button>
          </div>
        </div>
      )}
      {isPOP && popData && (
        <div className="fixed h-[60px] text-black w-[300px] z-[200] top-[10%] right-0">
          <Popup isRight={popData.status} message={popData.msg} />
        </div>
      )}
    </div>
  );
};

export default ClaimentInput;
