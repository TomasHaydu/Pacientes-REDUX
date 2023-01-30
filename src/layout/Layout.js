/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useLocation } from "react-router-dom";
import Edit from "../img/edit.png";
import Cancel from "../img/cancel.png";
import { fetchInfoProfile, newInfoProfile } from "../features/patient/patientSlice";

const layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const urlNow = location.pathname;

  const dispatch = useDispatch();

  const [imageLink, setImageLink] = useState("https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png");

  const [yourName, setYourName] = useState("Lic. Mi Nombre");

  useEffect(() => {
    // dispatch(newInfoProfile(yourName,imageLink))
    // dispatch(fetchInfoProfile())
  },[])

  const image = useSelector((state) => state.patients.srcImage);
  const name = useSelector((state) => state.patients.yourName)

  const [editName, setEditName] = useState(false);

  const [editImg, setEditImg] = useState(false);

  const handleSubmite = (e) => {
    e.preventDefault();
    setEditImg(false);
    setYourName(newName)
    setEditName(false)
    dispatch(newInfoProfile(yourName,imageLink));

  };

  const [newName, setNewName] = useState(yourName) 

  const buttonName = () => {
    setNewName(yourName)
    setEditName(!editName)
  }

  return (
    <div className="flex bg-orange-100">
      <div className="bg-orange-400 w-36 h-screen inline-block border-r-2 rounded-r-3xl p-4">
        <div className="text-center ">
          <h1 className="font-bold mt-8 text-2xl">Pacientes</h1>
          {editName ? (
            <form
            onSubmit={(e) => handleSubmite(e)}>
              <input
                className="mt-1 text-sm w-24 rounded-sm"
                value={newName }
                onChange={(e) => setNewName(e.target.value)}
              ></input>
            </form>
          ) : (
            <p className="mt-1 text-sm">{name}</p>
          )}

          <img
            src={editName ? Cancel : Edit}
            className="w-5 h-5 bg-orange-300 rounded-md hover:bg-orange-200"
            onClick={() => buttonName()}
          />

          <img src={image} onClick={() => setEditImg(true)} />
          {editImg ? (
            <form onSubmit={(e) => handleSubmite(e)}>
              <input
                type="text"
                onChange={(e) => setImageLink(e.target.value)}
              ></input>
            </form>
          ) : null}
        </div>

        <div className="mt-8 text-base flex text-justify">
          <nav>
            <div
              className={`${
                urlNow === "/"
                  ? " bg-orange-300 flex justify-start hover:underline rounded-sm"
                  : "flex justify-start bg-orange-400 hover:underline rounded-sm"
              }`}
            >
              <Link className="ml-2" to="/">
                Pacientes
              </Link>
            </div>

            <div
              className={`${
                urlNow === "/new"
                  ? " mt-1 bg-orange-300 flex justify-center hover:underline rounded-sm"
                  : "mt-1 flex justify-center bg-orange-400 hover:underline"
              }`}
            >
              <Link className="ml-2" to="new">
                Nuevo Paciente
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-orange-50 w-full mx-8 my-8 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
