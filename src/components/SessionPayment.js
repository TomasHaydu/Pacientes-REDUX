import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  insertPatientSession,
  editToAPI,
} from "../features/patient/patientSlice";

const SessionPayment = ({ patient }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const [edit, setEdit] = useState(false);

  const idGenerator = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
  };

  const newSession = () => {
    const id = idGenerator();

    let thisSession = {
      date,
      isChecked,
      payment,
      id,
    };

    const patientMut = { ...patient };
    patientMut.session = [...patientMut.session];
    patientMut.session.push(thisSession);

    patientMut.session.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    dispatch(insertPatientSession(patientMut));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      const id = sessionId;
      let thisSession = {
        date,
        isChecked,
        payment,
        id,
      };

      const patientMut = { ...patient };
      patientMut.session = [...patientMut.session];
      patientMut.session = patientMut.session.filter((s) => s.id !== sessionId);
      patientMut.session.push(thisSession);

      dispatch(editToAPI(patientMut));

      setEdit(false);
    }

    newSession();

    setDate(dayNowYyyyMmDd());
    setIsChecked(false);
    setPayment("");
  };

  const handleEdit = (session) => {
    setEdit(true);

    setDate(session.date);
    setIsChecked(session.isChecked);
    setPayment(session.payment);
    setSessionId(session.id);
  };

  const handleDelete = (sessionToDelete) => {
    const response = window.confirm("¿Desea ELIMINAR esta sesion?");

    if (response) {
      const patientMut = { ...patient };
      patientMut.session = [...patientMut.session];
      patientMut.session = patientMut.session.filter(
        (s) => s.id !== sessionToDelete.id
      );
      dispatch(insertPatientSession(patientMut));
    }
  };

  const handleSelect = (value) => {
    if (value === "date") {
      let patientMut = { ...patient };
      patientMut.session = [...patientMut.session];
      patientMut.session.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      dispatch(insertPatientSession(patientMut));
    }
    if (value === "payment") {
      let patientMut = { ...patient };
      patientMut.session = [...patientMut.session];
      patientMut.session.sort((a, b) => {
        return a.payment === b.payment ? 0 : a.payment ? 1 : -1;
      });
      dispatch(insertPatientSession(patientMut));
    }
  };

  const dayNowYyyyMmDd = () => {
    let date = new Date();
    let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const dayNow = () => {
    let date = new Date();
    let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const dayMonthYear = (date) => {
    const [year, month, day] = date.split("-");

    const result = [day, month, year].join("-");

    return result;
  };

  return (
    <div className="bg-orange-300 md:w-11/12 rounded-lg mx-8 mt-4 mb-10">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex-col mx-2 md:mx-20 my-4 text-lg"
      >
        <div>
          <label className="font-bold">Fecha de la sesion:</label>
          <input
            type="date"
            required
            className="hover:bg-slate-100 ml-4 p-0.5 my-1 border-2  border-zinc-300"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
        </div>
        <div>
          <label className="font-bold"> Marque con un tick si pago:</label>
          <input
            type="checkbox"
            className="hover:bg-slate-100 ml-4 w-7 h-7 my-1 border-2 border-zinc-300"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(!isChecked);
            }}
          />
        </div>
        <div>
          <label className="font-bold">De que forma?</label>
          <input
            type="text"
            className="hover:bg-slate-100 ml-4 w-2/5 my-1 border-2 p-1 border-zinc-300"
            onChange={(e) => setPayment(e.target.value)}
            value={payment}
            maxLength={18}
            disabled={isChecked ? false : true}
          />
        </div>

        <input
          type="submit"
          className="bg-green-200 hover:bg-green-300 p-1 rounded-lg w-40 mx-14 md:mx-80 cursor-pointer"
          value={edit ? "Editar" : "Añadir"}
        />
      </form>
      <div className="mx-2 md:mx-0 flex flex-col md:inline-block md:w-full">
        <div className="flex md:flex-row flex-col justify-between my-2 mx-20">
          <div>
            <label className="font-bold text-lg">Historial de Sesiones:</label>
          </div>
          <div>
            <select
              className="w-28 p-3 rounded-lg text-xs "
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="" disabled>
                -Ordernar por-
              </option>
              <option value="date">Fecha</option>
              <option value="payment">Pagado</option>
            </select>
          </div>
        </div>

        <div className="md:mb-2 flex flex-col md:block bg-orange-100 rounded-md md:ml-20 p-4 w-full md:w-10/12 max-h-48 md:max-h-40 overflow-y-scroll border-2 border-zinc-300">
          {patient.session ? (
            patient.session.map((s) => (
              <div
                className="flex flex-col md:flex-row justify-between my-2 rounded-md border-gray-300 border-2"
                key={s.id}
              >
                <ul className="flex flex-col md:flex-row justify-start items-center">
                  <li className="ml-2 my-2 bg-orange-700 rounded-full w-4 h-2"></li>
                  <label className="mx-2 underline font-bold">Fecha:</label>
                  <li className="">
                    {" "}
                    {dayMonthYear(s.date) === dayNow()
                      ? "HOY"
                      : dayMonthYear(s.date)}
                  </li>
                  <label className="mx-2 underline font-bold">
                    El paciente:
                  </label>
                  <li
                    className={
                      s.isChecked === true
                        ? "bg-blue-200 rounded-sm my-1"
                        : "bg-red-200 rounded-sm my-1"
                    }
                  >
                    {s.isChecked === true ? "Si Pago" : "No Pago"}
                  </li>
                  <label className="mx-2 underline font-bold">
                    Por medio de:
                  </label>
                  <li className="">{s.payment === "" ? "-" : s.payment}</li>
                </ul>

                <div className="flex justify-center md:block">
                  <button
                    className="bg-sky-400 hover:bg-sky-500 rounded-md h-6 w-16 mx-2 my-1"
                    onClick={() => handleEdit(s)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-500 rounded-md h-6 w-16 mx-2 my-1"
                    onClick={() => handleDelete(s)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPayment;
