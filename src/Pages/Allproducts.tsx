import axios from "axios";
import { useEffect, useState } from "react";
import Itemcard from "../Components/Itemcard";
import { IoSearch } from "react-icons/io5";

interface Product {
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

const Allproducts = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [globalProducts, setGlobalProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [allLostFound, setAllLostFound] = useState<string>("all");

  useEffect(() => {
    async function pullProuduct() {
      const res = await axios(`http://localhost:8787/api/product/getproducts`);
      setProduct(res.data);
      setGlobalProducts(res.data);
      setLoader(false);
    }
    pullProuduct();
  }, []);

  //handle search
  const handleSearch = (e: any) => {
    const data = products?.filter((val: any) => {
      return (
        val.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val.location?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val.category?.toLowerCase().includes(e.target.value.toLowerCase()) ||
        val.lostfound?.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setGlobalProducts(data);
    setAllLostFound("all");
  };

  function handleAllLostFound(value: string) {
    setAllLostFound(value);
    if (value === "all") {
      setGlobalProducts(products);
    } else {
      const data = products?.filter((val: any) => {
        return (
          val.lostfound.toLowerCase().includes(value)
        );
      });
      setGlobalProducts(data);
    }
  }

  return (
    <div className="mt-[100px] mx-5 sm:mx-[60px] md:mx-[100px] 2xl:mx-[250px] min-h-[60vh] mb-10">
      {loader ? (
        <div className="flex justify-center items-center h-[80vh]">
          <img src="/images/loader.gif" alt="Loading..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          <div className="md:flex justify-between items-center">
            <h3 className="text-3xl ml-2f font-semibold tracking-tighter my-10">
              Lost and Found Items
            </h3>
            <div className="border sm:w-[300px] overflow-hidden rounded-xl flex justify-center items-center gap-2 border-gray-400">
              <IoSearch className="text-xl w-[10%]" />
              <input
                onChange={handleSearch}
                type="text"
                className="py-2 focus:outline-none w-[90%] "
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex gap-1 sm:gap-3 mt-10 sm:mt-0 text-sm sm:text-lg">
            <span
            onClick={()=>{
              handleAllLostFound("all")
            }}
              className={`px-4 py-2 ${
                allLostFound === "all" ? "bg-[#a0e1e1]" : "bg-white"
              } font-bold rounded-xl cursor-pointer `}
            >
              All
            </span>
            <span
            onClick={()=>{
              handleAllLostFound("lost")
            }}
              className={`px-4 py-2 ${
                allLostFound === "lost" ? "bg-[#a0e1e1]" : "bg-white"
              } font-bold rounded-xl cursor-pointer `}
            >
              Lost
            </span>
            <span
            onClick={()=>{
              handleAllLostFound("found")
            }}
              className={`px-4 py-2 ${
                allLostFound === "found" ? "bg-[#a0e1e1]" : "bg-white"
              } font-bold rounded-xl cursor-pointer `}
            >
              Found
            </span>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-3">
            {globalProducts.length > 0 ? (
              globalProducts.map((product) => (
                <Itemcard key={product.id} item={product} />
              ))
            ) : (
              <div>No product found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Allproducts;
