import React, { useState } from "react";
import "./Botones.css";
import { usuarios } from "../users"; // Importamos los usuarios

function Botones() {
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
    const usuarioValido = usuarios.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.rol.toLowerCase() === usuarioSeleccionado.toLowerCase()
    );

    if (usuarioValido) {
      alert(`Bienvenido ${usuarioValido.username} (${usuarioValido.rol})`);
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
          Administratador
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

