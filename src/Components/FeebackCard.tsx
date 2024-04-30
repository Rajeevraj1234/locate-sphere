import axios from "axios";
import { useState } from "react";
import Popup from "../Components/Popup";

const FeebackCard = () => {
  const [content, setContent] = useState("");


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

  const auth = localStorage.getItem("auth");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function submitTestimonials() {
    try {
      const res = await axios.post(
        `  http://localhost:8787/api/testimonials/setTestimonials`,
        { content },
        {
          headers: {
            Authorization: auth || "",
          },
        }
      );
      setPopData(res.data);
      setPOP(true);
      popTimeOuter();
      setContent("");
    } catch (error) {
      console.error("Error submitting testimonials:", error);
    }
  }

  return (
    <div className="border-2 border-gray-500 md:w-[400px] p-4 pt-0  rounded-md bg-white">
      <div className="w-full h-[10px] bg-[#9fe870] mb-2"></div>
      <h1 className="text-[2rem] md:text-[2.5rem] font-medium tracking-tighter mb-5">FeedBack</h1>
      <div>
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          placeholder="Enter your feedback"
          className="border-gray-500 border w-full p-3 rounded-md block h-[70px] md:h-[100px]"
        ></textarea>
        <button
          onClick={submitTestimonials}
          className="bg-[#9fe870] py-2 px-5 mt-4 rounded-md"
        >
          Submit
        </button>
      </div>
      {isPOP && popData && (
        <div className="fixed h-[60px]  w-[300px] z-[200] top-[10%] right-0">
          <Popup isRight={popData.status} message={popData.msg} />
        </div>
      )}
    </div>
  );
};

export default FeebackCard;
