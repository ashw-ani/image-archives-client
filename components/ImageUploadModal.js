import { useContext, useState } from "react";
import authContext from "@/context/AuthContext";
import BackDrop from "./UI/Backdrop";

const ImageUploadModal = (props) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgName, setImgName] = useState("");
  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;

  const { userData, selectedFolder } = useContext(authContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  //
  //
  //
  //
  const handleImageUpload = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken");
    setLoading(true);
    props.setAddImage(false);
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Image uploaded successfully:");

        //  save the url to mongo db
        const imageData = {
          url: result.data.url,
          name: imgName,
          user: userData._id,
          folder: selectedFolder,
        };

        const saveImageResponse = await fetch(
          `${apiRoute}/images/uploadImage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${token}`,
            },
            body: JSON.stringify(imageData),
          }
        );

        const imageDataResult = await saveImageResponse.json();

        if (imageDataResult.success) {
          console.log("saved successfully", imageDataResult);
        }
      } else {
        console.error("Image upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    resetForm();
  };
  //
  //
  //

  const resetForm = () => {
    setImagePreview(null);
    props.setAddImage(false);
  };

  return (
    <>
      {/*  backdrop */}
      {/* {loading && <BackDrop>Please Wait</BackDrop>} */}
      {/* <div
        onClick={() => {
          props.setAddImage(false);
        }}
        className=" w-screen h-screen bg-slate-900/70 absolute top-0 left-0 backdrop-blur-sm flex justify-center items-center"
      ></div> */}
      {/* modal */}
      <BackDrop
        onClick={() => {
          props.setAddImage(false);
        }}
      />
      {!loading ? (
        <div className="bg-white w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-6">
          <form
            className="w-full h-full flex flex-col justify-center items-center gap-2 "
            onSubmit={handleImageUpload}
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className=" h-24 object-contain "
              />
            )}
            <input
              className="block w-3/4 rounded-md p-2 mb-2 border-2"
              type="file"
              id="imageInput"
              name="imageInput"
              accept="image/*"
              placeholder="select image"
              onChange={handleImageChange}
              required
            />

            <input
              className="block w-3/4 rounded-md p-2 mb-2 border-2"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={imgName}
              onChange={(event) => {
                setImgName(event.target.value.trim());
              }}
            />
            <div className="flex flex-row gap-3">
              <button
                className="select-none bg-blue-500 hover:bg-blue-600 text-white block w-20 rounded-md p-2"
                type="submit"
              >
                Submit
              </button>
              <button
                className="select-none bg-red-500 hover:bg-red-600 text-white block w-20 rounded-md p-2"
                type="reset"
                onClick={() => {
                  props.setAddImage(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};
export default ImageUploadModal;
