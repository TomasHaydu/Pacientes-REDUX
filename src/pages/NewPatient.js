import Forms from "../components/Forms"

const NewPatient = () => {
  return (
    <div>

      <div
      className=""
      >
        <h2
        className="font-bold text-2xl flex justify-center mt-5">
        Agregar nuevo paciente
        </h2>
        <p
        className="font-serif text-base flex justify-center"
        > Complete el formulario para poder agregar un nuevo paciente
        </p>
      </div>

      <div>
      <Forms />
      </div>



    </div>
  )
}

export default NewPatient