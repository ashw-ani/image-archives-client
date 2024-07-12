import CreateFolder from "./CreateFolder";

const DashboardIntro = (props) => {
  //   console.log(props);

  const searchImages = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    const imageName = document.getElementById("searchInput").value;

    try {
      const response = await fetch(
        `/search?name=${encodeURIComponent(imageName)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const images = await response.json();
      displayImages(images);
    } catch (error) {
      console.error("Error searching images:", error);
      alert("An error occurred while searching for images.");
    }
  };

  const displayImages = (images) => {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear previous results
    if (images.length === 0) {
      imageContainer.innerHTML = "<p>No images found.</p>";
      return;
    }
    images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.url;
      imgElement.alt = image.name;
      imgElement.title = image.name;
      imgElement.style.margin = "10px";
      imgElement.style.width = "200px"; // Adjust as needed
      imgElement.style.height = "auto"; // Adjust as needed
      imageContainer.appendChild(imgElement);
    });
  };

  document
    .getElementById("searchForm")
    .addEventListener("submit", searchImages);

  return (
    <div className="w-screen bg-gray-100 h-20 flex flex-row justify-between items-center p-5">
      <div className="text-xl font-bungee ">
        welcome, {props.userData.username}
      </div>
      <form className=" flex flex-row justify-center items-center gap-2 ">
        <input
          className=" rounded-md p-2  border-2"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
        ></input>
        <button
          className="select-none bg-blue-500 hover:bg-blue-600 text-white block w-20 rounded-md p-2"
          type="submit"
        >
          search
        </button>
      </form>
      <CreateFolder></CreateFolder>
    </div>
  );
};
export default DashboardIntro;
