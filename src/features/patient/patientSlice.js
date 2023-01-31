import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  yourName: "",
  alert: false,
  loading: false,
  srcImage:
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
};

export const patientsReducers = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatientsList: (state, action) => {
      state.patients = action.payload;
    },
    addPatients: (state, action) => {
      state.patients.push(action.payload);
    },
    editPatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload.id
      );
      state.patients.push(action.payload);
    },
    deletePatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload.id
      );
    },
    setImage: (state, action) => {
      state.srcImage = action.payload;
    },
    setName: (state, action) => {
      state.yourName = action.payload;
    }
  },
});

export const {
  setPatientsList: setPatientsList,
  addPatients: addPatients,
  editPatients: editPatients,
  deletePatients: deletePatients,
  setImage: setImage,
  setName: setName,
} = patientsReducers.actions;

export default patientsReducers.reducer;

export const fetchAllPatients = () => (dispatch) => {
  axios
    .get("http://localhost:4000/posts")
    .then((response) => {
      const order = (response.data).sort((a, b) => {
        const nombreA = a.nombre
        const nombreB = b.nombre
        if (nombreA < nombreB) {
          return -1;
        }

        if (nombreA > nombreB) {
          return 1;
        }
        return 0;
      });
      dispatch(setPatientsList(order));
    })
    .catch((error) => console.log(error));
};

export const addToAPI = (patients) => (dispatch) => {
  axios
    .post("http://localhost:4000/posts", patients)
    .then((response) => {
      dispatch(addPatients(response.data));
    })
    .catch((error) => console.log(error));
};

export const editToAPI = (patient) => (dispatch) => {
  axios
    .put(`http://localhost:4000/posts/${patient.id}`, patient)
    .then((response) => {
      dispatch(editPatients(response.data));
    })
    .catch((error) => console.log(error));
};

export const deleteToAPI = (patient) => (dispatch) => {
  axios
    .delete(`http://localhost:4000/posts/${patient.id}`, patient)
    .then((response) => {
      dispatch(deletePatients(patient));
    })
    .catch((error) => console.log(error));
};

const filtrarElementos = (terminoBusqueda, tareasPorMostrar) => {
  const resultadosBusqueda = tareasPorMostrar.filter((patients) => {
    const nombre = patients.nombre
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const apellido = patients.apellido
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (nombre.includes(terminoBusqueda.toLowerCase())) {
      return patients;
    } else if (apellido.includes(terminoBusqueda.toLowerCase())) {
      return patients;
    } else return null;
  });
  return resultadosBusqueda;
};

export const onChangeSearch = (search) => (dispatch) => {
  axios
    .get("http://localhost:4000/posts")
    .then((response) => {
      dispatch(setPatientsList(filtrarElementos(search, response.data)));
    })
    .catch((error) => console.log(error));
};

export const fetchInfoProfile = () => (dispatch) => {
  axios
    .get("http://localhost:4000/comments")
    .then((response) => {
      dispatch(setImage(response.data.image))
      dispatch(setName(response.data.name))
    })
    .catch((error) => console.log(error));
};

export const newInfoProfile = (titleName, img) => (dispatch) => {
  axios
    .put("http://localhost:4000/comments", 
      {"name": titleName ,
      "image": img})
    .then((response) => {
      console.log(response.data)
      dispatch(setImage(img))
      dispatch(setName(titleName))
    })
    .catch((error) => console.log(error));
};

export const patientsOrder = (order) => (dispatch) => {
  dispatch(setPatientsList(order));
};

export const insertPatientSession = (patient) => (dispatch) => {
   axios
    .put(`http://localhost:4000/posts/${patient.id}`, patient )
    .catch((error) => console.log(error))

    dispatch(editPatients(patient))
}
