import CreateFolder from "./CreateFolder";

const DashboardIntro = (props) => {
  //   console.log(props);

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
