import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "./Alert";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import {editToAPI, addToAPI} from "../features/patient/patientSlice";

const Forms = ({ patient }) => {

  const dispatch = useDispatch()

  const [resultArrived, setResultArrived] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [session, setSession] = useState([])

  const newPatientSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Campo obligatorio")
      .min(3, "Minimo 3 caracteres")
      .max(20, "Maximo 20 caracteres")
      .matches((/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g), "Solo letras"),
    apellido: Yup.string()
      .required("Campo obligatorio")
      .min(3, "Minimo 3 caracteres")
      .max(20, "Maximo 20 caracteres")
      .matches((/^[a-z ,.'-]+$/i), "Solo letras"),
    edad: Yup.number("Solo numeros")
      .required("Campo obligatorio")
      .positive("Solo numeros positivos")
      .max(99, "Solo edad de 2 digitos"),
    dni: Yup.number("Solo numeros")
      .positive("Solo numeros positivos")
      .min(9999999, "Minimo 7 digitos")
      .max(99999999, "Maximo 8 digitos"),
    telefono: Yup.number("Solo numeros")
      .positive("Solo numeros positivos")
      .max(999999999999999, "Demasidos caracteres"),
  });

  const handleSubmit = async (value) => {
    try {
      if (patient.id) {
        // Editar Paciente
        dispatch(editToAPI(value))
        setResultArrived(true)
      } else {
        // Nuevo Paciente
        dispatch(addToAPI(value))
        setResultArrived(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (resultArrived === true) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <Formik
          initialValues={{
            nombre: patient?.nombre ?? "",
            apellido: patient?.apellido ?? "",
            domicilio: patient?.domicilio ?? "",
            edad: patient?.edad ?? "",
            dni: patient?.dni ?? "",
            telefono: patient?.telefono ?? "",
            diagnostico: patient?.diagnostico ?? "",
            obraSocial: patient?.obraSocial ?? "",
            derivacion: patient?.derivacion ?? "",
            tratamientoComplementario: patient?.tratamientoComplementario ?? "",
            observaciones: patient?.observaciones ?? "",
            id: patient.id,
            session: patient?.session ?? [],
          }}
          enableReinitialize={true}
          onSubmit={async (valores , { resetForm }) => {
            await handleSubmit(valores);
            resetForm();
          }}
          validationSchema={newPatientSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="mt-4 ml-4 flex-col">
                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Nombre:</label>
                  <Field
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                  {errors.nombre && touched.nombre ? (
                    <Alert>{errors.nombre}</Alert>
                  ) : null}
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Apellido:</label>
                  <Field
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                  {errors.apellido && touched.apellido ? (
                    <Alert>{errors.apellido}</Alert>
                  ) : null}
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Domicilio:</label>
                  <Field
                    type="text"
                    id="domicilio"
                    name="domicilio"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Edad:</label>
                  <Field
                    type="number"
                    id="edad"
                    name="edad"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                  {errors.edad && touched.edad ? (
                    <Alert>{errors.edad}</Alert>
                  ) : null}
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">DNI:</label>
                  <Field
                    type="number"
                    id="dni"
                    name="dni"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                  {errors.dni && touched.dni ? (
                    <Alert>{errors.dni}</Alert>
                  ) : null}
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Telefono:</label>
                  <Field
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                  {errors.telefono && touched.telefono ? (
                    <Alert>{errors.telefono}</Alert>
                  ) : null}
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Diagnóstico:</label>
                  <Field
                    type="text"
                    id="diagnostico"
                    name="diagnostico"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Obra Social:</label>
                  <Field
                    type="text"
                    id="obraSocial"
                    name="obraSocial"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">Derivación:</label>
                  <Field
                    type="text"
                    id="derivacion"
                    name="derivacion"
                    className="bg-slate-50 rounded-lg w-3/4 border-2 hover:bg-slate-100 p-1"
                  />
                </div>

                <div className="mx-20 my-2">
                  <label className="mr-4 uppercase">
                    Tratameinto Complementario:
                  </label>
                  <Field
                    as="select"
                    id="tratamientoComplementario"
                    name="tratamientoComplementario"
                    className="bg-slate-50 rounded-lg w-3/4 md:w-2/4 border-2 hover:bg-slate-100 p-1"
                  >
                    <option value="">--Seleccione--</option>
                    <option value="psicopedagogia">Psicopedagogía</option>
                    <option value="fonoaudiologia">Fonoaudiología</option>
                    <option value="terapia-ocupacional">
                      Terapia Ocupacional
                    </option>
                    <option value="acompañamiento-terapeutico">
                      Acompañamiento Terapéutico
                    </option>
                  </Field>
                </div>

                <div className="mx-20 my-2 md:flex-row flex-col justify-center items-center mb-2">
                  <label className="mr-4 uppercase ">Obsevaciones:</label>
                  <Field
                    as="textarea"
                    id="observaciones"
                    name="observaciones"
                    className="bg-slate-50 rounded-lg w-3/4 h-24 border-2 hover:bg-slate-100 p-1"
                  />
                </div>

                <div
                className="hidden"
                >
                  <Field 
                  type="text"
                  id="session"
                  name="session"
                  />
                </div>

                <div className="flex justify-center">
                  <input
                    className={patient.id ?
                       "mb-10 md:mb-5 bg-blue-400 hover:bg-blue-500 p-4 rounded-3xl w-3/5 md:w-1/5 font-bold text-lg" 
                       : "mb-10 md:mb-5 bg-lime-400 hover:bg-lime-500 p-4 rounded-3xl w-3/5 md:w-1/5 font-bold text-lg"}
                    value={patient.id ? "Editar" : "Agregar"}
                    type="submit"
                  ></input>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
};

Forms.defaultProps = {
  patient: {},
};

export default Forms;
