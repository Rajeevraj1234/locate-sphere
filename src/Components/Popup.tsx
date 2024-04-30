import { FcApproval, FcHighPriority } from "react-icons/fc";

const Popup = ({ message, isRight }: { message: string; isRight: boolean }) => {
  return (
    <div className={`p-2 border border-gray-500 bg-white w-[220px] sm:w-[270px] h-[60px] sm:h-[70px] flex justify-start rounded-2xl items-center shadow-lg ${isRight ? "shadow-green-500" : "shadow-red-500"}`}>
      <div className="flex justify-start items-center gap-2 text-xs tracking-wider">
        {isRight ? <FcApproval className="text-[2rem]" /> : <FcHighPriority className="text-[2rem]" />}
        {message}
      </div>
    </div>
  );
};

export default Popup;
