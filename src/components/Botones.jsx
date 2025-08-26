import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "./Botones.css";
import { usuarios } from "../users"; // Importamos los usuarios



function Botones() {
  const navigate = useNavigate();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarClick = (tipo) => {
    setUsuarioSeleccionado(tipo);
    setMostrarModal(true);
    setError("");
    setUsername("");
    setPassword("");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioSeleccionado(null);
  };

  const manejarLogin = (e) => {
    e.preventDefault();
    const rolMap = {
      estudiantes: 'estudiante',
      profesores: 'profesor',
      administrador: 'administrador',
    };
    
    const rolBuscado = rolMap[usuarioSeleccionado.toLowerCase()] || usuarioSeleccionado.toLowerCase();
    
    const usuarioValido = usuarios.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.rol.toLowerCase() === rolBuscado
    );
    

    if (usuarioValido) {
      
      if (usuarioValido.rol.toLowerCase() === "estudiante") {
        window.location.href = "/estudiante.html";
      } else if (usuarioValido.rol.toLowerCase() === "profesor") {
        window.location.href = "/profesor.html";
      } else if (usuarioValido.rol.toLowerCase() === "administrador") {
        navigate("/admin");

      } else {
        alert(`Bienvenido ${usuarioValido.username} (${usuarioValido.rol})`);
      }
      cerrarModal();
    } else {
      setError("Usuario o contraseña incorrectos para este rol.");
    }
  };

  return (
    <div>
      <div className="contenedor-botones">
        <button className="boton" onClick={() => manejarClick("estudiantes")}>
          Estudiantes
        </button>
        <button className="boton" onClick={() => manejarClick("profesores")}>
          Profesores
        </button>
        <button className="boton" onClick={() => manejarClick("administrador")}>
          Administrador
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar-modal" onClick={cerrarModal}>
              &times;
            </span>
            <h2>Iniciar sesión como {usuarioSeleccionado}</h2>
            <form className="form-login" onSubmit={manejarLogin}>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit" className="boton">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Botones;
