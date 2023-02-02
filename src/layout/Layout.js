/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import Home from "../img/home.png";

const layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const urlNow = location.pathname;

  return (
    <div className="flex flex-col md:flex-row bg-orange-100">
      <div className="bg-orange-400 md:w-1/6 w-screen md:h-screen inline-block md:border-r-2 md:rounded-r-3xl p-4">
          <Link 
          className="flex justify-center items-center"
          to="/"
          >
            <img
            className="hover:bg-orange-300 rounded-full cursor-pointer" 
            src={Home}>
            </img>
          </Link>
        <div className="text-center ">
          <h1 className="font-bold md:mt-8 text-2xl">Pacientes</h1>
        </div>

        <div className="md:mt-8 md:text-base md:flex md:text-justify mt-2">
          <nav className="md:block flex justify-between">
            <div
              className={`${
                urlNow === "/"
                  ? "justify-center bg-orange-300 md:w-full w-1/2 flex md:justify-start hover:underline rounded-sm"
                  : "flex justify-center md:justify-start md:w-full w-1/2 bg-orange-400 hover:underline rounded-sm"
              }`}
            >
              <Link className="ml-2" to="/">
                Pacientes
              </Link>
            </div>

            <div
              className={`${
                urlNow === "/new"
                  ? "justify-center md:mt-1 bg-orange-300 md:w-full w-1/2 flex md:justify-center hover:underline rounded-sm"
                  : "justify-center md:mt-1 flex md:justify-start md:w-full w-1/2 bg-orange-400 hover:underline"
              }`}
            >
              <Link className="ml-2" to="new">
                Nuevo Paciente
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-orange-50 w-full md:mx-8 my-8 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
