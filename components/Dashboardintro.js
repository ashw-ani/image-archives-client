import CreateFolder from "./CreateFolder";
import { useContext, useState } from "react";
import authContext from "@/context/AuthContext";
import { IoHome } from "react-icons/io5";

const DashboardIntro = (props) => {
  const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;
  const { showSearchResult, setShowSearchResult } = useContext(authContext);

  const search = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`${apiRoute}/images/search?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      const searchData = await response.json();
      console.log(searchData);

      setSearchResult(searchData);
      setShowSearchResult(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <div className="w-screen bg-gray-200 h-20 flex flex-row justify-between items-center p-5">
        <div className="text-xl font-bungee ">
          welcome, {props.userData.username}
        </div>
        <form
          className=" flex flex-row justify-center items-center gap-2 "
          onSubmit={search}
        >
          <input
            className=" rounded-md p-2  border-2"
            type="text"
            id="name"
            name="name"
            placeholder="Name of image"
            value={name}
            onChange={(event) => {
              setName(event.target.value.trim());
            }}
          ></input>
          <button
            className="select-none bg-blue-500 hover:bg-blue-600 text-white block w-20 rounded-md p-2"
            type="submit"
          >
            search
          </button>
        </form>
        {!showSearchResult && <CreateFolder></CreateFolder>}
      </div>
      {showSearchResult && (
        <div className="w-full px-5 py-5 flex flex-row gap-3 items-center ">
          {/* <div
            className="flex flex-col bg-red-600  justify-between items-center  cursor-pointer absolute"
            onClick={() => {
              window.location.reload();
            }}
          >
            <IoHome className="text-2xl" />
          </div> */}
          {searchResult.length ? (
            searchResult.map((image) => (
              <div
                onClick={() => window.open(image.url, "_blank")}
                key={image._id}
                className="flex flex-col h-20 w-20 justify-between items-center p-1 cursor-pointer "
              >
                <img src={image.url} alt="image" />
                <div className="max-w-full h-6 pl-1 flex flex-row justify-items-center overflow-clip">
                  {image.name}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center flex-grow items-center p-20 text-xl text-gray-400">
              No images found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default DashboardIntro;
