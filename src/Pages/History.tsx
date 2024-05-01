import axios from "axios";
import { useEffect, useState } from "react";
import Itemcard from "../Components/Itemcard";

const History = () => {
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const [upload, setUpload] = useState([]);
  const [claimReq, setClaimReq] = useState([]);
  const [loader, setLoader] = useState<boolean>(true);
  const auth = localStorage.getItem("auth");
  function handleClick() {
    setIsUpload(!isUpload);
  }
  useEffect(() => {
    async function pullHistory() {
      const res = await axios.get(
        "  https://locate-sphere-backend.rajeevraj9308.workers.dev/api/product/getuserhistory",
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setUpload(res.data.upload);
      setClaimReq(res.data.claimRequest);
      setLoader(false);
    }
    pullHistory();
  }, []);

  return (
    <div className="mt-[100px] md:mt-[160px] mx-5 sm:mx-[60px] md:mx-[100px] 2xl:mx-[200px] min-h-[60vh] sm:mb-10">
      {loader ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src="/images/loader.gif" alt="Loading..." />
        </div>
      ) : (
        <div>
          <div className="block md:hidden">
            <h3 className="text-3xl ml-2f font-semibold tracking-tighter my-10">
              History
            </h3>
          </div>
          <div className="flex justify-start gap-1  sm:gap-5 mb-2">
            <button
              onClick={handleClick}
              className={` ${
                isUpload ? "bg-[#9fe870]" : "bg-transparent"
              } py-2 px-5 text-xs sm:text-md rounded-3xl`}
            >
              Upload
            </button>
            <button
              onClick={handleClick}
              className={`${
                isUpload ? "bg-transparent" : "bg-[#9fe870]"
              } py-2 px-5 text-xs sm:text-md rounded-3xl`}
            >
              Claim Request
            </button>
          </div>
          <hr />
          <div>
            {isUpload ? (
              <div className="grid grid-cols-1 gap-4 mt-10">
                {upload.length > 0 ? (
                  upload.map((item: any) => (
                    <Itemcard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="font-medium text-3xl">
                    You didn't upload any item !!
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 mt-10 ">
                {claimReq.length > 0 ? (
                  claimReq.map((item: any) => (
                    <Itemcard key={item.product.id} item={item.product} />
                  ))
                ) : (
                  <div className="font-medium text-3xl">
                    You didn't apply for any claim !!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
