import { useContext, useState } from "react";
import authContext from "@/context/AuthContext";
//

const CreateFolder = (props) => {
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;
  const [addFolder, setAddFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { userData, selectedFolder } = useContext(authContext);

  // create new folder
  const createFolderHandler = async (event) => {
    event.preventDefault();
    const formData = {
      name: folderName,
      parent: selectedFolder,
      user: userData._id,
    };
    setFolderName("");
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`${apiRoute}/folders/createFolder`, {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("failed to create folder");
      }
      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error("error creating folder", error.messasge);
    }
  };

  // returning JSX
  if (!addFolder) {
    return (
      <div
        className={`w-30  bg-white h-16 flex flex-col justify-center items-center p-2 border-2 border-dashed border-black font-bungee font-thin cursor-pointer`}
        onClick={() => {
          setAddFolder(true);
        }}
      >
        <div>+</div>
        <div>new folder</div>
      </div>
    );
  } else {
    return (
      <div
        className={`  bg-white h-16 flex flex-row justify-center items-center gap-2 p-2 border-2 border-dashed border-black font-bungee font-thin cursor-pointer relative`}
      >
        <form
          className="flex flex-row justify-center items-center gap-2 "
          onSubmit={createFolderHandler}
        >
          <input
            type="text"
            placeholder="name of folder"
            required
            className="block w-full rounded-md p-2   border-2 border-black"
            value={folderName}
            onChange={(event) => {
              setFolderName(event.target.value.trim());
            }}
          ></input>
          <button
            type="submit"
            className="select-none bg-blue-500 hover:bg-blue-600 text-white block  rounded-md p-2"
          >
            create
          </button>
        </form>
        <div
          className={`w-6 h-6 absolute bg-red-500 opacity-100 flex flex-row justify-center items-center rounded-full -top-[9.5px] -left-[18.5px] translate-x-1 `}
          onClick={() => {
            setAddFolder(false);
          }}
        >
          x
        </div>
      </div>
    );
  }
};
export default CreateFolder;
