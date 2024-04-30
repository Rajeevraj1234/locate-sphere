import axios from "axios";
import { useState } from "react";
import Popup from "./Popup";

interface productData {
  name: string;
  location: string;
  category: string;
  lostfound: string | null;
}

const UploadCard = () => {
  const [formData, setFormData] = useState<productData>({
    name: "",
    location: "",
    category: "",
    lostfound: null,
  });
  const auth = localStorage.getItem("auth");
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      `https://locate-sphere-backend.rajeevraj9308.workers.dev/api/product/setproduct`,
      formData,
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    setPopData(res.data);
    setPOP(true);
    popTimeOuter();
    setFormData({
      name: "",
      location: "",
      category: "",
      lostfound: null,
    });
  }

  return (
    <div className="border bg-white border-gray-300 shadow-md p-4 py-8 rounded-3xl grid grid-cols-1 w-[500px]">
      <h1 className="text-center font-medium text-[3rem] mb-14 tracking-tighter">
        Upload Item
      </h1>
      <input
        spellCheck="true"
        onChange={handleChange}
        className="border-b border-gray-400 p-2 focus:outline-none mb-10"
        placeholder="what you found or lost ?"
        value={formData.name}
        type="text"
        name="name"
      />
      <input
        onChange={handleChange}
        className="border-b border-gray-400 p-2 focus:outline-none mb-10"
        placeholder="location eg.Bailey Road"
        value={formData.location}
        type="text"
        name="location"
      />
      {/* //Drop Down  */}

      <div className="relative">
        <select
          name="category"
          className="block cursor-pointer appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          // value={selectedCategory}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="electronic">Electronic Gadgets</option>
          <option value="vehicle">Vehicles</option>
          <option value="smartphone">Documents</option>
          <option value="accessories">Accessories</option>
          <option value="sports Equipment">Sports Equipment</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0  flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="  "
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/* //Drop Down  */}
      {/* //Select wala */}
      <div className="flex justify-start items-center gap-3 mt-7 mb-3 ml-2 text-md">
        <label>Select Flag :</label>
        <br />
        <div className="flex items-center justify-start gap-1">
          <input
            type="radio"
            id="lost"
            name="lostfound"
            value="lost"
            onChange={handleChange}
          />
          <label htmlFor="lost">Lost</label>
        </div>
        <div className="flex items-center justify-start gap-1">
          <input
            type="radio"
            id="found"
            name="lostfound"
            value="found"
            onChange={handleChange}
          />
          <label htmlFor="found">Found</label>
        </div>
      </div>
      {/* //Select wala */}
      <div className="flex justify-center">
        <button
          className="h-[40px] my-3 bg-[#9fe870]  hover:bg-[#82c05b] font-medium rounded-lg w-[100px] border flex items-center justify-center gap-1"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {isPOP && popData && (
        <div className="fixed  h-[60px] w-[300px] z-[200] top-[10%] right-0">
          <Popup isRight={popData.status} message={popData.msg} />
        </div>
      )}
    </div>
  );
};

export default UploadCard;
