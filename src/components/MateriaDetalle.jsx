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

  // 1) Log de estado general del componente (se ejecuta en cada render)
  console.log("🔎 MateriaDetalle render:", {
    nombre,
    grado,
    materiaId,
    gradoId,
    loadingIds,
  });

  useEffect(() => {
    if (!nombre) return;
    setLoadingIds(true);

    const materiaName = nombre;
    const gradoName = grado || "9-1";

    async function fetchIds() {
      // 2) Log antes de empezar las peticiones
      console.log("🚀 fetchIds arrancó con:", { materiaName, gradoName });

      try {
        // 3) Log justo antes de llamar al endpoint de materias
        console.log("🧩 Llamando a GET /api/materias/name/:", materiaName);
        const mRes = await fetch(
          `/api/materias/name/${encodeURIComponent(materiaName)}`
        );
        // 4) Log del status de respuesta
        console.log("📥 Status materia:", mRes.status);
        const mData = await mRes.json();
        // 5) Log del JSON recibido
        console.log("📄 JSON materia:", mData);
        if (mRes.ok) setMateriaId(mData.id);

        // 6) Log justo antes de llamar al endpoint de grados
        console.log("🧩 Llamando a GET /api/grados/name/:", gradoName);
        const gRes = await fetch(
          `/api/grados/name/${encodeURIComponent(gradoName)}`
        );
        // 7) Log del status de respuesta
        console.log("📥 Status grado:", gRes.status);
        const gData = await gRes.json();
        // 8) Log del JSON recibido
        console.log("📄 JSON grado:", gData);
        if (gRes.ok) setGradoId(gData.id);
      } catch (err) {
        console.error("❌ Error en fetchIds:", err);
      } finally {
        setLoadingIds(false);
      }
    }

    fetchIds();
  }, [nombre, grado]);

  if (loadingIds)
    return <p style={{ padding: 40 }}>Cargando información...</p>;
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
      />
    </div>
  );
}

export default MateriaDetalle;



