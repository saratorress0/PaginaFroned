import React, { useState, useEffect } from "react";

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]); 

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3003/api/usuarios");
      const data = await res.json();
      console.log("GET /api/usuarios response:", data);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };
  
  

  const agregarUsuario = async () => {
    const username = prompt("Nombre del usuario:");
    const password = prompt("Contraseña del usuario:");
  
    if (!username || !password) return alert("Campos requeridos");
  
    try {
      const res = await fetch("http://localhost:3003/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      console.log("POST /api/usuarios response status:", res.status);
      console.log("POST /api/usuarios response body:", data);
  
      if (res.ok) {
        alert("Usuario agregado");
        await obtenerUsuarios();
      } else {
        alert("Error al agregar usuario: " + (data.error || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al agregar usuario", error);
    }
  };
  
  const eliminarUsuario = async () => {
    const id = prompt("ID del usuario a eliminar:");

    if (!id) return;

    try {
      const res = await fetch(`http://localhost:3003/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Usuario eliminado");
        obtenerUsuarios();
      }
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };



  useEffect(() => {
    obtenerUsuarios(); 
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>
      <button onClick={agregarUsuario}>Añadir Usuario</button>
      <button onClick={eliminarUsuario}>Eliminar Usuario</button>
      <button onClick={obtenerUsuarios}>Actualizar Lista</button>

      <ul>
  {usuarios.map((u) => (
    <li key={u.id}>
      Nombre: {u.username} | Contraseña: {u.password}
    </li>
  ))}
</ul>


    </div>
  );
};

export default AdminPanel;
