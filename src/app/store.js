import { configureStore } from '@reduxjs/toolkit'
import patientsReducers from '../features/patient/patientSlice'

export const store = configureStore({
  reducer: { patients: patientsReducers },
})