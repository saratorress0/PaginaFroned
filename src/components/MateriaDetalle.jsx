import React from "react";
import { useParams, useLocation } from "react-router-dom";
import NotasTabla from "./NotasTabla";
 
function MateriaDetalle() {
  const { nombre, grado } = useParams();
  const location = useLocation();
 
  const esProfesor = location.pathname.includes("/profesor");
 
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>
        Materia: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
        {grado && ` - Grado ${grado}`}
      </h1>
      {esProfesor ? (
        <>
          <h2>Notas de {nombre} - Grado {grado}</h2>
          <NotasTabla editable={true} />
        </>
      ) : (
        <p>
          Aquí podrás consultar tus calificaciones, asistencia y otra información.
          {}
          <NotasTabla editable={false} />
        </p>
      )}
    </div>
  );
}
 
export default MateriaDetalle;