import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import DashboardIntro from "@/components/Dashboardintro";
import { GoFileDirectoryFill } from "react-icons/go";
import { FaAngleDoubleLeft } from "react-icons/fa";
import UploadImage from "@/components/uploadImage";

const UserDash = (props) => {
  const [fetchedFolders, setFetchedFolders] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [lastFolder, setLastFolder] = useState(null);

  const router = useRouter();
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;

  const username = router.query.username;
  const {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    selectedFolder,
    setSelectedFolder,
  } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiRoute}/user/getUser`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("failed to fetch User Data");
        }
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("error fetching user data", error);
      }
    };
    fetchUserData();

    const handleStorageChange = (event) => {
      if (event.key === "jwtToken") {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
        setUserData(null);
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router, setIsLoggedIn, setUserData, username]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchFolders = async () => {
      try {
        const response = await fetch(
          `${apiRoute}/folders/getFolders${
            selectedFolder ? `?parentId=${selectedFolder}` : ""
          }`,
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch Folders");
        }
        const data = await response.json();
        setFetchedFolders(data);
      } catch (error) {
        console.error("error fetching user data", error);
      }
    };
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${apiRoute}/images/fetchImages?parentId=${selectedFolder}`,
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch Folders");
        }
        const data = await response.json();
        setFetchedImages(data);
      } catch (error) {
        console.error("error fetching user data", error);
      }
    };
    selectedFolder && fetchImages();
    fetchFolders();
  }, [selectedFolder]);

  return (
    <div className="w-screen h-screen pt-20 no-scrollbar overflow-auto flex flex-col">
      {userData && <DashboardIntro userData={userData} />}
      <div className="bg-white  flex flex-row flex-wrap gap-2 p-5 ">
        {selectedFolder && (
          <div
            className="flex flex-col h-7 w-7 p-1 cursor-pointer "
            onClick={() => {
              setSelectedFolder(lastFolder);
              setFetchedImages([]);
            }}
          >
            <FaAngleDoubleLeft className="text-lg " />
          </div>
        )}
        {selectedFolder && <UploadImage />}
        {fetchedFolders.map((folder) => (
          <div
            key={folder._id}
            className="flex flex-col h-20 w-20 justify-between items-center p-1 cursor-pointer "
            onClick={() => {
              setLastFolder(selectedFolder);
              setSelectedFolder(folder._id);
            }}
          >
            <GoFileDirectoryFill className="text-5xl" />
            <div className="max-w-full h-6 pl-1 flex flex-row justify-items-center overflow-clip">
              {folder.name}
            </div>
          </div>
        ))}
        {fetchedImages.map((image) => (
          <div
            onClick={() => window.open(image.url, "_blank")}
            key={image._id}
            className="flex flex-col h-16 w-16 justify-between items-center p-1 cursor-pointer "
          >
            <img src={image.url} alt="image" />
            <div className="max-w-full h-6 pl-1 flex flex-row justify-items-center overflow-clip">
              {image.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserDash;
