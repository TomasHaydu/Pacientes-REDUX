/* eslint-disable eqeqeq */

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Forms from "../components/Forms";

const EditPatient = () => {

  const {id} = useParams();
  
  const patients = useSelector((state) => (state.patients.patients))
  const patient = patients.find(patient => patient.id == id)

  return (
    <div>
      <div className="">
        <h2 className="font-bold text-2xl flex justify-center mt-5">
          Editar paciente
        </h2>
        <p className="font-serif text-base flex justify-center">
          {" "}
          Edite el formulario para poder corregir datos del paciente
        </p>
      </div>

      <div>
        {patient.nombre ? (
          <Forms patient={patient} />
        ) : (
          <p className="flex justify-center mt-40 text-lg p-2 border-2 bg-slate-50 mx-20">
            Este paciente no existe
          </p>
        )}
      </div>
    </div>
  );
};

export default EditPatient;
