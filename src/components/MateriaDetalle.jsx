import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import NotasTabla from "./NotasTabla";

function MateriaDetalle() {
  const { nombre, grado } = useParams();
  const location = useLocation();
  const esProfesor = location.pathname.includes("/profesor");

  const [materiaId, setMateriaId] = useState(null);
  const [gradoId, setGradoId] = useState(null);
  const [loadingIds, setLoadingIds] = useState(true);

  useEffect(() => {
    if (!nombre) return;
    setLoadingIds(true);
    const materiaName = nombre;
    const gradoName = grado || "9-1";

    async function fetchIds() {
      try {
        const BASE = "http://localhost:3003"; // <- usa el puerto de tu backend
        // pedir id de materia al backend (usa el BASE)
        const mRes = await fetch(`${BASE}/api/materias/name/${encodeURIComponent(materiaName)}`);
        if (mRes.ok) {
          const mData = await mRes.json();
          setMateriaId(mData.id);
        } else {
          console.warn("Materia no encontrada:", materiaName);
        }

        // pedir id de grado al backend (usa el BASE)
        const gRes = await fetch(`${BASE}/api/grados/name/${encodeURIComponent(gradoName)}`);
        if (gRes.ok) {
          const gData = await gRes.json();
          setGradoId(gData.id);
        } else {
          console.warn("Grado no encontrado:", gradoName);
        }
      } catch (err) {
        console.error("Error obteniendo ids:", err);
      } finally {
        setLoadingIds(false);
      }
    }

    fetchIds();
  }, [nombre, grado]);

  if (loadingIds) return <p style={{ padding: 40 }}>Cargando información...</p>;
  if (!materiaId || !gradoId) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Materia: {nombre}</h1>
        <p>No se encontró la materia o el grado (revisa nombres/DB).</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>
        Materia: {nombre.charAt(0).toUpperCase() + nombre.slice(1)}
        {grado && ` - Grado ${grado}`}
      </h1>

      <NotasTabla
        editable={esProfesor}
        materiaId={materiaId}
        gradoId={gradoId}
        materiaNombre={nombre}
        gradoNombre={grado}
      />
    </div>
  );
}

export default MateriaDetalle;


