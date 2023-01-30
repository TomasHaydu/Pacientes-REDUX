import { useNavigate } from "react-router-dom";

const Patient = ({patient, handleDelete}) => {

  const navigate = useNavigate()


  return (
    <div className="p-2 grid grid-cols-6 gap-16 rounded-sm mx-2 border-b-2 mt-2">
      <p className="ml-4">{patient.nombre}</p>
      <p>{patient.apellido}</p>
      <p>{patient.edad}</p>
      <p>{patient.telefono === "" ? "-" : patient.telefono}</p>
      <div className="flex justify-between">
        <button 
        className="p-2 bg-yellow-200 rounded-md mx-2 hover:bg-yellow-300"
        onClick={()=>navigate(`/${patient.id}`)}
        >
          Ver
        </button>
        <button 
        className="p-2 bg-blue-300 rounded-md mx-2 hover:bg-blue-400"
        onClick={()=>navigate(`edit/${patient.id}`)}
        >
          Editar
        </button>
        <button 
        className="p-2 bg-red-400 rounded-md mx-2 hover:bg-red-500"
        onClick={() => handleDelete(patient.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Patient;