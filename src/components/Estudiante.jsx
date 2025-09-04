import React from "react";
import { useNavigate } from "react-router-dom";
import "./Estudiante.css";

const materias = ["Matemáticas", "Lenguaje", "Ciencias", "Historia"];

function Estudiante() {
  const navigate = useNavigate();

  const irAMateria = (materia) => {
    navigate(`/estudiante/materia/${materia.toLowerCase()}`);
  };

  return (
    <div className="contenedor-estudiante">
      <div className="contenido-texto-estudiante">
        <h1>Bienvenido, Estudiante</h1>
        <p>Aquí puedes ver tus materias, calificaciones, etc.</p>

        <div className="botones-materias">
          {materias.map((materia, index) => (
            <button
              key={index}
              onClick={() => irAMateria(materia)}
              className="boton-materia"
            >
              {materia}
            </button>
          ))}
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
        alt="Estudiante estudiando"
        className="imagen-estudiante"
      />
    </div>
  );
}

export default Estudiante;
