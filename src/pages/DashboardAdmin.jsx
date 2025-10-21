import React from "react";

export default function DashboardAdmin() {
  return (
    <div className="bg-dark">
      <h2 className="mb-4">Gestión de Usuarios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>U001</td>
            <td>Juan Pérez</td>
            <td>juanperez@example.com</td>
            <td>•••••</td>
            <td>
              <button className="btn btn-warning btn-sm me-2">Editar</button>
              <button className="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
