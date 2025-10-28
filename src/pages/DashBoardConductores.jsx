import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListarConductores from './conductores/ListarConductores';
import AprobarConductores from './conductores/AprobarConductores';

export default function DashBoardConductores() {
  return (
    <Routes>
      <Route path="listar" element={<ListarConductores />} />
      <Route path="aprobar" element={<AprobarConductores />} />
      <Route path="" element={<Navigate to="listar" replace />} />
    </Routes>
  );
}
