import Link from "next/link";
import { useRouter } from "next/router";
import authContext from "@/context/authContext";

import { useContext } from "react";

const MainNavigation = (props) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(authContext);

  return (
    // navigation bar
    <div className="box-border bg-navBar pr-5 h-16 md:h-20 flex flex-row justify-between items-center gap-3 md:gap-5 fixed top-0 w-screen z-50 border-b border-gray-600">
      {/* title and logo */}
      <div className="flex flex-row justify-between items-center gap-3 md:gap-5 ">
        <p className=" select-none font-bungee text-2xl md:text-4xl font-semibold text-gray-200 pl-8">
          Image Archives
        </p>
      </div>

      {/* navigation links */}
      <div className="flex flex-row justify-between items-right gap-4 md:gap-5">
        {currentPath === "/login" ||
        currentPath === "/register" ||
        currentPath === "/" ? (
          ""
        ) : (
          <Link href="/login">
            <p
              onClick={() => {
                localStorage.removeItem("jwtToken");
                setIsLoggedIn(false);
                setUserData(null);
              }}
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200 `}
            >
              log out
            </p>
          </Link>
        )}

        {currentPath === "/login" || currentPath === "/register" ? (
          <Link href="/">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Home
            </p>
          </Link>
        ) : (
          ""
        )}
        {currentPath === "/" || currentPath === "/login" ? (
          <Link href="register">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Signup
            </p>
          </Link>
        ) : (
          ""
        )}
        {currentPath === "/" || currentPath === "/register" ? (
          <Link href="/login">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Login
            </p>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MainNavigation;
