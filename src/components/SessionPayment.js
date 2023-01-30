import { useState } from "react";
import { useDispatch} from "react-redux";
import { insertPatientSession } from "../features/patient/patientSlice";

const SessionPayment = ({patient}) => {


  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [check, setCheck] = useState(true);
  const [payment, setPayment] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const idGenerator = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
  };

  const newSession = () => {

    const id = idGenerator();

    const thisSession = {
      date,
      check,
      payment,
      id,
    };

    dispatch(insertPatientSession(thisSession, patient));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    newSession();

    setDate("");
    setCheck(true);
    setPayment("");
  };

  const handleEdit = () => {};

  return (
    <div className="bg-fuchsia-100 rounded-lg mx-8 my-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex-col mx-20 my-4 text-lg"
      >
        <div>
          <label className="font-bold">Fecha de la sesion:</label>
          <input
            type="date"
            required
            className="hover:bg-slate-100 ml-4 p-0.5 my-1 border-2  border-zinc-300"
            onChange={(e) => setDate(e.target.value)}
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
              setCheck(e.target.checked);
            }}
          />
        </div>
        <div>
          <label className="font-bold">De que forma?</label>
          <input
            type="text"
            className="hover:bg-slate-100 ml-4 w-2/5 my-1 border-2 p-1 border-zinc-300"
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-red-300 hover:bg-red-400 p-1 rounded-lg w-40 mx-80"
          value="Añadir"
        />
      </form>
      <div className="inline-block w-full">
        <label className="mx-20 font-bold text-lg ">
          Historial de Sesiones:{" "}
        </label>
        <div className="mb-2 bg-slate-50 rounded-md ml-20 p-4 w-10/12 max-h-40 overflow-y-scroll border-2 border-zinc-300">
          {patient.session ? (
            patient.session.map((s) => (
              <ul className="flex flex-row my-3 border-gray-300 border-2">
                <li className="ml-2 my-2 bg-purple-500 w-4 h-2"></li>
                <li className="mx-2"> Fecha: {s.date}</li>
                <li className="mx-2">
                  El paciente: {s.check === true ? "Pago" : "No Pago"}
                </li>
                <li className="mx-2">
                  Por medio de: {s.payment === "" ? "-" : s.payment}
                </li>
                <button
                  className="bg-sky-400 hover:bg-sky-500 rounded-md h-6 w-16 mx-2 my-1"
                  onClick={handleEdit}
                >
                  Editar
                </button>
                <button className="bg-red-400 hover:bg-red-500 rounded-md h-6 w-16 mx-2 my-1">
                  Añadir
                </button>
              </ul>
            ))
          ) : (
            <p>"No se han encontrado sesiones en el historial"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPayment;
