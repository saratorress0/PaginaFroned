import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Botones.css";
import { usuarios } from "../users"; 

function Botones() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const abrirModal = () => {
    setMostrarModal(true);
    setError("");
    setUsername("");
    setPassword("");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const manejarLogin = (e) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (usuarioValido) {
      const rol = usuarioValido.rol.toLowerCase();
      if (rol === "estudiante") {
        navigate("/estudiante");
      } else if (rol === "profesor") {
        navigate("/profesor");
      } else if (rol === "administrador") {
        navigate("/admin");
      } else {
        alert(`Bienvenido ${usuarioValido.username} (${usuarioValido.rol})`);
      }
      cerrarModal();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="contenido-texto">
        <h1>Bienvenido a SRS</h1>
        <p>Por favor, inicia sesión para continuar</p>
        <button className="boton" onClick={abrirModal}>
          Inicio de Sesión
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
        alt="Bienvenida"
        className="imagen-bienvenida"
      />

      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar-modal" onClick={cerrarModal}>&times;</span>
            <h2>Iniciar sesión</h2>
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
