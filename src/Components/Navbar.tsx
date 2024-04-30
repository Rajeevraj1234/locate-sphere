import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { TfiMenu } from "react-icons/tfi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isLogout, setisLogout] = useState<boolean>(false);
  const handleClick = (route: string) => {
    setIsMenu(false);
    navigate(route);
  };
  const auth = localStorage.getItem("auth");
  const name = localStorage.getItem("name") ?? "";
  const imageUrl = localStorage.getItem("imageUrl") ?? "";

  const handleNavbar = () => {
    setIsMenu(!isMenu);
  };

  return (
    <div className="fixed inset-0 z-[99] md:mx-[80px] 2xl:mx-[300px] h-[70px] bg-[#272323] select-none  md:rounded-full md:mt-1  text-white flex justify-between px-7 md:px-20  md:py-9 items-center ">
      <div>
        <h1
          onClick={() => handleClick("/")}
          className="font-bold text-xl md:text-3xl tracking-tighter cursor-pointer"
        >
          .lsphere
        </h1>
      </div>
      <div>
        <ul className="gap-2 lg:gap-10 text-sm md:text-sm hidden sm:flex items-center justify-evenly ">
          <li
            onClick={() => handleClick("/products")}
            className=" cursor-pointer"
          >
            Feed
          </li>
          <li
            onClick={() => handleClick("/upload-product")}
            className=" cursor-pointer"
          >
            Upload Item
          </li>
          {auth && (
            <li
              onClick={() => handleClick("/history")}
              className=" cursor-pointer"
            >
              HistoryF
            </li>
          )}

          {auth ? (
            <li className="flex items-center gap-2 relative cursor-pointer">
              <span
                onClick={() => {
                  setisLogout(!isLogout);
                }}
                className="font-semibold gap-2 text-white  text-sm  flex justify-center items-center"
              >
                <img
                  src={imageUrl}
                  className="rounded-full w-[35px] h-[35px] "
                  alt=""
                />
                {name.split(" ")[0]}
              </span>
              {isLogout && (
                <span
                  onClick={() => {
                    localStorage.clear();
                    setisLogout(!isLogout);
                    navigate("/");
                  }}
                  className="w-[140px] h-[40px]  absolute inset-0 top-[120%] left-3  bg-white rounded-md hover:bg-gray-100 cursor-pointer text-black flex justify-center items-center font-bold shadow-lg "
                >
                  LogOut
                </span>
              )}
            </li>
          ) : (
            <li
              onClick={() => handleClick("/signin")}
              className="bg-[#9fe870] text-black px-5 py-2 font-semibold cursor-pointer rounded-xl"
            >
              Signin
            </li>
          )}
        </ul>
        {isMenu ? (
          <div className="bg-[#272323]  absolute inset-0 h-[350px] text-white text-lg sm:hidden font-medium py-7 px-4 rounded-b-2xl">
            <h1
              className="text-2xl w-full flex justify-between font-bold tracking-tighter mb-10"
              onClick={handleNavbar}
            >
              .Lsphere
              <IoMdClose />
            </h1>
            <h1
              className=" hover:bg-blue-200 py-2 px-2 hover:text-yellow-500 rounded-lg"
              onClick={() => handleClick("/")}
            >
              Home
            </h1>
            <h1
              className=" hover:bg-blue-200 py-2 px-2 hover:text-yellow-500 rounded-lg"
              onClick={() => handleClick("/products")}
            >
              Feed
            </h1>

            <h1
              className=" hover:bg-blue-200 py-2 px-2 hover:text-yellow-500 rounded-lg"
              onClick={() => handleClick("/upload-product")}
            >
              Upload Item
            </h1>
            {auth && (
              <h1
                className=" hover:bg-blue-200 py-2 px-2 hover:text-yellow-500 rounded-lg"
                onClick={() => handleClick("/history")}
              >
                History
              </h1>
            )}

            <h1 className=" hover:bg-gray-700 py-2 px-2 hover:text-yellow-500 rounded-lg">
              {auth ? (
                <li className="flex items-center gap-2 relative cursor-pointer">
                  <span
                    onClick={() => {
                      setisLogout(!isLogout);
                    }}
                    className="font-semibold gap-2 text-white  text-md  flex justify-center items-center"
                  >
                    <img
                      src={imageUrl}
                      className="rounded-full w-[35px] h-[35px] "
                      alt=""
                    />
                    {name}
                  </span>
                  {isLogout && (
                    <span
                      onClick={() => {
                        localStorage.clear();
                        setisLogout(!isLogout);
                        navigate("/");
                      }}
                      className="w-[140px] h-[40px]  absolute inset-0 top-[120%] left-3  bg-white rounded-md hover:bg-gray-100 cursor-pointer text-black flex justify-center items-center font-bold shadow-lg "
                    >
                      LogOut
                    </span>
                  )}
                </li>
              ) : (
                <li
                  onClick={() => handleClick("/signin")}
                  className="  py-1 cursor-pointer list-none"
                >
                  Signin
                </li>
              )}
            </h1>
          </div>
        ) : (
          <div className="text-xl text-white sm:hidden " onClick={handleNavbar}>
            <TfiMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
