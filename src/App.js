import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout'
import Home from './pages/Home'
import EditPatient from './pages/EditPatient'
import NewPatient from './pages/NewPatient'
import InfoPatient from './pages/InfoPatient'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="edit/:id" element={<EditPatient/>} />
          <Route path="new" element={<NewPatient/>} />
          <Route path=':id' element={<InfoPatient/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
