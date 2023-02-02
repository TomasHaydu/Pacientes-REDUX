import { useNavigate } from "react-router-dom";

const Patient = ({patient, handleDelete}) => {

  const navigate = useNavigate()


  return (
    <div className="p-2 grid grid-cols-5 md:grid-cols-6 md:gap-16 rounded-sm md:mx-2 border-b-2 mt-2">
      <p className="md:ml-4">{patient.nombre}</p>
      <p className="max-w-xs">{patient.apellido}</p>
      <p className="hidden md:block">{patient.edad}</p>
      <p className="hidden md:block">{patient.telefono === "" ? "-" : patient.telefono}</p>
      <div className="flex justify-between">
        <button 
        className="p-2 mx-2 bg-yellow-200 rounded-md md:mx-2 hover:bg-yellow-300"
        onClick={()=>navigate(`/${patient.id}`)}
        >
          Ver
        </button>
        <button 
        className="p-2 bg-blue-300 rounded-md md:mx-2 hover:bg-blue-400"
        onClick={()=>navigate(`edit/${patient.id}`)}
        >
          Editar
        </button>
        <button 
        className="p-2 mx-2 bg-red-400 rounded-md md:mx-2 hover:bg-red-500"
        onClick={() => handleDelete(patient.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Patient;