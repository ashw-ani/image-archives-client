const BackDrop = (props) => {
  return (
    <div
      onClick={() => {
        props.onClick();
      }}
      className=" w-screen h-screen  bg-slate-900/70 absolute top-0 left-0 backdrop-blur-sm flex justify-center items-center"
    >
      {props.children}
    </div>
  );
};
export default BackDrop;
