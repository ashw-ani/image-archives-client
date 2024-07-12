import { useContext, useState } from "react";
import authContext from "@/context/AuthContext";
import ImageUploadModal from "./ImageUploadModal";

const UploadImage = (props) => {
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;
  const [addImage, setAddImage] = useState(false);
  const [imageName, setImageName] = useState("");
  const { userData, selectedFolder } = useContext(authContext);

  // returning jsx conditionally
  if (!addImage) {
    return (
      <div
        className={`w-30 h-18 bg-white  flex flex-col justify-center items-center p-2 border-2 border-dashed border-black font-bungee font-thin cursor-pointer`}
        onClick={() => {
          setAddImage(true);
        }}
      >
        <div>+</div>
        <div>Add Images</div>
      </div>
    );
  } else {
    return (
      <ImageUploadModal setAddImage={setAddImage} />
      //   <div
      //     className={`  bg-white h-16 flex flex-row justify-center items-center gap-2 p-2 border-2 border-dashed border-black font-bungee font-thin cursor-pointer relative`}
      //   >
      //     <form
      //       className="flex flex-row justify-center items-center gap-2 "
      //       onSubmit={() => {}}
      //     >
      //       <input
      //         type="text"
      //         placeholder="name of folder"
      //         required
      //         className="block w-full rounded-md p-2   border-2 border-black"
      //         value={imageName}
      //         onChange={(event) => {
      //           setImageName(event.target.value.trim());
      //         }}
      //       ></input>
      //       <button
      //         type="submit"
      //         className="select-none bg-blue-500 hover:bg-blue-600 text-white block  rounded-md p-2"
      //       >
      //         create
      //       </button>
      //     </form>
      //     <div
      //       className={`w-6 h-6 absolute bg-red-500 opacity-100 flex flex-row justify-center items-center rounded-full -top-[9.5px] -left-[18.5px] translate-x-1 `}
      //       onClick={() => {
      //         setAddImage(false);
      //       }}
      //     >
      //       x
      //     </div>
      //   </div>
    );
  }
};
export default UploadImage;
